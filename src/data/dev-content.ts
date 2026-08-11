import type {
  ContactInfo,
  NavItem,
  ProblemService,
  ServiceCategory,
  Skill,
  SkillCategory,
  SocialLink,
} from "@/types";

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://servicos.maiawall.com",
  name: "Maiawall",
  fullName: "Maiawall",
  title: "Maiawall | Empresa de Serviços Web",
  description:
    "Empresa de tecnologia especializada em serviços web para negócios que precisam de sites, e-commerces, dashboards, sistemas e APIs sob medida. Orçamento gratuito.",
  whatsapp:
    "https://wa.me/5535910036806?text=Ol%C3%A1!%20Gostaria%20de%20saber%20sobre%20os%20projetos%20e%20seu%20trabalho!",
};

export const navItems: NavItem[] = [
  { label: "Inicio", href: "#hero" },
  { label: "Serviços", href: "#works" },
  { label: "Projetos", href: "#projects" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Monte seu Projeto", href: "#start-project" },
  { label: "Contato", href: "#contact" },
];

export const links = {
  cv: "/assets/cv.pdf",
  personalPortfolio: "https://maiawall.com",
  whatsapp: "https://wa.me/5535910036806",
  email:
    "https://mail.google.com/mail/?view=cm&fs=1&to=wallacemaia2007@gmail.com&su=Tenho%20interesse%20em%20um%20projeto&body=Ol%C3%A1%2C%20Maiawall!%0A%0AGostaria%20de%20conversar%20sobre%20um%20projeto.%0A%0A",
  github: "https://github.com/wallacemaia2007",
  linkedin: "https://www.linkedin.com/in/wallacemaia-dev/",
  instagram: "https://www.instagram.com/wallace_maia._",
  fiverr: "https://br.fiverr.com/wallace_maia?public_mode=true",
};

export const hero = {
  role: "Empresa de Serviços Web",
  tag: "Empresa de tecnologia web",
  rotatingRoles: [
    "Landing Pages de Alta Conversão",
    "Sistemas Web Sob Medida",
    "Dashboards e Painéis Admin",
    "E-commerces e Lojas Online",
  ],
  title: "Sites modernos e rápidos que ajudam negócios a vender mais",
  subtitle:
    "Para empresas e negócios digitais que precisam de autoridade e conversão",
  description: "Mais confiança, mais vendas, mais autoridade",
  ctaOrcamento: "Solicitar Orçamento",
  ctaServicos: "Ver Serviços",
  avatar: "/assets/brand/logo-light.png",
  fallbackAvatar: "/assets/brand/logo-light.png",
  cardDashboard: "Dashboard de Conversões",
  progressCaption: "Resultados consistentes em projetos reais",
  floatingA: "Landing Page SaaS",
  floatingB: "Sistema de Vendas",
  conversion: "+36% conversão",
  metrics: [
    { label: "Clientes Atendidos", value: "8+" },
    { label: "Projetos Entregues", value: "12+" },
    { label: "Anos de Experiência", value: "2+" },
  ],
};

export const problemSolution = {
  badge: "TRANSFORMAMOS SITES EM RESULTADOS",
  title: "Seu site hoje X Maiawall",
  description:
    "A diferença entre apenas existir online e realmente gerar resultados.",
  currentSiteLabel: "SEU SITE HOJE",
  deliveredLabel: "Maiawall",
  servicesLabel: "SERVIÇOS QUE IMPLEMENTAMOS",
  servicesDesc:
    "Soluções pensadas para quem precisa vender, organizar e escalar com tecnologia.",
  currentItems: [
    "Um site parado no tempo, sem contar sua história",
    "Sem controle de clientes e vendas",
    "Processos manuais que tomam seu tempo",
    "Pouca autoridade e baixa conversão",
    "Sem estratégia digital e sem métricas",
  ],
  deliveredItems: [
    "Site moderno que vende sua empresa 24h",
    "Gestão completa de clientes e vendas",
    "Automação que libera seu tempo",
    "Autoridade digital que gera confiança",
    "Dados claros para decisões inteligentes",
  ],
};

export const problemServices: ProblemService[] = [
  { icon: "store", title: "ERP", description: "Gestão completa do negócio" },
  { icon: "support", title: "CRM", description: "Relacionamento e vendas" },
  { icon: "cloud", title: "SAAS", description: "Produto escalável na nuvem" },
  { icon: "globe", title: "PORTFOLIOS", description: "Autoridade e conversão" },
  {
    icon: "megaphone",
    title: "LANDING PAGES",
    description: "Captação e vendas",
  },
  {
    icon: "layout",
    title: "PAINEIS ADM",
    description: "Controle em tempo real",
  },
  { icon: "cart", title: "E-COMMERCE", description: "Loja pronta para vender" },
  { icon: "chart", title: "DASHBOARDS", description: "Indicadores claros" },
  { icon: "headphones", title: "SUPORTE", description: "Evolução contínua" },
  { icon: "code", title: "INTEGRACOES", description: "APIs e automações" },
];

export const works = {
  title: "Soluções que transformam ideias em produtos digitais",
  eyebrow: "Serviços",
  subtitle:
    "Clique em um serviço para explorar o que a Maiawall pode construir para você",
  cta: "Solicitar este serviço",
  emptyTitle: "Explore os serviços",
  emptyMsg:
    "Clique em um prédio para descobrir o que a Maiawall pode construir para você",
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "systems",
    name: "Sistemas & SaaS",
    icon: "Building2",
    phrase: "Sistemas web completos, multi-usuário, prontos para escalar.",
    services: [
      "Painéis administrativos com dashboards interativos",
      "Sistemas de gestão (ERP, CRM, controle financeiro)",
      "Plataformas SaaS com autenticação e planos de acesso",
      "Sistemas de agendamento e reservas online",
      "Aplicações multi inquilino (multi-tenant)",
    ],
    stack: [
      "Java",
      "Spring Boot",
      "Angular",
      "MySQL",
      "REST API",
      "Docker",
      "JWT",
      "Hibernate",
    ],
    maxHeight: 95,
  },
  {
    id: "webapps",
    name: "Aplicações Web",
    icon: "MonitorSmartphone",
    phrase: "Soluções web interativas e funcionais sob medida.",
    services: [
      "Aplicações web progressivas (PWA)",
      "Sistemas de gerenciamento de conteúdo (CMS)",
      "Plataformas de aprendizado (LMS)",
      "Sistemas de workflow e aprovações",
      "Ferramentas de automação de marketing digital",
    ],
    stack: [
      "Angular",
      "TypeScript",
      "RxJS",
      "Tailwind CSS",
      "SCSS",
      "Node.js",
      "Java",
    ],
    maxHeight: 82,
  },
  {
    id: "ecommerce",
    name: "E-commerce & Vendas",
    icon: "Store",
    phrase: "Lojas virtuais para converter visitantes em clientes.",
    services: [
      "Loja virtual completa (carrinho, checkout, pagamentos)",
      "Marketplace e integração com marketplaces",
      "Sistema de assinaturas e recorrencia",
      "Catálogo de produtos com busca inteligente",
      "Gestão de pedidos e logística",
    ],
    stack: [
      "Angular",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Stripe",
      "REST API",
    ],
    maxHeight: 68,
  },
  {
    id: "sites",
    name: "Sites & Landing Pages",
    icon: "PanelTop",
    phrase: "Sites profissionais que convertem visitantes em leads.",
    services: [
      "Landing pages de alta conversão",
      "Sites institucionais modernos e responsivos",
      "Blogs e portais de conteúdo",
      "Páginas de captura e funis de vendas",
      "Portfólios criativos e profissionais",
    ],
    stack: ["Angular", "Tailwind CSS", "GSAP", "SEO", "TypeScript", "Vercel"],
    maxHeight: 72,
  },
  {
    id: "branding",
    name: "Portfólios & Branding",
    icon: "Brush",
    phrase: "Identidade digital que fortalece sua empresa.",
    services: [
      "Portfólios interativos com animações",
      "Sites pessoais com integração social",
      "Showcases de produtos e serviços",
      "Páginas de apresentação corporativa",
      "Blog autoral com CMS integrado",
    ],
    stack: ["Figma", "Angular", "Tailwind CSS", "SCSS", "GSAP"],
    maxHeight: 58,
  },
  {
    id: "automation",
    name: "Automação & Integrações",
    icon: "Workflow",
    phrase: "Conecte sistemas e automatize processos.",
    services: [
      "Integração com APIs REST e terceiros",
      "Automação de disparo de emails e notificações",
      "Webhooks e integração em tempo real",
      "Importação e exportação de dados (CSV, Excel, PDF)",
      "Automação de relatórios e dashboards",
    ],
    stack: [
      "REST API",
      "GraphQL",
      "Webhooks",
      "OAuth",
      "Node.js",
      "Python",
      "n8n",
    ],
    maxHeight: 84,
  },
  {
    id: "maintenance",
    name: "Manutenção & Evolução",
    icon: "Wrench",
    phrase: "Seu sistema sempre atualizado e performando.",
    services: [
      "Correção de bugs e melhorias contínuas",
      "Atualização de versões e dependências",
      "Otimização de performance (velocidade, SEO)",
      "Monitoramento e backups regulares",
      "Suporte técnico e manutenção preventiva",
    ],
    stack: ["Git", "GitHub", "Docker", "CI/CD", "Jest", "Spring Boot"],
    maxHeight: 64,
  },
  {
    id: "consulting",
    name: "Consultoria & Estratégia",
    icon: "Lightbulb",
    phrase: "Planejamento técnico para decisões acertadas.",
    services: [
      "Análise de requisitos e definição de escopo",
      "Arquitetura de software e escolha tecnológica",
      "Code review e boas práticas de desenvolvimento",
      "Estratégia de migração e modernização",
      "Consultoria em UX/UI e experiência do usuário",
    ],
    stack: ["Arquitetura Web", "UX/UI", "SEO", "Angular", "Spring Boot"],
    maxHeight: 76,
  },
];

