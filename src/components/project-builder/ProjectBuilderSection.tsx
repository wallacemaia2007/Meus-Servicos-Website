"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { projectBuilderCategories, projectBuilderCopy } from "@/data/project-builder-options";
import type {
  ProjectBrief,
  ProjectCategory as ProjectCategoryType,
  ProjectConfiguration,
} from "@/types/project-builder";

import { ProjectCategory } from "./ProjectCategory";
import { ProjectProgress } from "./ProjectProgress";
import { ProjectSummary, type ProjectSummaryRow } from "./ProjectSummary";

const optionLabel = (category: ProjectCategoryType, optionId: string) =>
  category.options.find((option) => option.id === optionId)?.label ?? optionId;

const asString = (value: string | string[] | undefined) =>
  typeof value === "string" && value ? value : undefined;

const asArray = (value: string | string[] | undefined): string[] =>
  Array.isArray(value) ? value : [];

export interface ProjectBuilderSectionProps {
  onSubmit?: (projectConfiguration: ProjectBrief) => void;
}

export function ProjectBuilderSection({
  onSubmit = (projectConfiguration) => {
    console.log("Project configuration", projectConfiguration);
  },
}: ProjectBuilderSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [config, setConfig] = useState<ProjectConfiguration>({});
  const [notes, setNotes] = useState("");
  const [technologyDetails, setTechnologyDetails] = useState("");
  const [otherDetails, setOtherDetails] = useState<Record<string, string>>({});

  const isFilled = (category: ProjectCategoryType) => {
    const value = config[category.id];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  };

  const filledCount = projectBuilderCategories.filter(isFilled).length;

  const percent = Math.round(
    (filledCount / projectBuilderCategories.length) * 100,
  );

  const allFilled = projectBuilderCategories.every(isFilled);

  const visibleCategories = projectBuilderCategories.filter((category, index) => {
    if (index === 0) {
      return true;
    }

    const previousFilled = isFilled(projectBuilderCategories[index - 1]);
    const anyFilledFromHere = projectBuilderCategories
      .slice(index)
      .some(isFilled);

    return previousFilled || anyFilledFromHere;
  });

  const summaryRows = useMemo(() => {
    const rows: ProjectSummaryRow[] = [];

    for (const category of projectBuilderCategories) {
      const value = config[category.id];
      const selectedIds = Array.isArray(value) ? value : value ? [value] : [];

      if (selectedIds.length === 0) {
        continue;
      }

      let text = selectedIds.map((id) => optionLabel(category, id)).join(", ");

      if (
        category.id === "technology" &&
        config.technology === "defined" &&
        technologyDetails.trim()
      ) {
        text = `${text} (${technologyDetails.trim()})`;
      }

      const otherText = otherDetails[category.id]?.trim();
      if (selectedIds.includes("other") && otherText) {
        text = `${text} (${otherText})`;
      }

      rows.push({ title: category.title, value: text });
    }

    if (notes.trim()) {
      rows.push({ title: "Observações", value: notes.trim() });
    }

    return rows;
  }, [config, notes, otherDetails, technologyDetails]);

  const buildBrief = (): ProjectBrief => {
    const otherBrief: Record<string, string> = {};

    for (const category of projectBuilderCategories) {
      const value = config[category.id];
      const selectedIds = Array.isArray(value) ? value : value ? [value] : [];
      if (!selectedIds.includes("other")) {
        continue;
      }
      const text = otherDetails[category.id]?.trim();
      if (text) {
        otherBrief[category.id] = text;
      }
    }

    return {
      projectType: asString(config.projectType),
      features: asArray(config.features),
      objective: asString(config.objective),
      users: asArray(config.users),
      integrations: asArray(config.integrations),
      design: asString(config.design),
      projectStage: asString(config.projectStage),
      deadline: asString(config.deadline),
      technologyPreference: asString(config.technology),
      technologyDetails:
        config.technology === "defined" && technologyDetails.trim()
          ? technologyDetails.trim()
          : undefined,
      otherDetails: Object.keys(otherBrief).length ? otherBrief : undefined,
      additionalNotes: notes.trim() ? notes.trim() : undefined,
    };
  };

  const handleSubmit = () => {
    if (!allFilled) {
      return;
    }
    onSubmit(buildBrief());
  };

  return (
    <section
      id="monte-seu-projeto"
      className="bg-[var(--section-light)] py-16 transition-colors duration-300 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHeader
          eyebrow={projectBuilderCopy.eyebrow}
          title={projectBuilderCopy.title}
          subtitle={projectBuilderCopy.subtitle}
        />

        <ProjectProgress
          filled={filledCount}
          total={projectBuilderCategories.length}
          percent={percent}
        />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <AnimatePresence initial={false}>
              {visibleCategories.map((category) => (
                <motion.div
                  key={category.id}
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, y: 24 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.35,
                  }}
                >
                  <ProjectCategory
                    category={category}
                    index={projectBuilderCategories.indexOf(category)}
                    value={config[category.id]}
                    onChange={(value) =>
                      setConfig((prev) => ({
                        ...prev,
                        [category.id]: value ?? undefined,
                      }))
                    }
                    otherValue={otherDetails[category.id] ?? ""}
                    onOtherChange={(value) =>
                      setOtherDetails((prev) => ({
                        ...prev,
                        [category.id]: value,
                      }))
                    }
                    footer={
                      category.id === "technology" &&
                      config.technology === "defined" ? (
                        <div className="rounded-xl border border-[var(--section-border)] bg-[var(--section-tint)] p-4">
                          <Label htmlFor="pb-technology-details">
                            {projectBuilderCopy.technologyInputTitle}
                          </Label>
                          <Input
                            id="pb-technology-details"
                            value={technologyDetails}
                            onChange={(event) =>
                              setTechnologyDetails(event.target.value)
                            }
                            maxLength={projectBuilderCopy.technologyInputMaxLength}
                            placeholder={
                              projectBuilderCopy.technologyInputPlaceholder
                            }
                            className="mt-2"
                          />
                          <p className="mt-1.5 text-right font-mono text-[10px] text-[var(--brand-ink-muted)]">
                            {technologyDetails.length}/
                            {projectBuilderCopy.technologyInputMaxLength}
                          </p>
                        </div>
                      ) : undefined
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <ProjectSummary rows={summaryRows} />

            <div className="rounded-2xl border border-[var(--section-border)] bg-white p-5 shadow-sm">
              <div className="flex items-baseline justify-between gap-3">
                <Label htmlFor="pb-notes">
                  {projectBuilderCopy.notesTitle}
                </Label>
                <span className="font-mono text-[10px] uppercase text-[var(--brand-ink-muted)]">
                  {projectBuilderCopy.notesOptional}
                </span>
              </div>
              <Textarea
                id="pb-notes"
                rows={4}
                maxLength={projectBuilderCopy.notesMaxLength}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder={projectBuilderCopy.notesPlaceholder}
                className="mt-2 resize-none"
              />
              <p className="mt-1.5 text-right font-mono text-[10px] text-[var(--brand-ink-muted)]">
                {notes.length}/{projectBuilderCopy.notesMaxLength}
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--section-border)] bg-white p-5 text-center shadow-sm">
              <Button
                variant="primary"
                className="w-full"
                disabled={!allFilled}
                onClick={handleSubmit}
              >
                {projectBuilderCopy.submitLabel}
              </Button>
              <p className="mt-3 text-xs leading-relaxed text-[var(--brand-ink-muted)]">
                {allFilled
                  ? projectBuilderCopy.submitHint
                  : projectBuilderCopy.submitBlockedHint}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
