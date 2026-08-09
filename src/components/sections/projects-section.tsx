"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Code2, ExternalLink } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { projectCopy, projects } from "@/data/dev-content";
import { getWhatsAppProjectLink } from "@/lib/whatsapp";

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isSectionInView = useInView(sectionRef, { amount: 0.35 });
  const active = projects[activeIndex];
  const slides = useMemo(
    () => [
      ...(active.video ? [{ type: "video" as const, src: active.video.src }] : []),
      ...active.pages.map((src) => ({ type: "image" as const, src })),
    ],
    [active],
  );
  const total = slides.length;
  const currentSlide = slides[slideIndex] ?? slides[0];
  const viewport = { once: true, amount: 0.2 };

  useEffect(() => {
    const video = videoRef.current;

    if (!video || currentSlide?.type !== "video") {
      return;
    }

    if (isSectionInView) {
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
  }, [currentSlide?.type, currentSlide?.src, isSectionInView]);

  function goToProject(index: number) {
    setActiveIndex(index);
    setSlideIndex(0);
  }

  function goToSlide(direction: "previous" | "next") {
    setSlideIndex((current) => {
      if (direction === "previous") {
        return current === 0 ? total - 1 : current - 1;
      }

      return current === total - 1 ? 0 : current + 1;
    });
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="projects-section relative overflow-hidden"
      style={
        {
          "--active-accent": active.theme.accent,
          "--active-surface": active.theme.surface,
          "--active-glow": active.theme.glow,
        } as React.CSSProperties
      }
    >
      <div className="projects-parallax-bg" aria-hidden="true" />
      <div className="projects-wrapper">
        <header className="projects-header">
          <motion.span
            className="header-eyebrow"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45 }}
          >
            {projectCopy.title}
          </motion.span>
          <motion.h2
            className="header-title"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              delay: prefersReducedMotion ? 0 : 0.06,
            }}
          >
            {projectCopy.subtitle01}
          </motion.h2>
          <motion.p
            className="header-subtitle"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              delay: prefersReducedMotion ? 0 : 0.12,
            }}
          >
            {projectCopy.subtitle02} {projectCopy.subtitle03}
          </motion.p>
          <div className="projects-selector">
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                type="button"
                className={`selector-pill ${index === activeIndex ? "is-active" : ""}`}
                onClick={() => goToProject(index)}
                initial={
                  prefersReducedMotion ? false : { opacity: 0, scale: 0.85 }
                }
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewport}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.35,
                  delay: prefersReducedMotion ? 0 : index * 0.07,
                }}
                style={
                  {
                    "--pill-accent": project.theme.accent,
                    "--pill-glow": project.theme.glow,
                  } as React.CSSProperties
                }
              >
                <span className="pill-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="pill-title">{project.title}</span>
              </motion.button>
            ))}
          </div>
        </header>

        <div className="projects-main">
          <motion.div
            className="browser-mockup"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.75 }}
          >
            <div className="browser-topbar">
              <div className="browser-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-brand" />
              </div>
              <div className="browser-url-bar">
                <span className="browser-lock">lock</span>
                <span className="browser-url-text">
                  {active.liveUrl.replace("https://", "")}
                </span>
              </div>
              <span className="browser-scroll-hint">slide</span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className="browser-canvas"
                key={`${active.id}-${slideIndex}`}
                initial={prefersReducedMotion ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: prefersReducedMotion ? 1 : 0,
                  x: prefersReducedMotion ? 0 : -18,
                }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
              >
                {currentSlide ? (
                  <div className="page-frame">
                    {currentSlide.type === "video" ? (
                      <video
                        ref={videoRef}
                        className="page-video"
                        src={currentSlide.src}
                        poster={active.video?.poster}
                        autoPlay={isSectionInView}
                        muted
                        playsInline
                        preload="none"
                        loop
                        aria-label={`Video de ${active.title}`}
                      />
                    ) : (
                      <img
                        src={currentSlide.src}
                        alt={`${active.title} - pagina ${slideIndex + 1}`}
                        className="page-img"
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <span className="page-badge">
                      {slideIndex + 1}/{total}
                    </span>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>

            {total > 1 ? (
              <div className="project-media-controls">
                <button
                  type="button"
                  className="project-media-arrow"
                  onClick={() => goToSlide("previous")}
                  aria-label="Midia anterior"
                >
                  <ChevronLeft aria-hidden="true" />
                </button>
                <div className="project-media-dots" aria-hidden="true">
                  {slides.map((slide, index) => (
                    <span
                      key={`${slide.type}-${slide.src}`}
                      className={`project-media-dot ${
                        index === slideIndex ? "is-active" : ""
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="project-media-arrow"
                  onClick={() => goToSlide("next")}
                  aria-label="Proxima midia"
                >
                  <ChevronRight aria-hidden="true" />
                </button>
              </div>
            ) : null}
          </motion.div>

          <motion.aside
            className="projects-sidebar"
            initial={prefersReducedMotion ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              delay: prefersReducedMotion ? 0 : 0.3,
            }}
          >
            <div className="sidebar-card">
              <div className="pages-indicator">
                <span className="indicator-label">{projectCopy.pages}</span>
                <div className="indicator-dots">
                  {slides.map((slide, index) => (
                    <span
                      className={`indicator-dot ${
                        index === slideIndex ? "is-active" : ""
                      }`}
                      key={`${slide.type}-${slide.src}`}
                    />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  className="sidebar-info"
                  key={active.id}
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
                >
                  <span className="project-year">{active.year}</span>
                  <h3 className="project-title">{active.title}</h3>
                  <p className="project-short-desc">{active.shortDescription}</p>
                  <dl className="project-meta-grid">
                    <div>
                      <dt>Status</dt>
                      <dd>{formatStatus(active.status)}</dd>
                    </div>
                    <div>
                      <dt>Tempo</dt>
                      <dd>
                        {formatDate(active.startDate)} -{" "}
                        {active.endDate ? formatDate(active.endDate) : "Atual"}
                      </dd>
                    </div>
                    <div>
                      <dt>Tipo</dt>
                      <dd>{formatClientType(active.clientType)}</dd>
                    </div>
                    <div>
                      <dt>Categoria</dt>
                      <dd>{active.category}</dd>
                    </div>
                  </dl>
                  <p className="project-desc">{active.description}</p>
                  <div className="tech-tags">
                    {active.technologies.map((tech) => (
                      <span className="tech-tag" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    {active.liveUrl ? (
                      <a
                        href={active.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink aria-hidden="true" />
                        <span>Online</span>
                      </a>
                    ) : null}
                    {active.githubUrl ? (
                      <a
                        href={active.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Code2 aria-hidden="true" />
                        <span>Codigo</span>
                      </a>
                    ) : null}
                  </div>
                </motion.div>
              </AnimatePresence>

              <a
                className="sidebar-cta"
                href={getWhatsAppProjectLink(active.title)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {projectCopy.cta}
              </a>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function formatStatus(status: string) {
  const labels: Record<string, string> = {
    completed: "Concluido",
    "in-progress": "Em andamento",
    planned: "Planejado",
  };

  return labels[status] ?? status;
}

function formatClientType(clientType: string) {
  const labels: Record<string, string> = {
    freelance: "Freelance",
    pessoal: "Pessoal",
  };

  return labels[clientType] ?? clientType;
}

function formatDate(value: string) {
  if (!value) {
    return "Atual";
  }

  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    year: "numeric",
  }).format(date);
}
