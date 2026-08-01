"use client";

import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Check,
  CheckCircle,
  Cloud,
  Code2,
  Headphones,
  LayoutDashboard,
  Megaphone,
  ShoppingCart,
  Store,
  X,
} from "lucide-react";

import { problemServices, problemSolution } from "@/data/dev-content";

const icons: Record<string, LucideIcon> = {
  store: Store,
  support: Headphones,
  cloud: Cloud,
  globe: LayoutDashboard,
  megaphone: Megaphone,
  layout: LayoutDashboard,
  cart: ShoppingCart,
  chart: BarChart3,
  headphones: Headphones,
  code: Code2,
};

export function ProblemSolutionSection() {
  return (
    <section className="comparison-section overflow-hidden bg-[#020617] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase text-blue-400">
            {problemSolution.badge}
          </div>
          <h2 className="text-4xl font-extrabold md:text-6xl">
            {problemSolution.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400 md:text-xl">
            {problemSolution.description}
          </p>
        </div>

        <div className="relative mb-20 grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="hidden lg:flex absolute left-1/2 top-1/2 z-20 h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-500/30 bg-[#020617] shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <span className="text-2xl font-bold text-blue-500">X</span>
          </div>

          <ComparisonCard
            tone="muted"
            label={problemSolution.currentSiteLabel}
            items={problemSolution.currentItems}
          />
          <ComparisonCard
            tone="active"
            label={problemSolution.deliveredLabel}
            items={problemSolution.deliveredItems}
          />
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-[#0f172a]/40 p-8 md:p-10">
          <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          <div className="mb-10 space-y-3 text-center">
            <span className="text-xs font-bold uppercase text-blue-400">
              {problemSolution.servicesLabel}
            </span>
            <p className="text-sm text-gray-400 md:text-base">
              {problemSolution.servicesDesc}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {problemServices.map((service) => {
              const Icon = icons[service.icon] ?? Code2;
              return (
                <div key={service.title} className="space-y-3 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400 transition-colors hover:bg-blue-500 hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase text-gray-500">
                      {service.title}
                    </p>
                    <p className="text-sm font-medium leading-tight text-gray-300">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonCard({
  tone,
  label,
  items,
}: {
  tone: "muted" | "active";
  label: string;
  items: string[];
}) {
  const active = tone === "active";

  return (
    <article
      className={
        active
          ? "rounded-3xl border border-blue-500/30 bg-[#0f172a]/60 p-6 shadow-[0_0_50px_rgba(59,130,246,0.1)] md:p-8"
          : "rounded-3xl border border-white/5 bg-[#0f172a]/40 p-6 md:p-8"
      }
    >
      <div className="mb-8 flex justify-center">
        <span
          className={
            active
              ? "inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-600 px-4 py-1 text-sm font-bold uppercase text-white"
              : "inline-flex items-center gap-2 rounded-full border border-white/10 bg-gray-800 px-4 py-1 text-sm font-bold uppercase text-gray-400"
          }
        >
          {active ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
          {label}
        </span>
      </div>

      <div
        className={
          active
            ? "mb-8 overflow-hidden rounded-xl border border-blue-500/20 bg-[#020617] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            : "mb-8 overflow-hidden rounded-xl border border-white/5 bg-[#1e293b] opacity-60 grayscale"
        }
      >
        <div className="flex gap-1.5 bg-gray-800/50 px-4 py-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
        </div>
        <div className="space-y-4 p-6">
          <div
            className={
              active
                ? "h-4 w-20 rounded bg-blue-400/40"
                : "h-4 w-24 rounded bg-gray-700"
            }
          />
          <div className="space-y-2">
            <div
              className={
                active
                  ? "h-10 w-56 rounded bg-gradient-to-r from-white to-gray-400"
                  : "h-8 w-48 rounded bg-gray-700"
              }
            />
            <div
              className={
                active
                  ? "h-4 w-72 max-w-full rounded bg-gray-500/30"
                  : "h-4 w-64 max-w-full rounded bg-gray-700/50"
              }
            />
          </div>
          <div className="flex gap-4">
            <div
              className={
                active
                  ? "h-32 flex-1 rounded-lg border border-blue-500/10 bg-blue-900/20"
                  : "h-32 flex-1 rounded-lg bg-gray-700/30"
              }
            />
            <div
              className={
                active
                  ? "h-32 w-32 rounded-lg border border-blue-500/20 bg-gradient-to-t from-blue-600/20 to-transparent"
                  : "h-32 w-32 rounded-lg bg-gray-700/30"
              }
            />
          </div>
        </div>
      </div>

      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item}
            className={
              active
                ? "flex items-start gap-3 text-blue-50"
                : "flex items-start gap-3 text-gray-400"
            }
          >
            {active ? (
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
            ) : (
              <X className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" />
            )}
            <span
              className={
                active
                  ? "text-sm font-medium md:text-base"
                  : "text-sm md:text-base"
              }
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
