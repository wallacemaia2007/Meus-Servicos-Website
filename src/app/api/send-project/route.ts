import { Resend } from "resend";
import { z } from "zod";

import { buildProjectConfirmationEmail } from "@/lib/project/buildProjectConfirmationEmail";
import { buildProjectEmail } from "@/lib/project/buildProjectEmail";

const ERROR_RESPONSE = {
  success: false,
  message: "Não foi possível enviar o projeto.",
} as const;

const MAX_BODY_BYTES = 40_000;

const RATE_LIMIT = {
  windowMs: 60_000,
  max: 3,
} as const;

const ipHits = new Map<string, number[]>();
const emailHits = new Map<string, number>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT.windowMs;
  const hits = (ipHits.get(key) ?? []).filter((time) => time > windowStart);

  if (hits.length >= RATE_LIMIT.max) {
    ipHits.set(key, hits);
    return false;
  }

  hits.push(now);
  ipHits.set(key, hits);
  return true;
}

function emailCooledDown(email: string): boolean {
  const now = Date.now();
  const last = emailHits.get(email) ?? 0;
  if (now - last < 30_000) {
    return false;
  }
  emailHits.set(email, now);
  return true;
}

const clientSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().email().max(120),
  whatsapp: z
    .string()
    .trim()
    .regex(/^55\d{10,11}$/, "WhatsApp inválido"),
  company: z.string().trim().max(120).optional(),
  preferredContact: z.string().trim().max(40).optional(),
  additionalMessage: z.string().trim().max(1000).optional(),
  consentToNewsletter: z.boolean().optional(),
});

const projectSchema = z.object({
  projectType: z.string().max(80).optional(),
  features: z.array(z.string().max(120)).max(30).default([]),
  objective: z.string().max(120).optional(),
  users: z.array(z.string().max(120)).max(30).default([]),
  integrations: z.array(z.string().max(120)).max(30).default([]),
  design: z.string().max(120).optional(),
  projectStage: z.string().max(120).optional(),
  deadline: z.string().max(120).optional(),
  technologyPreference: z.string().max(120).optional(),
  technologyDetails: z.string().max(80).optional(),
  otherDetails: z
    .record(z.string().min(1).max(40), z.string().max(200))
    .refine((value) => Object.keys(value ?? {}).length <= 12, "Muitos detalhes")
    .optional(),
  additionalNotes: z.string().max(1000).optional(),
});

const leadSchema = z.object({
  client: clientSchema,
  project: projectSchema,
  submittedAt: z.string().max(40).optional(),
});

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!rateLimited(ip)) {
    return Response.json(ERROR_RESPONSE, { status: 429 });
  }

  let payload: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return Response.json(ERROR_RESPONSE, { status: 413 });
    }
    payload = JSON.parse(raw);
  } catch {
    return Response.json(ERROR_RESPONSE, { status: 400 });
  }

  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json(ERROR_RESPONSE, { status: 400 });
  }

  const { client, project } = parsed.data;
  const submittedAt = parsed.data.submittedAt ?? new Date().toISOString();

  if (!emailCooledDown(client.email)) {
    return Response.json(ERROR_RESPONSE, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.PROJECT_LEADS_EMAIL;

  if (!apiKey || !from || !to) {
    console.error("[send-project] servico de e-mail nao configurado");
    return Response.json(ERROR_RESPONSE, { status: 500 });
  }

  const { subject, html } = buildProjectEmail(client, project, submittedAt);
  const confirmation = buildProjectConfirmationEmail(client, project);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: client.email,
      subject,
      html,
    });

    if (error) {
      console.error("[send-project] erro ao enviar via Resend", error.name);
      return Response.json(ERROR_RESPONSE, { status: 500 });
    }

    try {
      const { error: confirmationError } = await resend.emails.send({
        from,
        to: [client.email],
        replyTo: to,
        subject: confirmation.subject,
        html: confirmation.html,
      });

      if (confirmationError) {
        console.error(
          "[send-project] erro no e-mail de confirmacao",
          confirmationError.name,
        );
      }
    } catch (error) {
      console.error(
        "[send-project] falha no e-mail de confirmacao",
        error instanceof Error ? error.name : "unknown",
      );
    }
  } catch (error) {
    console.error(
      "[send-project] falha inesperada",
      error instanceof Error ? error.name : "unknown",
    );
    return Response.json(ERROR_RESPONSE, { status: 500 });
  }

  return Response.json({ success: true });
}
