"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, ChevronsLeftRight, X } from "lucide-react";
import {
  type KeyboardEvent,
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type BeforeAfterSliderProps = {
  beforeLabel: string;
  afterLabel: string;
  beforeItems: string[];
  afterItems: string[];
};

const clamp = (value: number) => Math.min(100, Math.max(0, value));

export function BeforeAfterSlider({
  beforeLabel,
  afterLabel,
  beforeItems,
  afterItems,
}: BeforeAfterSliderProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const positionRef = useRef(50);
  const draggingRef = useRef(false);
  const activePointerIdRef = useRef<number | null>(null);
  const [position, setPosition] = useState(50);
  const [hint, setHint] = useState(false);

  const commitPosition = useCallback((next: number) => {
    const value = clamp(next);
    positionRef.current = value;

    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = window.requestAnimationFrame(() => {
      containerRef.current?.style.setProperty("--split", `${value}%`);
      rafRef.current = null;
    });
  }, []);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const bounds = containerRef.current?.getBoundingClientRect();
      if (!bounds) return;

      const next = ((clientX - bounds.left) / bounds.width) * 100;
      commitPosition(next);
    },
    [commitPosition],
  );

  const syncFinalPosition = useCallback(() => {
    draggingRef.current = false;
    activePointerIdRef.current = null;
    setPosition(Math.round(positionRef.current));
  }, []);

  const finishDrag = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      syncFinalPosition();
    },
    [syncFinalPosition],
  );

  useEffect(() => {
    const node = containerRef.current;
    if (!node || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setHint(true);
        observer.disconnect();
        window.setTimeout(() => setHint(false), 1500);
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleWindowMove = (event: globalThis.PointerEvent) => {
      if (
        !draggingRef.current ||
        activePointerIdRef.current !== event.pointerId
      ) {
        return;
      }

      event.preventDefault();
      updateFromClientX(event.clientX);
    };

    const handleWindowEnd = (event: globalThis.PointerEvent) => {
      if (activePointerIdRef.current !== event.pointerId) return;
      syncFinalPosition();
    };

    window.addEventListener("pointermove", handleWindowMove, {
      passive: false,
    });
    window.addEventListener("pointerup", handleWindowEnd);
    window.addEventListener("pointercancel", handleWindowEnd);

    return () => {
      window.removeEventListener("pointermove", handleWindowMove);
      window.removeEventListener("pointerup", handleWindowEnd);
      window.removeEventListener("pointercancel", handleWindowEnd);
    };
  }, [syncFinalPosition, updateFromClientX]);

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    draggingRef.current = true;
    activePointerIdRef.current = event.pointerId;
    setHint(false);
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!draggingRef.current) return;
    event.preventDefault();
    updateFromClientX(event.clientX);
  };

  const handleTrackPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    setHint(false);
    updateFromClientX(event.clientX);
    setPosition(Math.round(positionRef.current));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();

    const direction = event.key === "ArrowRight" ? 5 : -5;
    const next = clamp(positionRef.current + direction);
    commitPosition(next);
    setPosition(Math.round(next));
  };

  return (
    <div className="space-y-8">
      <div
        ref={containerRef}
        data-before-after-slider
        className="relative isolate aspect-[4/3] min-h-[330px] w-full cursor-ew-resize overflow-hidden rounded-[2rem] border border-white/18 bg-white shadow-[0_30px_90px_rgba(0,0,0,0.24)] [--split:50%] max-[400px]:min-h-[290px] sm:min-h-[430px] lg:min-h-[540px]"
        onPointerDown={handleTrackPointerDown}
      >
        <AfterLayer label={afterLabel} />
        <div
          className="absolute inset-0 z-10 overflow-hidden"
          style={{ clipPath: "inset(0 calc(100% - var(--split)) 0 0)" }}
          aria-hidden="true"
        >
          <BeforeLayer label={beforeLabel} />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 z-20 w-px bg-white/95 shadow-[0_0_28px_rgba(155,27,31,0.46)]"
          style={{ left: "var(--split)" }}
          aria-hidden="true"
        />

        <motion.button
          type="button"
          className="absolute top-1/2 z-30 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 touch-none items-center justify-center rounded-full border border-[rgba(155,27,31,0.18)] bg-white text-[var(--brand-red)] shadow-[0_18px_45px_rgba(0,0,0,0.28)] outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-[var(--brand-red-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          style={{ left: "var(--split)" }}
          role="slider"
          aria-label="Comparar antes e depois"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={position}
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onKeyDown={handleKeyDown}
          animate={
            hint && !prefersReducedMotion ? { x: [0, -16, 16, -10, 10, 0] } : {}
          }
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <span className="absolute inset-[-8px] rounded-full" />
          <ChevronsLeftRight className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ResultList tone="before" items={beforeItems} />
        <ResultList tone="after" items={afterItems} />
      </div>
    </div>
  );
}

