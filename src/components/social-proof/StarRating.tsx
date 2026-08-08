"use client";

import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  className,
}: {
  rating: 1 | 2 | 3 | 4 | 5;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Avaliação: ${rating} de 5 estrelas`}
      className={cn("flex items-center gap-1", className)}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn(
            "h-4 w-4",
            index < rating
              ? "fill-[var(--brand-red)] text-[var(--brand-red)]"
              : "fill-[var(--section-border)] text-[var(--section-border)]",
          )}
        />
      ))}
    </div>
  );
}
