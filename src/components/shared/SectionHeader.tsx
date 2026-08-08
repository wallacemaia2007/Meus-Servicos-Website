"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  className?: string;
  tone?: "light" | "dark";
  viewport?: { once?: boolean; amount?: number };
}

const DEFAULT_VIEWPORT = { once: true, amount: 0.2 };

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className,
  tone = "light",
  viewport = DEFAULT_VIEWPORT,
}: SectionHeaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;
  const isDark = tone === "dark";

  const reveal = {
    initial: shouldAnimate ? { opacity: 0, y: 22 } : false,
    whileInView: shouldAnimate ? { opacity: 1, y: 0 } : undefined,
    viewport: shouldAnimate ? viewport : undefined,
  };

  return (
    <header
      className={cn(
        "flex flex-col items-center gap-3 text-center mb-8",
        className,
      )}
    >
      {eyebrow ? (
        <motion.span
          className="header-eyebrow"
          style={
            isDark
              ? ({ "--active-accent": "var(--brand-white)" } as CSSProperties)
              : undefined
          }
          {...reveal}
          transition={shouldAnimate ? { duration: 0.45 } : undefined}
        >
          {eyebrow}
        </motion.span>
      ) : null}
      <motion.h2
        className="header-title"
        style={isDark ? { color: "var(--brand-white)" } : undefined}
        {...reveal}
        transition={shouldAnimate ? { duration: 0.5, delay: 0.06 } : undefined}
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          className="header-subtitle"
          style={isDark ? { color: "rgba(255,255,255,0.78)" } : undefined}
          {...reveal}
          transition={shouldAnimate ? { duration: 0.5, delay: 0.12 } : undefined}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </header>
  );
}
