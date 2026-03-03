import { useState, useCallback, useRef, useEffect, KeyboardEvent } from "react";

interface TerminalInputProps {
  /** Whether the input is accepting commands */
  enabled: boolean;
  /** Fire when user submits a command */
  onSubmit: (command: string) => void;
  /** Called for each keystroke (for sound effects) */
  onKeystroke?: () => void;
}

/**
 * Terminal command input with blinking cursor and green phosphor styling.
 */
export function TerminalInput({
  enabled,
  onSubmit,
  onKeystroke,
}: TerminalInputProps) {
  const [value, setValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus when enabled
  useEffect(() => {
    if (enabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [enabled]);

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);
    onSubmit(trimmed);
    setValue("");
  }, [value, onSubmit]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      onKeystroke?.();

      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
        return;
      }

      // Command history navigation
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHistoryIndex((prev) => {
          const next = Math.min(prev + 1, commandHistory.length - 1);
          if (commandHistory[next]) setValue(commandHistory[next]);
          return next;
        });
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHistoryIndex((prev) => {
          const next = prev - 1;
          if (next < 0) {
            setValue("");
            return -1;
          }
          if (commandHistory[next]) setValue(commandHistory[next]);
          return next;
        });
      }
    },
    [handleSubmit, onKeystroke, commandHistory]
  );

  if (!enabled) return null;

  return (
    <div className="flex items-center gap-2 px-3 sm:px-5 pb-3 font-mono text-xs sm:text-sm border-t border-[#33ff33]/10">
      <span className="text-[#33ff33] text-shadow-terminal select-none shrink-0">&#9608;&gt;</span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value.toUpperCase())}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent text-[#33ff33] text-shadow-terminal outline-none border-none caret-[#33ff33] font-mono uppercase tracking-wider placeholder:text-[#33ff33]/30"
        placeholder="ENTER COMMAND..."
        autoComplete="off"
        spellCheck={false}
        autoFocus
      />
    </div>
  );
}
