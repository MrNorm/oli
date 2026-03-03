import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CRTScreenProps {
  children: ReactNode;
  className?: string;
  /** When true, skips the outer cream bezel and fills the container directly.
   *  Use when the screen is embedded inside a wall panel cell. */
  embedded?: boolean;
}

/**
 * Fixed 4:3 CRT monitor frame with a cream embossed bezel matching the
 * MU/TH/UR aesthetic. All screen effects (scanlines, flicker, interference)
 * are layered as pointer-events-none overlays inside the fixed-ratio container.
 *
 * When `embedded` is true the outer bezel is omitted and the screen
 * content fills the container (for use inside a MotherPanel cell).
 */
export function CRTScreen({ children, className, embedded }: CRTScreenProps) {
  const glassContent = (
    <div className="absolute inset-0 bg-black overflow-hidden">
      {/* Phosphor green ambient glow behind text */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_65%_55%_at_50%_45%,rgba(0,180,50,0.07)_0%,transparent_100%)]" />

      {/* Terminal content — flex column, fills the box, clips overflow */}
      <div className="absolute inset-0 z-20 flex flex-col overflow-hidden">
        {children}
      </div>

      {/* Scanlines */}
      <CRTScanlines />

      {/* Horizontal interference band rolling down the screen */}
      <div
        className="absolute left-0 right-0 h-[6%] z-30 pointer-events-none animate-crt-interference"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(51,255,51,0.05) 40%, rgba(51,255,51,0.05) 60%, transparent)",
          top: "-20%",
        }}
      />

      {/* Screen flicker */}
      <div className="absolute inset-0 z-30 pointer-events-none animate-crt-flicker" />

      {/* Outer vignette — darkens corners like CRT curvature */}
      <div className="absolute inset-0 z-30 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.6)_100%)]" />

      {/* Glass reflection — faint white highlight top-left */}
      <div className="absolute inset-0 z-30 pointer-events-none bg-[radial-gradient(ellipse_30%_20%_at_25%_15%,rgba(255,255,255,0.04)_0%,transparent_100%)]" />
    </div>
  );

  if (embedded) {
    // Fill the container; the outer panel IS the bezel.
    return (
      <div
        className={cn("absolute inset-0 select-none overflow-hidden", className)}
        style={{
          background: "#080808",
          boxShadow: "inset 5px 5px 12px rgba(0,0,0,0.9), inset -2px -2px 6px rgba(0,0,0,0.55)",
        }}
      >
        {glassContent}
      </div>
    );
  }

  return (
    <div className={cn("relative w-full select-none", className)}>
      {/* ── Outer cream embossed bezel ── */}
      <div
        className="relative rounded-[10px] p-[18px]"
        style={{
          background:
            "linear-gradient(145deg, #d4c5b0 0%, #b8a890 40%, #c9b89e 60%, #a89070 100%)",
          boxShadow:
            "6px 6px 18px rgba(0,0,0,0.75), -2px -2px 8px rgba(255,255,255,0.06), " +
            "inset 3px 3px 6px rgba(255,255,255,0.25), " +
            "inset -3px -3px 8px rgba(0,0,0,0.45)",
        }}
      >
        {/* Bezel label strip (top) */}
        <BezelLabel />

        {/* ── Inner recessed screen housing ── */}
        <div
          className="rounded-[4px] overflow-hidden"
          style={{
            boxShadow:
              "inset 5px 5px 12px rgba(0,0,0,0.9), inset -2px -2px 6px rgba(0,0,0,0.55)",
            background: "#080808",
          }}
        >
          {/* ── Strict 4:3 fixed-ratio screen area ── */}
          <div className="relative w-full" style={{ paddingBottom: "75%" }}>
            {glassContent}
          </div>
        </div>

        {/* Bezel label strip (bottom) */}
        <div className="mt-[10px] flex justify-between items-center px-1">
          <span className="text-[7px] font-mono text-[#6b5a44] tracking-[0.22em] opacity-70 uppercase">
            OLI/TH/UR 6000
          </span>
          <span className="text-[7px] font-mono text-[#6b5a44] tracking-[0.18em] opacity-50 uppercase">
            WEYLAND-YUTANI
          </span>
        </div>
      </div>
    </div>
  );
}

/** Small embossed label strip above the screen glass, like the reference image. */
function BezelLabel() {
  return (
    <div
      className="mb-[10px] px-2 py-[3px] rounded-sm flex justify-between items-center"
      style={{
        background: "linear-gradient(180deg, #c0ae98 0%, #a89070 100%)",
        boxShadow:
          "inset 1px 1px 3px rgba(255,255,255,0.2), inset -1px -1px 2px rgba(0,0,0,0.3)",
      }}
    >
      <span className="text-[7px] font-mono text-[#5a4a34] tracking-[0.25em] uppercase opacity-80">
        INTERFACE 2037
      </span>
      <div className="flex gap-1 items-center">
        <StatusDot active />
        <StatusDot />
        <StatusDot active />
      </div>
    </div>
  );
}

function StatusDot({ active = false }: { active?: boolean }) {
  return (
    <div
      className={`w-1.5 h-1.5 rounded-full ${
        active
          ? "bg-amber-400 shadow-[0_0_4px_rgba(251,191,36,0.8)]"
          : "bg-[#6b5a44]"
      }`}
    />
  );
}

/** Horizontal scanline overlay. */
function CRTScanlines() {
  return (
    <div
      className="absolute inset-0 z-30 pointer-events-none"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.22) 2px, rgba(0,0,0,0.22) 3px)",
        backgroundSize: "100% 3px",
      }}
    />
  );
}
