"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { projectCopy, projects } from "@/data/dev-content";
import { getWhatsAppProjectLink } from "@/lib/whatsapp";

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const active = projects[activeIndex];
  const total = active.pages.length + (active.video ? 1 : 0);
  const viewport = { once: true, amount: 0.2 };

  return (
    <section
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
                onClick={() => setActiveIndex(index)}
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
                <span className="pill-index">0{index + 1}</span>
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
              <span className="browser-scroll-hint">scroll →</span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className="browser-canvas"
                key={active.id}
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
              >
                {active.pages.map((page, index) => (
                  <div className="page-frame" key={page}>
                    <img
                      src={page}
                      alt={`${active.title} - página ${index + 1}`}
                      className="page-img"
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="page-badge">
                      {index + 1}/{total}
                    </span>
                  </div>
                ))}
                {active.video ? (
                  <div className="page-frame">
                    <video
                      className="page-video"
                      src={active.video.src}
                      poster={active.video.poster}
                      muted
                      playsInline
                      preload="metadata"
                      loop
                      controls
                    />
                    <span className="page-badge">
                      {active.pages.length + 1}/{total}
                    </span>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>
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
                  {Array.from({ length: total }).map((_, index) => (
                    <span className="indicator-dot" key={index} />
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
                  <p className="project-desc">{active.description}</p>
                  <div className="tech-tags">
                    {active.technologies.map((tech) => (
                      <span className="tech-tag" key={tech}>
                        {tech}
                      </span>
                    ))}
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
