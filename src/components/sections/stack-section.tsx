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
          <h2 className="text-3xl font-black text-white md:text-5xl">
            {stackCopy.title}
          </h2>
          <p className="mt-4 text-base text-gray-400 md:text-lg">
            {stackCopy.subtitle}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <StackHeroCard
            tone="blue"
            label={stackCopy.frontendLabel}
            title="Frontend"
            description={stackCopy.frontendDesc}
            traits={stackCopy.traits.frontend}
            techs={mainStacks.frontend}
            onClick={() => setActive("frontend")}
          />
          <StackHeroCard
            tone="green"
            label={stackCopy.backendLabel}
            title="Backend"
            description={stackCopy.backendDesc}
            traits={stackCopy.traits.backend}
            techs={mainStacks.backend}
            onClick={() => setActive("backend")}
          />
        </div>

        <div className="mt-20">
          <p className="mb-6 text-center text-xs font-bold uppercase text-gray-400">
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
                      ? "whitespace-nowrap rounded-xl bg-[#3b82f6] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all"
                      : "whitespace-nowrap rounded-xl bg-white/5 px-5 py-2.5 text-sm font-semibold text-gray-400 transition-all hover:bg-white/10"
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
                className="skill-card-item rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#3b82f6]/30"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 p-2">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-white">
                      {skill.name}
                    </h3>
                  </div>
                  <span className="shrink-0 rounded-md bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold text-blue-400">
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
  tone: "blue" | "green";
  label: string;
  title: string;
  description: string;
  traits: string[];
  techs: { id: string; name: string; icon: string }[];
  onClick: () => void;
}) {
  const color = tone === "blue" ? "#3b82f6" : "#22c55e";
  const light = tone === "blue" ? "#60a5fa" : "#4ade80";
  const chip = tone === "blue" ? "#93c5fd" : "#86efac";

  return (
    <button
      type="button"
      onClick={onClick}
      className="stack-hero-card group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left backdrop-blur-md transition-all duration-500 hover:shadow-2xl"
      style={{ boxShadow: `0 0 0 transparent` }}
    >
      <div
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-16 -translate-y-16 rounded-full blur-3xl transition-all duration-700"
        style={{ background: `${color}1a` }}
      />
      <div className="relative z-10 p-5 sm:p-8 md:p-10">
        <span
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase"
          style={{
            color: light,
            background: `${color}33`,
            borderColor: `${color}55`,
          }}
        >
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full"
            style={{ background: light }}
          />
          {label}
        </span>
        <h3 className="mb-3 text-2xl font-black leading-tight text-white sm:text-3xl">
          Stack
          <br />
          <span style={{ color: light }}>{title}</span>
        </h3>
        <p className="mb-8 max-w-xs text-sm leading-relaxed text-gray-400">
          {description}
        </p>
        <div className="mb-8 flex flex-wrap gap-2">
          {traits.map((trait) => (
            <span
              key={trait}
              className="rounded-full border px-3 py-1 text-[11px] font-semibold"
              style={{
                color: chip,
                background: `${color}1a`,
                borderColor: `${color}33`,
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
              className="flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition-all duration-200 hover:bg-white/10"
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="h-5 w-5 object-contain"
              />
              <span className="text-xs font-semibold text-gray-300">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </button>
  );
}
