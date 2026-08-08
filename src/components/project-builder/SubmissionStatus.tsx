"use client";

import { CheckCircle2, XCircle } from "lucide-react";

import { Button, buttonVariants } from "../ui/button";

export interface SubmissionStatusProps {
  status: "success" | "error";
  whatsappUrl?: string;
  onRetry?: () => void;
}

export function SubmissionStatus({
  status,
  whatsappUrl,
  onRetry,
}: SubmissionStatusProps) {
  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-4 py-10 text-center"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-red-tint)] text-dev">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <div>
          <h3 className="font-heading text-2xl font-bold text-[var(--brand-ink)]">
            Projeto enviado com sucesso!
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[var(--brand-ink-muted)]">
            Agora vamos abrir o WhatsApp para você continuar a conversa sobre o
            seu projeto.
          </p>
        </div>
        {whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "primary" })}
          >
            Abrir WhatsApp
          </a>
        ) : null}
        <p className="text-xs text-[var(--brand-ink-muted)]">
          Seu projeto foi enviado. Você também pode continuar a conversa pelo
          WhatsApp quando quiser.
        </p>
      </div>
    );
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex flex-col items-center gap-4 py-10 text-center"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-red-tint)] text-dev">
        <XCircle className="h-9 w-9" />
      </span>
      <div>
        <h3 className="font-heading text-2xl font-bold text-[var(--brand-ink)]">
          Não conseguimos enviar seu projeto
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[var(--brand-ink-muted)]">
          Verifique sua conexão e tente novamente. Se o problema continuar,
          entre em contato direto pelo WhatsApp.
        </p>
      </div>
      {onRetry ? (
        <Button
          type="button"
          variant="primary"
          onClick={onRetry}
          className="w-full sm:w-auto"
        >
          Tentar novamente
        </Button>
      ) : null}
    </div>
  );
}
