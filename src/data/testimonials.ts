import type { Testimonial } from "@/types/testimonial";

const forbidenUser: string =
  "https://media.istockphoto.com/id/1495088043/pt/vetorial/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=S7d8ImMSfoLBMCaEJOffTVua003OAl2xUnzOsuKIwek=";

export const socialProof = {
  id: "depoimentos",
  badge: "Prova Social",
  title: "Quem já confiou no trabalho",
  subtitle:
    "Depoimentos de clientes que tiraram o projeto do papel comigo — e o que aconteceu depois.",
  scrollHint: "Role para ver mais depoimentos",
  mobileHint: "Arraste para o lado",
};

export const testimonials: Testimonial[] = [
  {
    id: "motiro",
    clientName: "Instituto Motirõ",
    role: "Instituição Cultural",
    avatarUrl: forbidenUser,
    imageUrl: "/assets/images/testimonials/image/motiro.png",
    rating: 5,
    comment:
      "Migração completa do nosso site institucional sem dor de cabeça. Suporte rápido em qualquer ajuste que precisamos.",
    projectName: "Site Institucional Motirõ",
    projectUrl: "https://www.institutomotiro.com.br",
    date: "Jun/2026",
  },
  {
    id: "marcio",
    clientName: "Márcio Carvalho",
    role: "Historiador e Produtor Cultural",
    avatarUrl: forbidenUser,
    imageUrl: "/assets/images/testimonials/image/marcio.png",
    rating: 5,
    comment:
      "Portfólio moderno e funcional, com design elegante e integração com redes sociais. O site reflete minha identidade profissional e facilita a apresentação dos meus projetos.",
    projectName: "Portfólio Márcio Carvalho",
    projectUrl: "https://www.marciofcarvalho.com.br",
    date: "Jul/2026",
  },
  {
    id: "schulles",
    clientName: "Patrick",
    role: "Shulle's Gastronomia",
    avatarUrl: forbidenUser,
    imageUrl: "/assets/images/testimonials/image/schulles.jpg",
    rating: 5,
    comment:
      "Site funcional e bonito, com o gerencial melhorou a administração do meu negócio. A landing page ficou incrível, com design moderno e integração com redes sociais!",
    projectName: "Schulle Website",
    projectUrl: "https://www.schulles.com.br/",
    date: "Mai/2026",
  },
];
