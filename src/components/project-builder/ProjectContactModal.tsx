"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { buildWhatsappMessage } from "@/lib/project/buildWhatsappMessage";
import { normalizePhone } from "@/lib/project/phone";
import { getProjectWhatsAppUrl } from "@/lib/project/whatsapp";
import { sendProjectLead } from "@/services/project-lead-service";
import type { ProjectBrief } from "@/types/project-builder";
import type {
  ClientContactData,
  ProjectLead,
  SubmissionStatus as LeadSubmissionStatus,
} from "@/types/project-lead";

import {
  contactFormSchema,
  ProjectContactForm,
  type ProjectContactFormValues,
} from "./ProjectContactForm";
import { ProjectContactSummary } from "./ProjectContactSummary";
import { SubmissionStatus } from "./SubmissionStatus";

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface ProjectContactModalProps {
  project: ProjectBrief | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectContactModal({
  project,
  isOpen,
  onClose,
}: ProjectContactModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const openTimer = useRef<number | null>(null);

  const [status, setStatus] = useState<LeadSubmissionStatus>("idle");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const form = useForm<ProjectContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      company: "",
      preferredContact: "",
      additionalMessage: "",
      consentToNewsletter: false,
    },
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      if (openTimer.current !== null) {
        window.clearTimeout(openTimer.current);
        openTimer.current = null;
      }
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen]);

  useEffect(
    () => () => {
      if (openTimer.current !== null) {
        window.clearTimeout(openTimer.current);
      }
    },
    [],
  );

  const handleClose = () => {
    if (status === "submitting") return;
    setStatus("idle");
    setWhatsappUrl("");
    onClose();
  };

  const handleValidSubmit = async (values: ProjectContactFormValues) => {
    if (status === "submitting" || !project) return;
    setStatus("submitting");

    const client: ClientContactData = {
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      whatsapp: normalizePhone(values.whatsapp),
      company: values.company?.trim() || undefined,
      preferredContact: values.preferredContact || undefined,
      additionalMessage: values.additionalMessage?.trim() || undefined,
      consentToNewsletter: Boolean(values.consentToNewsletter),
    };

    const payload: ProjectLead = {
      client,
      project,
      submittedAt: new Date().toISOString(),
    };

    try {
      await sendProjectLead(payload);

      const url = getProjectWhatsAppUrl(
        buildWhatsappMessage(client, project),
      );
      setWhatsappUrl(url);
      setStatus("success");
      form.reset();

      openTimer.current = window.setTimeout(() => {
        window.open(url, "_blank", "noopener,noreferrer");
      }, 1200);
    } catch {
      setStatus("error");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      handleClose();
      return;
    }

    if (event.key !== "Tab") return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter(
      (element) =>
        element.offsetParent !== null || element === document.activeElement,
    );

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && project ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            aria-hidden="true"
            onClick={handleClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-contact-title"
            aria-describedby="project-contact-description"
            onKeyDown={handleKeyDown}
            className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[92dvh] sm:rounded-3xl"
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, y: 40, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion ? undefined : { opacity: 0, y: 24, scale: 0.98 }
            }
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          >
            <header className="flex items-start justify-between gap-3 border-b border-[var(--section-border)] bg-[var(--section-tint)] px-4 py-4 sm:gap-4 sm:px-7 sm:py-5">
              <div className="min-w-0">
                <h2
                  id="project-contact-title"
                  className="font-heading text-lg font-bold leading-tight text-[var(--brand-ink)] sm:text-2xl"
                >
                  Vamos conversar sobre seu projeto?
                </h2>
                <p
                  id="project-contact-description"
                  className="mt-1 text-xs leading-relaxed text-[var(--brand-ink-muted)] sm:text-sm"
                >
                  Seu projeto está pronto para ser enviado. Deixe seus dados
                  para que a Maiawall entre em contato com você.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                disabled={status === "submitting"}
                aria-label="Fechar"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[var(--section-border)] bg-white text-[var(--brand-ink-muted)] transition-colors hover:border-dev/40 hover:text-dev disabled:pointer-events-none disabled:opacity-50 sm:h-10 sm:w-10"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain p-4 sm:p-7">
              {status === "success" || status === "error" ? (
                <SubmissionStatus
                  status={status === "success" ? "success" : "error"}
                  whatsappUrl={status === "success" ? whatsappUrl : undefined}
                  onRetry={status === "error" ? () => setStatus("idle") : undefined}
                />
              ) : (
                <FormProvider {...form}>
                  <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-6">
                    <div className="order-2 min-w-0 lg:order-1">
                      <ProjectContactForm
                        isSubmitting={status === "submitting"}
                        onValidSubmit={handleValidSubmit}
                      />
                    </div>
                    <div className="order-1 min-w-0 lg:order-2">
                      <ProjectContactSummary project={project} />
                    </div>
                  </div>
                </FormProvider>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