export const projectCopy = {
  title: "Alguns serviços da Maiawall",
  subtitle01: "Cada projeto é uma parceria focada em resultado.",
  subtitle02: "Conheça alguns trabalhos entregues pela empresa.",
  subtitle03: "Soluções reais criadas para ajudar negócios a crescer.",
  pages: "Páginas do projeto",
  cta: "Saiba Mais! →",
};

export { projects } from "./portfolio-projects";

export const legacyProjects = [
  {
    id: "portfolio-pessoal",
    title: "Portfólio Wallace Maia",
    description:
      "Portfólio Wallace Maia construído com Angular 19 para apresentar projetos, repertório técnico e serviços web em um formato moderno e interativo com suporte a temas claro e escuro.",
    year: "2025",
    liveUrl: "https://maiawall.com",
    technologies: ["Angular", "Tailwind CSS", "RxJS", "GSAP"],
    theme: {
      surface: "var(--dev-bg-surface)",
      accent: "var(--brand-red)",
      glow: "rgba(155, 27, 31, 0.35)",
    },
    pages: [
      "/assets/images/projects/portfolio-pessoal/portfolio-pessoal-1.png",
      "/assets/images/projects/portfolio-pessoal/portfolio-pessoal-2.png",
      "/assets/images/projects/portfolio-pessoal/portfolio-pessoal-3.png",
    ],
    video: {
      src: "/assets/images/projects/portfolio-pessoal/portfolio-pessoal-video.mp4",
      poster: "/assets/images/projects/portfolio-pessoal/thumbnail.png",
    },
  },
  {
    id: "banda-aurah",
    title: "Banda Aurah",
    description:
      "Site institucional completo para a banda Aurah, incluindo integração com redes sociais, player de música incorporado, galeria de fotos, shows e área de contato.",
    year: "2026",
    liveUrl: "https://portfolio-banda-aurah.vercel.app/",
    technologies: ["Angular", "Tailwind CSS", "Angular Material"],
    theme: {
      surface: "var(--dev-bg-card)",
      accent: "var(--brand-red-dark)",
      glow: "rgba(107, 11, 15, 0.3)",
    },
    pages: [
      "/assets/images/projects/banda-aurah/banda-aurah1.png",
      "/assets/images/projects/banda-aurah/banda-aurah2.png",
      "/assets/images/projects/banda-aurah/banda-aurah3.png",
    ],
    video: { src: "/assets/images/projects/banda-aurah/banda-aurah_video.mp4" },
  },
  {
    id: "instituto-motiro",
    title: "Instituto Motiro",
    description:
      "Plataforma institucional para o Instituto Motiro, organização sem fins lucrativos. O site conta com blog, área de doações, galeria de projetos e formulário de contato com integração de pagamentos.",
    year: "2026",
    liveUrl: "https://www.institutomotiro.com.br/",
    technologies: ["Vite", "Tailwind CSS", "TypeScript"],
    theme: {
      surface: "var(--dev-bg-elevated)",
      accent: "var(--brand-ink-muted)",
      glow: "rgba(91, 91, 91, 0.22)",
    },
    pages: [
      "/assets/images/projects/instituto-motiro/motiro1.png",
      "/assets/images/projects/instituto-motiro/motiro2.png",
      "/assets/images/projects/instituto-motiro/motiro3.png",
      "/assets/images/projects/instituto-motiro/motiro4.png",
    ],
    video: { src: "/assets/images/projects/instituto-motiro/motiro_video.mp4" },
  },
  {
    id: "painel-admin",
    title: "Painel Administrativo",
    description:
      "Painel administrativo completo com autenticação segura, gestão de usuários CRUD, relatórios analíticos com gráficos em tempo real e sistema de notificações. Interface limpa e responsiva.",
    year: "2026",
    liveUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7393610706035654656/",
    technologies: ["Angular", "TypeScript", "Angular Material"],
    theme: {
      surface: "var(--dev-bg-surface)",
      accent: "var(--brand-red)",
      glow: "rgba(155, 27, 31, 0.35)",
    },
    pages: [
      "/assets/images/projects/painel-admin/foto1.jpg",
      "/assets/images/projects/painel-admin/foto2.jpg",
      "/assets/images/projects/painel-admin/foto3.jpg",
      "/assets/images/projects/painel-admin/foto4.jpg",
    ],
  },
  {
    id: "schulles",
    title: "Schulle Website",
    description:
      "Landing page moderna para a Schulle's Gastronomia, com design sofisticado, apresentação de cardápio, reservas online e integração com redes sociais.",
    year: "2026",
    liveUrl: "https://www.schulles.com.br/",
    technologies: ["Angular", "TypeScript", "Angular Material"],
    theme: {
      surface: "var(--dev-bg-card)",
      accent: "var(--brand-red-dark)",
      glow: "rgba(107, 11, 15, 0.3)",
    },
    pages: [
      "/assets/images/projects/schulles/hero.jpg",
      "/assets/images/projects/schulles/mobile.jpg",
      "/assets/images/projects/schulles/plans.jpg",
    ],
  },
  {
    id: "portfolio-marcio-carvalho",
    title: "Portfólio Márcio Carvalho",
    description:
      "Site institucional em Next.js para apresentar a trajetória, formação, projetos culturais, produção acadêmica, música, mídia e canais de contato de Márcio Carvalho.",
    year: "2026",
    liveUrl: "https://www.marciofcarvalho.com.br",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "Zod",
      "Resend",
    ],
    theme: {
      surface: "var(--dev-bg-elevated)",
      accent: "var(--brand-ink-muted)",
      glow: "rgba(91, 91, 91, 0.22)",
    },
    pages: [
      "/assets/images/projects/portfolio-marcio-carvalho/imagem-1.png",
      "/assets/images/projects/portfolio-marcio-carvalho/imagem-2.png",
      "/assets/images/projects/portfolio-marcio-carvalho/imagem-3.png",
    ],
  },
  {
    id: "split-hub",
    title: "SplitHub",
    description:
      "Plataforma full stack para dividir despesas em grupo, controlar saldos, pagamentos, comprovantes, convites, planos e notificações em tempo real.",
    year: "2026",
    liveUrl: "https://splithub.maiawall.com",
    technologies: [
      "Angular",
      "Spring Boot",
      "PostgreSQL",
      "WebSocket",
      "OAuth2",
      "IA",
    ],
    theme: {
      surface: "var(--dev-bg-surface)",
      accent: "var(--brand-red)",
      glow: "rgba(155, 27, 31, 0.35)",
    },
    pages: [
      "/assets/images/projects/split-hub/imagem-1.png",
      "/assets/images/projects/split-hub/imagem-2.png",
      "/assets/images/projects/split-hub/imagem-3.png",
    ],
  },
];

