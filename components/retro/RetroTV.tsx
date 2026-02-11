import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

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
    sm: "w-64 h-48 min-w-[400px] min-h-[300px]",
    md: "w-96 h-72 min-w-[600px] min-h-[450px]",
    lg: "w-[32rem] h-96 min-w-[800px] min-h-[600px]",
  };

  // Side panel depths scale with size
  const sidePanelDepth = {
    sm: 100,
    md: 150,
    lg: 200,
  };

  return (
    <div
      className={cn("relative inline-block", className)}
      style={{
        perspective: angled ? "1200px" : "none",
      }}
      {...props}
    >
      {/* TV Cabinet Container */}
      <div
        className="relative"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Wrapper for the angled TV with depth sides */}
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
          {/* Right side depth panel */}
          {angled && (
            <div
              className="absolute h-full pointer-events-none"
              style={{
                right: `-${sidePanelDepth[size]}px`,
                top: "0",
                width: `${sidePanelDepth[size]}px`,
                transformStyle: "preserve-3d",
                transform: "rotateY(72deg) translateX(-1px)",
                transformOrigin: "left center",
                borderTopRightRadius: "0.5rem",
                borderBottomRightRadius: "0.5rem",
                background: `
                  linear-gradient(to left, 
                    #000000 0%,
                    #0a0603 10%,
                    #15100b 20%,
                    #251a12 35%, 
                    #3d2a1c 65%, 
                    #4a2c1f 100%
                  )
                `,
                boxShadow: "inset 10px 0 30px rgba(0, 0, 0, 0.95), 0 0 40px rgba(0, 0, 0, 0.7)",
              }}
            >
              {/* Wood grain on right side */}
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  borderTopRightRadius: "0.5rem",
                  borderBottomRightRadius: "0.5rem",
                  backgroundImage: `
                    repeating-linear-gradient(
                      0deg,
                      transparent 0px,
                      transparent 2px,
                      rgba(0, 0, 0, 0.6) 2px,
                      rgba(0, 0, 0, 0.6) 3px
                    )
                  `,
                }}
              />
              {/* Extra depth shading */}
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background: `
                    linear-gradient(to right,
                      transparent 0%,
                      rgba(0, 0, 0, 0.7) 100%
                    )
                  `,
                }}
              />
              {/* Horizontal wood bands for extra realism */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      0deg,
                      transparent 0px,
                      transparent 15px,
                      rgba(0, 0, 0, 0.3) 15px,
                      rgba(0, 0, 0, 0.3) 17px
                    )
                  `,
                }}
              />
            </div>
          )}

          {/* Main wooden body */}
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
          {/* Walnut wood grain effect - HORIZONTAL with warmer orange tones */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(180deg, 
                  #4a2c1f 0%, 
                  #5d3a2a 2%, 
                  #6d4534 4%, 
                  #5d3a2a 6%, 
                  #4a2c1f 8%, 
                  #7d5540 12%, 
                  #6d4534 15%, 
                  #5d3a2a 18%, 
                  #4a2c1f 20%, 
                  #5d3a2a 23%, 
                  #6d4534 26%, 
                  #7d5540 30%, 
                  #6d4534 35%, 
                  #5d3a2a 40%, 
                  #4a2c1f 45%, 
                  #5d3a2a 50%, 
                  #7d5540 55%, 
                  #6d4534 60%, 
                  #5d3a2a 65%, 
                  #4a2c1f 68%, 
                  #6d4534 72%, 
                  #7d5540 76%, 
                  #6d4534 80%, 
                  #5d3a2a 85%, 
                  #4a2c1f 90%, 
                  #5d3a2a 95%, 
                  #4a2c1f 100%
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

          {/* Chrome/metal trim around TV - at the very edge */}
          <div className="absolute inset-0 rounded-lg border-2 border-slate-600 shadow-inner pointer-events-none">
            <div className="absolute inset-0 rounded-lg border border-slate-400 opacity-50" />
          </div>

          {/* Screen area - left 70% */}
          <div className="absolute left-2 top-2 bottom-2 w-[65%] p-1">
            {/* CRT Screen bezel - 3D effect */}
            <div 
              className="relative w-full h-full rounded-lg p-2 shadow-2xl"
              style={{
                background: `
                  linear-gradient(135deg, 
                    #1a1a1a 0%,
                    #0a0a0a 50%,
                    #000000 100%
                  )
                `,
                boxShadow: `
                  inset 2px 2px 4px rgba(255, 255, 255, 0.1),
                  inset -2px -2px 4px rgba(0, 0, 0, 0.8),
                  0 8px 24px rgba(0, 0, 0, 0.6)
                `
              }}
            >
              {/* Inner screen frame */}
              <div className="relative w-full h-full rounded overflow-hidden bg-black">
                {/* Screen content - image and custom content with vintage filter */}
                <div className="absolute inset-0 bg-slate-900">
                  {screenImage && (
                    <img
                      src={screenImage}
                      alt="TV Screen"
                      className="w-full h-full object-cover"
                      style={{
                        filter: "contrast(0.7) saturate(0.6) brightness(0.85) sepia(0.15)",
                        opacity: 0.85,
                      }}
                    />
                  )}
                  {screenContent && (
                    <div
                      style={{
                        filter: "contrast(0.7) saturate(0.6) brightness(0.85) sepia(0.15)",
                        opacity: 0.85,
                      }}
                    >
                      {screenContent}
                    </div>
                  )}
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

                {/* Scanlines overlay - CSS-based for better performance */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ 
                    opacity: scanlineIntensity,
                    backgroundImage: `
                      repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(0, 0, 0, 0.3) 2px,
                        rgba(0, 0, 0, 0.3) 3px
                      )
                    `,
                  }}
                >
                  {/* Horizontal scan animation - optimized */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `
                        linear-gradient(
                          to bottom,
                          transparent 0%,
                          rgba(255, 255, 255, 0.1) 50%,
                          transparent 100%
                        )
                      `,
                      height: "150%",
                      animation: "scan 4s ease-in-out infinite",
                      willChange: "transform",
                    }}
                  />
                </div>

                {/* CRT flicker effect - much slower for better performance */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    animation: "flicker 3s ease-in-out infinite alternate",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Control panel - right 30% */}
          <div className="absolute right-2 top-2 bottom-2 left-[70%] flex flex-col">
            {/* Top 30% - Black section with buttons (increased from 25% to allow more spacing) */}
            <div className="h-[30%] bg-black rounded-t-lg mx-2 mt-2 px-3 pt-3 pb-2 flex flex-col justify-between items-center">
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
            <div className="flex-1 relative overflow-hidden mx-2 mb-2 rounded-b-lg">
              {/* Walnut wood background - HORIZONTAL GRAIN with warmer orange tones */}
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    linear-gradient(180deg, 
                      #4a2c1f 0%, 
                      #5d3a2a 10%, 
                      #6d4534 20%, 
                      #5d3a2a 30%, 
                      #7d5540 40%, 
                      #6d4534 50%, 
                      #5d3a2a 60%, 
                      #6d4534 70%, 
                      #7d5540 80%, 
                      #6d4534 90%, 
                      #5d3a2a 100%
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
      </div>

      {/* CSS Animations - optimized for performance */}
      <style>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        
        @keyframes flicker {
          0%, 100% {
            opacity: 0.015;
          }
          50% {
            opacity: 0.03;
          }
        }
      `}</style>
    </div>
  );
}
