import { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ── Reflected room lights on the glass ───────────────────────────
// Stable positions generated once — scattered across the screen surface,
// biased toward the upper half (lights are above/behind viewer).
// Each uses the panel cluster animation so they blink in sync with the wall.
const N_CLUSTERS = 5;
const CLUSTER_CYCLE = 6;
const CLUSTER_DELAYS = Array.from(
  { length: N_CLUSTERS },
  (_, i) => parseFloat(((i / N_CLUSTERS) * CLUSTER_CYCLE).toFixed(3))
);

interface ReflectionLight {
  top: string; left: string;
  w: string;   h: string;
  opacity: number;
  delay: number;
  blur: number;
}

// Seeded pseudo-random so positions are stable across renders
function seededRand(seed: number) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
}

const REFLECTION_LIGHTS: ReflectionLight[] = (() => {
  const rand = seededRand(0xdeadbeef);
  return Array.from({ length: 42 }, (_, i) => {
    // Upper 70% of screen, full width
    const top  = rand() * 70;
    const left = rand() * 92 + 2;
    const size = 1.2 + rand() * 2.2;
    const cluster = Math.floor(rand() * N_CLUSTERS);
    const jitter = (rand() - 0.5) * 0.15;
    return {
      top:     `${top.toFixed(1)}%`,
      left:    `${left.toFixed(1)}%`,
      w:       `${size.toFixed(1)}%`,
      h:       `${(size * 1.5).toFixed(1)}%`,
      opacity: 0.10 + rand() * 0.14,
      delay:   parseFloat((CLUSTER_DELAYS[cluster] + jitter).toFixed(3)),
      blur:    2 + rand() * 4,
    };
  });
})();

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

      {/* Glass reflection — simulates room lights behind the viewer */}
      {/* Primary broad smear: overhead strip light reflected across upper glass */}
      <div className="absolute inset-0 z-40 pointer-events-none" style={{
        background:
          "linear-gradient(160deg, rgba(255,255,240,0.07) 0%, rgba(255,255,240,0.03) 30%, transparent 55%)",
      }} />
      {/* Secondary angled streak — off-centre, mimics a second light source */}
      <div className="absolute z-40 pointer-events-none" style={{
        top: "4%", left: "30%", width: "45%", height: "28%",
        background:
          "radial-gradient(ellipse 100% 60% at 50% 50%, rgba(255,255,230,0.06) 0%, transparent 100%)",
        transform: "rotate(-12deg)",
        filter: "blur(6px)",
      }} />
      {/* Light dot — upper-left: bright small room light reflected */}
      {REFLECTION_LIGHTS.map((l, i) => (
        <div
          key={i}
          className="absolute z-40 pointer-events-none animate-light-cluster"
          style={{
            top: l.top, left: l.left,
            width: l.w, height: l.h,
            background: `radial-gradient(ellipse at 50% 40%, rgba(255,252,220,${l.opacity}) 0%, rgba(255,248,200,${(l.opacity * 0.3).toFixed(3)}) 45%, transparent 100%)`,
            filter: `blur(${l.blur}px)`,
            animationDelay: `${l.delay}s`,
          }}
        />
      ))}
      {/* Light dot — upper-right: twin light reflected */}
      {/* Faint broad top-edge catchlight — glass curvature highlight */}
      <div className="absolute z-40 pointer-events-none" style={{
        top: 0, left: "10%", right: "10%", height: "2px",
        background:
          "linear-gradient(to right, transparent, rgba(255,255,240,0.12) 30%, rgba(255,255,240,0.12) 70%, transparent)",
        filter: "blur(1px)",
      }} />
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