export const stackCopy = {
  title: "Stack Maiawall",
  subtitle:
    "As tecnologias usadas para construir produtos reais — do front ao back, do protótipo ao deploy",
  frontendLabel: "Interface & Experiência",
  frontendDesc:
    "Interfaces modernas, rápidas e acessíveis. Do design ao componente final, com reatividade e performance de primeira.",
  backendLabel: "Lógica & Dados",
  backendDesc:
    "APIs robustas, seguras e escaláveis. Java + Spring para produção real, com Node.js para soluções ágeis e flexíveis.",
  allTechs: "Todas as tecnologias",
  traits: {
    frontend: ["Reativo", "Componentizado", "Performático", "Tipado"],
    backend: ["Robusto", "Seguro", "Escalável", "REST & JWT"],
  },
};

export const skillCategories: SkillCategory[] = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Banco" },
  { key: "tools", label: "Ferramentas" },
];

export const mainStacks = {
  frontend: [
    { id: "1", name: "Angular", icon: "/assets/icons/angular.svg" },
    { id: "3", name: "TypeScript", icon: "/assets/icons/typescript.svg" },
    { id: "7", name: "Tailwind CSS", icon: "/assets/icons/tailwind.svg" },
    { id: "22", name: "RxJS", icon: "/assets/icons/rxjs.svg" },
  ],
  backend: [
    { id: "2", name: "Java", icon: "/assets/icons/java.svg" },
    { id: "8", name: "Spring Boot", icon: "/assets/icons/spring.svg" },
    { id: "23", name: "Node.js", icon: "/assets/icons/nodejs.svg" },
    { id: "24", name: "Express", icon: "/assets/icons/express.svg" },
  ],
};

