"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cta, site } from "@/data/dev-content";

const ctaVideoSrc = "/assets/videos/banner_codigo.mp4";
const ctaPosterSrc = "/assets/images/banner.png";

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = Boolean(prefersReducedMotion);
  const viewport = { once: true, amount: 0.3 };

  useEffect(() => {
    if (shouldReduceMotion) {
      videoRef.current?.pause();
    }
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion || shouldLoadVideo) {
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
  }, [shouldReduceMotion, shouldLoadVideo]);

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
          src={shouldLoadVideo && !shouldReduceMotion ? ctaVideoSrc : undefined}
          poster={ctaPosterSrc}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          preload="none"
        >
          {shouldLoadVideo && !shouldReduceMotion ? (
            <source src={ctaVideoSrc} type="video/mp4" />
          ) : null}
        </video>
        <div className="absolute inset-0 bg-[rgba(110,20,28,0.82)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[rgba(110,20,28,0.72)] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center lg:px-6">
        <motion.div
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-4 py-1.5 backdrop-blur-sm"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
          <span className="text-xs font-bold uppercase text-white">
            {cta.tag}
          </span>
        </motion.div>
        <motion.h2
          className="font-heading text-3xl font-normal leading-[1.1] text-white sm:text-4xl md:text-5xl lg:text-6xl"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.35,
            delay: shouldReduceMotion ? 0 : 0.1,
          }}
        >
          {cta.title}
          <br />
          <span className="text-[var(--brand-red-tint)]">{cta.accent}</span>
        </motion.h2>
        <motion.p
          className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/78 sm:text-base md:text-lg"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.3,
            delay: shouldReduceMotion ? 0 : 0.15,
          }}
        >
          {cta.subtitle}
        </motion.p>
        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.35,
            delay: shouldReduceMotion ? 0 : 0.22,
          }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}
