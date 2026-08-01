"use client";

import { ArrowRight } from "lucide-react";

import { cta, site } from "@/data/dev-content";

export function CtaSection() {
  return (
    <section
      id="cta"
      className="cta-section relative overflow-hidden py-10 md:py-18"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="cta-bg-image absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/images/banner_codigo.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center lg:px-6">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          <span className="text-xs font-bold uppercase text-white/80">
            {cta.tag}
          </span>
        </div>
        <h2 className="text-3xl font-black leading-[1.1] text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {cta.title}
          <br />
          <span className="bg-gradient-to-r from-dev-light to-accent-light bg-clip-text text-transparent">
            {cta.accent}
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base md:text-lg">
          {cta.subtitle}
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#projects"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-dev transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100"
          >
            {cta.projectsBtn}
            <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-accent-dark"
          >
            <img src="/assets/icons/whatsapp.svg" alt="" className="h-5 w-5" />
            {cta.whatsappBtn}
          </a>
        </div>
      </div>
    </section>
  );
}