export const skills: Skill[] = [
  {
    id: "1",
    name: "Angular",
    category: "frontend",
    level: 5,
    icon: "/assets/icons/angular.svg",
  },
  {
    id: "3",
    name: "TypeScript",
    category: "frontend",
    level: 5,
    icon: "/assets/icons/typescript.svg",
  },
  {
    id: "4",
    name: "JavaScript",
    category: "frontend",
    level: 5,
    icon: "/assets/icons/javascript.svg",
  },
  {
    id: "5",
    name: "HTML5",
    category: "frontend",
    level: 5,
    icon: "/assets/icons/html5.svg",
  },
  {
    id: "6",
    name: "CSS3",
    category: "frontend",
    level: 4,
    icon: "/assets/icons/css3.svg",
  },
  {
    id: "7",
    name: "Tailwind CSS",
    category: "frontend",
    level: 4,
    icon: "/assets/icons/tailwind.svg",
  },
  {
    id: "21",
    name: "OAuth",
    category: "backend",
    level: 3,
    icon: "/assets/icons/oauth.svg",
  },
  {
    id: "22",
    name: "RxJS",
    category: "frontend",
    level: 4,
    icon: "/assets/icons/rxjs.svg",
  },
  {
    id: "28",
    name: "Angular Material",
    category: "frontend",
    level: 4,
    icon: "/assets/icons/angularMaterial.svg",
  },
  {
    id: "30",
    name: "PrimeNG",
    category: "frontend",
    level: 2,
    icon: "/assets/icons/primeng.svg",
  },
  {
    id: "31",
    name: "Vite",
    category: "frontend",
    level: 3,
    icon: "/assets/icons/vite.svg",
  },
  {
    id: "32",
    name: "React",
    category: "frontend",
    level: 4,
    icon: "/assets/icons/react.svg",
  },
  {
    id: "46",
    name: "Next.js",
    category: "frontend",
    level: 4,
    icon: "/assets/icons/nextjs.svg",
  },
  {
    id: "33",
    name: "Ionic",
    category: "frontend",
    level: 4,
    icon: "/assets/icons/ionic.svg",
  },
  {
    id: "34",
    name: "SCSS",
    category: "frontend",
    level: 4,
    icon: "/assets/icons/scss.svg",
  },
  {
    id: "2",
    name: "Java",
    category: "backend",
    level: 5,
    icon: "/assets/icons/java.svg",
  },
  {
    id: "8",
    name: "Spring Boot",
    category: "backend",
    level: 5,
    icon: "/assets/icons/spring.svg",
  },
  {
    id: "9",
    name: "Spring Security",
    category: "backend",
    level: 5,
    icon: "/assets/icons/springSecurity.svg",
  },
  {
    id: "19",
    name: "JUnit",
    category: "backend",
    level: 4,
    icon: "/assets/icons/junit.svg",
  },
  {
    id: "20",
    name: "Mockito",
    category: "backend",
    level: 4,
    icon: "/assets/icons/mockito.svg",
  },
  {
    id: "23",
    name: "Node.js",
    category: "backend",
    level: 5,
    icon: "/assets/icons/nodejs.svg",
  },
  {
    id: "24",
    name: "Express",
    category: "backend",
    level: 5,
    icon: "/assets/icons/express.svg",
  },
  {
    id: "26",
    name: "Spring Data JPA",
    category: "backend",
    level: 3,
    icon: "/assets/icons/jpa.svg",
  },
  {
    id: "43",
    name: "REST API",
    category: "backend",
    level: 5,
    icon: "/assets/icons/api.svg",
  },
  {
    id: "10",
    name: "MongoDB",
    category: "database",
    level: 4,
    icon: "/assets/icons/mongodb.svg",
  },
  {
    id: "11",
    name: "PostgreSQL",
    category: "database",
    level: 4,
    icon: "/assets/icons/postgresql.svg",
  },
  {
    id: "12",
    name: "MySQL",
    category: "database",
    level: 4,
    icon: "/assets/icons/mysql.svg",
  },
  {
    id: "35",
    name: "Firebase",
    category: "database",
    level: 4,
    icon: "/assets/icons/firebase.svg",
  },
  {
    id: "13",
    name: "Git",
    category: "tools",
    level: 5,
    icon: "/assets/icons/git.svg",
  },
  {
    id: "14",
    name: "Docker",
    category: "tools",
    level: 3,
    icon: "/assets/icons/docker.svg",
  },
  {
    id: "15",
    name: "AWS",
    category: "tools",
    level: 3,
    icon: "/assets/icons/aws.svg",
  },
  {
    id: "16",
    name: "Figma",
    category: "tools",
    level: 3,
    icon: "/assets/icons/figma.svg",
  },
  {
    id: "17",
    name: "Postman",
    category: "tools",
    level: 4,
    icon: "/assets/icons/postman.svg",
  },
  {
    id: "18",
    name: "Swagger",
    category: "tools",
    level: 4,
    icon: "/assets/icons/swagger.svg",
  },
  {
    id: "25",
    name: "Json-Server",
    category: "tools",
    level: 3,
    icon: "/assets/icons/json.svg",
  },
  {
    id: "27",
    name: "GitHub",
    category: "tools",
    level: 5,
    icon: "/assets/icons/github.svg",
  },
  {
    id: "29",
    name: "Linux",
    category: "tools",
    level: 2,
    icon: "/assets/icons/linux.svg",
  },
  {
    id: "39",
    name: "Vercel",
    category: "tools",
    level: 5,
    icon: "/assets/icons/vercel.svg",
  },
  {
    id: "45",
    name: "Maven",
    category: "tools",
    level: 4,
    icon: "/assets/icons/maven.svg",
  },
];

