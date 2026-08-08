import { projectBuilderCategories } from "@/data/project-builder-options";
import type {
  ProjectBrief,
  ProjectCategory,
  ProjectConfiguration,
} from "@/types/project-builder";

export interface ProjectDetailsExtras {
  notes?: string;
  otherDetails?: Record<string, string>;
  technologyDetails?: string;
}

export interface ProjectSection {
  title: string;
  value?: string;
  items?: string[];
}

export interface ProjectSummaryRow {
  title: string;
  value: string;
}

const FIELD_BY_CATEGORY_ID: Record<string, keyof ProjectBrief> = {
  projectType: "projectType",
  features: "features",
  objective: "objective",
  users: "users",
  integrations: "integrations",
  design: "design",
  projectStage: "projectStage",
  deadline: "deadline",
  technology: "technologyPreference",
};

const asString = (value: string | string[] | undefined) =>
  typeof value === "string" && value ? value : undefined;

const asArray = (value: string | string[] | undefined): string[] =>
  Array.isArray(value) ? value : value ? [value] : [];

const labelWithDetails = (
  category: ProjectCategory,
  optionId: string,
  otherDetails?: Record<string, string>,
) => {
  const option = category.options.find((item) => item.id === optionId);
  const base = option?.label ?? optionId;

  if (optionId !== "other") {
    return base;
  }

  const text = otherDetails?.[category.id]?.trim();
  return text ? `${base} (${text})` : base;
};

const resolveLabels = (
  category: ProjectCategory,
  value: string | string[] | undefined,
  otherDetails?: Record<string, string>,
): string[] => {
  const ids = asArray(value);
  return ids.map((id) => labelWithDetails(category, id, otherDetails));
};

/**
 * Converte a configuracao bruta do configurador (ids) em um brief legivel,
 * com os rotulos reais das opcoes selecionadas.
 */
export function buildProjectDetails(
  config: ProjectConfiguration,
  extras: ProjectDetailsExtras = {},
): ProjectBrief {
  const findCategory = (id: string) =>
    projectBuilderCategories.find((category) => category.id === id);

  const pick = (categoryId: string) => {
    const category = findCategory(categoryId);
    const value = config[categoryId];
    if (!category) {
      return undefined;
    }
    return resolveLabels(category, value, extras.otherDetails)[0];
  };

  const collect = (categoryId: string): string[] => {
    const category = findCategory(categoryId);
    if (!category) {
      return [];
    }
    return resolveLabels(category, config[categoryId], extras.otherDetails);
  };

  const otherDetails: Record<string, string> = {};
  for (const category of projectBuilderCategories) {
    const selectedIds = asArray(config[category.id]);
    if (!selectedIds.includes("other")) {
      continue;
    }
    const text = extras.otherDetails?.[category.id]?.trim();
    if (text) {
      otherDetails[category.id] = text;
    }
  }

  return {
    projectType: pick("projectType"),
    features: collect("features"),
    objective: pick("objective"),
    users: collect("users"),
    integrations: collect("integrations"),
    design: pick("design"),
    projectStage: pick("projectStage"),
    deadline: pick("deadline"),
    technologyPreference: pick("technology"),
    technologyDetails:
      asString(config.technology) === "defined" && extras.technologyDetails?.trim()
        ? extras.technologyDetails.trim()
        : undefined,
    otherDetails: Object.keys(otherDetails).length ? otherDetails : undefined,
    additionalNotes: asString(extras.notes),
  };
}

/**
 * Secoes do projeto em ordem canonica (usada no e-mail e na mensagem).
 * Campos vazios sao omitidos.
 */
export function getProjectSections(project: ProjectBrief): ProjectSection[] {
  const sections: ProjectSection[] = [];

  const pushValue = (title: string, value?: string) => {
    if (value) {
      sections.push({ title, value });
    }
  };

  const pushItems = (title: string, items?: string[]) => {
    if (items && items.length > 0) {
      sections.push({ title, items });
    }
  };

  pushValue("Tipo", project.projectType);
  pushValue("Objetivo", project.objective);
  pushValue("Estágio", project.projectStage);
  pushValue("Prazo", project.deadline);
  pushItems("Funcionalidades", project.features);
  pushItems("Usuários", project.users);
  pushItems("Integrações", project.integrations);
  pushValue("Design", project.design);

  const technology = project.technologyPreference
    ? project.technologyDetails
      ? `${project.technologyPreference} (${project.technologyDetails})`
      : project.technologyPreference
    : undefined;
  pushValue("Preferência tecnológica", technology);
  pushValue("Observações", project.additionalNotes);

  if (project.otherDetails) {
    for (const category of projectBuilderCategories) {
      const text = project.otherDetails[category.id]?.trim();
      if (text) {
        sections.push({ title: `${category.title}`, value: text });
      }
    }
  }

  return sections;
}

/**
 * Linhas compactas para o resumo do projeto (lateral e modal), na mesma
 * ordem e com o mesmo texto do configurador existente.
 */
export function getProjectSummaryRows(
  project: ProjectBrief,
): ProjectSummaryRow[] {
  const rows: ProjectSummaryRow[] = [];

  for (const category of projectBuilderCategories) {
    const field = FIELD_BY_CATEGORY_ID[category.id];
    if (!field) {
      continue;
    }

    const value = project[field];

    if (Array.isArray(value)) {
      if (value.length === 0) {
        continue;
      }
      rows.push({ title: category.title, value: value.join(", ") });
      continue;
    }

    if (typeof value === "string" && value) {
      const text =
        category.id === "technology" && project.technologyDetails
          ? `${value} (${project.technologyDetails})`
          : value;
      rows.push({ title: category.title, value: text });
    }
  }

  if (project.additionalNotes) {
    rows.push({ title: "Observações", value: project.additionalNotes });
  }

  return rows;
}
