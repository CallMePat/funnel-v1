"use client";

import { motion, useReducedMotion } from "motion/react";
import type { NewFunnelContent } from "@/app/i18n/dictionaries/fr";
import Reveal from "../reusable/Reveal";

type CommunicationAssetContent = NewFunnelContent["communicationAsset"];

interface CommunicationAssetProps {
  content: CommunicationAssetContent;
}


function FluidShowcase() {
  useReducedMotion();

  return (
    <div className="relative min-h-[26rem] overflow-hidden rounded-[2rem] bg-[#fbfbfa] px-6 py-8 sm:min-h-[32rem] sm:px-10 sm:py-10 lg:min-h-[42rem] lg:px-12 lg:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(232,232,232,0.55),transparent_34%)]" />
      <div className="relative z-10 max-w-[10ch] text-[3.1rem] font-light leading-[0.9] tracking-[-0.06em] text-[#242427] sm:text-[4.2rem] lg:text-[5.8rem]">
        The
        <br />
        Strategic
        <br />
        Asset
      </div>
    </div>
  );
}

export default function CommunicationAsset({ content }: CommunicationAssetProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 64, scale: 0.985, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 bg-[#ededed] py-6 font-sans sm:py-8 lg:py-10"
    >
      <div className="mx-auto max-w-[1880px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.95fr]">
          <Reveal className="h-full" delay={0.08} y={38}>
            <FluidShowcase />
          </Reveal>

          <Reveal
            delay={0.16}
            y={42}
            className="relative overflow-hidden rounded-[2rem] bg-[#1d1d1f] px-8 py-10 text-white sm:px-10 sm:py-12 lg:px-14 lg:py-16"
          >
            <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(rgba(255,255,255,0.085)_0.8px,transparent_0.8px)] [background-position:0_0] [background-size:8px_8px]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.08))]" />

            <div className="relative z-10 flex h-full flex-col">
              <p className="m-0 font-mono text-[11px] uppercase tracking-[1.9px] text-neutral-400">
                {content.label}
              </p>

              <div className="mt-8 text-[3.25rem] font-light leading-[0.88] tracking-[-0.07em] text-white sm:text-[4.5rem] lg:mt-12 lg:text-[5.3rem]">
                <span aria-hidden className="mr-1 inline-block align-top text-[0.72em]">
                  “
                </span>
                <span>{content.statement}</span>
              </div>

              <div className="mt-8 space-y-3 border-t border-white/12 pt-6 sm:mt-10 lg:mt-auto lg:pt-8">
                <p className="m-0 text-lg font-light leading-snug tracking-[-0.03em] text-neutral-100 sm:text-[1.45rem]">
                  {content.lines[0]}
                </p>
                <p className="m-0 text-base font-light leading-snug tracking-[-0.02em] text-neutral-400 sm:text-[1.15rem]">
                  {content.lines[1]}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </motion.section>
  );
}
