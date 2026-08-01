"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cta, site } from "@/data/dev-content";

const ctaVideoSrc = "/assets/videos/banner_codigo.mp4";
const ctaPosterSrc = "/assets/images/banner.png";

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncMotionPreference = () => {
      const shouldReduceMotion = mediaQuery.matches;

      setPrefersReducedMotion(shouldReduceMotion);

      if (shouldReduceMotion) {
        videoRef.current?.pause();
      }
    };

    syncMotionPreference();
    mediaQuery.addEventListener("change", syncMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || shouldLoadVideo) {
      return;
    }

    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion, shouldLoadVideo]);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="cta-section relative overflow-hidden py-10 md:py-18"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <video
          ref={videoRef}
          className="cta-bg-video absolute inset-0 h-full w-full object-cover"
          src={
            shouldLoadVideo && !prefersReducedMotion ? ctaVideoSrc : undefined
          }
          poster={ctaPosterSrc}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          preload="none"
        >
          {shouldLoadVideo && !prefersReducedMotion ? (
            <source src={ctaVideoSrc} type="video/mp4" />
          ) : null}
        </video>
        <div className="absolute inset-0 bg-[rgba(110,20,28,0.82)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[rgba(110,20,28,0.72)] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center lg:px-6">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-4 py-1.5 backdrop-blur-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
          <span className="text-xs font-bold uppercase text-white">
            {cta.tag}
          </span>
        </div>
        <h2 className="text-3xl font-black leading-[1.1] text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {cta.title}
          <br />
          <span className="text-[var(--brand-red-tint)]">{cta.accent}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/78 sm:text-base md:text-lg">
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
            className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-[rgba(255,255,255,0.12)] px-8 py-4 text-sm font-bold !text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/18 [&_*]:!text-white"
          >
            <img src="/assets/icons/whatsapp.svg" alt="" className="h-5 w-5" />
            {cta.whatsappBtn}
          </a>
        </div>
      </div>
    </section>
  );
}
