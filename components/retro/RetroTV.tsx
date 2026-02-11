import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";
import { ScanLines } from "./ScanLines";

interface RetroTVProps extends HTMLAttributes<HTMLDivElement> {
  /** Content to display on the TV screen (typically an image) */
  screenContent?: ReactNode;
  /** Image URL for the TV screen */
  screenImage?: string;
  /** Intensity of scanlines (0-1) */
  scanlineIntensity?: number;
  /** Show the TV at an angle (3D perspective) */
  angled?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
}

export function RetroTV({
  screenContent,
  screenImage,
  scanlineIntensity = 0.5,
  angled = true,
  size = "md",
  className,
  ...props
}: RetroTVProps) {
  const sizeClasses = {
    sm: "w-64 h-48",
    md: "w-96 h-72",
    lg: "w-[32rem] h-96",
  };

  return (
    <div
      className={cn("relative inline-block", className)}
      style={{
        perspective: angled ? "1200px" : "none",
      }}
      {...props}
    >
      {/* TV Cabinet */}
      <div
        className={cn(
          "relative",
          sizeClasses[size],
          "transform-gpu transition-transform duration-300"
        )}
        style={{
          transformStyle: "preserve-3d",
          transform: angled ? "rotateY(-12deg) rotateX(5deg)" : "none",
        }}
      >
        {/* Main wooden body */}
        <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
          {/* Walnut wood grain effect - HORIZONTAL */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(180deg, 
                  #3e2723 0%, 
                  #4e342e 2%, 
                  #5d4037 4%, 
                  #4e342e 6%, 
                  #3e2723 8%, 
                  #6d4c41 12%, 
                  #5d4037 15%, 
                  #4e342e 18%, 
                  #3e2723 20%, 
                  #4e342e 23%, 
                  #5d4037 26%, 
                  #6d4c41 30%, 
                  #5d4037 35%, 
                  #4e342e 40%, 
                  #3e2723 45%, 
                  #4e342e 50%, 
                  #6d4c41 55%, 
                  #5d4037 60%, 
                  #4e342e 65%, 
                  #3e2723 68%, 
                  #5d4037 72%, 
                  #6d4c41 76%, 
                  #5d4037 80%, 
                  #4e342e 85%, 
                  #3e2723 90%, 
                  #4e342e 95%, 
                  #3e2723 100%
                )
              `,
            }}
          >
            {/* Walnut wood texture with irregular grain patterns - HORIZONTAL */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    180deg,
                    transparent,
                    transparent 1px,
                    rgba(0, 0, 0, 0.2) 1px,
                    rgba(0, 0, 0, 0.2) 2px
                  ),
                  repeating-linear-gradient(
                    180deg,
                    transparent 0px,
                    rgba(0, 0, 0, 0.1) 3px,
                    transparent 6px,
                    rgba(0, 0, 0, 0.15) 12px,
                    transparent 15px
                  )
                `,
              }}
            />
            {/* Additional wood grain variation - HORIZONTAL */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `
                  repeating-linear-gradient(
                    180deg,
                    transparent 0%,
                    rgba(0, 0, 0, 0.3) 5%,
                    transparent 10%,
                    transparent 15%,
                    rgba(0, 0, 0, 0.2) 18%,
                    transparent 22%
                  )
                `,
              }}
            />
          </div>

          {/* Chrome/metal trim around TV */}
          <div className="absolute inset-2 rounded border-4 border-slate-600 shadow-inner">
            <div className="absolute inset-0 rounded border border-slate-400 opacity-50" />
          </div>

          {/* Screen area - left 70% */}
          <div className="absolute left-4 top-4 bottom-4 w-[65%] p-2">
            {/* CRT Screen bezel */}
            <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-3 shadow-2xl">
              {/* Inner screen frame */}
              <div className="relative w-full h-full rounded overflow-hidden bg-black">
                {/* Screen content */}
                <div className="absolute inset-0 bg-slate-900">
                  {screenImage && (
                    <img
                      src={screenImage}
                      alt="TV Screen"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {screenContent}
                </div>

                {/* CRT curve glass effect */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `
                      radial-gradient(
                        ellipse at center,
                        transparent 0%,
                        transparent 50%,
                        rgba(0, 0, 0, 0.3) 100%
                      )
                    `,
                  }}
                />

                {/* Screen glare/reflection */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-30"
                  style={{
                    background: `
                      linear-gradient(
                        135deg,
                        rgba(255, 255, 255, 0.2) 0%,
                        transparent 30%,
                        transparent 70%,
                        rgba(255, 255, 255, 0.1) 100%
                      )
                    `,
                  }}
                />

                {/* Scanlines overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ opacity: scanlineIntensity }}
                >
                  <ScanLines />
                  {/* Horizontal scan animation */}
                  <div
                    className="absolute inset-0 animate-scan"
                    style={{
                      background: `
                        linear-gradient(
                          to bottom,
                          transparent 0%,
                          rgba(255, 255, 255, 0.05) 50%,
                          transparent 100%
                        )
                      `,
                      backgroundSize: "100% 200%",
                      animation: "scan 8s linear infinite",
                    }}
                  />
                </div>

                {/* CRT flicker effect */}
                <div
                  className="absolute inset-0 pointer-events-none animate-pulse"
                  style={{
                    background: "rgba(255, 255, 255, 0.01)",
                    animationDuration: "0.1s",
                    animationIterationCount: "infinite",
                    animationDirection: "alternate",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Control panel - right 30% */}
          <div className="absolute right-4 top-4 bottom-4 left-[70%] flex flex-col">
            {/* Top 30% - Black section with buttons (increased from 25% to allow more spacing) */}
            <div className="h-[30%] bg-black rounded-t-lg mx-3 mt-3 px-3 pt-3 pb-2 flex flex-col justify-between items-center">
              {/* 10 vertical buttons in a single row */}
              <div className="flex gap-1 w-full justify-center">
                {[...Array(10)].map((_, i) => (
                  <button
                    key={i}
                    className="flex-1 h-5 bg-black rounded-sm border-b-2 border-r border-slate-800 shadow-md hover:bg-slate-900 transition-colors"
                    style={{
                      boxShadow: 'inset 0 -2px 3px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
                    }}
                    aria-label={`Button ${i + 1}`}
                  />
                ))}
              </div>
              
              {/* 4 control knobs in a single row - black with 3D effect, perfectly round */}
              <div className="grid grid-cols-4 gap-1 w-full px-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="relative w-full"
                    style={{ paddingBottom: '100%' }}
                  >
                    <button
                      className="absolute inset-0 rounded-full bg-black border-b-2 border-r border-slate-800 shadow-md hover:bg-slate-900 transition-colors"
                      style={{
                        boxShadow: 'inset 0 -2px 3px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 2px 4px rgba(0, 0, 0, 0.3)'
                      }}
                      aria-label={`Knob ${i + 1}`}
                    >
                      {/* Knob indicator line */}
                      <div className="absolute top-[10%] left-1/2 w-[8%] h-[30%] bg-slate-500 -translate-x-1/2 rounded-full" />
                    </button>
                  </div>
                ))}
              </div>
              
              {/* On/Off rectangular button */}
              <button
                className="w-12 h-3 bg-black rounded-sm border-b-2 border-r border-slate-800 shadow-md hover:bg-slate-900 transition-colors"
                style={{
                  boxShadow: 'inset 0 -2px 3px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
                }}
                aria-label="Power button"
              />
            </div>

            {/* Bottom 70% - Walnut wood speaker grille section (decreased from 75%) */}
            <div className="flex-1 relative overflow-hidden mx-3 mb-3 rounded-b-lg">
              {/* Walnut wood background - HORIZONTAL GRAIN */}
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    linear-gradient(180deg, 
                      #3e2723 0%, 
                      #4e342e 10%, 
                      #5d4037 20%, 
                      #4e342e 30%, 
                      #6d4c41 40%, 
                      #5d4037 50%, 
                      #4e342e 60%, 
                      #5d4037 70%, 
                      #6d4c41 80%, 
                      #5d4037 90%, 
                      #4e342e 100%
                    )
                  `,
                }}
              >
                {/* Wood grain texture - HORIZONTAL */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(
                        180deg,
                        transparent,
                        transparent 1px,
                        rgba(0, 0, 0, 0.3) 1px,
                        rgba(0, 0, 0, 0.3) 2px
                      )
                    `,
                  }}
                />
              </div>

              {/* Horizontal grooves cut into the frame */}
              <div className="absolute inset-0">
                <div className="w-full h-full relative rounded-br-lg rounded-bl-lg overflow-hidden">
                  {/* Left groove */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-black/60 to-transparent" />
                  
                  {/* Right groove */}
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-l from-black/60 to-transparent" />
                  
                  {/* Bottom groove */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-black/60 to-transparent rounded-br-lg rounded-bl-lg" />
                  
                  {/* Horizontal grooves pattern - speaker grille - edge to edge, thicker gaps, fewer slats */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(
                          0deg,
                          transparent,
                          transparent 5px,
                          rgba(0, 0, 0, 0.6) 5px,
                          rgba(0, 0, 0, 0.6) 7px,
                          rgba(62, 39, 35, 0.4) 7px,
                          rgba(62, 39, 35, 0.4) 8px
                        )
                      `,
                    }}
                  />
                  
                  {/* Rounded corners highlight */}
                  <div className="absolute bottom-0 right-0 w-4 h-4 rounded-br-lg border-r border-b border-black/40" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 rounded-bl-lg border-l border-b border-black/40" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom shadow/depth */}
        <div
          className="absolute -bottom-2 left-0 right-0 h-4 bg-black/40 blur-xl transform translate-z-[-10px]"
          style={{
            transform: angled ? "translateZ(-10px)" : "none",
          }}
        />
      </div>

      {/* CSS Animation for scan effect */}
      <style>{`
        @keyframes scan {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 0% 100%;
          }
        }
      `}</style>
    </div>
  );
}
