import { WHATSAPP_NUMBER } from "@/constants/site";

export function getWhatsAppProjectLink(project: string) {
  const message = `Olá, Maiawall! Quero saber mais sobre ${project} e como posso contratar os serviços da empresa.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppWorkLink(work: string) {
  const message = `Olá, Maiawall! Quero saber mais sobre como funciona ${work} e como posso contratar os serviços da empresa.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
