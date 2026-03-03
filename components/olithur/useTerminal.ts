import { useState, useCallback, useRef } from "react";

export interface TerminalLine {
  text: string;
  type: "system" | "input" | "response" | "error";
}

interface CommandResponse {
  lines: string[];
  type?: "response" | "error";
}

const COMMANDS: Record<string, CommandResponse> = {
  HELP: {
    lines: [
      "AVAILABLE COMMANDS:",
      "",
      "  STATUS     - SYSTEM STATUS REPORT",
      "  CREW       - CREW MANIFEST",
      "  COURSE     - CURRENT NAVIGATION DATA",
      "  CARGO      - CARGO MANIFEST",
      "  SPECIAL    - SPECIAL ORDERS",
      "  WEATHER    - ATMOSPHERIC CONDITIONS",
      "  DIAGNOSTICS- RUN SYSTEM DIAGNOSTICS",
      "  CLEAR      - CLEAR TERMINAL",
      "  HELP       - THIS MESSAGE",
    ],
  },
  STATUS: {
    lines: [
      "OLI/TH/UR 6000 SYSTEM STATUS",
      "============================",
      "",
      "CORE TEMP:        NOMINAL",
      "REACTOR OUTPUT:   98.7%",
      "LIFE SUPPORT:     ACTIVE",
      "HULL INTEGRITY:   100%",
      "FUEL RESERVES:    62.3%",
      "COMMUNICATION:    UPLINK ACTIVE",
      "HYPERSLEEP:       ALL CHAMBERS SEALED",
      "",
      "ALL SYSTEMS OPERATIONAL.",
    ],
  },
  CREW: {
    lines: [
      "CREW MANIFEST - USCSS NOSTROMO",
      "==============================",
      "",
      "  DALLAS, A.    CAPTAIN          HYPERSLEEP",
      "  KANE, G.      EXEC. OFFICER    HYPERSLEEP",
      "  RIPLEY, E.    WARRANT OFFICER  HYPERSLEEP",
      "  ASH            SCIENCE OFFICER  ACTIVE",
      "  LAMBERT, J.   NAVIGATOR        HYPERSLEEP",
      "  BRETT, S.      ENGINEER         HYPERSLEEP",
      "  PARKER, D.    ENGINEER         HYPERSLEEP",
    ],
  },
  COURSE: {
    lines: [
      "NAVIGATION DATA",
      "===============",
      "",
      "ORIGIN:       THEDUS",
      "DESTINATION:  EARTH",
      "CURRENT POS:  ZETA II RETICULI",
      "ETA:          10 MONTHS 14 DAYS",
      "",
      "COURSE DEVIATION DETECTED.",
      "PRIORITY SIGNAL RECEIVED - LV-426.",
      "COMPANY DIRECTIVE: INVESTIGATE.",
    ],
  },
  CARGO: {
    lines: [
      "CARGO MANIFEST",
      "==============",
      "",
      "  20,000,000 TONS MINERAL ORE",
      "  REFINING STATUS: IN PROGRESS",
      "  ESTIMATED VALUE: $42,000,000",
      "",
      "  ADDITIONAL CARGO: [CLASSIFIED]",
    ],
  },
  SPECIAL: {
    lines: [
      "SPECIAL ORDER 937",
      "==================",
      "",
      "PRIORITY ONE",
      "ENSURE RETURN OF ORGANISM FOR ANALYSIS.",
      "ALL OTHER CONSIDERATIONS SECONDARY.",
      "CREW EXPENDABLE.",
      "",
      "// WEYLAND-YUTANI CORP //",
    ],
  },
  WEATHER: {
    lines: [
      "ATMOSPHERIC DATA - LV-426",
      "=========================",
      "",
      "SURFACE TEMP:     -49.2°C",
      "WIND SPEED:       120 KPH",
      "ATMOSPHERE:       PRIMORDIAL",
      "  NITROGEN:       78%",
      "  METHANE:        12%",
      "  AMMONIA:        8%",
      "  OTHER:          2%",
      "",
      "WARNING: HOSTILE CONDITIONS.",
      "EVA SUIT REQUIRED.",
    ],
  },
  DIAGNOSTICS: {
    lines: [
      "RUNNING SYSTEM DIAGNOSTICS...",
      "",
      "  CPU CORE 1 .......... OK",
      "  CPU CORE 2 .......... OK",
      "  MEMORY BANK A ....... OK",
      "  MEMORY BANK B ....... OK",
      "  SENSOR ARRAY ........ OK",
      "  COMM RELAY .......... OK",
      "  NAV COMPUTER ........ OK",
      "  LIFE SUPPORT ........ OK",
      "  HYPERDRIVE .......... STANDBY",
      "  AI SUBSYSTEM ........ ACTIVE",
      "",
      "ALL DIAGNOSTICS PASSED.",
      "NO ANOMALIES DETECTED.",
    ],
  },
};

