"use client";

import { useId, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const VIEW_W = 1400;
const VIEW_H = 330;
const LINE_SPACING = 12;

function LinesWordmark({ text }: { text: string }) {
  const clipId = useId();
  const rootRef = useRef<SVGSVGElement>(null);
  const linesRef = useRef<(SVGLineElement | null)[]>([]);

  const lineCount = Math.floor(VIEW_H / LINE_SPACING);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lines = linesRef.current.filter(Boolean) as SVGLineElement[];

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(lines, { scaleX: 1, opacity: 1 });
        return;
      }

      gsap.set(lines, {
        opacity: 0,
        scaleX: 0,
        transformOrigin: (i: number) =>
          i % 2 === 0 ? "left center" : "right center",
      });

      gsap.to(lines, {
        opacity: 1,
        scaleX: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.016,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={rootRef}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid meet"
      className="block h-auto w-full"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <text
            x="50%"
            y={VIEW_H}
            textAnchor="middle"
            fontSize={VIEW_H * 0.92}
            fontWeight="800"
            fontFamily="Arial, Helvetica, sans-serif"
            letterSpacing="2"
          >
            {text}
          </text>
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {Array.from({ length: lineCount }).map((_, i) => (
          <line
            key={i}
            ref={(el) => {
              linesRef.current[i] = el;
            }}
            x1={0}
            x2={VIEW_W}
            y1={i * LINE_SPACING + LINE_SPACING / 2}
            y2={i * LINE_SPACING + LINE_SPACING / 2}
            stroke="rgba(205,205,210,0.72)"
            strokeWidth="1"
            strokeLinecap="butt"
          />
        ))}
      </g>
    </svg>
  );
}

export default LinesWordmark;
