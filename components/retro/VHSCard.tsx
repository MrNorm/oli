import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface VHSCardProps extends HTMLAttributes<HTMLDivElement> {
  brand: string;
  brandSubtitle?: string;
  model: string;
  format: string;
  footerTitle: string;
  footerSubtitle?: string;
  sphereGradient?: {
    top: string;
    middle: string;
    bottom: string;
  };
}

export function VHSCard({
  brand,
  brandSubtitle = "VIDEO CASSETTE",
  model,
  format,
  footerTitle,
  footerSubtitle,
  sphereGradient = {
    top: "#FFD700",
    middle: "#FF6B35",
    bottom: "#6B4FBB"
  },
  className,
  ...props
}: VHSCardProps) {
  return (
    <div className={cn("relative inline-block", className)} {...props}>
      {/* Main tape body */}
      <div
        className="relative w-72 h-[470px] bg-[#1a1a1a] overflow-hidden shadow-2xl"
      >
        {/* Main container with subtle worn texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#252525] via-[#1a1a1a] to-[#151515]">
          {/* Very subtle worn/aged texture */}
          <div className="absolute inset-0 opacity-[0.08]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            backgroundSize: "300px 300px"
          }} />
          {/* Subtle vignette for worn edges */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20" />
        </div>

        {/* Worn edges decoration */}
        {/* Top edge */}
        <div className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none" style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)`,
          filter: "blur(0.5px)"
        }}>
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='edgeTop'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23edgeTop)' /%3E%3C/svg%3E")`,
            backgroundSize: "200px 10px"
          }} />
        </div>
        {/* Bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] pointer-events-none" style={{
          background: `linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)`,
          filter: "blur(0.5px)"
        }}>
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='edgeBottom'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.8' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23edgeBottom)' /%3E%3C/svg%3E")`,
            backgroundSize: "200px 10px"
          }} />
        </div>
        {/* Left edge */}
        <div className="absolute top-0 bottom-0 left-0 w-[3px] pointer-events-none" style={{
          background: `linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 100%)`,
          filter: "blur(0.5px)"
        }}>
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 10 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='edgeLeft'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.2' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23edgeLeft)' /%3E%3C/svg%3E")`,
            backgroundSize: "10px 200px"
          }} />
        </div>
        {/* Right edge */}
        <div className="absolute top-0 bottom-0 right-0 w-[3px] pointer-events-none" style={{
          background: `linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 100%)`,
          filter: "blur(0.5px)"
        }}>
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 10 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='edgeRight'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.9' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23edgeRight)' /%3E%3C/svg%3E")`,
            backgroundSize: "10px 200px"
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Top Section - Brand */}
          <div className="pt-6 pb-4 px-6 text-center space-y-1">
            <h1 className="text-white text-2xl font-bold tracking-wide" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
              {brand}
            </h1>
            <p className="text-white/60 text-[10px] uppercase tracking-widest">
              {brandSubtitle}
            </p>
            <p className="text-white text-lg font-semibold tracking-wider pt-1">
              {model}
            </p>
          </div>

          {/* Model/Format Section with horizontal lines */}
          <div className="px-8 py-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-white/40" />
            </div>
            <div className="text-center py-2">
              <p className="text-white/80 text-sm font-medium tracking-[0.2em]">
                {format}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-white/40 via-white/40 to-transparent" />
            </div>
          </div>

          {/* Center Section - Sphere with horizontal lines */}
          <div className="flex-1 flex items-center justify-center px-6 py-6">
            <div className="relative w-full max-w-[160px]">
              {/* Background horizontal lines (10 lines with increasing thickness) */}
              <div className="absolute inset-0 flex flex-col justify-center gap-2">
                <div className="h-[2px] bg-white/12" />
                <div className="h-[4px] bg-white/12" />
                <div className="h-[6px] bg-white/14" />
                <div className="h-[8px] bg-white/14" />
                <div className="h-[10px] bg-white/16" />
                <div className="h-[12px] bg-white/16" />
                <div className="h-[14px] bg-white/18" />
                <div className="h-[16px] bg-white/18" />
                <div className="h-[20px] bg-white/20" />
                <div className="h-[24px] bg-white/20" />
              </div>

              {/* Gradient Sphere */}
              <div className="relative z-10 flex items-center justify-center py-2">
                <div 
                  className="w-28 h-28 rounded-full"
                  style={{ 
                    background: `radial-gradient(circle at 35% 35%, ${sphereGradient.top}, ${sphereGradient.middle} 45%, ${sphereGradient.bottom} 100%)`,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 2px 10px rgba(255,255,255,0.2)"
                  }}
                >
                  {/* Highlight for 3D effect */}
                  <div 
                    className="absolute top-2 left-4 w-10 h-10 rounded-full bg-white/30 blur-md"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Footer */}
          <div className="pb-6 px-6 text-center space-y-2">
            <h3 className="text-white/90 text-sm font-bold uppercase tracking-[0.2em]">
              {footerTitle}
            </h3>
            {footerSubtitle && (
              <p className="text-white/50 text-[10px] leading-relaxed max-w-[180px] mx-auto">
                {footerSubtitle}
              </p>
            )}
            <div className="pt-3 flex items-center justify-between text-[10px]">
              <span className="text-white/60 font-semibold">VHS</span>
              <span className="text-white/40">Made in the UK</span>
            </div>
          </div>
        </div>

        {/* Side tape holes decoration */}
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-30 bg-[#1a1a1a] border border-white/10" 
          style={{
            clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 75%, 0% 25%)"
          }}
        >
          {/* Grid texture like VHS tape */}
          <div className="absolute inset-0 opacity-[0.25]" style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 49%, rgba(255,255,255,0.05) 49%, rgba(255,255,255,0.05) 51%, transparent 51%),
              linear-gradient(90deg, transparent 49%, rgba(255,255,255,0.05) 49%, rgba(255,255,255,0.05) 51%, transparent 51%)
            `,
            backgroundSize: "3px 3px"
          }} />
          
          {/* Subtle shadow for depth */}
          <div className="absolute inset-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),inset_0_-2px_4px_rgba(0,0,0,0.4)]" />
          
          {/* Lighter edge on right side to simulate tape edge */}
          <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/20" />
        </div>
      </div>

      {/* Right side depth panel (3D effect) */}
      <div 
        className="absolute top-0 right-0 w-3 h-full translate-x-full"
        style={{
          background: "linear-gradient(to right, #0f0f0f 0%, #0a0a0a 100%)",
          transform: "translateX(-100%) skewY(-2deg)",
          transformOrigin: "left",
          boxShadow: "inset -2px 0 4px rgba(0,0,0,0.5)"
        }}
      />

      {/* Bottom depth panel */}
      <div 
        className="absolute bottom-0 left-0 w-full h-2 translate-y-full"
        style={{
          background: "linear-gradient(to bottom, #0f0f0f 0%, #050505 100%)",
          transform: "translateY(-100%) skewX(-1deg)",
          transformOrigin: "top",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)"
        }}
      />
    </div>
  );
}
