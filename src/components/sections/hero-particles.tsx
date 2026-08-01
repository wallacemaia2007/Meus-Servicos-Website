"use client";

import { useEffect, useRef, useState } from "react";

import DotGrid from "@/components/react-bits/DotGrid";

import { useFinePointer, usePrefersReducedMotion } from "./hero-motion";

export function HeroParticles() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const hasFinePointer = useFinePointer();

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion || !hasFinePointer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "180px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasFinePointer, prefersReducedMotion]);

  return (
    <div ref={ref} className="hero-particle-canvas" aria-hidden="true">
      {!prefersReducedMotion && hasFinePointer && isVisible ? (
        <DotGrid
          dotSize={2.4}
          gap={28}
          proximity={210}
          baseColor="rgba(151, 28, 38, 0.13)"
          activeColor="rgba(194, 58, 68, 0.5)"
        />
      ) : (
        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_20%,rgba(151,28,38,0.08),transparent_34%)]" />
      )}
    </div>
  );
}
