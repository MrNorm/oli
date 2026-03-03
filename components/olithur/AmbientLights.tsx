import { cn } from "@/lib/utils";

// ── Panel grid ────────────────────────────────────────────────────
const PANEL_COLS = 6;
const PANEL_ROWS = 5;

// ── Pyramids per panel ─────────────────────────────────────────────
// 11 columns × 9 rows of square pyramids, matching the reference image.
const D_COLS = 11;
const D_ROWS = 9;

// SVG coordinate space: one grid cell is CELL × CELL units.
// Cells are upright squares (square pyramid seen from above), tiling edge-to-edge.
const CELL = 24;

const SVG_W = D_COLS * CELL; // 264
const SVG_H = D_ROWS * CELL; // 216

// Lights sit at every intersection of 4 pyramids — (D_COLS-1) × (D_ROWS-1).
// Each light is shared by four pyramids at their touching corners.
const L_COLS = D_COLS - 1; // 10
const L_ROWS = D_ROWS - 1; // 8
const L_R    = 2.4; // light dot radius in SVG units

// ── Light modes ───────────────────────────────────────────────────
type LightMode = "on" | "off" | "slow" | "medium" | "fast";

interface LightDef {
  mode: LightMode;
  delay: number;
}

interface PanelData {
  id: number;
  lights: LightDef[];
}

function makeLight(): LightDef {
  const r = Math.random();
  const mode: LightMode =
    r < 0.28 ? "on"     :
    r < 0.42 ? "off"    :
    r < 0.62 ? "slow"   :
    r < 0.80 ? "medium" : "fast";
  return { mode, delay: parseFloat((Math.random() * 3.8).toFixed(2)) };
}

// Stable data — created once at module load, never regenerated on re-render
const PANELS: PanelData[] = Array.from(
  { length: PANEL_COLS * PANEL_ROWS },
  (_, id) => ({ id, lights: Array.from({ length: L_COLS * L_ROWS }, makeLight) })
);

// ── CSS animation class per mode ─────────────────────────────────
const MODE_CLASS: Record<LightMode, string> = {
  on:     "",
  off:    "",
  slow:   "animate-light-slow",
  medium: "animate-light-medium",
  fast:   "animate-light-fast",
};

// ── Square-pyramid face palette — dirty warm space-tech tones ────
// Light source from top-left.
// Each square cell is split into 4 triangular faces from corners to centre.
const F_TOP = "#c8b89c"; // top face    — brightest highlight
const F_RGT = "#a08868"; // right face  — mid-tone
const F_BOT = "#786050"; // bottom face — shadow
const F_LFT = "#b0a080"; // left face   — slight highlight

// ── Components ────────────────────────────────────────────────────

interface AmbientLightsProps {
  className?: string;
}

/**
 * Full-viewport grid of embossed Mother-room panels.
 * Each panel contains a 10×9 diamond grid with lights at every intersection.
 * Pure CSS animations drive all light flashing — zero per-light React state.
 */
