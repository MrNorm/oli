import { useEffect, useRef } from "react";
import type { TerminalLine } from "./useTerminal";

interface TerminalDisplayProps {
  /** Lines committed to history (includes boot lines once boot is done) */
  history: TerminalLine[];
  /** Lines currently being typed during the boot sequence */
  typingLines: string[];
  /** Whether the boot typewriter is still in progress */
  isBooting: boolean;
}

/**
 * Terminal output area. Renders history at all times; during boot it also shows
 * the live-typed boot lines below any existing history. Auto-scrolls to bottom
 * whenever content changes, and never changes its own dimensions.
 */
export function TerminalDisplay({
  history,
  typingLines,
  isBooting,
}: TerminalDisplayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on any content change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, typingLines]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-3 sm:p-5 font-mono text-xs sm:text-sm leading-[1.6] scrollbar-terminal"
    >
      {/* Committed history — always rendered, survives the boot→interactive transition */}
      {history.map((line, i) => (
        <TerminalTextLine
          key={`hist-${i}`}
          text={line.text}
          type={line.type}
        />
      ))}

      {/* Live boot typing — rendered on top of (empty) history during boot */}
      {isBooting &&
        typingLines.map((line, i) => (
          <TerminalTextLine
            key={`boot-${i}`}
            text={line}
            type="system"
            showCursor={i === typingLines.length - 1}
          />
        ))}
    </div>
  );
}

interface TerminalTextLineProps {
  text: string;
  type: "system" | "input" | "response" | "error";
  showCursor?: boolean;
}

/** Determines whether a line looks like a section heading (e.g. followed by === or all-caps short line). */
function isHeadingLine(text: string): boolean {
  return /^[A-Z][A-Z\s/\-]{3,}$/.test(text.trim()) && text.trim().length < 40;
}

function TerminalTextLine({
  text,
  type,
  showCursor = false,
}: TerminalTextLineProps) {
  const colorClass = {
    system: "text-[#33ff33]",
    input: "text-[#55ff55]",
    response: "text-[#2ee62e]",
    error: "text-[#ff5555]",
  }[type];

  const isHeading = type !== "error" && isHeadingLine(text);

  return (
    <div
      className={[
        colorClass,
        "whitespace-pre-wrap min-h-[1.5em] text-shadow-terminal animate-text-glitch",
        isHeading ? "terminal-underline font-semibold" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {text}
      {showCursor && <span className="animate-terminal-blink">&#9608;</span>}
    </div>
  );
}
