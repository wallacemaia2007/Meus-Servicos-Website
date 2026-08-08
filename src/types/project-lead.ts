import type { ProjectBrief } from "./project-builder";

export interface ClientContactData {
  name: string;
  email: string;
  whatsapp: string;
  company?: string;
  preferredContact?: string;
  additionalMessage?: string;
  consentToNewsletter?: boolean;
}

export interface ProjectLead {
  client: ClientContactData;
  project: ProjectBrief;
  submittedAt: string;
}

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";
