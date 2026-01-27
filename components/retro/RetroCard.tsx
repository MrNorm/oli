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
    "relative bg-card rounded-lg p-6 overflow-hidden transition-all duration-300";

  const variantStyles = {
    default: "border border-border",
    highlighted:
      "border-2 border-primary shadow-[0_0_20px_rgba(78,205,196,0.2)]",
    bordered:
      "border-2 border-secondary shadow-[0_0_20px_rgba(255,154,118,0.2)]",
  };

  return (
    <div className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {/* Corner accent marks */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-primary opacity-50" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-secondary opacity-50" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-accent opacity-50" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-primary opacity-50" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
