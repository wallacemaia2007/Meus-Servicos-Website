import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { projectBuilderCopy } from "@/data/project-builder-options";
import type { ProjectCategory as ProjectCategoryType } from "@/types/project-builder";

import { ProjectOptionCard } from "./ProjectOptionCard";

export interface ProjectCategoryProps {
  category: ProjectCategoryType;
  index: number;
  value: string | string[] | undefined;
  onChange: (value: string | string[] | undefined) => void;
  footer?: React.ReactNode;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

export function ProjectCategory({
  category,
  index,
  value,
  onChange,
  footer,
  otherValue = "",
  onOtherChange,
}: ProjectCategoryProps) {
  const isSingle = category.mode === "single";
  const prefersReducedMotion = useReducedMotion();
  const selectedIndex = isSingle
    ? category.options.findIndex((option) => option.id === value)
    : -1;
  const otherSelected = isSingle
    ? value === "other"
    : Array.isArray(value) && value.includes("other");

  const [focusIndex, setFocusIndex] = useState(0);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    optionRefs.current = optionRefs.current.slice(0, category.options.length);
  }, [category.options.length]);

  const activeIndex = isSingle && selectedIndex >= 0 ? selectedIndex : focusIndex;

  const moveFocus = (fromIndex: number, direction: 1 | -1) => {
    const nextIndex =
      (fromIndex + direction + category.options.length) % category.options.length;
    optionRefs.current[nextIndex]?.focus();
    setFocusIndex(nextIndex);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    optionIndex: number,
  ) => {
    if (!isSingle) {
      return;
    }

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      moveFocus(optionIndex, 1);
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      moveFocus(optionIndex, -1);
    }
  };

  const handleSelect = (optionId: string) => {
    if (isSingle) {
      const next = value === optionId ? undefined : optionId;
      setFocusIndex(
        category.options.findIndex((option) => option.id === optionId),
      );
      onChange(next);
      return;
    }

    const list = Array.isArray(value) ? value : [];
    const isSelected = list.includes(optionId);
    let next: string[];

    if (category.exclusiveId) {
      if (optionId === category.exclusiveId) {
        next = isSelected ? [] : [category.exclusiveId];
      } else {
        next = isSelected
          ? list.filter((id) => id !== optionId)
          : [...list.filter((id) => id !== category.exclusiveId), optionId];
      }
    } else {
      next = isSelected
        ? list.filter((id) => id !== optionId)
        : [...list, optionId];
    }

    onChange(next.length ? next : undefined);
  };

  return (
    <div className="rounded-2xl border border-[var(--section-border)] bg-white p-5 shadow-sm md:p-6">
      <div className="mb-4 flex items-start gap-4">
        <span
          aria-hidden="true"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--brand-red-tint)] font-mono text-xs font-bold text-dev"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-bold leading-snug text-[var(--brand-ink)]">
            {category.title}
          </h3>
          {category.description ? (
            <p className="mt-1 text-sm leading-relaxed text-[var(--brand-ink-muted)]">
              {category.description}
            </p>
          ) : null}
          <p className="mt-2 font-mono text-[10px] font-medium uppercase tracking-wide text-[var(--brand-ink-muted)]">
            {isSingle ? "Escolha uma opção" : "Escolha quantas quiser"}
          </p>
        </div>
      </div>

      <div
        role={isSingle ? "radiogroup" : "group"}
        aria-label={category.title}
        className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
      >
        {category.options.map((option, optionIndex) => (
          <ProjectOptionCard
            key={option.id}
            ref={(node) => {
              optionRefs.current[optionIndex] = node;
            }}
            option={option}
            mode={category.mode}
            selected={
              isSingle
                ? value === option.id
                : Array.isArray(value) && value.includes(option.id)
            }
            tabIndex={isSingle ? (optionIndex === activeIndex ? 0 : -1) : 0}
            onSelect={() => handleSelect(option.id)}
            onKeyDown={(event) => handleKeyDown(event, optionIndex)}
          />
        ))}
      </div>

      <AnimatePresence initial={false}>
        {otherSelected ? (
          <motion.div
            key="other-input"
            initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.35,
              ease: "easeInOut",
            }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-xl border border-[var(--section-border)] bg-[var(--section-tint)] p-4">
              <div className="flex items-baseline justify-between gap-3">
                <Label htmlFor={`pb-other-${category.id}`}>
                  {projectBuilderCopy.otherInputTitle}
                </Label>
                <span className="font-mono text-[10px] uppercase text-[var(--brand-ink-muted)]">
                  {projectBuilderCopy.notesOptional}
                </span>
              </div>
              <Input
                id={`pb-other-${category.id}`}
                value={otherValue}
                onChange={(event) => onOtherChange?.(event.target.value)}
                maxLength={projectBuilderCopy.otherInputMaxLength}
                placeholder={projectBuilderCopy.otherInputPlaceholder}
                className="mt-2"
              />
              <p className="mt-1.5 text-right font-mono text-[10px] text-[var(--brand-ink-muted)]">
                {otherValue.length}/{projectBuilderCopy.otherInputMaxLength}
              </p>
            </div>
          </motion.div>
        ) : null}

        {footer ? (
          <motion.div
            key="footer"
            initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.35,
              ease: "easeInOut",
            }}
            className="overflow-hidden"
          >
            <div className="mt-4">{footer}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
