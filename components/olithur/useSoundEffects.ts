import { useCallback, useRef, useEffect } from "react";

interface SoundEffects {
  playKeystroke: () => void;
  playAmbientHum: () => void;
  stopAmbientHum: () => void;
  playBootBeep: () => void;
}

/**
 * Synthesises retro terminal sound effects using the Web Audio API.
 * No external audio assets required.
 */
export function useSoundEffects(enabled = true): SoundEffects {
  const ctxRef = useRef<AudioContext | null>(null);
  const humOscRef = useRef<OscillatorNode | null>(null);
  const humGainRef = useRef<GainNode | null>(null);

  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      humOscRef.current?.stop();
      ctxRef.current?.close();
    };
  }, []);

  const playKeystroke = useCallback(() => {
    if (!enabled) return;
    const ctx = getContext();
    const duration = 0.04;

    // Short noise burst for a mechanical key click
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    // Bandpass to make it sound like a key click
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 3000 + Math.random() * 2000;
    filter.Q.value = 1.5;

    const gain = ctx.createGain();
    gain.gain.value = 0.08;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
    source.stop(ctx.currentTime + duration);
  }, [enabled, getContext]);

  const playAmbientHum = useCallback(() => {
    if (!enabled) return;
    const ctx = getContext();
    if (humOscRef.current) return; // Already humming

    // Low-frequency CRT hum
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 60; // 60Hz mains hum

    // Add slight detuned harmonic
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = 120;

    const gain = ctx.createGain();
    gain.gain.value = 0;
    // Fade in
    gain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 2);

    const gain2 = ctx.createGain();
    gain2.gain.value = 0;
    gain2.gain.linearRampToValueAtTime(0.005, ctx.currentTime + 2);

    osc.connect(gain);
    osc2.connect(gain2);
    gain.connect(ctx.destination);
    gain2.connect(ctx.destination);

    osc.start();
    osc2.start();

    humOscRef.current = osc;
    humGainRef.current = gain;
  }, [enabled, getContext]);

  const stopAmbientHum = useCallback(() => {
    if (humOscRef.current && humGainRef.current && ctxRef.current) {
      humGainRef.current.gain.linearRampToValueAtTime(
        0,
        ctxRef.current.currentTime + 1
      );
      const osc = humOscRef.current;
      setTimeout(() => osc.stop(), 1100);
      humOscRef.current = null;
      humGainRef.current = null;
    }
  }, []);

  const playBootBeep = useCallback(() => {
    if (!enabled) return;
    const ctx = getContext();
    const duration = 0.15;

    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.value = 880;

    const gain = ctx.createGain();
    gain.gain.value = 0.06;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }, [enabled, getContext]);

  return {
    playKeystroke,
    playAmbientHum,
    stopAmbientHum,
    playBootBeep,
  };
}
