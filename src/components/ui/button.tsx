import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] font-semibold text-sm transition-[transform,box-shadow,background] duration-250 cursor-pointer disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-dev !text-white shadow-dev hover:-translate-y-0.5 hover:shadow-dev-strong [&_*]:!text-white",
        ghost:
          "border border-white/20 bg-transparent text-white/85 hover:bg-white/6 hover:border-white/35",
        outline:
          "border border-border bg-transparent text-text hover:border-brand hover:bg-brand/8",
      },
      size: {
        default: "px-7 py-3.5",
        sm: "px-4 py-2 text-[13px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { buttonVariants };
