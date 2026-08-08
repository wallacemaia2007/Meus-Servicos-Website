"use client";

import type { ProjectBrief } from "@/types/project-builder";

export interface ProjectContactSummaryProps {
  project: ProjectBrief;
}

export function ProjectContactSummary({ project }: ProjectContactSummaryProps) {
  const rows = [
    { label: "Projeto", value: project.projectType },
    { label: "Objetivo", value: project.objective },
    { label: "Estágio da ideia", value: project.projectStage },
    { label: "Prazo", value: project.deadline },
  ].filter(
    (row): row is { label: string; value: string } => Boolean(row?.value),
  );

  return (
    <section
      aria-labelledby="pc-summary-title"
      className="min-w-0 rounded-2xl border border-[var(--section-border)] bg-[var(--section-tint)] p-4"
    >
      <h3
        id="pc-summary-title"
        className="font-mono text-[10px] font-medium uppercase tracking-wide text-dev"
      >
        Resumo do projeto
      </h3>

      <dl className="mt-3 grid grid-cols-1 gap-3 min-[430px]:grid-cols-2 min-[430px]:gap-x-4 min-[430px]:gap-y-2">
        {rows.map((row) => (
          <div key={row.label} className="min-w-0">
            <dt className="text-[10px] font-medium uppercase tracking-wide text-[var(--brand-ink-muted)]">
              {row.label}
            </dt>
            <dd className="mt-0.5 break-words text-[13px] font-bold leading-snug text-[var(--brand-ink)] sm:text-sm">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
