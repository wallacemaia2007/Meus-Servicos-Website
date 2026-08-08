import { projectBuilderCopy } from "@/data/project-builder-options";

export interface ProjectSummaryRow {
  title: string;
  value: string;
}

export interface ProjectSummaryProps {
  rows: ProjectSummaryRow[];
}

export function ProjectSummary({ rows }: ProjectSummaryProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--section-border)] bg-white shadow-sm">
      <div className="border-b border-[var(--section-border)] bg-[var(--section-tint)] px-5 py-4">
        <h3 className="font-heading text-xl font-normal leading-none text-[var(--brand-ink)]">
          {projectBuilderCopy.summaryTitle}
        </h3>
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
