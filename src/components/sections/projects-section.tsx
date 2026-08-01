"use client";

import { useState } from "react";

import { projectCopy, projects } from "@/data/dev-content";
import { getWhatsAppProjectLink } from "@/lib/whatsapp";

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = projects[activeIndex];
  const total = active.pages.length + (active.video ? 1 : 0);

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
          <span className="header-eyebrow">{projectCopy.title}</span>
          <h2 className="header-title">{projectCopy.subtitle01}</h2>
          <p className="header-subtitle">
            {projectCopy.subtitle02} {projectCopy.subtitle03}
          </p>
          <div className="projects-selector">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                className={`selector-pill ${index === activeIndex ? "is-active" : ""}`}
                onClick={() => setActiveIndex(index)}
                style={
                  {
                    "--pill-accent": project.theme.accent,
                    "--pill-glow": project.theme.glow,
                  } as React.CSSProperties
                }
              >
                <span className="pill-index">0{index + 1}</span>
                <span className="pill-title">{project.title}</span>
              </button>
            ))}
          </div>
        </header>

        <main className="projects-main">
          <div className="browser-mockup">
            <div className="browser-topbar">
              <div className="browser-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="browser-url-bar">
                <span className="browser-lock">lock</span>
                <span className="browser-url-text">
                  {active.liveUrl.replace("https://", "")}
                </span>
              </div>
              <span className="browser-scroll-hint">scroll →</span>
            </div>

            <div className="browser-canvas">
              {active.pages.map((page, index) => (
                <div className="page-frame" key={page}>
                  <img
                    src={page}
                    alt={`${active.title} - página ${index + 1}`}
                    className="page-img"
                    draggable={false}
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
            </div>
          </div>

          <aside className="projects-sidebar">
            <div className="sidebar-card">
              <div className="pages-indicator">
                <span className="indicator-label">{projectCopy.pages}</span>
                <div className="indicator-dots">
                  {Array.from({ length: total }).map((_, index) => (
                    <span className="indicator-dot" key={index} />
                  ))}
                </div>
              </div>

              <div className="sidebar-info">
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
              </div>

              <a
                className="sidebar-cta"
                href={getWhatsAppProjectLink(active.title)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {projectCopy.cta}
              </a>
            </div>
          </aside>
        </main>
      </div>
    </section>
  );
}