export const contactCopy = {
  title: "Vamos Conversar?",
  eyebrow: "Contato",
  subtitle:
    "A equipe da Maiawall está pronta para conversar sobre novos projetos web",
  formTitle: "Envie uma mensagem",
  sending: "Enviando...",
  send: "Enviar Mensagem",
  toastSuccess: "Mensagem enviada com sucesso. A Maiawall retornará em breve.",
  toastError: "Erro ao enviar mensagem. Tente novamente ou use o WhatsApp.",
};

export const contactInfo: ContactInfo = {
  email: "wallacemaia2007@gmail.com",
  phone: "+55 (35) 91003-6806",
  location: "Uberlândia, MG - Brasil",
  linkedin: "https://www.linkedin.com/in/wallacemaia-dev/",
  linkedinDisplay: "LinkedIn Maiawall",
  github: "https://github.com/wallacemaia2007",
  githubDisplay: "GitHub Maiawall",
  fiverr: "https://br.fiverr.com/wallace_maia?public_mode=true",
  fiverrDisplay: "Fiverr Maiawall",
};

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: links.github, src: "/assets/icons/github.svg" },
  { name: "LinkedIn", url: links.linkedin, src: "/assets/icons/linkedin.svg" },
  {
    name: "Instagram",
    url: links.instagram,
    src: "/assets/icons/instagram.png",
  },
  { name: "WhatsApp", url: links.whatsapp, src: "/assets/icons/whatsapp.svg" },
  { name: "Fiverr", url: links.fiverr, src: "/assets/icons/fiverr.svg" },
];

