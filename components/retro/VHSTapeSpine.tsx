import { cn } from "@/lib/utils";
import { HTMLAttributes, useMemo } from "react";

interface VHSTapeSpineProps extends HTMLAttributes<HTMLDivElement> {
  mainText: string;
  mainTextColor?: string;
  subtitleText?: string;
}

export function VHSTapeSpine({
  mainText,
  mainTextColor = "#ff6b9d",
  subtitleText,
  className,
  ...props
}: VHSTapeSpineProps) {
  // Generate random stickers (3-5) with slight angle variations
  const stickers = useMemo(() => {
    const count = Math.floor(Math.random() * 3) + 3; // 3-5 stickers
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    return Array.from({ length: count }, (_, i) => ({
      char: chars[Math.floor(Math.random() * chars.length)],
      rotation: 270 + (Math.random() * 10 - 5), // 265-275 degrees
      top: 20 + (i * 60 / count) + Math.random() * 10, // Spread vertically with randomness
    }));
  }, []);

  return (
    <div className={cn("relative inline-block", className)} {...props}>
      {/* Add Google Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Indie+Flower&display=swap');
        `}
      </style>

      {/* Main tape body - wide and shallow */}
      <div className="relative w-[43rem] h-20 bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] overflow-hidden">
        {/* Subtle shadow for depth */}
        <div className="absolute inset-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),inset_0_-2px_4px_rgba(0,0,0,0.4)]" />
        
        {/* Visual border for sleeve effect */}
        <div className="absolute inset-0 border-2 border-[#333]/60" />
        <div className="absolute inset-[6px] border border-[#444]/40" />

        {/* Off-white label sticker with rounded corners */}
        <div className="absolute left-12 right-42 top-2 bottom-2 bg-[#f5f3e8] rounded-lg shadow-lg">
          {/* Subtle texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            backgroundSize: "100px 100px"
          }} />

          {/* Background lines on the label */}
          <div className="absolute inset-0 flex flex-col justify-center gap-[6px] px-4 py-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-[1px] bg-[#d4d2c5]/60" />
            ))}
          </div>

          {/* Text content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-2">
            {/* Main handwritten text */}
            <div 
              className="text-2xl font-bold tracking-wide"
              style={{ 
                fontFamily: "'Permanent Marker', cursive",
                color: mainTextColor,
                textShadow: "1px 1px 0px rgba(0,0,0,0.1)"
              }}
            >
              {mainText}
            </div>

            {/* Subtitle text */}
            {subtitleText && (
              <div 
                className="text-sm mt-1"
                style={{ 
                  fontFamily: "'Indie Flower', cursive",
                  color: "#1a1a1a",
                }}
              >
                {subtitleText}
              </div>
            )}
          </div>
        </div>

        {/* VHS Logo on the left at 270 degrees */}
        <div 
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ transform: "translateY(-50%) rotate(270deg)" }}
        >
          <div className="text-white/70 font-bold tracking-[0.3em]" style={{ fontSize: "10px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
            VHS
          </div>
        </div>

        {/* Random numeric/alpha stickers on the right at varying 270-degree angles */}
        {stickers.map((sticker, i) => (
          <div
            key={i}
            className="absolute right-2"
            style={{
              top: `${sticker.top}%`,
              transform: `rotate(${sticker.rotation}deg)`,
            }}
          >
            <div className="w-5 h-5 bg-black rounded-sm shadow-md flex items-center justify-center border border-white/20">
              <span className="text-[9px] font-bold text-white" style={{ fontFamily: "monospace" }}>
                {sticker.char}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
