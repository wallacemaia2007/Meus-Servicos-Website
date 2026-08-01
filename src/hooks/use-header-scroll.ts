"use client";

import { useEffect, useState } from "react";

export function useHeaderScroll() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;
    const minDistance = 200;

    const onScroll = () => {
      const scrollTop = window.pageYOffset;
      const isAtTop = scrollTop < 10;

      setIsScrolled(scrollTop > 24);

      if (scrollTop > lastScrollTop && scrollTop > minDistance) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      if (isAtTop) {
        setIsHidden(false);
      }

      lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { isScrolled, isHidden };
}
