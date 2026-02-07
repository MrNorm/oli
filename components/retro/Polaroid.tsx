import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface PolaroidProps extends HTMLAttributes<HTMLDivElement> {
  image: string;
  alt?: string;
  caption?: string;
  rotate?: number; // Slight rotation for realism (-5 to 5 degrees)
  size?: "default" | "small"; // Size variant
  children?: ReactNode;
}

export function Polaroid({
  image,
  alt = "Polaroid photo",
  caption,
  rotate = 0,
  size = "default",
  className,
  children,
  ...props
}: PolaroidProps) {
  const rotationStyle = rotate !== 0 ? `rotate(${rotate}deg)` : undefined;
  const isSmall = size === "small";

  return (
    <div
      className={cn(
        "relative inline-block group cursor-pointer",
        className
      )}
      style={{ transform: rotationStyle }}
      {...props}
    >
      {/* Polaroid frame */}
      <div
        className={cn(
          "relative bg-[#f8f6f0]",
          isSmall ? "p-2 pb-9" : "p-4 pb-[4.6rem]", // 15% thicker bottom (16 * 1.15 = 18.4, rounded to 4.6rem)
          "shadow-[0_8px_24px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.12)]",
          "transition-all duration-300",
          "hover:shadow-[0_12px_32px_rgba(0,0,0,0.2),0_4px_12px_rgba(0,0,0,0.15)]",
          "hover:translate-y-[-4px]",
          "before:absolute before:inset-0",
          "before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-yellow-50/30",
          "before:pointer-events-none",
          // Subtle edge wear
          "after:absolute after:inset-0",
          "after:shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]",
          "after:pointer-events-none"
        )}
        style={{
          width: isSmall ? "200px" : "auto",
        }}
      >
        {/* Photo area with subtle imperfections */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={alt}
            className={cn(
              "w-full h-full object-cover",
              // Slight fading effect for realism
              "opacity-[0.96]",
              "transition-all duration-300",
              "group-hover:opacity-100"
            )}
          />
          
          {/* Subtle gradient overlay for aged effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-50/5 via-transparent to-blue-50/5 pointer-events-none" />
          
          {/* Corner wear marks */}
          <div className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-br from-gray-200/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-gradient-to-tr from-gray-200/30 to-transparent pointer-events-none" />
        </div>

        {/* Bottom white space for caption/handwriting */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 flex items-center justify-center pb-2",
          isSmall ? "h-7 px-2" : "h-[3.6rem] px-4"
        )}>
          {caption && (
            <p
              className={cn(
                "text-center text-black",
                "font-['Permanent_Marker',_cursive]",
                "tracking-wide",
                // Handwritten marker style
                "transform rotate-[-0.5deg]",
                "select-none"
              )}
              style={{
                textShadow: "0.5px 0.5px 0px rgba(0,0,0,0.15)",
                fontSize: isSmall ? "0.625rem" : "1rem",
                fontWeight: 400,
                lineHeight: 1,
              }}
            >
              {caption}
            </p>
          )}
          {children && (
            <div 
              className={cn(
                "text-center text-black font-['Permanent_Marker',_cursive]",
                isSmall ? "text-[0.625rem]" : "text-base"
              )}
              style={{
                lineHeight: 1,
              }}
            >
              {children}
            </div>
          )}
        </div>

        {/* Random subtle scratches/marks for realism */}
        <div
          className="absolute top-[15%] right-[20%] w-8 h-[1px] bg-gray-300/20 rotate-12 pointer-events-none"
          style={{ opacity: 0.3 }}
        />
        <div
          className="absolute bottom-[30%] left-[15%] w-6 h-[0.5px] bg-gray-300/15 -rotate-6 pointer-events-none"
          style={{ opacity: 0.25 }}
        />
      </div>

      {/* Shadow that moves with hover */}
      <div
        className={cn(
          "absolute inset-0 -z-10",
          "bg-black/5 blur-sm",
          "transition-all duration-300",
          "group-hover:translate-y-1 group-hover:scale-[0.98]"
        )}
        style={{ transform: rotationStyle }}
      />
    </div>
  );
}