function BeforeLayer({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 bg-[#e8e6e2] p-4 text-[#57534e] max-[400px]:p-3 sm:p-6 lg:p-8">
      <div className="flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-[#c9c4bc] bg-[#f4f2ee] shadow-inner">
        <div className="flex items-center gap-2 border-b border-[#d5d0c8] bg-[#ddd8cf] px-3 py-2 sm:px-4">
          <span className="h-2 w-2 rounded-full bg-[#9ca3af]" />
          <span className="h-2 w-2 rounded-full bg-[#a8a29e]" />
          <span className="h-2 w-2 rounded-full bg-[#78716c]" />
          <span className="ml-auto max-w-[54%] truncate text-[10px] font-bold uppercase tracking-[0.08em] text-[#78716c] sm:text-xs">
            antigo.com
          </span>
        </div>
        <div className="relative flex flex-1 flex-col gap-4 p-4 max-[400px]:gap-3 max-[400px]:p-3 sm:gap-5 sm:p-6 lg:p-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#b8b0a4] bg-[#ece8e1] px-3 py-1 text-[10px] font-bold uppercase text-[#6b635a] sm:text-xs">
            <X className="h-3.5 w-3.5" />
            {label}
          </span>
          <div className="space-y-2">
            <div className="h-4 w-20 rounded-sm bg-[#b8b0a4]" />
            <h3 className="font-sans text-2xl font-bold leading-none text-[#4b4741] max-[400px]:text-xl sm:text-4xl lg:text-5xl">
              Empresa
              <br />
              na internet
            </h3>
            <p className="max-w-md text-xs leading-relaxed text-[#756e65] sm:text-sm lg:text-base">
              Textos longos, pouca hierarquia e uma experiência que parece não
              acompanhar o valor do negócio.
            </p>
          </div>
          <div className="grid flex-1 grid-cols-[1fr_0.7fr] gap-3 max-[400px]:gap-2 sm:gap-4">
            <div className="space-y-3 rounded-xl border border-[#d2ccc3] bg-[#ebe7df] p-3 max-[400px]:p-2 sm:p-4">
              <div className="h-3 w-3/4 rounded bg-[#aaa39a]" />
              <div className="h-3 w-1/2 rounded bg-[#c2bbb1]" />
              <div className="mt-4 grid gap-2">
                <span className="h-12 rounded bg-[#d8d3ca]" />
                <span className="h-12 rounded bg-[#d8d3ca]" />
              </div>
            </div>
            <div className="space-y-3 rounded-xl border border-[#d2ccc3] bg-[#e2ddd5] p-3 max-[400px]:p-2 sm:p-4">
              <div className="h-20 rounded bg-[#cbc5ba]" />
              <div className="h-3 rounded bg-[#aaa39a]" />
              <div className="h-3 w-2/3 rounded bg-[#bdb6ac]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AfterLayer({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 bg-white p-4 text-[var(--brand-ink)] max-[400px]:p-3 sm:p-6 lg:p-8">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-[rgba(155,27,31,0.22)] bg-white shadow-[0_26px_70px_rgba(155,27,31,0.16)]">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(rgba(155,27,31,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(155,27,31,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative flex items-center gap-2 border-b border-[rgba(155,27,31,0.14)] bg-[var(--brand-red-tint)] px-3 py-2 sm:px-4">
          <span className="h-2 w-2 rounded-full bg-[var(--brand-red-dark)]" />
          <span className="h-2 w-2 rounded-full bg-[var(--brand-red)]" />
          <span className="h-2 w-2 rounded-full bg-[var(--brand-red-light)]" />
          <span className="ml-auto max-w-[54%] truncate text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--brand-red)] sm:text-xs">
            servicos.maiawall.com
          </span>
        </div>
        <div className="relative flex flex-1 flex-col gap-4 p-4 max-[400px]:gap-3 max-[400px]:p-3 sm:gap-5 sm:p-6 lg:p-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(155,27,31,0.26)] bg-[var(--brand-red)] px-3 py-1 text-[10px] font-bold uppercase text-white sm:text-xs">
            <CheckCircle className="h-3.5 w-3.5" />
            {label}
          </span>
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-red)] sm:text-xs">
              Autoridade + conversão
            </p>
            <h3 className="font-heading text-3xl font-normal leading-none text-[var(--brand-ink)] max-[400px]:text-2xl sm:text-5xl lg:text-6xl">
              Site que
              <br />
              vende a marca
            </h3>
            <p className="max-w-md text-xs leading-relaxed text-[var(--brand-ink-muted)] sm:text-sm lg:text-base">
              Identidade clara, jornada orientada a ação e tecnologia pronta
              para medir, vender e evoluir.
            </p>
          </div>
          <div className="grid flex-1 grid-cols-[1fr_0.7fr] gap-3 max-[400px]:gap-2 sm:gap-4">
            <div className="space-y-3 rounded-xl border border-[rgba(155,27,31,0.14)] bg-white/86 p-3 shadow-sm max-[400px]:p-2 sm:p-4">
              <div className="h-2.5 w-20 rounded-full bg-[var(--brand-red)]" />
              <div className="h-2.5 w-32 rounded-full bg-[rgba(155,27,31,0.18)]" />
              <div className="grid grid-cols-2 gap-2 pt-3">
                <span className="h-14 rounded-lg bg-[var(--brand-red-tint)]" />
                <span className="h-14 rounded-lg bg-[rgba(155,27,31,0.12)]" />
              </div>
            </div>
            <div className="rounded-xl border border-[rgba(155,27,31,0.18)] bg-gradient-to-b from-[var(--brand-red)] to-[var(--brand-red-dark)] p-3 text-white shadow-[0_18px_44px_rgba(155,27,31,0.28)] max-[400px]:p-2 sm:p-4">
              <div className="text-[10px] font-bold uppercase text-white/70">
                conversão
              </div>
              <div className="mt-2 font-heading text-3xl leading-none max-[400px]:text-2xl sm:text-4xl">
                +36%
              </div>
              <div className="mt-5 h-16 rounded-lg bg-white/14" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultList({
  tone,
  items,
}: {
  tone: "before" | "after";
  items: string[];
}) {
  const active = tone === "after";

  return (
    <ul className="grid gap-3 rounded-3xl border border-white/14 bg-white/94 p-4 text-[var(--brand-ink)] shadow-[0_18px_50px_rgba(0,0,0,0.16)] sm:p-5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          {active ? (
            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-red)]" />
          ) : (
            <X className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-ink-muted)]" />
          )}
          <span
            className={
              active
                ? "text-sm font-semibold leading-relaxed text-[var(--brand-ink)] sm:text-base"
                : "text-sm leading-relaxed text-[var(--brand-ink-muted)] sm:text-base"
            }
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
