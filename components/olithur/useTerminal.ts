import { useState, useCallback } from "react";

export interface TerminalLine {
  text: string;
  type: "system" | "input" | "response" | "error";
}

/** URL of the Payload CMS AI terminal endpoint. Set VITE_TERMINAL_ENDPOINT in .env. */
const TERMINAL_ENDPOINT = import.meta.env.VITE_TERMINAL_ENDPOINT as string | undefined;

const BOOT_SEQUENCE = [
  { text: "", pauseAfter: 200 },
  { text: "OLI/TH/UR 6000 INTERFACE 2037", pauseAfter: 600 },
  { text: "", pauseAfter: 200 },
  { text: "INITIALIZING SYSTEM...", pauseAfter: 1000 },
  { text: "", pauseAfter: 200 },
  { text: "SYSTEM READY FOR INQUIRY FOR SUBJECT OLIVER NORTHAM.", pauseAfter: 400 },
  { text: "", pauseAfter: 100 },
];

export function useTerminal() {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

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
      const trimmed = input.trim();
      if (!trimmed) return;

      const display = trimmed.toUpperCase();

      // Add the user's input to history
      addLines([{ text: `> ${display}`, type: "input" }]);

      if (display === "CLEAR") {
        clearHistory();
        return;
      }

      if (!TERMINAL_ENDPOINT) {
        addLines([
          { text: "COMM LINK NOT CONFIGURED.", type: "error" },
          { text: "", type: "error" },
        ]);
        return;
      }

      setIsProcessing(true);

      fetch(TERMINAL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json() as Promise<{ reply?: string; error?: string }>;
        })
        .then((data) => {
          if (data.error) {
            addLines([
              { text: data.error.toUpperCase(), type: "error" },
              { text: "", type: "error" },
            ]);
          } else if (data.reply) {
            const lines: TerminalLine[] = data.reply
              .split("\n")
              .map((line) => ({ text: line.toUpperCase(), type: "response" as const }));
            addLines([...lines, { text: "", type: "response" }]);
          }
        })
        .catch(() => {
          addLines([
            { text: "COMM LINK FAILURE. PLEASE RETRY.", type: "error" },
            { text: "", type: "error" },
          ]);
        })
        .finally(() => {
          setIsProcessing(false);
        });
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
