import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface RetroCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "highlighted" | "bordered";
  children: ReactNode;
}

export function RetroCard({
  children,
  className,
  variant = "default",
  ...props
}: RetroCardProps) {
  const baseStyles =
    "relative bg-card rounded-lg p-6 overflow-hidden transition-all duration-200 hover:translate-y-[-2px]";

  const variantStyles = {
    default: "border-2 border-border/60",
    highlighted:
      "border-2 border-primary/60 shadow-lg",
    bordered:
      "border-2 border-secondary/60 shadow-lg",
  };

  return (
    <div className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {/* Minimal corner accent - top left only */}
      {variant !== "default" && (
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 opacity-40"
          style={{ borderColor: variant === "highlighted" ? "var(--primary)" : "var(--secondary)" }} />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
