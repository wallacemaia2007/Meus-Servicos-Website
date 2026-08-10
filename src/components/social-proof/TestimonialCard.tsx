import { ExternalLink, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/testimonial";

import { StarRating } from "./StarRating";

export function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <article
      data-fall-reveal
      className={cn(
        "relative flex h-full w-[min(88vw,400px)] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-[var(--section-border)] bg-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.35)] transition-shadow duration-300 hover:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.45)] sm:w-[min(70vw,480px)] lg:w-[min(32vw,520px)]",
        className,
      )}
    >
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-[var(--brand-red-tint)]">
        {testimonial.imageUrl ? (
          <Image
            src={testimonial.imageUrl}
            alt={`Imagem do projeto ${testimonial.projectName}`}
            fill
            sizes="(min-width: 1024px) 32vw, (min-width: 768px) 70vw, 88vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 opacity-50">
            <ImageIcon
              className="h-10 w-10 text-[var(--brand-red)]"
              aria-hidden="true"
            />
            <span className="text-xs font-semibold text-[var(--brand-red)]">
              Sua imagem 16:9 aqui
            </span>
          </div>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-6 sm:p-7 lg:p-8">
        <div className="flex items-center gap-3">
          <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[rgba(155,27,31,0.18)]">
            <Image
              src={testimonial.avatarUrl}
              alt={`Foto de ${testimonial.clientName}`}
              width={96}
              height={96}
              sizes="96px"
              className="h-full w-full object-cover"
            />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-body truncate text-base font-bold leading-tight text-[var(--brand-ink)]">
              {testimonial.clientName}
            </h3>
            <p className="truncate text-xs font-medium text-[var(--brand-ink-muted)]">
              {testimonial.role}
            </p>
          </div>
          {testimonial.date ? (
            <span className="shrink-0 rounded-full border border-[var(--section-border)] bg-[var(--brand-red-tint)] px-3 py-1 text-xs font-bold text-[var(--brand-red)]">
              {testimonial.date}
            </span>
          ) : null}
        </div>

        <StarRating rating={testimonial.rating} className="mt-4" />

        <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--brand-ink-muted)]">
          &ldquo;{testimonial.comment}&rdquo;
        </p>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--section-border)] pt-4">
          <span className="min-w-0 truncate rounded-full bg-[var(--brand-red-tint)] px-3 py-1 text-xs font-bold text-[var(--brand-red)]">
            {testimonial.projectName}
          </span>
          {testimonial.projectUrl ? (
            <a
              href={testimonial.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver projeto ${testimonial.projectName} em nova aba`}
              className="flex min-w-[5.5rem] shrink-0 items-center justify-center gap-1.5 rounded-full border border-[var(--section-border)] bg-white px-3 py-1 text-xs font-semibold !text-[var(--brand-red)] transition-colors hover:border-[var(--brand-red)] hover:bg-[var(--brand-red-tint)] hover:!text-[var(--brand-red-dark)] [&_*]:!text-inherit"
            >
              Online
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default TestimonialCard;
