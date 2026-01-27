import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

interface RetroInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function RetroInput({
  className,
  label,
  ...props
}: RetroInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-foreground uppercase tracking-wide">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full px-4 py-2.5 bg-input text-foreground border-2 border-border rounded",
          "focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(78,205,196,0.3)]",
          "transition-all duration-200",
          "placeholder:text-muted-foreground",
          className
        )}
        {...props}
      />
    </div>
  );
}

interface RetroTextareaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function RetroTextarea({
  className,
  label,
  ...props
}: RetroTextareaProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-foreground uppercase tracking-wide">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "w-full px-4 py-2.5 bg-input text-foreground border-2 border-border rounded",
          "focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(78,205,196,0.3)]",
          "transition-all duration-200",
          "placeholder:text-muted-foreground",
          "min-h-[100px] resize-y",
          className
        )}
        {...props}
      />
    </div>
  );
}
