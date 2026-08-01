const phone = "5535910036806";

export function getWhatsAppProjectLink(project: string) {
  const message = `Olá! Quero saber mais sobre ${project} e como posso contratar seus serviços!`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppWorkLink(work: string) {
  const message = `Olá! Quero saber mais sobre como funciona ${work} e como posso contratar seus serviços!`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
