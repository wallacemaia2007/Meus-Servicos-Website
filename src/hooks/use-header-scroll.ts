"use client";

import { useEffect, useState } from "react";

export function useHeaderScroll() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;
    let rafId: number | null = null;
    const minDistance = 200;

    const updateScrollState = () => {
      rafId = null;

      const scrollTop = window.pageYOffset;
      const isAtTop = scrollTop < 10;
      const nextIsScrolled = scrollTop > 24;
      const nextIsHidden =
        isAtTop || !(scrollTop > lastScrollTop && scrollTop > minDistance)
          ? false
          : true;

      setIsScrolled((current) =>
        current === nextIsScrolled ? current : nextIsScrolled,
      );
      setIsHidden((current) => (current === nextIsHidden ? current : nextIsHidden));

      lastScrollTop = scrollTop;
    };

    const onScroll = () => {
      if (rafId !== null) return;

      rafId = window.requestAnimationFrame(updateScrollState);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);

      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return { isScrolled, isHidden };
}
