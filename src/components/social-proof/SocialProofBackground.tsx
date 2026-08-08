"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import Threads, { type ThreadsHandle } from "@/components/react-bits/Threads";

const DESKTOP_QUERY = "(min-width: 768px)";

export interface SocialProofBackgroundHandle {
  setProgress: (progress: number) => void;
}

export const SocialProofBackground = forwardRef<
  SocialProofBackgroundHandle,
  { prefersReducedMotion: boolean }
>(function SocialProofBackground(
  { prefersReducedMotion }: { prefersReducedMotion: boolean },
  ref,
) {
  const threadsRef = useRef<ThreadsHandle>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      setProgress: (progress) => threadsRef.current?.setProgress(progress),
    }),
    [],
  );

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const apply = () => setIsDesktop(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  const showThreads = isDesktop && !prefersReducedMotion;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {showThreads ? (
        <div className="absolute inset-0 opacity-60">
          <Threads
            ref={threadsRef}
            progress={0}
            color={[1, 1, 1]}
            amplitude={1}
            distance={0}
            enableMouseInteraction={false}
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.09),transparent_40%),radial-gradient(circle_at_75%_80%,rgba(255,255,255,0.06),transparent_45%)]" />
      )}
    </div>
  );
});
