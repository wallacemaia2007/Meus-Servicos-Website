"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Cloud,
  Code2,
  Headphones,
  LayoutDashboard,
  Megaphone,
  ShoppingCart,
  Store,
} from "lucide-react";

import { BeforeAfterSlider } from "@/components/sections/before-after-slider";
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

        <motion.div
          className="mb-20"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 42 }}
          whileInView={finalState}
          viewport={viewport}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        >
          <BeforeAfterSlider
            beforeLabel={problemSolution.currentSiteLabel}
            afterLabel={problemSolution.deliveredLabel}
            beforeItems={problemSolution.currentItems}
            afterItems={problemSolution.deliveredItems}
          />
        </motion.div>

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
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(155,27,31,0.2)] bg-[var(--brand-red-tint)] text-[var(--brand-red)] transition-colors hover:bg-[var(--brand-red)] hover:!text-white">
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
