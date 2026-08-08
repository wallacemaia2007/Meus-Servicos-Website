"use client";

import { useFormContext } from "react-hook-form";
import { z } from "zod";

import {
  formatPhoneInput,
  isValidBrPhone,
} from "@/lib/project/phone";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome.")
    .max(80, "Nome muito longo."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Informe um e-mail válido.")
    .max(120, "E-mail muito longo."),
  whatsapp: z
    .string()
    .refine((value) => isValidBrPhone(value), "Informe um WhatsApp válido."),
  company: z.string().trim().max(120).optional(),
  preferredContact: z.string().max(40).optional(),
  additionalMessage: z.string().trim().max(1000).optional(),
  consentToNewsletter: z.boolean().optional(),
});

export type ProjectContactFormValues = z.infer<typeof contactFormSchema>;

const PREFERRED_CONTACT_OPTIONS = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "E-mail" },
  { value: "call", label: "Ligação" },
  { value: "no-preference", label: "Tanto faz" },
] as const;

export interface ProjectContactFormProps {
  isSubmitting: boolean;
  onValidSubmit: (values: ProjectContactFormValues) => void;
}

export function ProjectContactForm({
  isSubmitting,
  onValidSubmit,
}: ProjectContactFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ProjectContactFormValues>();

  const preferredContact = watch("preferredContact");

  return (
    <form
      onSubmit={handleSubmit(onValidSubmit)}
      noValidate
      className="min-w-0 space-y-4 sm:space-y-5"
    >
      <FieldError error={errors.name?.message} errorId="pc-name-error">
        <Label htmlFor="pc-name">Nome *</Label>
        <Input
          id="pc-name"
          autoFocus
          placeholder="Seu nome completo"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "pc-name-error" : undefined}
          disabled={isSubmitting}
          {...register("name")}
        />
      </FieldError>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldError error={errors.email?.message} errorId="pc-email-error">
          <Label htmlFor="pc-email">E-mail *</Label>
          <Input
            id="pc-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="seu@email.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "pc-email-error" : undefined}
            disabled={isSubmitting}
            {...register("email")}
          />
        </FieldError>

        <FieldError error={errors.whatsapp?.message} errorId="pc-whatsapp-error">
          <Label htmlFor="pc-whatsapp">WhatsApp *</Label>
          <Input
            id="pc-whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(00) 00000-0000"
            aria-invalid={Boolean(errors.whatsapp)}
            aria-describedby={errors.whatsapp ? "pc-whatsapp-error" : undefined}
            disabled={isSubmitting}
            {...register("whatsapp")}
            onChange={(event) =>
              setValue("whatsapp", formatPhoneInput(event.target.value), {
                shouldValidate: true,
              })
            }
          />
        </FieldError>
      </div>

      <FieldError error={errors.company?.message} errorId="pc-company-error">
        <Label htmlFor="pc-company">Empresa</Label>
        <Input
          id="pc-company"
          placeholder="Opcional"
          aria-invalid={Boolean(errors.company)}
          disabled={isSubmitting}
          {...register("company")}
        />
      </FieldError>

      <div className="grid gap-1.5">
        <span className="text-sm font-medium leading-none text-foreground">
          Preferência de contato
        </span>
        <div
          role="radiogroup"
          aria-label="Preferência de contato"
          className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
        >
          {PREFERRED_CONTACT_OPTIONS.map((option) => {
            const selected = preferredContact === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={isSubmitting}
                onClick={() =>
                  setValue("preferredContact", option.value, {
                    shouldValidate: true,
                  })
                }
                className={cn(
                  "min-w-0 rounded-full border px-3 py-2 text-center text-xs font-semibold leading-none transition-all duration-200 sm:px-4 sm:py-1.5",
                  selected
                    ? "border-dev bg-[var(--brand-red-tint)] text-dev"
                    : "border-[var(--section-border)] bg-white text-[var(--brand-ink-muted)] hover:border-dev/40 hover:bg-[var(--brand-red-tint)]/40",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <FieldError
        error={errors.additionalMessage?.message}
        errorId="pc-message-error"
      >
        <Label htmlFor="pc-message">
          Mensagem adicional
          <span className="font-normal text-[var(--brand-ink-muted)]">
            {" "}
            (opcional)
          </span>
        </Label>
        <Textarea
          id="pc-message"
          rows={3}
          placeholder="Quer nos contar mais alguma coisa sobre o seu projeto?"
          aria-invalid={Boolean(errors.additionalMessage)}
          disabled={isSubmitting}
          className="max-h-32 resize-none"
          {...register("additionalMessage")}
        />
      </FieldError>

      <div className="flex items-start gap-2">
        <input
          id="pc-newsletter"
          type="checkbox"
          disabled={isSubmitting}
          className="mt-0.5 h-3.5 w-3.5 shrink-0 cursor-pointer accent-[var(--brand-red)] disabled:cursor-not-allowed disabled:opacity-50"
          {...register("consentToNewsletter")}
        />
        <label
          htmlFor="pc-newsletter"
          className="text-[11px] leading-snug text-[var(--brand-ink-muted)]"
        >
          Autorizo o envio de e-mails e mensagens com novidades sobre os
          projetos da Maiawall.
          <span className="font-semibold text-[var(--brand-ink)]">
            {" "}
            (opcional)
          </span>
        </label>
      </div>

      <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Enviando projeto..." : "Enviar meu projeto"}
      </Button>
    </form>
  );
}

function FieldError({
  children,
  error,
  errorId,
}: {
  children: React.ReactNode;
  error?: string;
  errorId?: string;
}) {
  return (
    <div className="grid gap-1.5">
      {children}
      {error ? (
        <p id={errorId} className="text-xs text-[var(--brand-red-dark)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
