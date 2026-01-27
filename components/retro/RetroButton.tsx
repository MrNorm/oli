import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface RetroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
}

export function RetroButton({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: RetroButtonProps) {
  const baseStyles =
    "relative font-medium transition-all duration-200 overflow-hidden group border-2";

  const variantStyles = {
    primary:
      "bg-primary text-primary-foreground border-primary hover:shadow-[0_0_20px_rgba(78,205,196,0.5)]",
    secondary:
      "bg-secondary text-secondary-foreground border-secondary hover:shadow-[0_0_20px_rgba(255,154,118,0.5)]",
    accent:
      "bg-accent text-accent-foreground border-accent hover:shadow-[0_0_20px_rgba(199,125,255,0.5)]",
    outline:
      "bg-transparent text-foreground border-primary hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(78,205,196,0.3)]",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {/* Scan line effect on hover */}
      <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
