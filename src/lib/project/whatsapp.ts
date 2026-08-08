import { WHATSAPP_NUMBER } from "@/constants/site";

export function getProjectWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
