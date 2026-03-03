import { type CSSProperties } from "react";
import { cn } from "@/lib/utils";

// ── Panel grid ────────────────────────────────────────────────────
const PANEL_COLS = 6;
const PANEL_ROWS = 5;

// ── Full panel — 11 columns × 9 rows ────────────────────────────
const D_COLS = 11;
const D_ROWS = 9;

// Lights at every intersection of 4 pyramids — (D_COLS-1) × (D_ROWS-1).
const L_COLS = D_COLS - 1; // 10
const L_ROWS = D_ROWS - 1; // 8

// ── Slim panel — 11 columns × 2 rows → 1 sandwiched LED row ──────
const SD_COLS = 11;
const SD_ROWS = 2;
const SL_COLS = SD_COLS - 1; // 10 lights in a single row

// ── Light clusters ──────────────────────────────────────────────
// All blinking lights share one animation (1s on / 1s off, quick snap).
// 5 clusters are evenly phase-shifted across the 2s cycle so they stagger
// visually across all panels — like the reference footage.
const N_CLUSTERS = 5;
const CLUSTER_CYCLE = 6; // seconds — must match animation duration in CSS
const CLUSTER_DELAYS = Array.from(
  { length: N_CLUSTERS },
  (_, i) => parseFloat(((i / N_CLUSTERS) * CLUSTER_CYCLE).toFixed(3))
); // [0, 0.4, 0.8, 1.2, 1.6]

type LightMode = "off" | "cluster";

// ── Panel data types & factory (exported for MotherRoom) ────────
export interface LightDef {
  mode: LightMode;
  delay: number;
}

export type PanelType = "full" | "slim" | "blank";

export interface PanelData {
  id: number;
  type: PanelType;
  lights: LightDef[];
}

function makeLight(): LightDef {
  // ~50% of lights permanently dark
  if (Math.random() < 0.50) return { mode: "off", delay: 0 };
  const cluster = Math.floor(Math.random() * N_CLUSTERS);
  // Small jitter within cluster so it feels organic, not robotic
  const jitter = (Math.random() - 0.5) * 0.15;
  return {
    mode: "cluster",
    delay: parseFloat((CLUSTER_DELAYS[cluster] + jitter).toFixed(3)),
  };
}

export function makePanel(id: number): PanelData {
  return { id, type: "full", lights: Array.from({ length: L_COLS * L_ROWS }, makeLight) };
}

/** Slim panel: 10 lights in a single row (sandwiched between 2 pyramid rows). */
export function makeSlimPanel(id: number): PanelData {
  return { id, type: "slim", lights: Array.from({ length: SL_COLS }, makeLight) };
}

/** Blank panel: no pyramid content — just the raised outer border. */
export function makeBlankPanel(id: number): PanelData {
  return { id, type: "blank", lights: [] };
}

// Stable tile data for the standalone AmbientLights component
const PANELS: PanelData[] = Array.from(
  { length: PANEL_COLS * PANEL_ROWS },
  (_, id) => makePanel(id)
);

// ── CSS animation class per mode ─────────────────────────────────
const MODE_CLASS: Record<LightMode, string> = {
  off:     "",
  cluster: "animate-light-cluster",
};

// ── Square-pyramid face palette — dirty warm space-tech tones ────
// conic-gradient from -45deg produces 4 triangular sectors meeting at centre.
// Light source from top-left: top brightest, right mid, bottom dark, left slight.
const F_TOP = "#c8b89c";
const F_RGT = "#a08868";
const F_BOT = "#786050";
const F_LFT = "#b0a080";

// Each cell is a square div; this background splits it into 4 pyramid faces.
const PYRAMID_BG = `conic-gradient(from -45deg at 50% 50%, ${F_TOP} 0deg 90deg, ${F_RGT} 90deg 180deg, ${F_BOT} 180deg 270deg, ${F_LFT} 270deg 360deg)`;

// Shared panel outer styles — used by MotherPanel and the embedded screen cell.
export const PANEL_OUTER_STYLE: CSSProperties = {
  background: "linear-gradient(145deg, #c2ae92 0%, #8c7858 55%, #a08868 100%)",
  borderRadius: "8px",
  boxShadow:
    "0 4px 8px rgba(0,0,0,0.60), " +
    "0 1px 3px rgba(0,0,0,0.45), " +
    "inset 1px 1px 0 rgba(255,255,255,0.22), " +
    "inset 2px 2px 0 rgba(255,255,255,0.08), " +
    "inset -1px -1px 0 rgba(0,0,0,0.50), " +
    "inset -2px -2px 0 rgba(0,0,0,0.25)",
  outline: "1px solid #2e2010",
  margin: "1px",
};

export const PANEL_INSET_STYLE: CSSProperties = {
  position: "absolute",
  inset: "7px",
  borderRadius: "4px",
  boxShadow:
    "inset 2px 2px 6px rgba(0,0,0,0.65), " +
    "inset -1px -1px 3px rgba(0,0,0,0.35)",
  overflow: "hidden",
};

// ── Components ────────────────────────────────────────────────────

interface AmbientLightsProps {
  className?: string;
}

