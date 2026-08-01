import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "w-full rounded-[var(--radius-sm)] border border-border bg-bg/80 px-4 py-3 text-sm text-text transition-[border-color,box-shadow] placeholder:text-muted/60 focus:border-brand focus:outline-none focus:ring-[3px] focus:ring-brand/30",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
