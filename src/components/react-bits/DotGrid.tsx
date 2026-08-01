"use client";

import { useCallback, useEffect, useRef } from "react";

export interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface Dot {
  x: number;
  y: number;
}

function readCssColor(value: string) {
  if (typeof window === "undefined") return value;
  const probe = document.createElement("span");
  probe.style.color = value;
  document.body.appendChild(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();
  return color || value;
}

const DotGrid = ({
  dotSize = 2,
  gap = 28,
  baseColor = "rgba(151, 28, 38, 0.08)",
  activeColor = "rgba(194, 58, 68, 0.22)",
  proximity = 130,
  className = "",
  style,
}: DotGridProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({ x: -9999, y: -9999 });

  const buildGrid = useCallback(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!wrapper || !canvas || !ctx) return;

    const { width, height } = wrapper.getBoundingClientRect();
    const dpr = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const step = dotSize + gap;
    const dots: Dot[] = [];
    for (let y = dotSize; y < height + step; y += step) {
      for (let x = dotSize; x < width + step; x += step) {
        dots.push({ x, y });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    buildGrid();

    const wrapper = wrapperRef.current;
    let resizeObserver: ResizeObserver | null = null;
    if (wrapper && "ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(buildGrid);
      resizeObserver.observe(wrapper);
    } else {
      window.addEventListener("resize", buildGrid);
    }

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", buildGrid);
    };
  }, [buildGrid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;

    const base = readCssColor(baseColor);
    const active = readCssColor(activeColor);
    let frame = 0;

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      const pointer = pointerRef.current;
      for (const dot of dotsRef.current) {
        const distance = Math.hypot(pointer.x - dot.x, pointer.y - dot.y);
        const influence = Math.max(0, 1 - distance / proximity);
        ctx.fillStyle = influence > 0 ? active : base;
        ctx.globalAlpha = influence > 0 ? 0.55 + influence * 0.45 : 1;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotSize * (1 + influence * 1.15), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const onPointerLeave = () => {
      pointerRef.current = { x: -9999, y: -9999 };
    };

    draw();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [activeColor, baseColor, dotSize, proximity]);

  return (
    <div
      ref={wrapperRef}
      className={`relative h-full w-full ${className}`}
      style={style}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  );
};

export default DotGrid;
