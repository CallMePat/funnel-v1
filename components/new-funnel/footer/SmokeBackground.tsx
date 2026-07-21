"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

function SmokeBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !videoRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoRef.current,
        { scale: 1.06, xPercent: 0, yPercent: 0 },
        {
          scale: 1.11,
          xPercent: 1.5,
          yPercent: 1,
          duration: 21,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[110%] w-[110%] object-cover object-[50%_60%]"
        style={{
          transform: "translate(-50%, -50%) scale(1.06)",
          filter: "grayscale(1) blur(18px) brightness(0.72) contrast(1.08)",
          opacity: 0.68,
          mixBlendMode: "normal",
          willChange: "transform",
        }}
      >
        <source src="/videos/smoke-bg.mp4" type="video/mp4" />
      </video>

      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.28) 38%, rgba(0,0,0,0.12) 68%, rgba(0,0,0,0.08) 100%)",
        }}
      />
    </>
  );
}

export default SmokeBackground;