export const cta = {
  tag: "Disponível para projetos",
  title: "Pronto para tirar",
  accent: "sua ideia do papel?",
  subtitle:
    "A Maiawall transforma ideias em produtos digitais reais para empresas que precisam vender, organizar e crescer.",
  projectsBtn: "Ver Projetos",
  whatsappBtn: "Fale no WhatsApp",
};

export const terminalSnippets = [
  'git commit -m "feat: implement neural network background"',
  "npm install @angular/core gsap tailwindcss",
  "const brain = new NeuralNetwork({ layers: [64, 32, 16] });",
  "brain.train(trainingData, { iterations: 2500 });",
  'import { Component, AfterViewInit } from "@angular/core";',
  "export class StackComponent implements AfterViewInit { ... }",
  'gsap.to(".terminal-line", { opacity: 1, duration: 0.5, stagger: 0.1 });',
  "SELECT * FROM skills WHERE level >= 4 ORDER BY experience DESC;",
  "docker-compose up -d --build --force-recreate",
  "mvn clean install -DskipTests -Pproduction",
  "public class SpringBootApp { public static void main(String[] args) }",
  'fetch("/api/v1/projects").then(res => res.json()).then(render);',
  "const [skills, setSkills] = useState([]);",
  "kubectl apply -f k8s/deployment.yaml",
  "// Optimizing rendering performance for high-load apps...",
  "if (network.isStable()) { syncDatabaseState(); }",
  'console.log("%cWelcome to Maiawall!", "color: #9B1B1F; font-weight: bold;");',
  "git push origin main --force-with-lease",
  "sudo apt-get update && sudo apt-get upgrade -y",
  "const observer = new IntersectionObserver(entries => { ... });",
  "export interface Skill { id: string; name: string; level: number; }",
  'const data$ = this.http.get<Skill[]>("/api/skills").pipe(shareReplay(1));',
  "systemctl restart nginx.service && tail -f /var/log/nginx/access.log",
  "ssh -i ~/.ssh/id_rsa.pem ubuntu@api.manus.im",
];
