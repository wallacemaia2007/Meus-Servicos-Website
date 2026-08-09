"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { socialProof, testimonials } from "@/data/testimonials";
import { useLenisScrollTrigger } from "@/hooks/useLenisScrollTrigger";

import {
  SocialProofBackground,
  type SocialProofBackgroundHandle,
} from "./SocialProofBackground";
import { TestimonialCard } from "./TestimonialCard";

gsap.registerPlugin(ScrollTrigger);

export function SocialProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<SocialProofBackgroundHandle>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const lenis = useLenis();

  useLenisScrollTrigger(lenis);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPrefersReducedMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getScrollDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);
      const getFallDistance = () => window.innerHeight;
      const getTotalDistance = () => getScrollDistance() + getFallDistance();
      const getFallFraction = () => getFallDistance() / getTotalDistance();

      const cards = Array.from(
        track.querySelectorAll<HTMLElement>("[data-fall-reveal]"),
      );

      gsap.set(track, {
        force3D: true,
        willChange: "transform",
        x: 0,
        z: 0.01,
      });

      gsap.set(cards, {
        force3D: true,
        willChange: "transform, opacity",
      });

      let backgroundFrame = 0;
      let backgroundProgress = 0;
      const updateBackground = () => {
        backgroundFrame = 0;
        backgroundRef.current?.setProgress(backgroundProgress);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getTotalDistance()}`,
          scrub: 0.65,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            backgroundProgress = self.progress;
            if (!backgroundFrame) {
              backgroundFrame = requestAnimationFrame(updateBackground);
            }
          },
        },
      });

      const SLIDE_START = 0.05;

      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { y: -140, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: () => getFallFraction() * 0.45,
            ease: "back.out(1.35)",
          },
          (i / cards.length) * getFallFraction() * 0.8,
        );
      });

      tl.to(
        track,
        {
          x: () => -getScrollDistance(),
          ease: "none",
          force3D: true,
          duration: () => 1 - SLIDE_START,
        },
        SLIDE_START,
      );

      return () => {
        if (backgroundFrame) {
          cancelAnimationFrame(backgroundFrame);
        }
      };
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <section
      id={socialProof.id}
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--brand-red)] text-white"
    >
      <SocialProofBackground
        ref={backgroundRef}
        prefersReducedMotion={prefersReducedMotion}
      />

      {prefersReducedMotion ? (
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-28">
          <SectionHeader
            tone="dark"
            eyebrow={socialProof.badge}
            title={socialProof.title}
            subtitle={socialProof.subtitle}
            className="mb-0"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                className="!w-full"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="relative z-10 h-screen">
          <div className="flex h-full flex-col">
            <div className="shrink-0 px-6 pt-16 md:px-[10vw] md:pt-20 lg:pt-24">
              <SectionHeader
                tone="dark"
                eyebrow={socialProof.badge}
                title={socialProof.title}
                subtitle={socialProof.subtitle}
                className="mb-0"
              />
            </div>
            <div className="flex min-h-0 flex-1 items-center">
              <div
                ref={trackRef}
                className="flex w-max transform-gpu items-stretch gap-4 px-6 will-change-transform md:gap-6 md:pl-[10vw] md:pr-[10vw]"
              >
                {testimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                  />
                ))}
              </div>
            </div>
            <div className="shrink-0 pb-6 text-center">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/78">
                <ChevronDown
                  className="h-4 w-4 animate-bounce"
                  aria-hidden="true"
                />
                {socialProof.scrollHint}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
