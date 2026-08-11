import type { DevProject } from "@/types";

const CLOUDINARY_CLOUD_NAME = "gnazw8x5";

const videoPublicIds: Record<string, string> = {
  "schulles-gastronomia-erp": "videos/schulles-gastronomia-erp",
  "instituto-motiro": "videos/instituto-motiro",
  "banda-aurah-portfolio": "videos/banda-aurah-portfolio",
  "personal-portfolio": "videos/personal-portfolio",
  "digital-bank-api": "videos/digital-bank-api",
  "traveler-website": "videos/traveler-website",
  "customer-register": "videos/customer-register",
  "portfolio-marcio-carvalho": "videos/portfolio-marcio-carvalho",
};

const themes = [
  {
    surface: "var(--dev-bg-surface)",
    accent: "var(--brand-red)",
    glow: "rgba(155, 27, 31, 0.35)",
  },
  {
    surface: "var(--dev-bg-card)",
    accent: "var(--brand-red-dark)",
    glow: "rgba(107, 11, 15, 0.3)",
  },
  {
    surface: "var(--dev-bg-elevated)",
    accent: "var(--brand-ink-muted)",
    glow: "rgba(91, 91, 91, 0.22)",
  },
] satisfies DevProject["theme"][];

function assetPath(path: string) {
  return `/${path}`;
}

