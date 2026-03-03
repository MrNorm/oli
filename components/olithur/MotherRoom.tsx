import { useCallback, useEffect } from "react";
import { CRTScreen } from "./CRTScreen";
import { TerminalDisplay } from "./TerminalDisplay";
import { TerminalInput } from "./TerminalInput";
import { AmbientLights } from "./AmbientLights";
import { useTypewriter } from "./useTypewriter";
import { useTerminal } from "./useTerminal";
import { useSoundEffects } from "./useSoundEffects";

/**
 * The OLI/TH/UR 6000 room. Embossed retro panels fill the entire background,
 * a dim amber light washes the room, and the CRT terminal sits centred in the wall.
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
      // Flush the typed lines into terminal history so they persist after boot
      onBootComplete(displayedLines);
    },
  });

  // Start ambient hum once boot completes
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
    <div className="relative w-full min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
      {/* ── Layer 0: Full-viewport panel grid (background) ── */}
      <AmbientLights className="z-0" />

      {/* ── Layer 1: Room atmosphere — dim amber wash + depth vignette ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(120,80,20,0.12) 0%, rgba(30,15,0,0.65) 100%)",
        }}
      />

      {/* ── Layer 2: CRT terminal, centred in the wall ── */}
      <div className="relative z-20 w-[42%] min-w-[280px] max-w-[640px]">
        <CRTScreen>
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
  );
}
