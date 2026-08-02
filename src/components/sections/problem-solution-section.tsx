"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  const prefersReducedMotion = useReducedMotion();
  const viewport = { once: true, amount: 0.2 };
  const finalState = { opacity: 1, x: 0, y: 0, scale: 1 };

  return (
    <section className="comparison-section overflow-hidden bg-[linear-gradient(135deg,var(--brand-red-dark),var(--brand-red))] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 space-y-4 text-center">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase text-white backdrop-blur-sm"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={finalState}
            viewport={viewport}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45 }}
          >
            {problemSolution.badge}
          </motion.div>
          <motion.h2
            className="font-heading text-4xl font-normal md:text-6xl"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={finalState}
            viewport={viewport}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              delay: prefersReducedMotion ? 0 : 0.1,
            }}
          >
            {problemSolution.title}
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-white/78 md:text-xl"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={finalState}
            viewport={viewport}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              delay: prefersReducedMotion ? 0 : 0.2,
            }}
          >
            {problemSolution.description}
          </motion.p>
        </div>

        <div className="relative mb-20 grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <motion.div
              className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.24)]"
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewport}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      damping: 12,
                      stiffness: 200,
                      delay: 0.45,
                    }
              }
            >
              <span className="text-2xl font-bold text-[var(--brand-red-dark)]">
                X
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -80 }}
            whileInView={finalState}
            viewport={viewport}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          >
            <ComparisonCard
              tone="muted"
              label={problemSolution.currentSiteLabel}
              items={problemSolution.currentItems}
            />
          </motion.div>
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 80 }}
            whileInView={finalState}
            viewport={viewport}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.15,
            }}
          >
            <ComparisonCard
              tone="active"
              label={problemSolution.deliveredLabel}
              items={problemSolution.deliveredItems}
            />
          </motion.div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/95 p-8 text-[var(--brand-ink)] shadow-[0_28px_70px_rgba(0,0,0,0.22)] md:p-10">
          <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--brand-red)] to-transparent" />
          <div className="mb-10 space-y-3 text-center">
            <span className="text-xs font-bold uppercase text-[var(--brand-red)]">
              {problemSolution.servicesLabel}
            </span>
            <p className="text-sm text-[var(--brand-ink-muted)] md:text-base">
              {problemSolution.servicesDesc}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {problemServices.map((service, index) => {
              const Icon = icons[service.icon] ?? Code2;
              return (
                <motion.div
                  key={service.title}
                  className="space-y-3 text-center"
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }
                  }
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewport}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.35,
                    delay: prefersReducedMotion ? 0 : index * 0.05,
                  }}
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(151,28,38,0.2)] bg-[var(--brand-red-tint)] text-[var(--brand-red)] transition-colors hover:bg-[var(--brand-red)] hover:!text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase text-[var(--brand-ink-muted)]">
                      {service.title}
                    </p>
                    <p className="text-sm font-medium leading-tight text-[var(--brand-ink)]">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
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
          ? "rounded-3xl border border-white/20 bg-white p-6 text-[var(--brand-ink)] shadow-[0_24px_70px_rgba(0,0,0,0.24)] md:p-8"
          : "rounded-3xl border border-white/15 bg-[rgba(255,255,255,0.9)] p-6 text-[var(--brand-ink)] shadow-[0_18px_55px_rgba(0,0,0,0.18)] md:p-8"
      }
    >
      <div className="mb-8 flex justify-center">
        <span
          className={
            active
              ? "inline-flex items-center gap-2 rounded-full border border-[rgba(151,28,38,0.3)] bg-[var(--brand-red)] px-4 py-1 text-sm font-bold uppercase !text-white [&_*]:!text-white"
              : "inline-flex items-center gap-2 rounded-full border border-[var(--section-border)] bg-[var(--section-tint)] px-4 py-1 text-sm font-bold uppercase text-[var(--brand-ink-muted)]"
          }
        >
          {active ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
          {label}
        </span>
      </div>

      <div
        className={
          active
            ? "mb-8 overflow-hidden rounded-xl border border-[rgba(151,28,38,0.2)] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
            : "mb-8 overflow-hidden rounded-xl border border-[var(--section-border)] bg-[var(--dev-bg-elevated)] opacity-70 grayscale"
        }
      >
        <div className="flex gap-1.5 bg-[var(--dev-bg-elevated)] px-4 py-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[rgba(151,28,38,0.5)]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[rgba(91,91,91,0.35)]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[rgba(194,58,68,0.5)]" />
        </div>
        <div className="space-y-4 p-6">
          <div
            className={
              active
                ? "h-4 w-20 rounded bg-[rgba(151,28,38,0.4)]"
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
                  ? "h-32 flex-1 rounded-lg border border-[rgba(151,28,38,0.1)] bg-[rgba(151,28,38,0.08)]"
                  : "h-32 flex-1 rounded-lg bg-gray-700/30"
              }
            />
            <div
              className={
                active
                  ? "h-32 w-32 rounded-lg border border-[rgba(151,28,38,0.2)] bg-gradient-to-t from-[rgba(151,28,38,0.18)] to-transparent"
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
                ? "flex items-start gap-3 text-[var(--brand-ink)]"
                : "flex items-start gap-3 text-[var(--brand-ink-muted)]"
            }
          >
            {active ? (
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-red)]" />
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
