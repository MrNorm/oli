import { useState, useEffect, useCallback, useRef } from "react";

interface UseTypewriterOptions {
  /** Characters per second */
  speed?: number;
  /** Delay before starting (ms) */
  startDelay?: number;
  /** Callback fired for each character typed */
  onCharacter?: (char: string) => void;
  /** Callback when a line finishes typing */
  onLineComplete?: () => void;
  /** Callback when all lines are done */
  onComplete?: () => void;
}

interface TypewriterLine {
  text: string;
  /** Delay after this line before the next starts (ms) */
  pauseAfter?: number;
}

export function useTypewriter(
  lines: TypewriterLine[],
  options: UseTypewriterOptions = {}
) {
  const {
    speed = 30,
    startDelay = 500,
    onCharacter,
    onLineComplete,
    onComplete,
  } = options;

  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const onCharacterRef = useRef(onCharacter);
  const onLineCompleteRef = useRef(onLineComplete);
  const onCompleteRef = useRef(onComplete);

  onCharacterRef.current = onCharacter;
  onLineCompleteRef.current = onLineComplete;
  onCompleteRef.current = onComplete;

  const start = useCallback(() => {
    setHasStarted(true);
    setIsTyping(true);
    setDisplayedLines([""]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsComplete(false);
  }, []);

  // Start after delay
  useEffect(() => {
    if (lines.length === 0) return;
    const timer = setTimeout(start, startDelay);
    return () => clearTimeout(timer);
  }, [lines, startDelay, start]);

  // Type characters
  useEffect(() => {
    if (!isTyping || !hasStarted || isComplete) return;
    if (currentLineIndex >= lines.length) {
      setIsTyping(false);
      setIsComplete(true);
      onCompleteRef.current?.();
      return;
    }

    const currentLine = lines[currentLineIndex];
    if (currentCharIndex >= currentLine.text.length) {
      // Line complete
      onLineCompleteRef.current?.();
      const pauseMs = currentLine.pauseAfter ?? 300;
      const timer = setTimeout(() => {
        const nextIndex = currentLineIndex + 1;
        if (nextIndex >= lines.length) {
          setIsTyping(false);
          setIsComplete(true);
          onCompleteRef.current?.();
        } else {
          setCurrentLineIndex(nextIndex);
          setCurrentCharIndex(0);
          setDisplayedLines((prev) => [...prev, ""]);
        }
      }, pauseMs);
      return () => clearTimeout(timer);
    }

    // Add jitter for realism
    const jitter = Math.random() * (1000 / speed) * 0.5;
    const timer = setTimeout(() => {
      const char = currentLine.text[currentCharIndex];
      onCharacterRef.current?.(char);
      setDisplayedLines((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = currentLine.text.slice(
          0,
          currentCharIndex + 1
        );
        return updated;
      });
      setCurrentCharIndex((prev) => prev + 1);
    }, 1000 / speed + jitter);

    return () => clearTimeout(timer);
  }, [isTyping, hasStarted, isComplete, currentLineIndex, currentCharIndex, lines, speed]);

  const reset = useCallback(() => {
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsTyping(false);
    setIsComplete(false);
    setHasStarted(false);
  }, []);

  return {
    displayedLines,
    isTyping,
    isComplete,
    reset,
    start,
  };
}
