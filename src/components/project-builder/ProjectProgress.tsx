import { motion, useReducedMotion } from "framer-motion";

import { projectBuilderCopy } from "@/data/project-builder-options";

export interface ProjectProgressProps {
  filled: number;
  total: number;
  percent: number;
}

export function ProjectProgress({ filled, total, percent }: ProjectProgressProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-label={projectBuilderCopy.progressSteps
        .replace("{filled}", String(filled))
        .replace("{total}", String(total))}
      className="mx-auto max-w-2xl"
    >
      <div className="flex flex-wrap items-end justify-between gap-2">
        <p className="text-sm font-bold text-[var(--brand-ink)]">
          {projectBuilderCopy.progressLabel.replace("{percent}", String(percent))}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--brand-ink-muted)]">
          {projectBuilderCopy.progressSteps
            .replace("{filled}", String(filled))
            .replace("{total}", String(total))}
        </p>
      </div>
      <div className="progress-bar mt-2.5">
        <motion.div
          aria-hidden="true"
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand-red-dark),var(--brand-red),var(--brand-red-light))]"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </div>
  );
}
