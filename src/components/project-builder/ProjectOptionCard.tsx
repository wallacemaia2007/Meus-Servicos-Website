import { Check } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import type { ProjectOption, SelectionMode } from "@/types/project-builder";

import { projectBuilderIcons } from "./project-builder-icons";

export interface ProjectOptionCardProps {
  option: ProjectOption;
  mode: SelectionMode;
  selected: boolean;
  tabIndex?: number;
  onSelect: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

export const ProjectOptionCard = React.forwardRef<
  HTMLButtonElement,
  ProjectOptionCardProps
>(({ option, mode, selected, tabIndex = 0, onSelect, onKeyDown }, ref) => {
  const Icon = option.icon ? projectBuilderIcons[option.icon] : undefined;

  return (
    <button
      ref={ref}
      type="button"
      role={mode === "single" ? "radio" : "checkbox"}
      aria-checked={selected}
      tabIndex={tabIndex}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className={cn(
        "group flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200",
        selected
          ? "border-dev bg-[var(--brand-red-tint)] shadow-[0_12px_28px_-16px_rgba(155,27,31,0.4)]"
          : "border-[var(--section-border)] bg-white hover:-translate-y-0.5 hover:border-dev/40 hover:bg-[var(--brand-red-tint)]/40 hover:shadow-sm",
      )}
    >
      {Icon ? (
        <span
          aria-hidden="true"
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-200",
            selected
              ? "bg-dev !text-white"
              : "bg-[var(--brand-red-tint)] text-dev group-hover:bg-dev/10",
          )}
        >
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
      ) : null}

      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block text-sm font-bold leading-snug text-[var(--brand-ink)]",
          )}
        >
          {option.label}
        </span>
        {option.description ? (
          <span className="mt-1 block text-xs leading-relaxed text-[var(--brand-ink-muted)]">
            {option.description}
          </span>
        ) : null}
      </span>

      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
          selected
            ? "scale-100 border-dev bg-dev !text-white opacity-100"
            : "scale-75 border-[var(--section-border)] text-transparent opacity-0 group-hover:border-dev/40",
        )}
      >
        <Check className="h-3 w-3" strokeWidth={3.5} />
      </span>
    </button>
  );
});

ProjectOptionCard.displayName = "ProjectOptionCard";
