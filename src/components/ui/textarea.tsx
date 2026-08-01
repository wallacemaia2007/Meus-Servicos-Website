import * as React from "react";

import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full resize-y rounded-[var(--radius-sm)] border border-border bg-bg/80 px-4 py-3 text-sm text-text transition-[border-color,box-shadow] placeholder:text-muted/60 focus:border-brand focus:outline-none focus:ring-[3px] focus:ring-brand/30",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
