"use client";

import { useCallback, useRef, useState } from "react";
import gsap from "gsap";

interface HoldToAnalyzeProps {
  lines: string[];
}

const HOLD_DURATION = 1.5;
const BAR_COUNT = 5;
const CIRCUMFERENCE = 2 * Math.PI * 15;

function HoldToAnalyze({ lines }: HoldToAnalyzeProps) {
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);
  const barsRef = useRef<(SVGRectElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const start = useCallback(() => {
    if (tlRef.current) tlRef.current.kill();
    setReady(false);
    setActive(true);

    const bars = barsRef.current.filter(Boolean) as SVGRectElement[];
    const tl = gsap.timeline({ onComplete: () => setReady(true) });

    gsap.set(indicatorRef.current, { opacity: 0 });
    tl.to(indicatorRef.current, { opacity: 1, duration: 0.2, ease: "power2.out" }, 0)
      .to(textRef.current, { color: "#ffffff", duration: 0.2 }, 0)
      .to(ringRef.current, { strokeDashoffset: 0, duration: HOLD_DURATION, ease: "power3.out" }, 0)
      .to(
        bars,
        {
          scaleY: () => 0.4 + Math.random() * 1.6,
          duration: 0.25,
          repeat: Math.floor(HOLD_DURATION / 0.25),
          yoyo: true,
          ease: "power1.inOut",
          stagger: 0.05,
        },
        0
      );

    tlRef.current = tl;
  }, []);

  const reset = useCallback(() => {
    if (tlRef.current) tlRef.current.kill();
    setReady(false);
    gsap.to(ringRef.current, { strokeDashoffset: CIRCUMFERENCE, duration: 0.3, ease: "power2.out" });
    gsap.to(barsRef.current.filter(Boolean), { scaleY: 0.4, duration: 0.25, ease: "power2.out" });
    gsap.to(textRef.current, { color: "#c7c7c7", duration: 0.25 });
    gsap.to(indicatorRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.out",
      onComplete: () => setActive(false),
    });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === " " || e.key === "Enter") && !e.repeat) {
      e.preventDefault();
      start();
    }
  };
  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") reset();
  };

  const firstLineWords = lines[0]?.split(" ") ?? [];
  const lastWord = firstLineWords.pop();

  return (
    <button
      type="button"
      aria-label="Hold to analyze your voice"
      onMouseDown={start}
      onMouseUp={reset}
      onMouseLeave={reset}
      onTouchStart={start}
      onTouchEnd={reset}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      className="flex cursor-pointer flex-col items-center gap-1.5 bg-transparent focus-visible:outline-none"
    >
      <div ref={indicatorRef} className="relative flex h-6 w-6 items-center justify-center opacity-0">
        <svg width="26" height="26" viewBox="0 0 26 26" className="absolute -rotate-90" aria-hidden="true">
          <circle
            ref={ringRef}
            cx="13"
            cy="13"
            r="15"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
          />
        </svg>
        <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden="true">
          {Array.from({ length: BAR_COUNT }).map((_, i) => (
            <rect
              key={i}
              ref={(el) => {
                barsRef.current[i] = el;
              }}
              x={i * 3}
              y="3"
              width="1.2"
              height="4"
              rx="0.6"
              fill="#F0642A"
              style={{ transformOrigin: "center", transform: "scaleY(0.4)" }}
            />
          ))}
        </svg>
      </div>

      <div ref={textRef} className="flex flex-col items-center gap-0.5 text-[#c7c7c7]">
        {active && ready ? (
          <p className="m-0 text-center text-[11px] uppercase leading-[1.15] tracking-[0.5px]">VOICE READY</p>
        ) : (
          <>
            <p className="m-0 text-center text-[11px] uppercase leading-[1.15] tracking-[0.5px]">
              {firstLineWords.join(" ")} <span style={{ color: "#F0642A" }}>🎙 {lastWord}</span>
            </p>
            <p className="m-0 text-center text-[11px] uppercase leading-[1.15] tracking-[0.5px]">{lines[1]}</p>
          </>
        )}
      </div>
    </button>
  );
}

export default HoldToAnalyze;
