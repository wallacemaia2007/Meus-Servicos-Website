import type { Testimonial } from "@/types/testimonial";

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
    avatarUrl: "https://i.pravatar.cc/150?u=instituto-motiro",
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
    avatarUrl: "https://i.pravatar.cc/150?u=marcio-carvalho",
    rating: 5,
    comment:
      "O Wallace entendeu exatamente o tom que eu queria pro meu portfólio cultural. Site profissional, rápido e do jeito que eu imaginava.",
    projectName: "Portfólio Márcio Carvalho",
    projectUrl: "https://www.marciofcarvalho.com.br",
    date: "Jul/2026",
  },
  {
    id: "schulles",
    clientName: "Schulle",
    role: "Marca Schulle",
    avatarUrl: "https://i.pravatar.cc/150?u=schulle",
    rating: 5,
    comment:
      "O novo site institucional elevou a percepção da marca e uniu catálogo, e-commerce e blog em um só lugar. Design sofisticado e rápido.",
    projectName: "Schulle Website",
    projectUrl: "https://www.schulles.com.br/",
    date: "Mai/2026",
  },
];
