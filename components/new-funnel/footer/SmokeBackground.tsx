"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const CLOUD =
  "radial-gradient(closest-side, rgba(150,162,185,0.26), rgba(150,162,185,0) 72%)";

function SmokeBackground() {
  const l1 = useRef<HTMLDivElement>(null);
  const l2 = useRef<HTMLDivElement>(null);
  const l3 = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(l1.current, {
        xPercent: 9,
        yPercent: -7,
        scale: 1.18,
        duration: 26,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(l2.current, {
        xPercent: -11,
        yPercent: 8,
        scale: 1.22,
        duration: 34,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(l3.current, {
        xPercent: 7,
        yPercent: 11,
        scale: 1.12,
        duration: 40,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >

      {/* darken scrim to keep the wisps subtle */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,9,0.42) 0%, rgba(10,10,9,0.12) 46%, rgba(10,10,9,0.30) 100%)",
        }}
      />
    </div>
  );
}

export default SmokeBackground;
