"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

import Magnet from "@/components/react-bits/Magnet";

import { useFinePointer, usePrefersReducedMotion } from "./hero-motion";

export function MagneticCta({
  children,
  glow = false,
}: {
  children: ReactNode;
  glow?: boolean;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const hasFinePointer = useFinePointer();
  const disabled = prefersReducedMotion || !hasFinePointer;

  return (
    <Magnet
      padding={48}
      magnetStrength={16}
      disabled={disabled}
      wrapperClassName="hero-magnet"
      innerClassName={
        glow ? "hero-magnet-inner hero-magnet-primary" : "hero-magnet-inner"
      }
    >
      {children}
    </Magnet>
  );
}

export function HeroPreviewInteraction({ children }: { children: ReactNode }) {
  return <div className="hero-preview-card">{children}</div>;
}

export function CasinoMetricValue({
  value,
  delay = 0,
}: {
  value: string;
  delay?: number;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [displayValue, setDisplayValue] = useState("");

  const parsedValue = useMemo(() => {
    const match = value.match(/^(\d+)(.*)$/);
    return {
      number: match ? Number(match[1]) : 0,
      suffix: match ? match[2] : "",
    };
  }, [value]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    setDisplayValue("");
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        const randomValue = Math.max(
          1,
          Math.round(Math.random() * Math.max(parsedValue.number + 8, 9)),
        );
        setDisplayValue(`${randomValue}${parsedValue.suffix}`);
      }, 58);
    }, delay);

    const stop = window.setTimeout(() => {
      if (interval) window.clearInterval(interval);
      setDisplayValue(value);
    }, delay + 760);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(stop);
      if (interval) window.clearInterval(interval);
    };
  }, [
    delay,
    parsedValue.number,
    parsedValue.suffix,
    prefersReducedMotion,
    value,
  ]);

  return <span className="metric-value">{displayValue}</span>;
}
