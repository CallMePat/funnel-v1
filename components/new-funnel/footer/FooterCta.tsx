"use client";

import { useRef } from "react";
import gsap from "gsap";

interface FooterCtaProps {
  label: string;
  href?: string;
}

function FooterCta({ label, href = "#" }: FooterCtaProps) {
  const arrowRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLAnchorElement>(null);

  const onEnter = () => {
    gsap.to(arrowRef.current, { x: 5, duration: 0.35, ease: "power2.out" });
    gsap.to(textRef.current, {
      color: "#ffffff",
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(rootRef.current, {
      borderBottomColor: "rgba(255,255,255,1)",
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    gsap.to(arrowRef.current, { x: 0, duration: 0.35, ease: "power2.out" });
    gsap.to(textRef.current, {
      color: "#d0d0d2",
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(rootRef.current, {
      borderBottomColor: "rgba(255,255,255,0.7)",
      duration: 0.35,
      ease: "power2.out",
    });
  };

  return (
    <a
      ref={rootRef}
      href={href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className="flex h-[24px] w-[203px] items-center justify-between border-b no-underline focus-visible:outline-none"
      style={{ borderBottomColor: "rgba(255,255,255,0.7)" }}
    >
      <span
        ref={textRef}
        className="text-[11px] uppercase tracking-[0.02em]"
        style={{ color: "#d0d0d2" }}
      >
        {label}
      </span>
      <span
        ref={arrowRef}
        aria-hidden="true"
        className="text-[11px]"
        style={{ color: "#d0d0d2" }}
      >
        →
      </span>
    </a>
  );
}

export default FooterCta;