export function AmbientLights({ className }: AmbientLightsProps) {
  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${PANEL_COLS}, 1fr)`,
        gridTemplateRows: `repeat(${PANEL_ROWS}, 1fr)`,
      }}
    >
      {PANELS.map((panel) => (
        <MotherPanel key={panel.id} panel={panel} />
      ))}
    </div>
  );
}

/** One wall panel: rounded 3D-raised border with inset pyramid grid + lights. */
function MotherPanel({ panel }: { panel: PanelData }) {
  // Unique IDs for SVG defs to avoid conflicts across panels
  const grimeId = `grime-${panel.id}`;
  const glowId  = `glow-${panel.id}`;

  return (
    <div
      className="relative"
      style={{
        // Panel face — warm dirty tan, visible in the padded border area
        background: "linear-gradient(145deg, #c2ae92 0%, #8c7858 55%, #a08868 100%)",
        borderRadius: "8px",
        // 3D raised panel effect: outer drop shadow below + inset bevel highlights
        boxShadow:
          // Drop shadow — depth between panels
          "0 4px 8px rgba(0,0,0,0.60), " +
          "0 1px 3px rgba(0,0,0,0.45), " +
          // Inset top-left bright edge (raised bevel highlight)
          "inset 1px 1px 0 rgba(255,255,255,0.22), " +
          "inset 2px 2px 0 rgba(255,255,255,0.08), " +
          // Inset bottom-right dark edge (raised bevel shadow)
          "inset -1px -1px 0 rgba(0,0,0,0.50), " +
          "inset -2px -2px 0 rgba(0,0,0,0.25)",
        // Thin dark gap line between adjacent panels
        outline: "1px solid #2e2010",
        margin: "1px",
      }}
    >
      {/* Recessed inner surface — inset from border, clips the SVG */}
      <div
        className="absolute overflow-hidden"
        style={{
          inset: "7px",
          borderRadius: "4px",
          // Inner shadow makes the pyramid surface look pressed into the panel
          boxShadow:
            "inset 2px 2px 6px rgba(0,0,0,0.65), " +
            "inset -1px -1px 3px rgba(0,0,0,0.35)",
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/*
              Pyramid tile pattern — a single CELL×CELL square-pyramid repeated
              across the entire SVG surface via userSpaceOnUse tiling.
              Because it fills by repeating in SVG space (not viewBox space),
              pyramids remain whole even when the SVG is slice-cropped by the
              container's differing aspect ratio.
            */}
            <pattern
              id={`pyr-${panel.id}`}
              x="0" y="0"
              width={CELL} height={CELL}
              patternUnits="userSpaceOnUse"
            >
              {/* Top face — TL corner → TR corner → centre peak */}
              <polygon points={`0,0 ${CELL},0 ${CELL/2},${CELL/2}`}       fill={F_TOP} />
              {/* Right face — TR → BR → centre */}
              <polygon points={`${CELL},0 ${CELL},${CELL} ${CELL/2},${CELL/2}`} fill={F_RGT} />
              {/* Bottom face — BR → BL → centre */}
              <polygon points={`${CELL},${CELL} 0,${CELL} ${CELL/2},${CELL/2}`} fill={F_BOT} />
              {/* Left face — BL → TL → centre */}
              <polygon points={`0,${CELL} 0,0 ${CELL/2},${CELL/2}`}       fill={F_LFT} />
            </pattern>

            {/* Aged/dirty radial gradient overlay */}
            <radialGradient id={grimeId} cx="35%" cy="30%" r="75%">
              <stop offset="0%"   stopColor="rgba(255,245,215,0.07)" />
              <stop offset="60%"  stopColor="rgba(100,70,20,0.05)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.30)" />
            </radialGradient>

            {/* Soft glow filter for lit indicators */}
            <filter id={glowId} x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Full-surface pyramid tile fill */}
          <rect width="100%" height="100%" fill={`url(#pyr-${panel.id})`} />

          {/* Grime / age overlay on top of pyramids */}
          <rect width="100%" height="100%" fill={`url(#${grimeId})`} />

          {/* Panel label text (faintly etched) */}
          <PanelLabels panelId={panel.id} />

          {/* 10×8 indicator lights at every pyramid corner intersection */}
          <LightDots lights={panel.lights} glowId={glowId} />
        </svg>
      </div>
    </div>
  );
}

/** Faint etched-in label text at the top of each panel, like the reference. */
function PanelLabels({ panelId }: { panelId: number }) {
  const col = panelId % PANEL_COLS;
  const labels = ["05H", "CONTROL", "672MG", "08H", "CONTROL", "1978BO"];
  const label = labels[col % labels.length];
  return (
    <text
      x="50%"
      y={10}
      fontSize={7}
      fontFamily="monospace"
      fill="#4a3a28"
      opacity={0.45}
      letterSpacing={1.2}
      textAnchor="middle"
    >
      {label}
    </text>
  );
}

interface LightDotsProps {
  lights: LightDef[];
  glowId: string;
}

/**
 * 10×8 = 80 light dots, one at each intersection of 4 adjacent pyramid corners.
 * Position: col*CELL, row*CELL — the exact shared corner between four cells.
 */
function LightDots({ lights, glowId }: LightDotsProps) {
  return (
    <>
      {lights.map((light, i) => {
        const lCol = i % L_COLS;
        const lRow = Math.floor(i / L_COLS);

        // Light x,y: sits at the crossing of 4 diamond corners
        const lx = (lCol + 1) * CELL;
        const ly = (lRow + 1) * CELL;

        const isLit = light.mode !== "off";

        return (
          <circle
            key={i}
            cx={lx}
            cy={ly}
            r={L_R}
            fill={isLit ? "#f5c030" : "#2a1a06"}
            opacity={light.mode === "off" ? 0.35 : 1}
            filter={isLit ? `url(#${glowId})` : undefined}
            className={MODE_CLASS[light.mode]}
            style={{ animationDelay: `${light.delay}s` }}
          />
        );
      })}
    </>
  );
}
