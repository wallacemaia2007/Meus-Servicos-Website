import { Trash2 } from "lucide-react";

import { projectBuilderCopy } from "@/data/project-builder-options";

export interface ProjectSummaryRow {
  title: string;
  value: string;
}

export interface ProjectSummaryProps {
  rows: ProjectSummaryRow[];
  onClearSelected?: () => void;
  showClearButton?: boolean;
}

export function ProjectSummary({
  rows,
  onClearSelected,
  showClearButton = false,
}: ProjectSummaryProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--section-border)] bg-white shadow-sm">
      <div className="relative border-b border-[var(--section-border)] bg-[var(--section-tint)] px-5 py-4 pr-32">
        <h3 className="font-heading text-xl font-normal leading-none text-[var(--brand-ink)]">
          {projectBuilderCopy.summaryTitle}
        </h3>
        {showClearButton ? (
          <button
            type="button"
            onClick={onClearSelected}
            className="absolute right-5 top-1/2 inline-flex -translate-y-1/2 items-center gap-1.5 rounded-lg border border-dev/20 bg-white px-2.5 py-1.5 text-xs font-semibold text-dev transition-colors duration-200 hover:border-dev/40 hover:bg-[var(--brand-red-tint)]"
            aria-label="Apagar tudo que foi selecionado"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            Apagar
          </button>
        ) : null}
      </div>

      <div aria-live="polite" className="px-5 py-4">
        {rows.length === 0 ? (
          <p className="text-sm leading-relaxed text-[var(--brand-ink-muted)]">
            {projectBuilderCopy.summaryEmpty}
          </p>
        ) : (
          <dl className="space-y-4">
            {rows.map((row) => (
              <div key={row.title}>
                <dt className="font-mono text-[10px] font-medium uppercase tracking-wide text-dev">
                  {row.title}
                </dt>
                <dd className="mt-1 break-words text-sm font-bold leading-relaxed text-[var(--brand-ink)]">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
