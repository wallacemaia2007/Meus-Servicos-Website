import type { ProjectBrief } from "@/types/project-builder";
import type { ClientContactData } from "@/types/project-lead";

import { formatPhone } from "./phone";
import { getProjectSections } from "./project-details";

const CONTACT_LABELS: Record<string, string> = {
  whatsapp: "WhatsApp",
  email: "E-mail",
  call: "Ligação",
  noPreference: "Sem preferência",
};

const PROJECT_LABELS: Record<string, string> = {
  Tipo: "Tipo de projeto",
  Objetivo: "Objetivo principal",
  "Estágio": "Estágio da ideia",
  Prazo: "Prazo desejado",
  Funcionalidades: "Funcionalidades",
  "Usuários": "Público/usuários",
  "Integrações": "Integrações",
  Design: "Direção visual",
  "Preferência tecnológica": "Preferência tecnológica",
  "Observações": "Observações do projeto",
};

const valueLine = (label: string, value?: string | boolean): string | null => {
  if (typeof value === "boolean") {
    return `- ${label}: ${value ? "Sim" : "Não"}`;
  }

  const text = value?.trim();
  return text ? `- ${label}: ${text}` : null;
};

const sectionTitle = (title: string): string =>
  `*${PROJECT_LABELS[title] ?? title}*`;

/**
 * Constroi a mensagem pre-preenchida do WhatsApp a partir dos dados do
 * cliente e de todos os campos preenchidos no configurador do projeto.
 */
export function buildWhatsappMessage(
  client: ClientContactData,
  project: ProjectBrief,
): string {
  const contactLines = [
    valueLine("Nome", client.name),
    valueLine("E-mail", client.email),
    valueLine("WhatsApp", client.whatsapp ? formatPhone(client.whatsapp) : ""),
    valueLine("Empresa", client.company),
    valueLine(
      "Contato preferido",
      client.preferredContact
        ? (CONTACT_LABELS[client.preferredContact] ?? client.preferredContact)
        : "",
    ),
    valueLine("Aceita receber novidades", Boolean(client.consentToNewsletter)),
  ].filter((line): line is string => Boolean(line));

  const projectLines = getProjectSections(project).flatMap((section) => {
    if (section.items?.length) {
      return [
        sectionTitle(section.title),
        ...section.items.map((item) => `- ${item}`),
        "",
      ];
    }

    if (section.value?.trim()) {
      return [sectionTitle(section.title), section.value.trim(), ""];
    }

    return [];
  });

  const messageLines = [
    "Olá! Acabei de montar meu projeto pelo site da empresa e gostaria de conversar sobre ele.",
    "",
    "*Dados para contato*",
    ...contactLines,
    "",
    "*Dados do projeto*",
    ...projectLines,
  ];

  if (client.additionalMessage?.trim()) {
    messageLines.push(
      "*Mensagem adicional*",
      client.additionalMessage.trim(),
      "",
    );
  }

  messageLines.push(
    "Podem me chamar por aqui para alinharmos os próximos passos.",
  );

  return messageLines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}
