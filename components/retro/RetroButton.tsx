import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface RetroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  borderColor?: string;
  size?: "sm" | "md" | "lg";
}

export function RetroButton({
  children,
  className,
  borderColor,
  size = "md",
  ...props
}: RetroButtonProps) {
  const baseStyles =
    "relative font-bold uppercase text-white text-center transition-all duration-150 font-mono " +
    "rounded-2xl " +
    "bg-gradient-to-b from-[#3d3d3d] to-[#2a2a2a] " +
    "shadow-[0_4px_0_0_#0a0a0a,0_5px_10px_rgba(0,0,0,0.5)] " +
    "hover:shadow-[0_2px_0_0_#0a0a0a,0_3px_8px_rgba(0,0,0,0.5)] " +
    "active:shadow-[0_0_0_0_#0a0a0a,0_1px_3px_rgba(0,0,0,0.5)] " +
    "hover:translate-y-[2px] " +
    "active:translate-y-[4px]";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs tracking-wide",
    md: "px-6 py-3 text-sm tracking-wider",
    lg: "px-8 py-4 text-base tracking-widest",
  };

  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        borderColor && `border-[5px]`,
        className
      )}
      style={borderColor ? { borderColor } : undefined}
      {...props}
    >
      {children}
    </button>
  );
}
