import { useCallback, useEffect } from "react";
import { CRTScreen } from "./CRTScreen";
import { TerminalDisplay } from "./TerminalDisplay";
import { TerminalInput } from "./TerminalInput";
import { MotherPanel, makePanel, PANEL_OUTER_STYLE, PANEL_INSET_STYLE } from "./AmbientLights";
import { useTypewriter } from "./useTypewriter";
import { useTerminal } from "./useTerminal";
import { useSoundEffects } from "./useSoundEffects";

// Grid constants — must match AmbientLights
const PANEL_COLS = 6;
const PANEL_ROWS = 5;

// The screen occupies cols 3–4, rows 2–4 (1-based CSS grid).
// That removes 2 cols × 3 rows = 6 cells from the 30-cell grid → 24 tiles.
const TILE_COUNT = 24;

// Stable tile data — created once at module level
const TILES = Array.from({ length: TILE_COUNT }, (_, i) => makePanel(i));

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
    <div className="relative w-full min-h-[calc(100vh-5rem)] overflow-hidden">
      {/* ── Unified 6×5 panel + screen grid ── */}
      <div
        className="absolute inset-0"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${PANEL_COLS}, 1fr)`,
          gridTemplateRows: `repeat(${PANEL_ROWS}, 1fr)`,
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
            ...PANEL_OUTER_STYLE,
            gridColumn: "3 / 5",
            gridRow: "2 / 5",
          }}
        >
          <div style={PANEL_INSET_STYLE}>
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

        {/* 24 auto-placed tile panels — flow around the screen cell */}
        {TILES.map((panel) => (
          <MotherPanel key={panel.id} panel={panel} />
        ))}
      </div>

      {/* ── Room atmosphere — dim amber wash + depth vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(120,80,20,0.12) 0%, rgba(30,15,0,0.65) 100%)",
        }}
      />
    </div>
  );
}

