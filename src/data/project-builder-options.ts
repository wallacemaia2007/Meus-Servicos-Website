import type { ProjectCategory } from "@/types/project-builder";

export const projectBuilderCopy = {
  eyebrow: "Monte seu projeto",
  title: "Monte seu projeto",
  subtitle:
    "Conte um pouco sobre o que você precisa e monte uma primeira visão do seu projeto. Você escolhe as características e eu entro em contato para entender os detalhes e transformar sua ideia em uma solução real.",
  progressLabel: "Seu projeto está {percent}% definido",
  progressSteps: "{filled} de {total} etapas preenchidas",
  summaryTitle: "Seu projeto",
  summaryEmpty:
    "Suas escolhas aparecerão aqui em tempo real. Explore as categorias ao lado para montar seu briefing.",
  notesTitle: "Quer explicar melhor sua ideia?",
  notesPlaceholder:
    'Ex: "Tenho uma clínica e gostaria de criar um sistema onde meus clientes possam agendar consultas e minha equipe consiga administrar os horários."',
  notesMaxLength: 500,
  notesOptional: "Opcional",
  otherInputTitle: "Nos conte mais sobre isso",
  otherInputPlaceholder: "Descreva em poucas palavras o que você tem em mente...",
  otherInputMaxLength: 120,
  technologyInputTitle: "Qual tecnologia você tem em mente?",
  technologyInputPlaceholder: "Ex: Angular, React, Node.js...",
  technologyInputMaxLength: 80,
  submitLabel: "Quero enviar meu projeto",
  submitHint:
    "Suas escolhas serão enviadas para que possamos entender melhor sua ideia.",
  submitBlockedHint:
    "Preencha todas as etapas para habilitar o envio do seu briefing.",
};

