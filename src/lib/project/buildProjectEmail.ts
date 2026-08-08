import type { ProjectBrief } from "@/types/project-builder";
import type { ClientContactData } from "@/types/project-lead";

import {
  escapeHtml,
  loadEmailTemplate,
  renderTemplate,
} from "./email-utils";
import { formatPhone } from "./phone";
import { getProjectSections } from "./project-details";

const formatSubmittedAt = (submittedAt: string): string => {
  const date = new Date(submittedAt);
  if (Number.isNaN(date.getTime())) {
    return escapeHtml(submittedAt);
  }
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(date);
};

const PREFFERED_CONTACT_LABELS: Record<string, string> = {
  whatsapp: "WhatsApp",
  email: "E-mail",
  call: "Ligação",
  noPreference: "Tanto faz",
};

const preferredContactLabel = (value?: string): string =>
  value ? (PREFFERED_CONTACT_LABELS[value] ?? value) : "";

const sectionTitle = (title: string): string =>
  `<p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;line-height:1.3;color:#8a1317;text-transform:uppercase;letter-spacing:0.7px;">${escapeHtml(title)}</p>`;

const renderProjectSection = (section: {
  title: string;
  value?: string;
  items?: string[];
}): string => {
  if (section.items?.length) {
    const listItems = section.items
      .map(
        (item) => `
          <tr>
            <td style="width:12px;padding:3px 8px 3px 0;vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.4;color:#8a1317;">&bull;</td>
            <td style="padding:3px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.55;color:#3a342e;">${escapeHtml(item)}</td>
          </tr>`,
      )
      .join("");
    return `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 12px;background-color:#faf5ef;border:1px solid #efe8e0;border-radius:12px;">
        <tr>
          <td style="padding:14px 16px;">
            ${sectionTitle(section.title)}
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${listItems}</table>
          </td>
        </tr>
      </table>`;
  }

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 12px;background-color:#faf5ef;border:1px solid #efe8e0;border-radius:12px;">
      <tr>
        <td style="padding:14px 16px;">
          ${sectionTitle(section.title)}
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#2b2622;">${escapeHtml(section.value ?? "")}</p>
        </td>
      </tr>
    </table>`;
};

export interface ProjectEmail {
  subject: string;
  html: string;
}

/**
 * Gera o e-mail de lead a partir do template em /src/emails/project-lead.html
 * (lido do disco a cada chamada, permitindo editar o HTML sem rebuild).
 * O WhatsApp e o e-mail recebem todos os dados do projeto; o resumo do modal
 * e apenas um preview.
 */
export function buildProjectEmail(
  client: ClientContactData,
  project: ProjectBrief,
  submittedAt: string,
): ProjectEmail {
  const subject = `Novo projeto recebido — ${client.name}`;

  const clientRows = [
    ["Nome", escapeHtml(client.name)],
    [
      "E-mail",
      `<a href="mailto:${escapeHtml(client.email)}" style="color:#8a1317;text-decoration:none;">${escapeHtml(client.email)}</a>`,
    ],
    client.whatsapp
      ? [
          "WhatsApp",
          `<a href="https://wa.me/${escapeHtml(client.whatsapp)}" style="color:#8a1317;text-decoration:none;">${escapeHtml(formatPhone(client.whatsapp))}</a>`,
        ]
      : null,
    client.company ? ["Empresa", escapeHtml(client.company)] : null,
    client.preferredContact
      ? ["Contato preferido", escapeHtml(preferredContactLabel(client.preferredContact))]
      : null,
    [
      "Novidades por e-mail/mensagem",
      client.consentToNewsletter ? "Autorizado" : "Não autorizado",
    ],
  ].filter((row): row is [string, string] => Boolean(row));

  const clientRowsHtml = clientRows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f1ebe5;font-family:Arial,Helvetica,sans-serif;font-size:10px;line-height:1.4;text-transform:uppercase;letter-spacing:0.6px;color:#a8a29a;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 0 10px 16px;border-bottom:1px solid #f1ebe5;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:#2b2622;word-break:break-word;text-align:right;">${value}</td>
        </tr>`,
    )
    .join("");

  const projectSectionsHtml = getProjectSections(project)
    .map(renderProjectSection)
    .join("");

  const additionalMessageHtml = client.additionalMessage
    ? `
      <div style="margin:0 0 8px;">
        ${sectionTitle("Informações adicionais do cliente")}
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.65;color:#3a342e;background:#fff8f1;border:1px solid #eadfd6;border-left:4px solid #8a1317;padding:14px 16px;border-radius:10px;">${escapeHtml(client.additionalMessage)}</p>
      </div>`
    : "";

  const html = renderTemplate(loadEmailTemplate("project-lead.html"), {
    SUBJECT: escapeHtml(subject),
    CLIENT_NAME: escapeHtml(client.name),
    CLIENT_ROWS: clientRowsHtml,
    PROJECT_SECTIONS: projectSectionsHtml,
    ADDITIONAL_MESSAGE: additionalMessageHtml,
    SUBMITTED_AT: formatSubmittedAt(submittedAt),
    YEAR: String(new Date().getFullYear()),
  });

  return { subject, html };
}