const BOOT_SEQUENCE = [
  { text: "", pauseAfter: 200 },
  { text: "OLI/TH/UR 6000 INTERFACE 2037", pauseAfter: 600 },
  { text: "WEYLAND-YUTANI CORP.", pauseAfter: 400 },
  { text: "BUILDING BETTER WORLDS", pauseAfter: 800 },
  { text: "", pauseAfter: 200 },
  { text: "INITIALIZING SYSTEM...", pauseAfter: 1000 },
  { text: "MEMORY CHECK.......... OK", pauseAfter: 300 },
  { text: "SENSOR GRID........... OK", pauseAfter: 300 },
  { text: "COMM UPLINK........... ACTIVE", pauseAfter: 300 },
  { text: "AI SUBSYSTEM.......... ONLINE", pauseAfter: 600 },
  { text: "", pauseAfter: 200 },
  { text: "UPLINK ESTABLISHED.", pauseAfter: 500 },
  { text: "READY FOR INQUIRY.", pauseAfter: 400 },
  { text: 'TYPE "HELP" FOR AVAILABLE COMMANDS.', pauseAfter: 200 },
  { text: "", pauseAfter: 100 },
];

export function useTerminal() {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const responseTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const addLines = useCallback((lines: TerminalLine[]) => {
    setHistory((prev) => [...prev, ...lines]);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const onBootComplete = useCallback((bootLines: string[]) => {
    // Seed history with the boot sequence lines before clearing the booting flag.
    // Both setHistory and setIsBooting will be batched into a single render.
    setHistory(
      bootLines.map((text) => ({ text, type: "system" as const }))
    );
    setIsBooting(false);
  }, []);

  const processCommand = useCallback(
    (input: string): void => {
      const trimmed = input.trim().toUpperCase();

      // Add the user's input to history
      addLines([{ text: `> ${trimmed}`, type: "input" }]);

      if (trimmed === "CLEAR") {
        clearHistory();
        return;
      }

      setIsProcessing(true);

      // Simulate processing delay
      responseTimerRef.current = setTimeout(() => {
        const response = COMMANDS[trimmed];
        if (response) {
          const responseLines: TerminalLine[] = response.lines.map((line) => ({
            text: line,
            type: response.type ?? "response",
          }));
          addLines([...responseLines, { text: "", type: "response" }]);
        } else {
          addLines([
            {
              text: `UNKNOWN COMMAND: ${trimmed}`,
              type: "error",
            },
            {
              text: 'TYPE "HELP" FOR AVAILABLE COMMANDS.',
              type: "error",
            },
            { text: "", type: "error" },
          ]);
        }
        setIsProcessing(false);
      }, 300 + Math.random() * 500);
    },
    [addLines, clearHistory]
  );

  return {
    history,
    isBooting,
    isProcessing,
    bootSequence: BOOT_SEQUENCE,
    processCommand,
    onBootComplete,
    clearHistory,
  };
}
