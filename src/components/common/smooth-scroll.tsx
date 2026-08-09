"use client";

import type { ScrollToOptions } from "lenis";
import { ReactLenis, useLenis } from "lenis/react";
import type { ReactNode } from "react";
import { useEffect } from "react";

export const SMOOTH_SCROLL_LERP = 0.08;
export const ANCHOR_SCROLL_PIXELS_PER_SECOND = 2600;
export const ANCHOR_SCROLL_MIN_DURATION = 0.5;
export const ANCHOR_SCROLL_MAX_DURATION = 1.35;
export const ANCHOR_SCROLL_TALL_SECTION_RATIO = 0.9;

const ANCHOR_SCROLL_EASING = (progress: number) =>
  progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

function clampDuration(duration: number) {
  return Math.min(
    ANCHOR_SCROLL_MAX_DURATION,
    Math.max(ANCHOR_SCROLL_MIN_DURATION, duration),
  );
}

function clampScrollTop(scrollTop: number) {
  const maxScrollTop =
    document.documentElement.scrollHeight - window.innerHeight;

  return Math.min(Math.max(scrollTop, 0), Math.max(maxScrollTop, 0));
}

export function getAnchorScrollTarget(target: string | number) {
  if (typeof target === "number") {
    return clampScrollTop(target);
  }

  if (target === "#" || target === "#top" || target === "top") {
    return 0;
  }

  const element = target.startsWith("#")
    ? document.getElementById(target.slice(1))
    : document.querySelector<HTMLElement>(target);

  if (!element) {
    return window.scrollY;
  }

  const elementTop = element.getBoundingClientRect().top + window.scrollY;

  if (element.offsetHeight >= window.innerHeight * ANCHOR_SCROLL_TALL_SECTION_RATIO) {
    return clampScrollTop(elementTop);
  }

  const centeredTop =
    elementTop - Math.max((window.innerHeight - element.offsetHeight) / 2, 0);

  return clampScrollTop(centeredTop);
}

export function getAnchorScrollOptions(target: string | number): ScrollToOptions {
  const distance = Math.abs(getAnchorScrollTarget(target) - window.scrollY);

  return {
    duration: clampDuration(distance / ANCHOR_SCROLL_PIXELS_PER_SECOND),
    easing: ANCHOR_SCROLL_EASING,
    programmatic: false,
  };
}

function AnchorScrollController() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) {
      return;
    }

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );

      if (!link || link.target || link.hasAttribute("download")) {
        return;
      }

      const hash = link.hash;

      if (!hash) {
        return;
      }

      event.preventDefault();
      lenis.scrollTo(getAnchorScrollTarget(hash), getAnchorScrollOptions(hash));
      window.history.pushState(null, "", hash);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: SMOOTH_SCROLL_LERP,
        autoRaf: true,
        anchors: false,
      }}
    >
      <AnchorScrollController />
      {children}
    </ReactLenis>
  );
}
