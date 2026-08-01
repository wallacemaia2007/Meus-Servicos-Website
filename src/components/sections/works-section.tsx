"use client";

import type { LucideIcon } from "lucide-react";
import {
  Brush,
  Building2,
  CheckCircle,
  Lightbulb,
  MonitorSmartphone,
  PanelTop,
  Store,
  Touchpad,
  Workflow,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";

import { serviceCategories, works } from "@/data/dev-content";
import { getWhatsAppWorkLink } from "@/lib/whatsapp";
import type { ServiceCategory } from "@/types";

const icons: Record<string, LucideIcon> = {
  Building2,
  MonitorSmartphone,
  Store,
  PanelTop,
  Brush,
  Workflow,
  Wrench,
  Lightbulb,
};

export function WorksSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = serviceCategories.find((item) => item.id === activeId);
  const heights = useMemo(
    () =>
      Object.fromEntries(
        serviceCategories.map((category, index) => [
          category.id,
          activeId === category.id
            ? category.maxHeight
            : Math.round(
                category.maxHeight * (0.35 + ((index % 4) + 1) * 0.08),
              ),
        ]),
      ),
    [activeId],
  );

  return (
    <section
      id="works"
      className="overflow-hidden bg-white py-20 text-gray-900 md:py-32 dark:bg-dev-bg dark:text-dev-text"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle title={works.title} subtitle={works.subtitle} />

        <div className="relative mt-16 flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="city-container relative w-full shrink-0 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm lg:w-[60%] md:p-8 dark:border-dev-elevated dark:bg-dev-bg-surface">
            <div className="grid h-[280px] grid-cols-4 gap-2 sm:h-[350px] md:h-[380px] md:gap-4 lg:grid-cols-8">
              {serviceCategories.map((category) => {
                const Icon = icons[category.icon] ?? Building2;
                const isActive = activeId === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveId(isActive ? null : category.id)}
                    className="building group relative flex h-full w-full flex-col items-center justify-end"
                    aria-pressed={isActive}
                  >
                    <div className="pointer-events-none absolute -top-10 left-1/2 z-10 w-max -translate-x-1/2 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
                      <span className="whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white shadow-lg">
                        {category.name}
                      </span>
                    </div>
                    <div
                      className={
                        isActive
                          ? "building-shape active z-10 mx-auto flex w-full max-w-[60px] scale-105 flex-col items-center justify-center overflow-hidden rounded-t-lg border-l-2 border-r-2 border-t-2 border-dev bg-gray-100 shadow-dev md:max-w-[80px] dark:bg-dev-bg-elevated"
                          : "building-shape mx-auto flex w-full max-w-[60px] flex-col items-center justify-center overflow-hidden rounded-t-lg border border-gray-300 bg-white hover:border-dev/50 hover:bg-gray-50 md:max-w-[80px] dark:border-dev-dark dark:bg-dev-bg-card dark:hover:bg-dev-bg-elevated"
                      }
                      style={{ height: `${heights[category.id]}%` }}
                    >
                      <Icon className="mb-2 hidden h-6 w-6 text-gray-400 transition-colors group-hover:text-dev md:block" />
                      <div className="grid grid-cols-2 gap-1 px-2 pb-2 opacity-40 md:grid-cols-3 md:gap-2 md:pb-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                          <div
                            key={index}
                            className="h-1.5 w-1.5 rounded-sm bg-dev-light/70 md:h-2 md:w-2"
                          />
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="absolute bottom-6 left-6 right-6 h-px bg-gradient-to-r from-transparent via-dev-dark to-transparent opacity-50 md:bottom-8 md:left-8 md:right-8" />
          </div>

          <div className="panel-container w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg lg:w-[40%] dark:border-dev-dark/50 dark:bg-dev-bg-elevated">
            {active ? <ActivePanel category={active} /> : <EmptyPanel />}
          </div>
        </div>
      </div>
    </section>
  );
}

function ActivePanel({ category }: { category: ServiceCategory }) {
  const Icon = icons[category.icon] ?? Building2;

  return (
    <div className="animate-slide-in flex flex-col gap-5 p-6 md:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-dev/10 text-dev dark:bg-dev-bg">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-bold leading-tight text-gray-900 md:text-xl dark:text-white">
          {category.name}
        </h3>
      </div>
      <p className="border-l-4 border-dev pl-4 text-sm italic leading-relaxed text-gray-600 md:text-base dark:text-dev-text/90">
        &quot;{category.phrase}&quot;
      </p>
      <ul className="space-y-2">
        {category.services.map((service) => (
          <li key={service} className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span className="text-sm leading-snug text-gray-600 dark:text-dev-text/80">
              {service}
            </span>
          </li>
        ))}
      </ul>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase text-gray-400">
          Stack
        </p>
        <div className="flex flex-wrap gap-1.5">
          {category.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-gray-200 bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:border-dev-dark/30 dark:bg-dev-bg dark:text-dev-text-bright"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <a
        href={getWhatsAppWorkLink(category.name)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full rounded-xl bg-accent py-3 text-center text-sm font-bold text-white shadow-dev transition-all duration-300 hover:bg-dev-light active:scale-95"
      >
        {works.cta}
      </a>
    </div>
  );
}

function EmptyPanel() {
  return (
    <div className="panel-empty flex flex-col items-center justify-center p-8 text-center text-gray-400">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-50 shadow-sm dark:bg-dev-bg-surface">
        <Touchpad className="h-7 w-7 text-dev-light" />
      </div>
      <p className="mb-1 text-base font-semibold text-gray-600 dark:text-dev-text-bright">
        {works.emptyTitle}
      </p>
      <p className="text-sm leading-snug text-gray-400 dark:text-dev-muted">
        {works.emptyMsg}
      </p>
    </div>
  );
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-black text-gray-900 md:text-5xl dark:text-white">
        {title}
      </h2>
      <p className="mt-4 text-base text-gray-500 md:text-lg dark:text-dev-text-muted">
        {subtitle}
      </p>
    </div>
  );
}
