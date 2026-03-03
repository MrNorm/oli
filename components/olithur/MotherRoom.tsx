import { type CSSProperties, useCallback, useEffect, useState } from "react";
import { CRTScreen } from "./CRTScreen";
import { TerminalDisplay } from "./TerminalDisplay";
import { TerminalInput } from "./TerminalInput";
import { type PanelData, MotherPanel, SlimMotherPanel, BlankMotherPanel, makePanel, makeSlimPanel, makeBlankPanel } from "./AmbientLights";
import { useTypewriter } from "./useTypewriter";
import { useTerminal } from "./useTerminal";
import { useSoundEffects } from "./useSoundEffects";

// ── Responsive column counts ──────────────────────────────────────
// 6 cols (≥1536px): full room   — 2 side panels on each edge
// 4 cols ( ≥768px): tablet room — 1 side panel on each edge
// 2 cols (  <768px): screen only — no surrounding panels
type ColCount = 6 | 4 | 2;

/** Resolves 6/4/2 columns from the current viewport width. */
function getColCount(): ColCount {
  if (typeof window === "undefined") return 6;
  return window.innerWidth >= 1536 ? 6 : window.innerWidth >= 768 ? 4 : 2;
}

/** Updates column count reactively on resize. */
function useRoomCols(): ColCount {
  const [cols, setCols] = useState<ColCount>(getColCount);
  useEffect(() => {
    const update = () => setCols(getColCount());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return cols;
}

// ── Tile pools — created once at module level for stable animations ──
// Always sized for the max (6-col) layout so animations don't reset on resize.
const SLIM_POOL  = Array.from({ length: 6  }, (_, i) => makeSlimPanel(i));
const FULL_POOL  = Array.from({ length: 12 }, (_, i) => makePanel(i + 6));   // 3 rows × 4 panels (6-col)
const BLANK_POOL = Array.from({ length: 6  }, (_, i) => makeBlankPanel(i + 18));

interface TileEntry { panel: PanelData; tilt?: "left" | "right"; }

/**
 * Derives the active tile list (with tilt hints) from the current col count.
 * Tiles auto-place around the screen cell via CSS grid; order matters.
 *   6 cols: 6 slim + 12 full + 6 blank = 24 tiles  (screen rows 2–5, 3 content rows)
 *   4 cols: 4 slim +  4 full + 4 blank = 12 tiles  (screen rows 2–4, 2 content rows)
 *   2 cols: no tiles (screen fills entire grid)
 */
function buildTiles(cols: ColCount): TileEntry[] {
  if (cols === 2) return [];

  const slimSrc  = cols === 4 ? SLIM_POOL.slice(0, 4) : SLIM_POOL;
  const fullSrc  = cols === 4 ? FULL_POOL.slice(0, 4) : FULL_POOL;  // 4-col: 2×2, 6-col: 3×4
  const blankSrc = cols === 4 ? BLANK_POOL.slice(0, 4) : BLANK_POOL;

  const withEdgeTilt = (arr: PanelData[]): TileEntry[] =>
    arr.map((panel, i) => ({
      panel,
      tilt: i === 0 ? "left" : i === arr.length - 1 ? "right" : undefined,
    }));

  const slim:  TileEntry[] = withEdgeTilt(slimSrc);
  const full:  TileEntry[] = fullSrc.map((panel, i) => {
    // 6-col layout: 4 full panels per row arranged [col1, col2, col5, col6].
    // Only the outermost in each row (i%4===0 → col1, i%4===3 → col6) tilt;
    // the inner pair adjacent to the screen stays flat.
    // 4-col layout: 2 full panels per row, both are outer edge → both tilt.
    const tilt = cols === 6
      ? (i % 4 === 0 ? "left" : i % 4 === 3 ? "right" : undefined)
      : (i % 2 === 0 ? "left" : "right") as "left" | "right";
    return { panel, tilt };
  });
  const blank: TileEntry[] = withEdgeTilt(blankSrc);

  return [...slim, ...full, ...blank];
}

// Tilt edge columns inward — plain rotateY; perspective lives on the grid container.
function edgeTiltStyle(edge: "left" | "right"): CSSProperties {
  return edge === "left"
    ? { transform: "rotateY(28deg)",  transformOrigin: "right center" }
    : { transform: "rotateY(-28deg)", transformOrigin: "left center"  };
}

/**
 * The OLI/TH/UR 6000 room. A single 6×5 CSS grid where 24 cells are
 * embossed wall panels and the centre 2×3 cell is the embedded CRT terminal.
 */
export function MotherRoom() {
  const {
    history,
    isBooting,
    isProcessing,
    bootSequence,
    processCommand,
    onBootComplete,
  } = useTerminal();

  const { playKeystroke, playAmbientHum, stopAmbientHum, playBootBeep } =
    useSoundEffects();

  const { displayedLines, isComplete: bootDone } = useTypewriter(bootSequence, {
    speed: 40,
    startDelay: 800,
    onCharacter: () => playKeystroke(),
    onComplete: () => {
      playBootBeep();
      onBootComplete(displayedLines);
    },
  });

  useEffect(() => {
    if (bootDone) {
      playAmbientHum();
    }
    return () => stopAmbientHum();
  }, [bootDone, playAmbientHum, stopAmbientHum]);

  const handleKeystroke = useCallback(() => {
    playKeystroke();
  }, [playKeystroke]);

  // ── Responsive layout config ──────────────────────────────────────
  const cols = useRoomCols();
  const tiles = buildTiles(cols);

  // Screen cell placement — shifts for narrower layouts
  const screenCol = cols === 6 ? "3 / 5" : cols === 4 ? "2 / 4" : "1 / 3";
  // 6-col: screen spans 3 content rows (2–5); 4-col: 2 content rows (2–4)
  const screenRow = cols === 2 ? "1 / 5" : cols === 6 ? "2 / 5" : "2 / 4";

  // All rows are pure fr so panels stay proportional to the container.
  // 6-col: 3 content rows → 0.25+1+1+1+0.6 = 3.85fr total
  // 4-col: 2 content rows → 0.25+1+1+0.6   = 2.85fr total
  const gridRows = cols === 2 ? "1fr"
    : cols === 6 ? "0.25fr 1fr 1fr 1fr 0.6fr"
    : "0.25fr 1fr 1fr 0.6fr";

  // container_ratio = N_cols / (total_fr × (1/target_panel_ratio))
  // 6-col targets 3:2 panels (more rectangular) → factor = 2/3
  // 4-col targets 4:3 panels (standard)         → factor = 3/4
  const containerAspect = cols === 6 ? (6 / (3.85 * (2 / 3))) : (4 / (2.85 * 0.75));

  // Screen cell outer margin — adds breathing room at mobile
  const screenMargin = cols === 2 ? "8px 16px" : "1px";

  // Room container dimensions per breakpoint.
  // Width is capped so height never exceeds maxVh at 16:10 (generous) viewports.
  const containerStyle: CSSProperties = cols === 2
    ? { aspectRatio: "4/3", width: "100%", maxWidth: "min(100%, calc(72vh * 4 / 3))" }
    : { aspectRatio: String(containerAspect), width: "100%",
        minWidth: cols === 4 ? "480px" : "720px",
        maxWidth: `min(1600px, calc(72vh * ${containerAspect.toFixed(4)}))` };

  // Vignette — much lighter at mobile where the screen fills the view
  const vignetteGradient = cols === 2
    ? "radial-gradient(ellipse 92% 88% at 50% 44%, transparent 0%, rgba(0,0,0,0.15) 72%, rgba(0,0,0,0.45) 100%)"
    : "radial-gradient(ellipse 65% 60% at 50% 44%, transparent 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.88) 100%)";

  return (
    // Outer wrapper scrolls horizontally below min-width rather than squishing
    <div className="w-full overflow-x-auto">
      {/*
        Room container: locked 16:9 ratio at all sizes.
        min-width prevents panels from becoming illegibly small;
        max-width keeps it cinematic on ultra-wide screens.
      */}
      <div
        className="relative mx-auto overflow-hidden"
        style={containerStyle}
      >
      {/* ── Unified panel + screen grid ── */}
      <div
        className="absolute inset-0"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: gridRows,
          // Single shared perspective — all child rotateY transforms share this VP
          perspective: "1400px",
        }}
      >
        {/*
          Screen cell — explicitly placed so the CSS auto-placement algorithm
          skips it when flowing surrounding tile panels.
        */}
        <div
          className="relative"
          style={{
            gridColumn: screenCol,
            gridRow: screenRow,
            borderRadius: "24px",
            outline: "1px solid #2e2010",
            margin: screenMargin,
            background:
              "radial-gradient(ellipse 90% 75% at 50% 42%, #d8c4a0 10%, #bea07a 50%, #8a6a48 100%)",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.90), " +
              "0 4px 10px rgba(0,0,0,0.65), " +
              "inset 2px 2px 0 rgba(255,255,255,0.35), " +
              "inset -2px -2px 0 rgba(0,0,0,0.55)",
          }}
        >
          {/* ── Step 1: Dark recessed channel — the moat between bezel face and inner ring ── */}
          <div style={{
            position: "absolute",
            inset: "24px",
            borderRadius: "12px",
            background: "#111008",
            boxShadow:
              "inset 4px 4px 10px rgba(0,0,0,0.95), " +
              "inset -2px -2px 6px rgba(0,0,0,0.70)",
          }}>
            {/* ── Step 2: Recessed inner frame — sits below the bezel face ── */}
            <div style={{
              position: "absolute",
              inset: "3px",
              borderRadius: "6px",
              background:
                "linear-gradient(160deg, #6a5238 0%, #7a6248 40%, #8a7258 100%)",
              boxShadow:
                "inset 3px 3px 8px rgba(0,0,0,0.85), " +
                "inset 6px 6px 16px rgba(0,0,0,0.65), " +
                "inset -2px -2px 4px rgba(255,255,255,0.12)",
            }}>
              {/* ── Step 3: Screen glass inset ── */}
              <div style={{
                position: "absolute",
                inset: "27px",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow:
                  "inset 4px 4px 14px rgba(0,0,0,0.98), " +
                  "inset -2px -2px 8px rgba(0,0,0,0.80)",
              }}>
                <CRTScreen embedded>
                  <TerminalDisplay
                    history={history}
                    typingLines={displayedLines}
                    isBooting={isBooting}
                  />
                  <TerminalInput
                    enabled={!isBooting && !isProcessing}
                    onSubmit={processCommand}
                    onKeystroke={handleKeystroke}
                  />
                </CRTScreen>
              </div>
            </div>
          </div>
        </div>

        {/* Tiles auto-place around the screen cell — count/tilt derived from col layout */}
        {tiles.map(({ panel, tilt }) => {
          const tiltStyle = tilt ? edgeTiltStyle(tilt) : undefined;
          if (panel.type === "slim")  return <SlimMotherPanel  key={panel.id} panel={panel} tiltStyle={tiltStyle} />;
          if (panel.type === "blank") return <BlankMotherPanel key={panel.id} panel={panel} tiltStyle={tiltStyle} />;
          return <MotherPanel key={panel.id} panel={panel} tiltStyle={tiltStyle} />;
        })}
      </div>

      {/* ── Dark room vignette — scaled to viewport size ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: vignetteGradient }}
      />
      {/* Left edge shadow — simulates the side wall turning away */}
      <div
        className="absolute inset-y-0 left-0 pointer-events-none"
        style={{
          width: "20%",
          background:
            "linear-gradient(to right, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.40) 45%, transparent 100%)",
        }}
      />
      {/* Right edge shadow — mirror of left */}
      <div
        className="absolute inset-y-0 right-0 pointer-events-none"
        style={{
          width: "20%",
          background:
            "linear-gradient(to left, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.40) 45%, transparent 100%)",
        }}
      />
      {/* Amber room-tone wash — preserves the warm space-tech atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(120,80,20,0.10) 0%, transparent 70%)",
        }}
      />
      </div>
    </div>
  );
}
