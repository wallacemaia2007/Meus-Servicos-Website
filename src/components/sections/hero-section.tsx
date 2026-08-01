"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Code2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { hero } from "@/data/dev-content";

export function HeroSection() {
  const [avatar, setAvatar] = useState(hero.avatar);

  return (
    <section
      id="hero"
      className="hero-shell relative flex min-h-screen items-center overflow-hidden text-[var(--brand-ink)]"
    >
      <ParticleCanvas />
      <div
        className="pointer-events-none absolute left-1/2 top-28 h-[420px] w-[min(90vw,760px)] -translate-x-1/2 rounded-full bg-[rgba(253,236,236,0.72)] blur-3xl"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 lg:px-6 lg:py-28">
        <div className="grid grid-cols-1 items-center justify-items-center gap-12 lg:grid-cols-2">
          <div className="order-2 flex max-w-2xl flex-col items-center gap-6 text-center lg:order-1">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(151,28,38,0.2)] bg-[var(--brand-red-tint)] px-5 py-2.5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              <span className="text-sm font-bold uppercase text-[var(--brand-red-dark)]">
                {hero.tag}
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl font-black leading-tight text-[var(--brand-ink)] sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {hero.title}
            </motion.h1>

            <motion.p
              className="text-lg font-semibold text-[var(--brand-red)] sm:text-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {hero.subtitle}
            </motion.p>

            <motion.p
              className="max-w-xl text-base leading-relaxed text-[var(--brand-ink-muted)] sm:text-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {hero.description}
            </motion.p>

            <motion.div
              className="flex flex-col justify-center gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-dev px-6 py-3 text-sm font-bold !text-white shadow-dev transition-all duration-200 hover:-translate-y-0.5 hover:bg-dev-dark [&_*]:!text-white"
              >
                {hero.ctaOrcamento}
                <ArrowRight className="h-[18px] w-[18px]" />
              </a>
              <a
                href="#works"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[rgba(151,28,38,0.25)] px-6 py-3 text-sm font-bold text-[var(--brand-red)] transition-all duration-200 hover:-translate-y-0.5 hover:border-dev hover:bg-[var(--brand-red-tint)] hover:text-[var(--brand-red-dark)]"
              >
                {hero.ctaServicos}
              </a>
            </motion.div>
          </div>

          <motion.div
            className="order-1 flex w-full max-w-sm justify-center lg:order-2 lg:max-w-none"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.25 }}
          >
            <div className="hero-preview-wrapper relative w-full max-w-2xl px-4 sm:px-0">
              <div className="hero-preview-card">
                <div className="hero-preview-header">
                  <div className="hero-preview-dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-brand" />
                  </div>
                  <div className="hero-preview-title">{hero.cardDashboard}</div>
                  <div className="hero-preview-avatar">
                    <img
                      src={avatar}
                      alt="Wallace Maia - Foto de perfil"
                      onError={() => setAvatar(hero.fallbackAvatar)}
                    />
                  </div>
                </div>
                <div className="hero-preview-content">
                  {hero.metrics.map((metric) => (
                    <div className="hero-metric" key={metric.label}>
                      <span className="metric-label">{metric.label}</span>
                      <span className="metric-value">{metric.value}</span>
                    </div>
                  ))}
                  <div className="hero-progress">
                    <div className="progress-bar">
                      <span className="progress-fill" />
                    </div>
                    <div className="progress-caption">
                      {hero.progressCaption}
                    </div>
                  </div>
                </div>
              </div>

              <div className="hero-preview-floating card-a hidden sm:block">
                <div className="floating-title">{hero.floatingA}</div>
                <div className="floating-chip">{hero.conversion}</div>
              </div>
              <div className="hero-preview-floating card-b hidden sm:block">
                <div className="floating-title">{hero.floatingB}</div>
                <div className="floating-chip">ROI 3.2x</div>
              </div>

              <div className="hero-badge hero-badge-top hidden sm:flex">
                <Briefcase className="h-[18px] w-[18px] text-dev" />
                <span>Full Stack</span>
              </div>
              <div className="hero-badge hero-badge-bottom hidden sm:flex">
                <Code2 className="h-[18px] w-[18px] text-accent" />
                <span>Open to Work</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !parent || !ctx) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    const particles = Array.from({ length: 360 }, () => ({
      x: 0,
      y: 0,
      size: Math.random() * 1.1 + 0.2,
      speedX: (Math.random() - 0.5) * 0.12,
      speedY: (Math.random() - 0.5) * 0.12,
      opacity: Math.random() * 0.16 + 0.12,
    }));

    const resize = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles.forEach((p) => {
        if (p.x === 0 && p.y === 0) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
        }
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const rect = canvas.getBoundingClientRect();
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        const mx = mouse.current.x - rect.left;
        const my = mouse.current.y - rect.top;
        const dx = mx - p.x;
        const dy = my - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 0 && distance < 140) {
          const force = (140 - distance) / 140;
          p.x -= (dx / distance) * force * 3.5;
          p.y -= (dy / distance) * force * 3.5;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        ctx.fillStyle = `rgba(151, 28, 38, ${p.opacity * 0.32})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      frame = requestAnimationFrame(render);
    };

    const onMouseMove = (event: MouseEvent) => {
      mouse.current = { x: event.clientX, y: event.clientY };
    };

    resize();
    render();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-particle-canvas" />;
}
