"use client";

import { useRef } from "react";
import gsap from "gsap";

interface HeroCtaProps {
  label: string;
  href?: string;
}

function HeroCta({ label, href = "#" }: HeroCtaProps) {
  const lineRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    gsap.to(arrowRef.current, { x: 5, duration: 0.35, ease: "power2.out" });
    gsap.to(textRef.current, { color: "#ffffff", duration: 0.35, ease: "power2.out" });
    gsap.to(lineRef.current, { opacity: 1, duration: 0.35, ease: "power2.out" });
  };

  const onLeave = () => {
    gsap.to(arrowRef.current, { x: 0, duration: 0.35, ease: "power2.out" });
    gsap.to(textRef.current, { color: "#bebebe", duration: 0.35, ease: "power2.out" });
    gsap.to(lineRef.current, { opacity: 0.65, duration: 0.35, ease: "power2.out" });
  };

  return (
    <a
      href={href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className="group relative flex w-[162px] items-center justify-between pb-2 no-underline focus-visible:outline-none"
    >
      <span ref={textRef} className="text-[11px] uppercase tracking-[0.02em] text-[#bebebe]">
        {label}
      </span>
      <span ref={arrowRef} aria-hidden="true" className="text-[11px] text-[#bebebe]">
        →
      </span>
      <span
        ref={lineRef}
        data-cta-line
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left"
        style={{ backgroundColor: "rgba(255,255,255,0.65)", opacity: 0.65 }}
      />
    </a>
  );
}

export default HeroCta;
