import { ContactSection } from "@/components/sections/contact-section";
import { CtaSection } from "@/components/sections/cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSolutionSection } from "@/components/sections/problem-solution-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { WorksSection } from "@/components/sections/works-section";
import { JsonLd } from "@/components/seo/json-ld";
import { SocialProofSection } from "@/components/social-proof/social-proof-section";
import { links, projects, site } from "@/data/dev-content";

const OG_IMAGE = `${site.url}/assets/images/og-image.jpg`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.fullName,
  alternateName: ["Wallace Maia Dev", "maiawall"],
  jobTitle: "Desenvolvedor Web Full Stack",
  description: site.description,
  url: site.url,
  image: `${site.url}/assets/images/avatar.jpeg`,
  email: "wallacemaia2007@gmail.com",
  telephone: "+5535910036806",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Uberlândia",
    addressRegion: "Minas Gerais",
    addressCountry: "BR",
  },
  sameAs: [
    links.github,
    links.linkedin,
    links.instagram,
    links.fiverr,
    links.personalPortfolio,
  ],
  knowsAbout: [
    "Angular",
    "TypeScript",
    "Java",
    "Spring Boot",
    "Spring Security",
    "RxJS",
    "Tailwind CSS",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Node.js",
    "REST API",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: `${site.name} | Serviços Web Full Stack`,
  description: site.description,
  inLanguage: "pt-BR",
  author: { "@id": `${site.url}/#person` },
};

const webpageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": site.url,
  url: site.url,
  name: site.title,
  description: site.description,
  primaryImageOfPage: OG_IMAGE,
  isPartOf: { "@id": `${site.url}/#website` },
  about: { "@id": `${site.url}/#person` },
};

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Projetos de Wallace Maia",
  url: site.url,
  numberOfItems: projects.length,
  itemListElement: projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: project.title,
    description: project.description,
    url: project.liveUrl,
  })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={personJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={webpageJsonLd} />
      <JsonLd data={projectsJsonLd} />
      <HeroSection />
      <ProblemSolutionSection />
      <WorksSection />
      <ProjectsSection />
      <SocialProofSection />
      <ContactSection />
      <CtaSection />
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pedir agora no WhatsApp"
        className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent !text-white shadow-dev transition-transform duration-300 hover:-translate-y-1 active:scale-[0.98] sm:bottom-5 sm:right-5"
      >
        <img
          src="/assets/icons/whatsapp.png"
          alt="Whatsapp"
          className="h-full w-full rounded-full object-cover"
        />
      </a>
    </>
  );
}
