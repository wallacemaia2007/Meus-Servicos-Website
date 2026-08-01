import { ContactSection } from "@/components/sections/contact-section";
import { CtaSection } from "@/components/sections/cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSolutionSection } from "@/components/sections/problem-solution-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { StackSection } from "@/components/sections/stack-section";
import { WorksSection } from "@/components/sections/works-section";
import { site } from "@/data/dev-content";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSolutionSection />
      <WorksSection />
      <ProjectsSection />
      <StackSection />
      <ContactSection />
      <CtaSection />
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pedir agora no WhatsApp"
        className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-dev transition-transform duration-300 hover:-translate-y-1 active:scale-[0.98] sm:bottom-5 sm:right-5"
      >
        <img
          src="/assets/icons/whatsapp.png"
          alt="Whatsapp"
          className="h-8 w-8"
        />
      </a>
    </>
  );
}