export const projectBuilderCategories: ProjectCategory[] = [
  {
    id: "projectType",
    title: "O que você quer criar?",
    mode: "single",
    required: true,
    options: [
      {
        id: "landing-page",
        label: "Landing Page",
        description:
          "Uma página focada em apresentar, captar leads ou gerar conversões.",
        icon: "Rocket",
      },
      {
        id: "institutional-site",
        label: "Site Institucional",
        description:
          "Um site completo para apresentar sua empresa, serviços e história.",
        icon: "Building2",
      },
      {
        id: "portfolio",
        label: "Portfólio",
        description:
          "Um espaço para mostrar seus trabalhos, projetos e trajetória.",
        icon: "Briefcase",
      },
      {
        id: "ecommerce",
        label: "E-commerce",
        description:
          "Uma loja online para vender produtos ou serviços na internet.",
        icon: "ShoppingBag",
      },
      {
        id: "web-system",
        label: "Sistema Web",
        description: "Uma aplicação feita sob medida para o seu processo.",
        icon: "Workflow",
      },
      {
        id: "crm",
        label: "CRM",
        description:
          "Uma solução para organizar clientes, vendas e relacionamento.",
        icon: "Users",
      },
      {
        id: "erp",
        label: "ERP",
        description:
          "Uma plataforma para centralizar processos e gestão do negócio.",
        icon: "ClipboardList",
      },
      {
        id: "dashboard",
        label: "Dashboard",
        description:
          "Um painel com indicadores e informações importantes em um só lugar.",
        icon: "BarChart3",
      },
      {
        id: "saas",
        label: "SaaS",
        description:
          "Um produto digital desenvolvido para oferecer um serviço online.",
        icon: "Cloud",
      },
      {
        id: "web-app",
        label: "Aplicativo Web",
        description: "Um aplicativo acessível pelo navegador, sem instalação.",
        icon: "AppWindow",
      },
      {
        id: "other",
        label: "Outro / Ainda não sei",
        description:
          "Não sabe ainda? Sem problemas, podemos conversar sobre isso.",
        icon: "HelpCircle",
      },
    ],
  },
  {
    id: "features",
    title: "O que seu projeto precisa fazer?",
    description: "Selecione tudo que fizer sentido para o que você imagina.",
    mode: "multiple",
    options: [
      {
        id: "auth",
        label: "Cadastro e login de usuários",
        icon: "UserCircle",
      },
      {
        id: "roles",
        label: "Diferentes níveis de acesso",
        icon: "Shield",
      },
      {
        id: "admin-panel",
        label: "Painel administrativo",
        icon: "Settings",
      },
      {
        id: "client-management",
        label: "Gestão de clientes",
        icon: "Users",
      },
      {
        id: "user-management",
        label: "Gestão de usuários",
        icon: "UserCog",
      },
      {
        id: "product-management",
        label: "Gestão de produtos",
        icon: "Package",
      },
      {
        id: "order-management",
        label: "Gestão de pedidos",
        icon: "ClipboardList",
      },
      {
        id: "financial",
        label: "Controle financeiro",
        icon: "Wallet",
      },
      {
        id: "scheduling",
        label: "Agendamento",
        icon: "CalendarDays",
      },
      {
        id: "customer-area",
        label: "Área do cliente",
        icon: "User",
      },
      {
        id: "dashboard",
        label: "Dashboard e indicadores",
        icon: "BarChart3",
      },
      {
        id: "reports",
        label: "Relatórios",
        icon: "FileText",
      },
      {
        id: "search",
        label: "Busca e filtros",
        icon: "Search",
      },
      {
        id: "upload",
        label: "Upload de arquivos",
        icon: "CloudUpload",
      },
      {
        id: "notifications",
        label: "Notificações",
        icon: "Bell",
      },
      {
        id: "payments",
        label: "Sistema de pagamentos",
        icon: "CreditCard",
      },
      {
        id: "apis",
        label: "Integrações com APIs",
        icon: "Plug",
      },
      {
        id: "automation",
        label: "Automação de processos",
        icon: "Zap",
      },
      {
        id: "chat",
        label: "Chat ou comunicação",
        icon: "MessageSquare",
      },
      {
        id: "cms",
        label: "Blog / CMS",
        icon: "PenLine",
      },
      {
        id: "multi-company",
        label: "Multiempresa",
        icon: "Layers",
      },
      {
        id: "portfolio-showcase",
        label: "Mostrar meus projetos e trabalhos",
        icon: "FolderOpen",
      },
      {
        id: "about-section",
        label: "Seção sobre mim",
        icon: "UserRound",
      },
      {
        id: "work-gallery",
        label: "Galeria de fotos e trabalhos",
        icon: "Images",
      },
      {
        id: "online-resume",
        label: "Currículo online",
        icon: "IdCard",
      },
      {
        id: "biography",
        label: "Biografia e trajetória",
        icon: "BookOpenText",
      },
      {
        id: "other",
        label: "Outro",
        icon: "HelpCircle",
      },
    ],
  },
  {
    id: "objective",
    title: "Qual é o principal objetivo?",
    description:
      "Isso nos ajuda a entender o motivo por trás do seu projeto.",
    mode: "single",
    required: true,
    options: [
      {
        id: "present-company",
        label: "Apresentar minha empresa",
        icon: "Building2",
      },
      {
        id: "attract-customers",
        label: "Atrair novos clientes",
        icon: "Megaphone",
      },
      {
        id: "sell",
        label: "Vender produtos ou serviços",
        icon: "ShoppingBag",
      },
      {
        id: "organize-business",
        label: "Organizar meu negócio",
        icon: "LayoutDashboard",
      },
      {
        id: "automate",
        label: "Automatizar processos",
        icon: "Workflow",
      },
      {
        id: "centralize-info",
        label: "Centralizar informações",
        icon: "Database",
      },
      {
        id: "biography",
        label: "Contar minha história (biografia)",
        icon: "BookUser",
      },
      {
        id: "digital-product",
        label: "Criar um produto digital",
        icon: "Sparkles",
      },
      {
        id: "online-presence",
        label: "Melhorar minha presença online",
        icon: "Globe",
      },
      {
        id: "digitize",
        label: "Transformar um processo manual em sistema",
        icon: "RefreshCw",
      },
      {
        id: "defining",
        label: "Ainda estou definindo",
        icon: "HelpCircle",
      },
    ],
  },
  {
    id: "users",
    title: "Quem vai utilizar?",
    description: "Quem você imagina usando o projeto no dia a dia.",
    mode: "multiple",
    options: [
      { id: "clients", label: "Clientes", icon: "User" },
      { id: "employees", label: "Funcionários", icon: "UserCog" },
      { id: "administrators", label: "Administradores", icon: "Shield" },
      { id: "sales-team", label: "Equipe comercial", icon: "Target" },
      { id: "managers", label: "Gestores", icon: "Gauge" },
      { id: "students", label: "Alunos", icon: "GraduationCap" },
      { id: "professionals", label: "Profissionais", icon: "Briefcase" },
      { id: "general-public", label: "Público geral", icon: "Users" },
      { id: "partners", label: "Parceiros", icon: "Handshake" },
      { id: "personal", label: "Pessoal (para mim mesmo)", icon: "UserRound" },
      { id: "other", label: "Outro", icon: "HelpCircle" },
    ],
  },
  {
    id: "integrations",
    title: "Precisa conversar com outras ferramentas?",
    description:
      "Caso você já utilize outras ferramentas, podemos considerar integrações para evitar processos manuais.",
    mode: "multiple",
    exclusiveId: "none",
    options: [
      { id: "whatsapp", label: "WhatsApp", icon: "MessageSquare" },
      { id: "email", label: "E-mail", icon: "Mail" },
      { id: "google", label: "Google", icon: "Globe" },
      { id: "social-media", label: "Redes sociais", icon: "Share2" },
      { id: "external-systems", label: "Sistemas externos", icon: "Building2" },
      { id: "apis", label: "APIs", icon: "Plug" },
      { id: "payments", label: "Meios de pagamento", icon: "CreditCard" },
      { id: "existing-database", label: "Banco de dados existente", icon: "Database" },
      { id: "automation", label: "Automação", icon: "Zap" },
      { id: "unsure", label: "Ainda não sei", icon: "HelpCircle" },
      { id: "none", label: "Nenhuma integração", icon: "X" },
    ],
  },
  {
    id: "design",
    title: "Como você imagina a aparência?",
    mode: "single",
    options: [
      {
        id: "ready-identity",
        label: "Tenho uma identidade visual pronta",
        icon: "Palette",
      },
      {
        id: "follow-brand",
        label: "Quero seguir minha marca atual",
        icon: "Brush",
      },
      {
        id: "custom-design",
        label: "Quero um design personalizado",
        icon: "WandSparkles",
      },
      {
        id: "help-visual",
        label: "Quero ajuda para definir o visual",
        icon: "Lightbulb",
      },
      {
        id: "no-identity",
        label: "Ainda não tenho uma identidade visual",
        icon: "Eye",
      },
    ],
  },
  {
    id: "projectStage",
    title: "Em que estágio está sua ideia?",
    description:
      "Isso nos ajuda a entender de onde estamos partindo.",
    mode: "single",
    required: true,
    options: [
      { id: "idea", label: "É apenas uma ideia", icon: "Sparkles" },
      { id: "references", label: "Tenho referências", icon: "Search" },
      { id: "design", label: "Já tenho um design", icon: "Palette" },
      {
        id: "started",
        label: "Já tenho um projeto iniciado",
        icon: "Rocket",
      },
      {
        id: "reformulate",
        label: "Quero reformular algo existente",
        icon: "RefreshCw",
      },
      {
        id: "evolve",
        label: "Já tenho um sistema e quero evoluí-lo",
        icon: "TrendingUp",
      },
      {
        id: "defined",
        label: "Já tenho tudo definido",
        icon: "CheckCircle2",
      },
    ],
  },
  {
    id: "deadline",
    title: "Quando você gostaria de colocar o projeto em prática?",
    mode: "single",
    options: [
      { id: "planning", label: "Ainda estou planejando", icon: "Compass" },
      { id: "next-months", label: "Nos próximos meses", icon: "CalendarDays" },
      { id: "soon", label: "Quero começar em breve", icon: "Rocket" },
      { id: "defined-date", label: "Tenho uma data definida", icon: "CalendarCheck" },
      { id: "discuss", label: "Preciso conversar para definir", icon: "MessageSquare" },
    ],
  },
  {
    id: "technology",
    title: "Já possui alguma preferência tecnológica?",
    description:
      "Fica tranquilo: você não precisa entender de tecnologia para continuar.",
    mode: "single",
    options: [
      { id: "no-preference", label: "Não tenho preferência", icon: "HelpCircle" },
      { id: "recommend", label: "Quero que você recomende", icon: "Sparkles" },
      { id: "defined", label: "Já tenho uma tecnologia definida", icon: "Code" },
      { id: "discuss", label: "Quero conversar sobre isso", icon: "MessageSquare" },
    ],
  },
];

export const projectBuilderRequiredCategories = ["projectType", "objective", "projectStage"];
