import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface RetroBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "teal" | "orange" | "purple" | "pink";
  children: ReactNode;
}

export function RetroBadge({
  children,
  className,
  variant = "teal",
  ...props
}: RetroBadgeProps) {
  const variantStyles = {
    teal: "bg-primary/15 text-primary/90 border-primary/40",
    orange: "bg-secondary/15 text-secondary/90 border-secondary/40",
    purple: "bg-accent/15 text-accent/90 border-accent/40",
    pink: "bg-[#ff6b9d]/15 text-[#ff6b9d]/90 border-[#ff6b9d]/40",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1.5 text-xs font-semibold border-2 rounded-md uppercase tracking-wide",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
