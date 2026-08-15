import { ProjectBuilderSection } from "@/components/project-builder/ProjectBuilderSection";
import { ContactSection } from "@/components/sections/contact-section";
import { CtaSection } from "@/components/sections/cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSolutionSection } from "@/components/sections/problem-solution-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { WorksSection } from "@/components/sections/works-section";
import { JsonLd } from "@/components/seo/json-ld";
import { SocialProofSection } from "@/components/social-proof/social-proof-section";
import { links, projects, site } from "@/data/dev-content";

const HERO_PREVIEW_IMAGE = `${site.url}/assets/images/hero-preview.png`;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.fullName,
  alternateName: ["Maiawall", "Maiawall Serviços Web", "Wallace Maia"],
  description: site.description,
  url: site.url,
  image: `${site.url}/assets/brand/logo-light.png`,
  logo: `${site.url}/assets/brand/logo-light.png`,
  email: "wallacemaia2007@gmail.com",
  telephone: "+5535910036806",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Uberlândia",
    addressRegion: "Minas Gerais",
    addressCountry: "BR",
  },
  founder: { "@id": `${site.url}/#wallace-maia` },
  sameAs: [
    links.github,
    links.linkedin,
    links.instagram,
    links.fiverr,
    links.personalPortfolio,
  ],
  areaServed: "BR",
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Serviços web sob medida",
        serviceType:
          "Desenvolvimento de sites, landing pages, CRM, ERP, sistemas web, dashboards, e-commerce e APIs",
      },
    },
  ],
  serviceType: [
    "Criação de sites",
    "Landing pages",
    "Sistemas web",
    "CRM",
    "ERP",
    "E-commerce",
    "Dashboards",
    "APIs",
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#wallace-maia`,
  name: "Wallace Maia",
  alternateName: ["Wallace Candido Maia Sousa", "wallacemaia2007"],
  jobTitle: "Desenvolvedor Full Stack",
  description:
    "Wallace Maia, fundador da Maiawall, desenvolve sites, sistemas web, CRM, ERP, dashboards, e-commerces e APIs sob medida.",
  url: links.personalPortfolio,
  image: `${site.url}/assets/brand/logo-light.png`,
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
    links.personalPortfolio,
  ],
  worksFor: { "@id": `${site.url}/#organization` },
  owns: { "@id": `${site.url}/#organization` },
  knowsAbout: organizationJsonLd.knowsAbout,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: `${site.name} | Serviços Web Full Stack`,
  description: site.description,
  inLanguage: "pt-BR",
  publisher: { "@id": `${site.url}/#organization` },
};

const webpageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": site.url,
  url: site.url,
  name: site.title,
  description: site.description,
  primaryImageOfPage: HERO_PREVIEW_IMAGE,
  isPartOf: { "@id": `${site.url}/#website` },
  about: { "@id": `${site.url}/#organization` },
};

const serviceCatalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": `${site.url}/#servicos-web`,
  name: "Serviços web da Maiawall",
  url: site.url,
  description: site.shortDescription,
  provider: { "@id": `${site.url}/#organization` },
  itemListElement: [
    "Criação de sites profissionais",
    "Landing pages de alta conversão",
    "Desenvolvimento de CRM",
    "Desenvolvimento de ERP",
    "Sistemas web sob medida",
    "Dashboards e painéis administrativos",
    "E-commerce e lojas virtuais",
    "APIs REST e integrações",
    "Automação de processos web",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name,
      areaServed: "BR",
      provider: { "@id": `${site.url}/#organization` },
    },
  })),
};

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Projetos da Maiawall",
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
      <HeroSection />
      <ProblemSolutionSection />
      <WorksSection />
      <ProjectsSection />
      <SocialProofSection />
      <ProjectBuilderSection />
      <ContactSection />
      <CtaSection />
      <JsonLd id="maiawall-organization-jsonld" data={organizationJsonLd} />
      <JsonLd id="maiawall-person-jsonld" data={personJsonLd} />
      <JsonLd id="maiawall-website-jsonld" data={websiteJsonLd} />
      <JsonLd id="maiawall-webpage-jsonld" data={webpageJsonLd} />
      <JsonLd
        id="maiawall-service-catalog-jsonld"
        data={serviceCatalogJsonLd}
      />
      <JsonLd id="maiawall-projects-jsonld" data={projectsJsonLd} />
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
