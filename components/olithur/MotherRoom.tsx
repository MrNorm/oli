import { type CSSProperties, useCallback, useEffect } from "react";
import { CRTScreen } from "./CRTScreen";
import { TerminalDisplay } from "./TerminalDisplay";
import { TerminalInput } from "./TerminalInput";
import { MotherPanel, SlimMotherPanel, BlankMotherPanel, makePanel, makeSlimPanel, makeBlankPanel } from "./AmbientLights";
import { useTypewriter } from "./useTypewriter";
import { useTerminal } from "./useTerminal";
import { useSoundEffects } from "./useSoundEffects";

// Grid columns — must match AmbientLights
const PANEL_COLS = 6;

// The screen occupies cols 3–4, rows 2–4 (1-based CSS grid).
// That removes 2 cols × 3 rows = 6 cells from the 30-cell grid → 24 tiles.
//
// Auto-placement order around the screen cell:
//   Row 1  → tiles  0–5   (6 slim panels — short decorative top strip)
//   Rows 2–4 → tiles  6–17  (12 full panels — left & right of screen)
//   Row 5  → tiles 18–23  (6 blank panels — plain beige bottom strip)
const SLIM_TILES  = Array.from({ length: 6  }, (_, i) => makeSlimPanel(i));
const FULL_TILES  = Array.from({ length: 12 }, (_, i) => makePanel(i + 6));
const BLANK_TILES = Array.from({ length: 6  }, (_, i) => makeBlankPanel(i + 18));
const TILES = [...SLIM_TILES, ...FULL_TILES, ...BLANK_TILES];

// Auto-placement grid layout (screen at cols 3–4, rows 2–4):
//   Row 1: IDs  0  1  2  3  4  5    → cols 1 2 3 4 5 6
//   Row 2: IDs  6  7        8  9    → cols 1 2 . . 5 6
//   Row 3: IDs 10 11       12 13    → cols 1 2 . . 5 6
//   Row 4: IDs 14 15       16 17    → cols 1 2 . . 5 6
//   Row 5: IDs 18 19 20 21 22 23    → cols 1 2 3 4 5 6
const LEFT_EDGE_IDS  = new Set([0, 6, 10, 14, 18]);
const RIGHT_EDGE_IDS = new Set([5, 9, 13, 17, 23]);

// Tilt edge columns inward — plain rotateY only; perspective lives on the grid container.
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

  return (
    <div className="relative w-full min-h-[calc(90vh-5rem)] overflow-hidden">
      {/* ── Unified 6×5 panel + screen grid ── */}
      <div
        className="absolute inset-0"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${PANEL_COLS}, 1fr)`,
          // Row 1: slim fixed-height strip; rows 2–4 equal; row 5 reduced by 40%
          gridTemplateRows: `max(64px, 9vh) 1fr 1fr 1fr 0.6fr`,
          // Single shared perspective — all child rotateY transforms use this VP
          perspective: "1400px",
        }}
      >
        {/*
          Screen cell — explicitly placed at cols 3-4, rows 2-4.
          Declared first so the CSS auto-placement algorithm knows to
          skip those 6 cells when flowing the 24 tile panels around it.
        */}
        <div
          className="relative"
          style={{
            gridColumn: "3 / 5",
            gridRow: "2 / 5",
            borderRadius: "24px",
            outline: "1px solid #2e2010",
            margin: "1px",
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
              // Darker than the outer bezel — shadowed cavity floor
              background:
                "linear-gradient(160deg, #6a5238 0%, #7a6248 40%, #8a7258 100%)",
              boxShadow:
                // Inset bevel flipped: dark top-left, bright bottom-right = sunken
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

        {/* Tiles: slim (row 1) → full (rows 2–4) → blank (row 5) — auto-placed around screen */}
        {TILES.map((panel) => {
          const tiltStyle = LEFT_EDGE_IDS.has(panel.id)
            ? edgeTiltStyle("left")
            : RIGHT_EDGE_IDS.has(panel.id)
              ? edgeTiltStyle("right")
              : undefined;
          if (panel.type === "slim")  return <SlimMotherPanel  key={panel.id} panel={panel} tiltStyle={tiltStyle} />;
          if (panel.type === "blank") return <BlankMotherPanel key={panel.id} panel={panel} tiltStyle={tiltStyle} />;
          return <MotherPanel key={panel.id} panel={panel} tiltStyle={tiltStyle} />;
        })}
      </div>

      {/* ── Dark room vignette — strong radial blackout at all edges ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 44%, transparent 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.88) 100%)",
        }}
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
  );
}

