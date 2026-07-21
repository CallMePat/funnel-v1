"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { DictShape } from "@/app/i18n/dictionaries/fr";
import LocalTime from "./LocalTime";
import LabeledBlock from "./LabeledBlock";
import LinesWordmark from "./LinesWordmark";
import FooterCta from "./FooterCta";
import SmokeBackground from "./SmokeBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type NewFunnelFooterContent = DictShape["newFunnel"]["footer"];

export interface FooterProps {
  content: NewFunnelFooterContent;
}

export default function Footer({ content }: FooterProps) {
  const year = new Date().getFullYear();
  const rootRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLParagraphElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const allEls = [eyebrowRef.current, line1Ref.current, line2Ref.current, ctaRef.current, copyrightRef.current, businessRef.current, socialRef.current];

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(allEls, { opacity: 1, y: 0, yPercent: 0 });
        return;
      }

      gsap.set([line1Ref.current, line2Ref.current], { yPercent: 110, opacity: 0 });
      gsap.set([eyebrowRef.current, ctaRef.current, copyrightRef.current, businessRef.current, socialRef.current], { opacity: 0, y: 12 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: rootRef.current, start: "top 75%", once: true },
      });

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6 })
        .to(line1Ref.current, { yPercent: 0, opacity: 1, duration: 1 }, "-=0.3")
        .to(line2Ref.current, { yPercent: 0, opacity: 1, duration: 1 }, "-=0.9")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
        .to([copyrightRef.current, businessRef.current, socialRef.current], { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.3");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={rootRef}
      className="relative w-full overflow-hidden font-['Archivo',Helvetica,sans-serif]"
      style={{
        height: "clamp(760px, 100svh, 1080px)",
        minHeight: "760px",
        backgroundColor: "#020304",
        color: "#d1d1d3",
        border: "1px solid rgba(255,255,255,0.12)",
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
        isolation: "isolate",
      }}
    >
      <SmokeBackground />

      <p
        ref={eyebrowRef}
        className="absolute left-[29px] top-[45px] z-[5] m-0 hidden text-[12px] uppercase leading-none sm:block"
        style={{ color: "#cacacc", letterSpacing: "-0.01em" }}
      >
        {content.tagline}
      </p>

      <div className="absolute right-[31px] top-[47px] z-[5] hidden sm:block">
        <LocalTime label={content.timezone.label} zone={content.timezone.zone} />
      </div>

      <h2
        className="absolute left-[27px] top-[77px] z-[5] m-0 hidden font-normal sm:block"
        style={{
          width: "min(650px, calc(100vw - 56px))",
          fontSize: "clamp(58px, 5.1vw, 78px)",
          lineHeight: 0.92,
          letterSpacing: "-0.055em",
          color: "#d4d4d6",
        }}
      >
        <span className="block overflow-hidden">
          <span ref={line1Ref} className="block">
            {content.headline[0]}
          </span>
        </span>
        <span className="block overflow-hidden">
          <span ref={line2Ref} className="block">
            {content.headline[1]}
          </span>
        </span>
      </h2>

      <div ref={ctaRef} className="absolute top-[188px] z-[5] hidden sm:block" style={{ left: "67.5%" }}>
        <FooterCta label={content.cta} />
      </div>

      <p
        ref={copyrightRef}
        className="absolute left-[29px] z-[5] m-0 hidden text-[12px] uppercase sm:block"
        style={{ top: "38%", color: "#717176" }}
      >
        © {content.brandName} {year}
      </p>

      <div ref={businessRef} className="absolute z-[5] hidden w-[220px] sm:block" style={{ left: "67.5%", top: "38%" }}>
        <LabeledBlock label={content.enquiry.label}>
          <div className="flex flex-col gap-0">
            <p className="m-0 text-[14px] leading-[1.7]" style={{ color: "#c5c5c8" }}>
              <span className="mr-2" style={{ color: "#737378" }}>E.</span>
              <a href={`mailto:${content.enquiry.email}`} className="no-underline transition-colors hover:text-white" style={{ color: "#c5c5c8" }}>
                {content.enquiry.email}
              </a>
            </p>
            <p className="m-0 text-[14px] leading-[1.7]" style={{ color: "#c5c5c8" }}>
              <span className="mr-2" style={{ color: "#737378" }}>P.</span>
              <a href={`tel:${content.enquiry.phone.replace(/\s/g, "")}`} className="no-underline transition-colors hover:text-white" style={{ color: "#c5c5c8" }}>
                {content.enquiry.phone}
              </a>
            </p>
          </div>
        </LabeledBlock>
      </div>

      <div ref={socialRef} className="absolute z-[5] hidden w-[165px] sm:block" style={{ right: "43px", top: "38%" }}>
        <LabeledBlock label={content.social.label}>
          <nav className="grid grid-cols-2 gap-x-[38px] gap-y-2" aria-label={content.social.label}>
            {content.social.links.map((link) => (
              <SocialLink key={link.label} label={link.label} href={link.href} />
            ))}
          </nav>
        </LabeledBlock>
      </div>

      <div className="absolute bottom-[37px] left-[24px] right-[24px] z-[4]" style={{ height: "34%" }}>
        <LinesWordmark text={content.wordmark} />
      </div>

      <div className="relative z-[5] flex flex-col gap-6 px-5 pb-6 pt-9 sm:hidden">
        <p className="m-0 text-[12px] uppercase leading-none" style={{ color: "#cacacc" }}>
          {content.tagline}
        </p>
        <h2
          className="m-0 font-normal"
          style={{ fontSize: "clamp(46px, 13vw, 64px)", lineHeight: 0.92, letterSpacing: "-0.05em", color: "#d4d4d6" }}
        >
          {content.headline[0]}
          <br />
          {content.headline[1]}
        </h2>
        <FooterCta label={content.cta} />

        <div className="grid grid-cols-2 gap-6">
          <LabeledBlock label={content.enquiry.label}>
            <div className="flex flex-col gap-1">
              <p className="m-0 text-[14px]" style={{ color: "#c5c5c8" }}>
                <span className="mr-2" style={{ color: "#737378" }}>E.</span>
                <a href={`mailto:${content.enquiry.email}`} className="no-underline" style={{ color: "#c5c5c8" }}>
                  {content.enquiry.email}
                </a>
              </p>
              <p className="m-0 text-[14px]" style={{ color: "#c5c5c8" }}>
                <span className="mr-2" style={{ color: "#737378" }}>P.</span>
                <a href={`tel:${content.enquiry.phone.replace(/\s/g, "")}`} className="no-underline" style={{ color: "#c5c5c8" }}>
                  {content.enquiry.phone}
                </a>
              </p>
            </div>
          </LabeledBlock>

          <LabeledBlock label={content.social.label}>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-2" aria-label={content.social.label}>
              {content.social.links.map((link) => (
                <SocialLink key={link.label} label={link.label} href={link.href} />
              ))}
            </nav>
          </LabeledBlock>
        </div>

        <p className="m-0 text-[12px] uppercase" style={{ color: "#717176" }}>
          © {content.brandName} {year}
        </p>

        <div className="h-[160px] w-full">
          <LinesWordmark text={content.wordmark} />
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ label, href }: { label: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onEnter = () => gsap.to(ref.current, { x: 3, color: "#ffffff", duration: 0.3, ease: "power2.out" });
  const onLeave = () => gsap.to(ref.current, { x: 0, color: "#c7c7ca", duration: 0.3, ease: "power2.out" });

  return (
    <a
      ref={ref}
      href={href}
      aria-label={label}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className="text-[14px] no-underline focus-visible:outline-none"
      style={{ color: "#c7c7ca" }}
    >
      {label}
    </a>
  );
}
