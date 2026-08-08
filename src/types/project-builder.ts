export type SelectionMode = "single" | "multiple";

export interface ProjectOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface ProjectCategory {
  id: string;
  title: string;
  description?: string;
  mode: SelectionMode;
  required?: boolean;
  exclusiveId?: string;
  options: ProjectOption[];
}

export interface ProjectConfiguration {
  [categoryId: string]: string[] | string | undefined;
}

export interface ProjectBrief {
  projectType?: string;
  features: string[];
  objective?: string;
  users: string[];
  integrations: string[];
  design?: string;
  projectStage?: string;
  deadline?: string;
  technologyPreference?: string;
  technologyDetails?: string;
  otherDetails?: Record<string, string>;
  additionalNotes?: string;
}
