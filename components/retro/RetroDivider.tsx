import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface RetroDividerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "solid" | "gradient" | "dashed";
}

export function RetroDivider({
  className,
  variant = "gradient",
  ...props
}: RetroDividerProps) {
  const variantStyles = {
    solid: "h-px bg-border",
    gradient:
      "h-px bg-gradient-to-r from-transparent via-primary to-transparent",
    dashed: "h-px border-t border-dashed border-border",
  };

  return (
    <div
      className={cn("w-full my-6", variantStyles[variant], className)}
      {...props}
    />
  );
}
