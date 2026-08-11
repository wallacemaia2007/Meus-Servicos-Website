import { WHATSAPP_NUMBER } from "@/constants/site";
import type { ProjectBrief } from "@/types/project-builder";
import type { ClientContactData } from "@/types/project-lead";

import {
  escapeHtml,
  loadEmailTemplate,
  renderTemplate,
} from "./email-utils";
import { getProjectSummaryRows } from "./project-details";

export interface ProjectConfirmationEmail {
  subject: string;
  html: string;
}

/**
 * E-mail de confirmacao enviado ao cliente: agradece a confianca, confirma
 * que o projeto foi salvo e avisa que a Maiawall entrara em contato.
 * Template em /src/emails/project-confirmation.html.
 */
export function buildProjectConfirmationEmail(
  client: ClientContactData,
  project: ProjectBrief,
): ProjectConfirmationEmail {
  const firstName = client.name.trim().split(/\s+/)[0] || client.name;
  const subject = `Recebemos seu projeto - obrigado, ${firstName}!`;

  const summaryHtml = getProjectSummaryRows(project)
    .map(
      (row) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #eadfd6;font-family:Arial,Helvetica,sans-serif;font-size:10px;line-height:1.4;text-transform:uppercase;letter-spacing:0.6px;color:#a8a29a;white-space:nowrap;vertical-align:top;">${escapeHtml(row.title)}</td>
          <td style="padding:10px 0 10px 16px;border-bottom:1px solid #eadfd6;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:#2b2622;word-break:break-word;text-align:right;">${escapeHtml(row.value)}</td>
        </tr>`,
    )
    .join("");

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Acabei de enviar um projeto pelo site da empresa.")}`;

  const html = renderTemplate(loadEmailTemplate("project-confirmation.html"), {
    SUBJECT: escapeHtml(subject),
    CLIENT_NAME: escapeHtml(client.name),
    PROJECT_SUMMARY: summaryHtml,
    WHATSAPP_URL: whatsappUrl,
    YEAR: String(new Date().getFullYear()),
  });

  return { subject, html };
}