/**
 * Full-viewport grid of embossed Mother-room panels.
 * Each panel contains an 11×9 flex grid of square pyramid cells with lights
 * at every intersection. Pure CSS animations drive all light flashing.
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
export function MotherPanel({ panel }: { panel: PanelData }) {
  const col = panel.id % PANEL_COLS;
  const labels = ["05H", "CONTROL", "672MG", "08H", "CONTROL", "1978BO"];
  const label = labels[col % labels.length];

  return (
    <div
      className="relative"
      style={PANEL_OUTER_STYLE}
    >
      {/* Recessed inner surface */}
      <div style={PANEL_INSET_STYLE}>
        {/*
          Pyramid cell grid — CSS grid, always fills the container.
          11 equal columns × 9 equal rows → cells stretch to cover the panel
          regardless of its aspect ratio. No overflow, no gaps.
          position:relative so lights can overlay absolutely.
        */}
        <div
          className="relative w-full h-full"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${D_COLS}, 1fr)`,
            gridTemplateRows: `repeat(${D_ROWS}, 1fr)`,
          }}
        >
          {Array.from({ length: D_COLS * D_ROWS }, (_, i) => (
            <div
              key={i}
              style={{ background: PYRAMID_BG }}
            />
          ))}

          {/* Grime / age overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 35% 30%, rgba(255,245,215,0.07) 0%, rgba(100,70,20,0.05) 60%, rgba(0,0,0,0.30) 100%)",
            }}
          />

          {/* Etched label */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "4%",
              left: 0,
              right: 0,
              textAlign: "center",
              fontSize: "clamp(5px, 0.6vw, 8px)",
              fontFamily: "monospace",
              color: "#4a3a28",
              opacity: 0.45,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {label}
          </div>

          {/* Light dots — absolutely positioned at every cell-corner intersection */}
          <LightDots lights={panel.lights} dCols={D_COLS} dRows={D_ROWS} />
        </div>
      </div>
    </div>
  );
}

/**
 * Light dots at every pyramid-corner intersection.
 * dCols / dRows must match the pyramid grid dimensions so positions are correct.
 */
function LightDots({ lights, dCols, dRows }: { lights: LightDef[]; dCols: number; dRows: number }) {
  const lCols = dCols - 1;
  return (
    <>
      {lights.map((light, i) => {
        const lCol = i % lCols;
        const lRow = Math.floor(i / lCols);

        // Percentage position within the CSS grid (dCols wide × dRows tall).
        const left = `${((lCol + 1) / dCols) * 100}%`;
        const top  = `${((lRow + 1) / dRows) * 100}%`;

        const isLit = light.mode !== "off";

        return (
          <div
            key={i}
            className={MODE_CLASS[light.mode]}
            style={{
              position: "absolute",
              left,
              top,
              width:  `calc(100% / ${dCols} * 0.21)`,
              aspectRatio: "1",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              background: isLit ? "rgba(255,252,220,0.9)" : "#2a1a06",
              opacity: light.mode === "off" ? 0.35 : 1,
              boxShadow: isLit
                ? "0 0 6px 3px rgba(255,255,255,0.7), 0 0 12px 5px rgba(255,240,180,0.4)"
                : undefined,
              animationDelay: `${light.delay}s`,
            }}
          />
        );
      })}
    </>
  );
}

/**
 * Slim wall panel: 2 pyramid rows × 11 cols with a single row of 10 LED dots
 * sandwiched between them. Intended for the short top row of the room grid.
 */
export function SlimMotherPanel({ panel }: { panel: PanelData }) {
  return (
    <div className="relative" style={PANEL_OUTER_STYLE}>
      {/* Recessed inner surface */}
      <div style={PANEL_INSET_STYLE}>
        {/*
          2-row pyramid grid — same column count as the full panel so the
          pyramid cells are wider than they are tall (matching the short row).
          The single LED row sits at the intersection of rows 1 and 2 (50%).
        */}
        <div
          className="relative w-full h-full"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${SD_COLS}, 1fr)`,
            gridTemplateRows: `repeat(${SD_ROWS}, 1fr)`,
          }}
        >
          {Array.from({ length: SD_COLS * SD_ROWS }, (_, i) => (
            <div key={i} style={{ background: PYRAMID_BG }} />
          ))}

          {/* Grime / age overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 35% 30%, rgba(255,245,215,0.07) 0%, rgba(100,70,20,0.05) 60%, rgba(0,0,0,0.30) 100%)",
            }}
          />

          {/* Single row of 10 LED dots between the two pyramid rows */}
          <LightDots lights={panel.lights} dCols={SD_COLS} dRows={SD_ROWS} />
        </div>
      </div>
    </div>
  );
}

/**
 * Blank decorative panel: raised cream border with a plain beige fill.
 * No pyramid content or LEDs — used as visual padding in the bottom row.
 */
export function BlankMotherPanel({ panel: _panel }: { panel: PanelData }) {
  return (
    <div
      className="relative"
      style={{
        ...PANEL_OUTER_STYLE,
        // Slightly lighter/flatter fill than the pyramid panels — blank face
        background:
          "linear-gradient(145deg, #cdbfa8 0%, #b8a688 40%, #c4ae94 100%)",
      }}
    />
  );
}
