"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  contactCopy,
  contactInfo,
  links,
  socialLinks,
} from "@/data/dev-content";
import { contactService } from "@/services/contact-service";
import type { ContactPayload } from "@/types";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const contactSchema = z.object({
  name: z.string().min(3, "Mínimo de 3 caracteres"),
  email: z.string().email("Email inválido"),
  subject: z.string().optional(),
  message: z.string().min(10, "Mínimo de 10 caracteres"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const mutation = useMutation({
    mutationFn: (payload: ContactPayload) => contactService.send(payload),
    onSuccess: () => {
      toast.success(contactCopy.toastSuccess);
      reset();
    },
    onError: () => {
      toast.error(contactCopy.toastError);
    },
  });

  const onSubmit = handleSubmit((values) => mutation.mutate(values));
  const viewport = { once: true, amount: 0.2 };

  return (
    <section
      id="contact"
      className="bg-[var(--section-surface)] py-16 transition-colors duration-300 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHeader
          eyebrow={contactCopy.eyebrow}
          title={contactCopy.title}
          subtitle={contactCopy.subtitle}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <motion.div
            className="order-2 lg:order-1"
            initial={prefersReducedMotion ? false : { opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: prefersReducedMotion ? 0 : 0.55 }}
          >
            <div className="rounded-2xl border border-[var(--section-border)] bg-white p-6 shadow-[0_24px_70px_-50px_rgba(155,27,31,0.7)] md:p-8">
              <h3 className="font-body mb-6 text-xl font-bold text-[var(--brand-ink)]">
                {contactCopy.formTitle}
              </h3>
              <form onSubmit={onSubmit} className="space-y-5">
                <FieldError error={errors.name?.message}>
                  <Label htmlFor="contact-name">Nome *</Label>
                  <Input
                    id="contact-name"
                    placeholder="Seu nome completo"
                    aria-invalid={Boolean(errors.name)}
                    {...register("name")}
                  />
                </FieldError>
                <FieldError error={errors.email?.message}>
                  <Label htmlFor="contact-email">Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="seu@email.com"
                    aria-invalid={Boolean(errors.email)}
                    {...register("email")}
                  />
                </FieldError>
                <div className="grid gap-1.5">
                  <Label htmlFor="contact-subject">Assunto</Label>
                  <Input
                    id="contact-subject"
                    placeholder="Assunto da mensagem"
                    {...register("subject")}
                  />
                </div>
                <FieldError error={errors.message?.message}>
                  <Label htmlFor="contact-message">Mensagem *</Label>
                  <Textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Descreva seu projeto ou dúvida..."
                    aria-invalid={Boolean(errors.message)}
                    {...register("message")}
                  />
                </FieldError>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={mutation.isPending}
                  className="w-full"
                >
                  {mutation.isPending ? contactCopy.sending : contactCopy.send}
                </Button>
              </form>
            </div>
          </motion.div>

          <div className="order-1 space-y-3 sm:space-y-4 lg:order-2">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
            >
              <ContactCard
                href={links.email}
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                value={contactInfo.email}
              />
            </motion.div>
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                delay: prefersReducedMotion ? 0 : 0.06,
              }}
            >
              <ContactCard
                href={links.whatsapp}
                icon={
                  <img
                    src="/assets/icons/whatsapp.svg"
                    alt=""
                    className="h-6 w-6"
                  />
                }
                label="WhatsApp"
                value={contactInfo.phone}
              />
            </motion.div>
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                delay: prefersReducedMotion ? 0 : 0.12,
              }}
            >
              <ContactCard
                href={contactInfo.linkedin}
                icon={
                  <img
                    src="/assets/icons/linkedin.svg"
                    alt=""
                    className="h-6 w-6"
                  />
                }
                label="LinkedIn"
                value={contactInfo.linkedinDisplay}
              />
            </motion.div>
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                delay: prefersReducedMotion ? 0 : 0.18,
              }}
            >
              <ContactCard
                href={contactInfo.github}
                icon={
                  <img
                    src="/assets/icons/github.svg"
                    alt=""
                    className="h-6 w-6"
                  />
                }
                label="GitHub"
                value={contactInfo.githubDisplay}
              />
            </motion.div>
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                delay: prefersReducedMotion ? 0 : 0.24,
              }}
            >
              <ContactCard
                href={contactInfo.fiverr}
                icon={
                  <img
                    src="/assets/icons/fiverr.svg"
                    alt=""
                    className="h-6 w-6"
                  />
                }
                label="Fiverr"
                value={contactInfo.fiverrDisplay}
              />
            </motion.div>
            <motion.div
              className="flex items-center gap-4 rounded-2xl border border-[var(--section-border)] bg-white p-5 shadow-sm"
              initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                delay: prefersReducedMotion ? 0 : 0.3,
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-red-tint)] text-dev">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-[var(--brand-ink-muted)]">
                  Localização
                </p>
                <p className="mt-0.5 break-all text-sm font-bold text-[var(--brand-ink)]">
                  {contactInfo.location}
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex flex-wrap gap-3 pt-4"
              initial={
                prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }
              }
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewport}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.35,
                delay: prefersReducedMotion ? 0 : 0.36,
              }}
            >
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-12 w-12 place-items-center rounded-xl border border-[var(--section-border)] bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-dev/40 hover:bg-[var(--brand-red-tint)]"
                  aria-label={link.name}
                >
                  <img
                    src={link.src}
                    alt=""
                    className="h-6 w-6 object-contain"
                  />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldError({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="grid gap-1.5">
      {children}
      {error ? (
        <p className="text-xs text-[var(--brand-red-dark)]">{error}</p>
      ) : null}
    </div>
  );
}

function ContactCard({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-2xl border border-[var(--section-border)] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-dev/30 hover:bg-[rgba(250,233,233,0.42)]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-red-tint)] text-dev transition-colors group-hover:bg-dev group-hover:!text-white">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase text-[var(--brand-ink-muted)]">
          {label}
        </p>
        <p className="mt-0.5 truncate break-all text-sm font-bold text-[var(--brand-ink)]">
          {value}
        </p>
      </div>
    </a>
  );
}
