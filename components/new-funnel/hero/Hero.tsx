"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import type { DictShape } from "@/app/i18n/dictionaries/fr";
import Navbar from "./Navbar";
import HeroCta from "./HeroCta";
import EstBadge from "./EstBadge";
import HoldToAnalyze from "./HoldToAnalyze";
import type { MenuContent } from "../menu/MenuOverlay";

type HeroContent = DictShape["newFunnel"]["hero"];

export interface HeroProps {
  content: HeroContent;
  menu: MenuContent;
}

export default function Hero({ content, menu }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const holdRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const ctaLine = ctaRef.current?.querySelector("[data-cta-line]");
      const allEls = [navRef.current, line1Ref.current, line2Ref.current, ctaRef.current, infoRef.current, scrollRef.current, holdRef.current];

      if (reduceMotion) {
        gsap.set(allEls, { opacity: 1, y: 0, x: 0, yPercent: 0 });
        if (ctaLine) gsap.set(ctaLine, { scaleX: 1 });
        return;
      }

      gsap.set([line1Ref.current, line2Ref.current], { yPercent: 110, opacity: 0 });
      gsap.set(navRef.current, { opacity: 0, y: -10 });
      gsap.set(ctaRef.current, { opacity: 0, y: 10 });
      gsap.set(infoRef.current, { opacity: 0 });
      gsap.set(scrollRef.current, { opacity: 0 });
      gsap.set(holdRef.current, { opacity: 0 });
      if (ctaLine) gsap.set(ctaLine, { scaleX: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(navRef.current, { opacity: 1, y: 0, duration: 0.5 })
        .to(
          line1Ref.current,
          { yPercent: 0, opacity: 1, duration: 0.8 },
          "-=0.25"
        )
        .to(
          line2Ref.current,
          { yPercent: 0, opacity: 1, duration: 0.8 },
          "-=0.55"
        )
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .to(ctaLine ?? {}, { scaleX: 1, duration: 0.45 }, "-=0.2")
        .to(scrollRef.current, { opacity: 1, duration: 0.4 }, "-=0.2")
        .to(holdRef.current, { opacity: 1, duration: 0.4 }, "-=0.3")
        .to(infoRef.current, { opacity: 1, duration: 0.4 }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen overflow-hidden font-['Archivo',Helvetica,sans-serif]"
      style={{
        height: "100svh",
        minHeight: "720px",
        backgroundColor: "#0b0b0b",
        color: "#d3d3d5",
        border: "1px solid rgba(255,255,255,0.12)",
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
      }}
    >
      <div ref={navRef}>
        <Navbar
          brand={content.brand}
          letsTalk={content.letsTalk}
          menu={content.menu}
          menuContent={menu}
        />
      </div>

      <div className="absolute left-[28px] top-[100px] hidden flex-col sm:flex" style={{ width: "min(760px, calc(100vw - 56px))" }}>
        <h1
          className="m-0 font-normal"
          style={{
            fontSize: "clamp(58px, 5.2vw, 84px)",
            lineHeight: 0.93,
            letterSpacing: "-0.055em",
            color: "#d1d1d3",
          }}
        >
          <span className="block overflow-hidden">
            <span ref={line1Ref} className="block">
              {content.title[0]}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span ref={line2Ref} className="block">
              {content.title[1]}
            </span>
          </span>
        </h1>
        <div ref={ctaRef} className="mt-[40px]">
          <HeroCta label={content.cta} />
        </div>
      </div>

      <div className="px-5 pt-24 sm:hidden">
        <h1
          className="m-0 font-normal"
          style={{ fontSize: "clamp(42px, 12vw, 64px)", lineHeight: 0.96, letterSpacing: "-0.04em", color: "#d1d1d3" }}
        >
          {content.title[0]}
          <br />
          {content.title[1]}
        </h1>
        <div className="mt-6">
          <HeroCta label={content.cta} />
        </div>
      </div>

      <div ref={infoRef} className="absolute bottom-[43px] right-[29px] hidden md:block">
        <EstBadge micLabel={content.micLabel} coaching={content.established.note.split("\n")} blurb={content.blurb} />
      </div>

      <div
        ref={holdRef}
        className="absolute bottom-[40px] left-1/2 hidden -translate-x-1/2 sm:block"
        style={{ width: "max-content" }}
      >
        <HoldToAnalyze lines={content.hint} />
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-[42px] left-[29px] flex h-4 w-4 items-center justify-center rounded-full"
        style={{ border: "1px solid rgba(255,255,255,0.35)" }}
      >
        <svg width="7" height="7" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M5 1v7M2 5l3 3 3-3" stroke="rgba(255,255,255,0.55)" strokeWidth="1" />
        </svg>
      </div>
    </section>
  );
}
