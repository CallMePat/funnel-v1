"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface AnimatedCopyProps {
  text: string;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  delayMs?: number;
  animateOnScroll?: boolean;
}

function AnimatedCopy({
  text,
  as: Tag = "h2",
  className,
  delayMs = 650,
  animateOnScroll = false,
}: AnimatedCopyProps) {
  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const h2Ref = useRef<HTMLHeadingElement | null>(null);
  const pRef = useRef<HTMLParagraphElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    const node =
      Tag === "h1"
        ? h1Ref.current
        : Tag === "p"
          ? pRef.current
          : Tag === "span"
            ? spanRef.current
            : h2Ref.current;

    if (!node) return;

    let timeoutId: number | null = null;
    let observer: IntersectionObserver | null = null;

    const reveal = () => {
      timeoutId = window.setTimeout(() => {
        setIsReady(true);
        node.classList.add("copy-slide-ready");
      }, delayMs);
    };

    if (!animateOnScroll) {
      reveal();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry?.isIntersecting) return;
          reveal();
          observer?.disconnect();
        },
        { threshold: 0.2 },
      );

      observer.observe(node);
    }

    return () => {
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      observer?.disconnect();
    };
  }, [Tag, animateOnScroll, delayMs]);

  const content = words.map((word, index) => (
    <span
      key={`${word}-${index}`}
      className="line mr-[0.28em] inline-block overflow-hidden align-top"
    >
      <span
        className="word inline-block transition-[transform,opacity] uppercase duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform will-change-opacity"
        style={{
          transform: isReady ? "translateY(0%)" : "translateY(110%)",
          opacity: isReady ? 1 : 0,
          transitionDelay: `${index * 45}ms`,
        }}
      >
        {word}
      </span>
    </span>
  ));

  const sharedClassName = `${className ?? ""} ${isReady ? "copy-slide-ready" : ""}`.trim();

  switch (Tag) {
    case "h1":
      return (
        <h1 ref={h1Ref} data-copy-slide="" className={sharedClassName}>
          {content}
        </h1>
      );
    case "p":
      return (
        <p ref={pRef} data-copy-slide="" className={sharedClassName}>
          {content}
        </p>
      );
    case "span":
      return (
        <span ref={spanRef} data-copy-slide="" className={sharedClassName}>
          {content}
        </span>
      );
    case "h2":
    default:
      return (
        <h2 ref={h2Ref} data-copy-slide="" className={sharedClassName}>
          {content}
        </h2>
      );
  }
}

export default AnimatedCopy;
