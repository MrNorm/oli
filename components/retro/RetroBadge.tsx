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
    teal: "bg-primary/20 text-primary border-primary",
    orange: "bg-secondary/20 text-secondary border-secondary",
    purple: "bg-accent/20 text-accent border-accent",
    pink: "bg-[#ff6b9d]/20 text-[#ff6b9d] border-[#ff6b9d]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-sm font-medium border rounded uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
