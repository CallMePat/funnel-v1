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
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover object-[50%_60%]"
        style={{
          transform: "scale(1.08)",
          filter: "grayscale(1) blur(14px) brightness(0.78) contrast(1.06)",
          opacity: 0.86,
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
            "linear-gradient(to bottom, rgba(7,7,8,0.4) 0%, rgba(10,10,11,0.28) 36%, rgba(12,12,13,0.18) 66%, rgba(10,10,11,0.2) 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          background:
            "radial-gradient(circle at 50% 28%, rgba(255,255,255,0.06), transparent 34%), radial-gradient(circle at 50% 78%, rgba(0,0,0,0.24), transparent 36%)",
        }}
      />
    </>
  );
}

export default SmokeBackground;
