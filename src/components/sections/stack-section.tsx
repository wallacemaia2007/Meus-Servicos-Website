"use client";

import { useEffect, useMemo, useState } from "react";

import {
  mainStacks,
  skillCategories,
  skills,
  stackCopy,
  terminalSnippets,
} from "@/data/dev-content";
import type { SkillCategoryKey } from "@/types";

const levelLabels = {
  1: "Iniciante",
  2: "Básico",
  3: "Intermediário",
  4: "Avançado",
  5: "Expert",
};

export function StackSection() {
  const [active, setActive] = useState<SkillCategoryKey>("frontend");
  const [lines, setLines] = useState<string[]>([]);
  const activeSkills = useMemo(
    () => skills.filter((skill) => skill.category === active),
    [active],
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setLines((current) => {
        const next =
          terminalSnippets[Math.floor(Math.random() * terminalSnippets.length)];
        return [...current.slice(-27), next];
      });
    }, 420);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="stack"
      className="stack-section relative overflow-hidden py-20 md:py-32"
    >
      <div
        className="stack-bg absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="terminal-bg absolute inset-0 select-none p-8 font-mono text-[10px] leading-tight opacity-60 md:text-xs">
          {lines.map((line, index) => (
            <div
              className="terminal-line mb-1 flex items-center gap-2"
              key={`${line}-${index}`}
            >
              <span className="prompt">➜</span>
              <span>{line}</span>
            </div>
          ))}
        </div>
        <div className="stack-glass-overlay absolute inset-0 backdrop-blur-[4px]" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(var(--dev-accent)_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-normal text-white md:text-5xl">
            {stackCopy.title}
          </h2>
          <p className="mt-4 text-base text-white/72 md:text-lg">
            {stackCopy.subtitle}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <StackHeroCard
            tone="primary"
            label={stackCopy.frontendLabel}
            title="Frontend"
            description={stackCopy.frontendDesc}
            traits={stackCopy.traits.frontend}
            techs={mainStacks.frontend}
            onClick={() => setActive("frontend")}
          />
          <StackHeroCard
            tone="muted"
            label={stackCopy.backendLabel}
            title="Backend"
            description={stackCopy.backendDesc}
            traits={stackCopy.traits.backend}
            techs={mainStacks.backend}
            onClick={() => setActive("backend")}
          />
        </div>

        <div className="mt-20">
          <p className="mb-6 text-center text-xs font-bold uppercase text-white/68">
            {stackCopy.allTechs}
          </p>
          <div className="flex justify-center">
            <div className="scrollbar-hide inline-flex max-w-full gap-2 overflow-x-auto px-1 pb-2">
              {skillCategories.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActive(tab.key)}
                  className={
                    active === tab.key
                      ? "whitespace-nowrap rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[var(--brand-red-dark)] shadow-[0_14px_36px_rgba(0,0,0,0.22)] transition-all"
                      : "whitespace-nowrap rounded-xl border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white/80 transition-all hover:bg-white/18 hover:text-white"
                  }
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {activeSkills.map((skill) => (
              <div
                key={skill.id}
                className="skill-card-item rounded-2xl border border-white/15 bg-white p-4 shadow-[0_18px_45px_-30px_rgba(0,0,0,0.55)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-red-tint)] p-2">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-body truncate text-sm font-bold text-[var(--brand-ink)]">
                      {skill.name}
                    </h3>
                  </div>
                  <span className="shrink-0 rounded-md bg-[var(--brand-red-tint)] px-2 py-0.5 text-[10px] font-bold text-[var(--brand-red)]">
                    {levelLabels[skill.level]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StackHeroCard({
  tone,
  label,
  title,
  description,
  traits,
  techs,
  onClick,
}: {
  tone: "primary" | "muted";
  label: string;
  title: string;
  description: string;
  traits: string[];
  techs: { id: string; name: string; icon: string }[];
  onClick: () => void;
}) {
  const color = tone === "primary" ? "var(--brand-red)" : "var(--brand-ink)";
  const light =
    tone === "primary" ? "var(--brand-red-light)" : "var(--brand-ink-muted)";
  const chip =
    tone === "primary" ? "var(--brand-red)" : "var(--brand-ink-muted)";
  const soft =
    tone === "primary" ? "var(--brand-red-tint)" : "var(--dev-bg-elevated)";

  return (
    <button
      type="button"
      onClick={onClick}
      className="stack-hero-card group relative cursor-pointer overflow-hidden rounded-3xl border border-white/15 bg-white text-left backdrop-blur-md transition-all duration-500 hover:shadow-2xl"
      style={{ boxShadow: `0 0 0 transparent` }}
    >
      <div
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-16 -translate-y-16 rounded-full blur-3xl transition-all duration-700"
        style={{ background: soft }}
      />
      <div className="relative z-10 p-5 sm:p-8 md:p-10">
        <span
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase"
          style={{
            color: light,
            background: soft,
            borderColor: color,
          }}
        >
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full"
            style={{ background: light }}
          />
          {label}
        </span>
        <h3 className="font-heading mb-3 text-2xl font-normal leading-tight text-[var(--brand-ink)] sm:text-3xl">
          Stack
          <br />
          <span style={{ color: light }}>{title}</span>
        </h3>
        <p className="mb-8 max-w-xs text-sm leading-relaxed text-[var(--brand-ink-muted)]">
          {description}
        </p>
        <div className="mb-8 flex flex-wrap gap-2">
          {traits.map((trait) => (
            <span
              key={trait}
              className="rounded-full border px-3 py-1 text-[11px] font-semibold"
              style={{
                color: chip,
                background: soft,
                borderColor: color,
              }}
            >
              {trait}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {techs.map((tech) => (
            <div
              key={tech.id}
              className="flex shrink-0 items-center gap-2 rounded-xl border border-[var(--brand-border)] bg-[var(--brand-white)] px-3 py-2 transition-all duration-200 hover:bg-[var(--brand-red-tint)]"
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="h-5 w-5 object-contain"
              />
              <span className="text-xs font-semibold text-[var(--brand-ink-muted)]">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </button>
  );
}