function cloudinaryVideo(publicId: string) {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/q_auto/${publicId}.mp4`;
}

function resolveVideo(slug: string, thumbVideo?: string) {
  if (
    thumbVideo &&
    !thumbVideo.includes("SEU_CLOUD_NAME") &&
    /^https?:/i.test(thumbVideo)
  ) {
    return thumbVideo;
  }

  const publicId = videoPublicIds[slug];
  return publicId ? cloudinaryVideo(publicId) : "";
}

export const projects: DevProject[] = [
  {
    id: "schulles-gastronomia-erp",
    slug: "schulles-gastronomia-erp",
    title: "Schulles Gastronomia ERP",
    shortDescription:
      "ERP gastronomico completo para gerenciamento de cardapio, pedidos e clientes",
    description:
      "Sistema web completo para uma operacao gastronomica que precisava organizar cardapio, pedidos, clientes e rotina administrativa em um unico lugar. A entrega reuniu painel administrativo, autenticacao segura, cardapio semanal, controle de acessos e metricas financeiras para tornar a gestao mais clara e pratica no dia a dia.",
    year: "2026",
    startDate: "2026-04-10",
    endDate: "2026-05-18",
    status: "completed",
    category: "Web",
    clientType: "cliente",
    liveUrl: "https://www.schulles.com.br/",
    technologies: [
      "Angular",
      "TypeScript",
      "Angular Material",
      "RxJS",
      "Tailwind CSS",
      "SCSS",
      "Node.js",
      "Express",
      "REST API",
      "JWT",
      "Chart.js",
      "SEO",
    ],
    tags: ["erp", "dashboard", "angular", "web", "gastronomia", "admin"],
    challenges: [
      "Desenvolver um sistema administrativo completo e escalavel",
      "Criar dashboards para metricas e pedidos",
      "Implementar gerenciamento dinamico de cardapio semanal",
      "Estruturar autenticacao e controle de acessos administrativos",
    ],
    learnings: [
      "Arquitetura de sistemas administrativos escalaveis com Angular",
      "Criacao de dashboards interativos e componentes reutilizaveis",
      "Gerenciamento de estado e fluxos reativos com RxJS",
      "Aplicacao de UI/UX em sistemas empresariais",
    ],
    theme: themes[0],
    pages: [
      assetPath("assets/images/projects/schulles/hero.jpg"),
      assetPath("assets/images/projects/schulles/mobile.jpg"),
      assetPath("assets/images/projects/schulles/plans.jpg"),
    ],
    video: {
      src: resolveVideo(
        "schulles-gastronomia-erp",
        "https://res.cloudinary.com/gnazw8x5/video/upload/v1785780253/video_qymixm.mp4",
      ),
      poster: assetPath("assets/images/projects/schulles/hero.jpg"),
    },
  },
  {
    id: "instituto-motiro",
    slug: "instituto-motiro",
    title: "Instituto Motiro",
    shortDescription:
      "Instituto cultural e educacional focado em desenvolvimento comunitario",
    description:
      "Site institucional para apresentar a atuacao do Instituto Motiro na educacao, cultura e desenvolvimento comunitario em Passos e regiao. O projeto organiza nucleos, projetos, noticias e informacoes institucionais em uma experiencia clara, responsiva e preparada para fortalecer a presenca digital da organizacao.",
    year: "2026",
    startDate: "2026-03-25",
    endDate: "2026-04-15",
    status: "completed",
    category: "Web",
    clientType: "cliente",
    liveUrl: "https://www.institutomotiro.com.br/",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 3",
      "GSAP",
      "App Router",
      "SEO/Metadata",
      "Responsive UI",
    ],
    tags: ["web", "nextjs", "institucional", "educacao", "cultura"],
    challenges: [
      "Organizar muito conteudo institucional sem perder clareza e performance",
      "Garantir navegacao consistente entre paginas, eixos, projetos e noticias",
      "Manter responsividade e acessibilidade em diferentes dispositivos",
      "Integrar animacoes sem comprometer a experiencia",
    ],
    learnings: [
      "Uso do Next.js App Router para conteudo institucional e SEO",
      "Modelagem de conteudo em arquivos data-driven",
      "Aplicacao de GSAP e ScrollTrigger para animacoes de interface",
      "Padronizacao de componentes reutilizaveis",
    ],
    theme: themes[1],
    pages: [
      assetPath("assets/images/projects/instituto-motiro/motiro2.png"),
      assetPath("assets/images/projects/instituto-motiro/motiro3.png"),
      assetPath("assets/images/projects/instituto-motiro/motiro4.png"),
    ],
    video: {
      src: resolveVideo(
        "instituto-motiro",
        "https://res.cloudinary.com/gnazw8x5/video/upload/v1785780289/motiro_video_xieiek.mp4",
      ),
      poster: assetPath("assets/images/projects/instituto-motiro/motiro1.png"),
    },
  },
  {
    id: "banda-aurah-portfolio",
    slug: "banda-aurah-portfolio",
    title: "Portfolio Banda Aurah",
    shortDescription:
      "Portfolio da banda Aurah responsivo com Angular e Tailwind CSS",
    description:
      "Portfolio desenvolvido para dar presenca digital a banda Aurah, reunindo identidade visual, apresentacao, conteudo e pontos de contato em uma interface leve. A proposta foi criar uma vitrine responsiva, objetiva e facil de navegar, valorizando o trabalho artistico e facilitando o acesso do publico as informacoes principais.",
    year: "2026",
    startDate: "2026-01-20",
    endDate: "2026-02-10",
    status: "completed",
    category: "Web",
    clientType: "cliente",
    liveUrl: "https://portfolio-banda-aurah.vercel.app/",
    technologies: [
      "Angular",
      "Tailwind CSS",
      "Angular Material",
      "RxJS",
      "Express",
      "Node.js",
    ],
    tags: ["portfolio", "web", "angular"],
    challenges: [
      "Design responsivo para multiplos dispositivos",
      "Otimizacao de performance e SEO",
    ],
    learnings: [
      "Melhores praticas de desenvolvimento web",
      "Implementacao de design responsivo com Tailwind CSS",
      "Deploy de aplicacoes Angular",
      "Boas praticas de UI/UX com Angular Material",
    ],
    theme: themes[2],
    pages: [
      assetPath("assets/images/projects/banda-aurah/banda-aurah2.png"),
      assetPath("assets/images/projects/banda-aurah/banda-aurah3.png"),
    ],
    video: {
      src: resolveVideo(
        "banda-aurah-portfolio",
        "https://res.cloudinary.com/SEU_CLOUD_NAME/video/upload/q_auto/videos/banda-aurah-portfolio.mp4",
      ),
      poster: assetPath("assets/images/projects/banda-aurah/banda-aurah1.png"),
    },
  },
  {
    id: "personal-portfolio",
    slug: "personal-portfolio",
    title: "Portfólio Wallace Maia",
    shortDescription:
      "Site institucional responsivo com Angular e Tailwind CSS",
    description:
      "Site institucional criado para apresentar a Maiawall, seus servicos web e projetos de forma mais profissional e acessivel. A interface foi construida com foco em responsividade, organizacao visual e SEO, funcionando como uma base publica para demonstrar repertorio tecnico, entregas e formas de contato.",
    year: "2025",
    startDate: "2025-12-20",
    endDate: "",
    status: "completed",
    category: "Web",
    clientType: "cliente",
    liveUrl: "https://www.maiawall.com",
    technologies: [
      "Angular",
      "Tailwind CSS",
      "Angular Material",
      "RxJS",
      "Express",
      "Node.js",
    ],
    tags: ["portfolio", "web", "angular"],
    challenges: [
      "Design responsivo para multiplos dispositivos",
      "Otimizacao de performance e SEO",
    ],
    learnings: [
      "Melhores praticas de desenvolvimento web",
      "Implementacao de design responsivo com Tailwind CSS",
      "Deploy de aplicacoes Angular",
      "Boas praticas de UI/UX com Angular Material",
    ],
    theme: themes[0],
    pages: [
      assetPath(
        "assets/images/projects/portfolio-pessoal/portfolio-pessoal-1.png",
      ),
      assetPath(
        "assets/images/projects/portfolio-pessoal/portfolio-pessoal-2.png",
      ),
      assetPath(
        "assets/images/projects/portfolio-pessoal/portfolio-pessoal-3.png",
      ),
    ],
    video: {
      src: resolveVideo(
        "personal-portfolio",
        "https://res.cloudinary.com/SEU_CLOUD_NAME/video/upload/q_auto/videos/personal-portfolio.mp4",
      ),
      poster: assetPath(
        "assets/images/projects/portfolio-pessoal/thumbnail.png",
      ),
    },
  },
  {
    id: "portfolio-marcio-carvalho",
    slug: "portfolio-marcio-carvalho",
    title: "Portfolio Marcio Carvalho",
    shortDescription:
      "Portfolio institucional em Next.js para historiador, produtor cultural, educador, pesquisador e musico.",
    description:
      "Site institucional em Next.js para organizar a presenca publica de Marcio Carvalho como historiador, produtor cultural, educador, pesquisador e musico. A entrega estruturou trajetoria, formacao, projetos culturais, producao academica, musica, midia e contato em uma experiencia editorial, responsiva e preparada para SEO.",
    year: "2026",
    startDate: "2026-07-13",
    endDate: "2026-07-27",
    status: "completed",
    category: "Web",
    clientType: "cliente",
    liveUrl: "https://www.marciofcarvalho.com.br",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "GSAP",
      "Framer Motion",
      "TanStack Query",
      "React Hook Form",
      "Zod",
      "Resend",
      "Next Themes",
      "Sonner",
      "Lucide React",
    ],
    tags: [
      "portfolio",
      "site institucional",
      "nextjs",
      "react",
      "typescript",
      "tailwind",
      "seo",
      "formulario de contato",
      "animacoes",
      "conteudo cultural",
    ],
    challenges: [
      "Organizar conteudo biografico, academico, cultural, musical e midiatico em arquitetura data-driven",
      "Construir identidade visual editorial com alternancia de temas",
      "Implementar experiencias interativas com GSAP",
      "Criar formulario server-side com validacao, honeypot, rate limit e Resend",
    ],
    learnings: [
      "Aprofundamento no App Router do Next.js 16",
      "Uso de animacoes acessiveis com preferencia por reduced motion",
      "Estruturacao de SEO com dados estruturados e dominio canonico",
      "Criacao de componentes reutilizaveis de secao tematica",
    ],
    theme: themes[1],
    pages: [
      assetPath(
        "assets/images/projects/portfolio-marcio-carvalho/imagem-1.png",
      ),
      assetPath(
        "assets/images/projects/portfolio-marcio-carvalho/imagem-2.png",
      ),
      assetPath(
        "assets/images/projects/portfolio-marcio-carvalho/imagem-3.png",
      ),
      assetPath(
        "assets/images/projects/portfolio-marcio-carvalho/imagem-4.png",
      ),
    ],
    video: {
      src: resolveVideo(
        "portfolio-marcio-carvalho",
        "https://res.cloudinary.com/gnazw8x5/video/upload/v1785780302/video_marcio_o39v4r.mp4",
      ),
      poster: assetPath(
        "assets/images/projects/portfolio-marcio-carvalho/thumbnail.png",
      ),
    },
  },
  {
    id: "split-hub",
    slug: "split-hub",
    title: "SplitHub",
    shortDescription:
      "App full stack para dividir despesas em grupo, controlar saldos, pagamentos, comprovantes e notificacoes em tempo real.",
    description:
      "Plataforma full stack para dividir despesas em grupo e acompanhar saldos, pagamentos, comprovantes, convites e notificacoes em tempo real. O projeto une Angular e Spring Boot em uma arquitetura completa, com foco em regras de negocio, seguranca, planos de uso e uma experiencia clara para grupos que precisam organizar custos compartilhados.",
    year: "2026",
    startDate: "2026-03-08",
    endDate: "",
    status: "in-progress",
    category: "Web",
    clientType: "internal",
    liveUrl: "https://splithub.maiawall.com",
    technologies: [
      "Angular 20",
      "TypeScript",
      "SCSS",
      "RxJS",
      "Tailwind CSS",
      "Java 21",
      "Spring Boot 3.5",
      "Spring Security",
      "PostgreSQL",
      "JWT",
      "OAuth2",
      "WebSocket",
      "STOMP",
      "Flyway",
      "Swagger/OpenAPI",
      "Google Cloud Storage",
      "Google Gemini",
      "Docker",
      "Vercel",
      "Render",
    ],
    tags: [
      "Full Stack",
      "Fintech",
      "Despesas compartilhadas",
      "Angular",
      "Spring Boot",
      "PostgreSQL",
      "OAuth2",
      "WebSocket",
      "IA",
      "SaaS",
    ],
    challenges: [
      "Manter contratos REST consistentes entre Angular e Spring Boot",
      "Evoluir autenticacao com cookies, refresh token, CSRF, OAuth2 e hidratacao de sessao",
      "Modelar regras para grupos, membros, despesas, divisoes, pagamentos, convites, permissoes e planos",
      "Implementar notificacoes e atualizacoes em tempo real com WebSocket/STOMP",
    ],
    learnings: [
      "Aprofundamento em Spring Security, OAuth2, JWT com cookies e refresh token",
      "Integracao entre Angular moderno e API modular Spring Boot",
      "Uso de WebSocket autenticado para notificacoes e eventos de dominio",
      "Planejamento de produto SaaS com planos e limites de uso",
    ],
    theme: themes[2],
    pages: [
      assetPath("assets/images/projects/split-hub/imagem-1.png"),
      assetPath("assets/images/projects/split-hub/imagem-2.png"),
      assetPath("assets/images/projects/split-hub/imagem-3.png"),
    ],
  },
  {
    id: "dev-landing-page",
    slug: "dev-landing-page",
    title: "Maiawall Serviços",
    shortDescription:
      "Landing page comercial da Maiawall para apresentar servicos, projetos, stack e contato profissional.",
    description:
      "Projeto da landing page comercial da Maiawall focado em captacao de clientes para servicos de desenvolvimento web. A pagina foi estruturada com narrativa de conversao, hero animado, secoes de servicos, projetos em destaque, stack tecnica e CTA direto para WhatsApp, priorizando clareza, performance e credibilidade.",
    year: "2026",
    startDate: "2026-05-14",
    endDate: "2026-07-29",
    status: "completed",
    category: "frontend",
    clientType: "internal",
    liveUrl: "https://servicos.maiawall.com",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "SCSS",
      "GSAP",
      "Canvas",
      "Responsive Design",
      "SEO",
      "Google Analytics",
      "WhatsApp Link",
    ],
    tags: [
      "landing page",
      "maiawall",
      "react",
      "nextjs",
      "typescript",
      "tailwind",
      "gsap",
      "servicos",
      "conversao",
      "whatsapp",
    ],
    challenges: [
      "Criar uma experiencia independente do portfolio principal com identidade visual propria",
      "Construir um hero animado com particulas em canvas mantendo boa performance",
      "Organizar secoes comerciais, servicos, projetos, stack e contato em narrativa fluida de conversao",
      "Aplicar animacoes com GSAP respeitando reduced motion",
    ],
    learnings: [
      "Estruturacao de landing page comercial standalone com React, Next.js e TypeScript",
      "Evolucao da antiga rota /dev para o dominio dedicado https://servicos.maiawall.com",
      "Implementacao de animacoes com GSAP e canvas com foco em UX e performance",
      "Aprimoramento de copy comercial, hierarquia visual e CTAs orientados a contato",
    ],
    theme: themes[0],
    pages: [
      assetPath("assets/images/projects/dev-landing-page/imagem-1.png"),
      assetPath("assets/images/projects/dev-landing-page/imagem-2.png"),
      assetPath("assets/images/projects/dev-landing-page/imagem-3.png"),
    ],
    video: {
      src: resolveVideo(
        "dev-landing-page",
        "https://res.cloudinary.com/gnazw8x5/video/upload/v1785780253/servicos_dev_adz1qf.mp4",
      ),
      poster: assetPath(
        "assets/images/projects/dev-landing-page/thumbnail.png",
      ),
    },
  },
];
