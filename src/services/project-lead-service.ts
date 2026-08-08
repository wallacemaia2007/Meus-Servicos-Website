import type { ProjectLead } from "@/types/project-lead";

export interface SendProjectResult {
  success: boolean;
}

/**
 * Envia o lead de projeto para a API Route do proprio Next.js, que fica
 * responsavel por validar e disparar o e-mail via Resend no servidor.
 */
export async function sendProjectLead(payload: ProjectLead): Promise<void> {
  const response = await fetch("/api/send-project", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = (await response.json().catch(() => null)) as
    | SendProjectResult
    | null;

  if (!response.ok || !result?.success) {
    throw new Error("send-project-failed");
  }
}
