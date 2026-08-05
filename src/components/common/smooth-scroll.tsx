"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export const SMOOTH_SCROLL_LERP = 0.1;

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: SMOOTH_SCROLL_LERP,
        autoRaf: true,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
