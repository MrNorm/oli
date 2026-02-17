import { cn } from "@/lib/utils";
import { HTMLAttributes, useMemo } from "react";

interface VHSTapeSpineProps extends HTMLAttributes<HTMLDivElement> {
  mainText: string;
  mainTextColor?: string;
  subtitleText?: string | null;
  upsideDown?: boolean;
}

export function VHSTapeSpine({
  mainText,
  mainTextColor = "#ff6b9d",
  subtitleText,
  upsideDown = false,
  className,
  ...props
}: VHSTapeSpineProps) {
  // Generate random stickers (0-4) with slight angle variations
  const stickers = useMemo(() => {
    const count = Math.floor(Math.random() * 5); // 0-4 stickers
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    return Array.from({ length: count }, (_, i) => ({
      char: chars[Math.floor(Math.random() * chars.length)],
      rotation: 270 + (Math.random() * 24 - 12), // 258-282 degrees for more variation
      top: 10 + (i * 70 / count) + Math.random() * 15, // Spread vertically with more randomness
      right: 1 + Math.random() * 3, // Horizontal spread (1-4rem from right)
    }));
  }, []);

  // Generate random serial number (6-8 chars with occasional hyphen)
  const serialNumber = useMemo(() => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const hasHyphen = Math.random() > 0.5;
    
    if (hasHyphen) {
      // Format: XXX-XXXX
      const part1 = Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
      const part2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
      return `${part1}-${part2}`;
    } else {
      // Format: XXXXXX or XXXXXXX
      const length = Math.random() > 0.5 ? 6 : 7;
      return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    }
  }, []);

  // Random label positioning variations
  const labelOffset = useMemo(() => ({
    horizontal: Math.random() * 40 - 20, // -20px to +20px horizontal shift
    angle: (Math.random() * 2.4 - 1.2) // -1.2 to +1.2 degrees (both CW and CCW)
  }), []);

  return (
    <div className={cn("relative w-full max-w-3xl", className)} {...props}>
      {/* Add Google Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Indie+Flower&display=swap');
        `}
      </style>

      {/* Main tape body - wide and shallow */}
      <div 
        className="relative w-full h-16 sm:h-20 md:h-24 bg-[#1a1a1a] overflow-hidden"
        style={{
          transform: upsideDown ? "rotate(180deg)" : "none"
        }}
      >
        {/* Grid texture engrained into the tape */}
        <div className="absolute inset-0 opacity-[0.25]" style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 49%, rgba(255,255,255,0.05) 49%, rgba(255,255,255,0.05) 51%, transparent 51%),
            linear-gradient(90deg, transparent 49%, rgba(255,255,255,0.05) 49%, rgba(255,255,255,0.05) 51%, transparent 51%)
          `,
          backgroundSize: "3px 3px"
        }} />
        
        {/* Subtle shadow for depth */}
        <div className="absolute inset-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),inset_0_-2px_4px_rgba(0,0,0,0.4)]" />
        
        {/* Worn cardboard sleeve - only on edges, doesn't affect tape body */}
        {/* Top sleeve edge */}
        <div className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none" style={{
          background: `linear-gradient(to right, transparent 0%, #e8e2d4 2%, #e8e2d4 98%, transparent 100%)`,
          filter: "blur(0.3px)"
        }}>
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='edge1'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23edge1)' /%3E%3C/svg%3E")`,
            backgroundSize: "30px 10px"
          }} />
        </div>
        {/* Bottom sleeve edge */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none" style={{
          background: `linear-gradient(to right, transparent 0%, #e8e2d4 2%, #e8e2d4 98%, transparent 100%)`,
          filter: "blur(0.3px)"
        }}>
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='edge2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.8' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23edge2)' /%3E%3C/svg%3E")`,
            backgroundSize: "30px 10px"
          }} />
        </div>
        {/* Left sleeve edge */}
        <div className="absolute top-0 bottom-0 left-0 w-[2px] pointer-events-none" style={{
          background: `linear-gradient(to bottom, transparent 0%, #e8e2d4 3%, #e8e2d4 97%, transparent 100%)`,
          filter: "blur(0.3px)"
        }}>
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 10 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='edge3'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.2' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23edge3)' /%3E%3C/svg%3E")`,
            backgroundSize: "10px 35px"
          }} />
        </div>
        {/* Right sleeve edge */}
        <div className="absolute top-0 bottom-0 right-0 w-[2px] pointer-events-none" style={{
          background: `linear-gradient(to bottom, transparent 0%, #e8e2d4 3%, #e8e2d4 97%, transparent 100%)`,
          filter: "blur(0.3px)"
        }}>
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 10 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='edge4'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.9' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23edge4)' /%3E%3C/svg%3E")`,
            backgroundSize: "10px 35px"
          }} />
        </div>

        {/* Off-white label sticker with rounded corners */}
        <div 
          className="absolute left-12 right-42 top-3 bottom-3 bg-[#f5f3e8] rounded-lg shadow-lg overflow-hidden"
          style={{
            transform: `translateX(${labelOffset.horizontal}px) rotate(${labelOffset.angle}deg)`
          }}
        >
          {/* Paper grain texture - primary */}
          <div className="absolute inset-0 opacity-[0.15]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            backgroundSize: "100px 100px"
          }} />

          {/* Additional coarse texture for aged look */}
          <div className="absolute inset-0 opacity-[0.08]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter2'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.05' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter2)' /%3E%3C/svg%3E")`,
            backgroundSize: "150px 150px"
          }} />

          {/* Random spots/stains for aging */}
          <div className="absolute inset-0 opacity-[0.12]" style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(139,125,107,0.3) 0%, transparent 2%), 
                             radial-gradient(circle at 75% 15%, rgba(139,125,107,0.25) 0%, transparent 3%), 
                             radial-gradient(circle at 60% 80%, rgba(139,125,107,0.2) 0%, transparent 2.5%),
                             radial-gradient(circle at 85% 65%, rgba(139,125,107,0.25) 0%, transparent 1.5%),
                             radial-gradient(circle at 15% 75%, rgba(139,125,107,0.3) 0%, transparent 2%)`,
          }} />

          {/* Slight yellowing effect for old paper */}
          <div className="absolute inset-0 bg-[#f4e8d0]/15 mix-blend-multiply" />

          {/* Aged/faded edges - subtle effect */}
          <div className="absolute inset-0 shadow-[inset_0_0_12px_rgba(139,125,107,0.15)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#b8a888]/15 via-transparent via-50% to-[#b8a888]/15" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#b8a888]/12 via-transparent via-50% to-[#b8a888]/12" />

          {/* Background lines on the label */}
          <div className="absolute inset-0 flex flex-col justify-center gap-[12px] px-4 py-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-[2px] bg-[#c4b8a5]/70" />
            ))}
          </div>

          {/* Text content */}
          <div 
            className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-2"
            style={{
              transform: upsideDown ? "rotate(180deg)" : "none"
            }}
          >
            {/* Main handwritten text */}
            <div 
              className="text-lg sm:text-2xl md:text-3xl font-bold tracking-wide"
              style={{ 
                fontFamily: "'Permanent Marker', cursive",
                color: mainTextColor,
                opacity: 0.85,
                transform: "rotate(-1.2deg)"
              }}
            >
              {mainText}
            </div>

            {/* Subtitle text */}
            {subtitleText && (
              <div 
                className="text-xs sm:text-sm mt-0.5 sm:mt-1"
                style={{ 
                  fontFamily: "'Indie Flower', cursive",
                  color: "#1a1a1a",
                  transform: "rotate(-0.8deg)"
                }}
              >
                {subtitleText}
              </div>
            )}
          </div>
        </div>

        {/* VHS Logo on the left at 270 degrees - matches serial number style, behind stickers */}
        <div 
          className="absolute left-6 top-1/2 z-0"
          style={{ transform: "translate(-50%, -50%) rotate(270deg)" }}
        >
          <div className="text-[#2d2d2d] font-mono text-[18px] font-bold tracking-widest opacity-60">
            VHS
          </div>
        </div>

        {/* Serial number on tape body - bottom right, barely visible */}
        <div className="absolute bottom-2 right-8 z-0">
          <div className="text-[#2d2d2d] font-mono text-[16px] font-bold tracking-wider opacity-60">
            {serialNumber}
          </div>
        </div>

        {/* Random numeric/alpha stickers on the right at varying 270-degree angles */}
        {stickers.map((sticker, i) => (
          <div
            key={i}
            className="absolute z-10"
            style={{
              top: `${sticker.top}%`,
              right: `${sticker.right}rem`,
              transform: `rotate(${sticker.rotation}deg)`,
            }}
          >
            <div className="w-5 h-5 bg-[#f5f3e8] rounded-sm shadow-md flex items-center justify-center border border-[#333]/30">
              <span className="text-[10px] font-black text-black" style={{ fontFamily: "'Arial Black', sans-serif", letterSpacing: "-0.5px" }}>
                {sticker.char}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
