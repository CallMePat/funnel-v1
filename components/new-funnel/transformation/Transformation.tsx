"use client";

import { motion, useReducedMotion } from "motion/react";
import type { NewFunnelContent } from "@/app/i18n/dictionaries/fr";
import ArrowLink from "../reusable/ArrowLink";
import { ArrowRight } from "lucide-react";

type TransformationContent = NewFunnelContent["transformation"];

interface TransformationProps {
  content: TransformationContent;
}

const CARD_TITLES = ["7 Days.", "No Heavy Lift.", "Real Shift."];
const CARD_GLOWS = [
  "from-[#b49cff]/30 via-[#ddd2ff]/16 to-transparent",
  "from-[#78afff]/30 via-[#d7ebff]/14 to-transparent",
  "from-[#ffb8d8]/34 via-[#ffe0ed]/14 to-transparent",
];

function OrbIcon() {
  return (
    <div className="relative h-26 w-26 rounded-[1.7rem] bg-white shadow-[0_18px_40px_-24px_rgba(43,43,53,0.28)] sm:h-30 sm:w-30">
      <div className="absolute left-2.5 top-2.5 flex gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-200" />
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-200" />
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-200" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-15 w-15 rounded-full bg-[radial-gradient(circle_at_35%_30%,#f6f1ff_0%,#d7cbff_38%,#a58dff_72%,#8d76eb_100%)] shadow-[0_18px_36px_-18px_rgba(143,121,255,0.9)] sm:h-18 sm:w-18">
          <div className="absolute left-[18%] top-[28%] h-[24%] w-[34%] rounded-full bg-white/25 blur-[2px]" />
          <div className="absolute bottom-[18%] left-[26%] h-[28%] w-[42%] rounded-[45%] border border-white/26" />
        </div>
      </div>
    </div>
  );
}

function BagIcon() {
  return (
    <div className="relative h-26 w-26 rounded-[1.7rem] bg-white shadow-[0_18px_40px_-24px_rgba(43,43,53,0.28)] sm:h-30 sm:w-30">
      <div className="absolute left-2.5 top-2.5 flex gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-200" />
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-200" />
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-200" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-16 w-14 rounded-[0.9rem] bg-[linear-gradient(180deg,#9ec8ff_0%,#6fa7f7_100%)] shadow-[0_18px_36px_-20px_rgba(79,146,239,0.8)]">
          <div className="absolute -top-3 left-1/2 h-5 w-7 -translate-x-1/2 rounded-t-full border-[2px] border-[#cfe5ff] border-b-0" />
          <div className="absolute inset-x-2 top-2 h-[1px] bg-white/35" />
        </div>
      </div>
    </div>
  );
}

function ScreenIcon() {
  return (
    <div className="relative h-26 w-26 rounded-[1.7rem] bg-white shadow-[0_18px_40px_-24px_rgba(43,43,53,0.28)] sm:h-30 sm:w-30">
      <div className="absolute left-2.5 top-2.5 flex gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-200" />
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-200" />
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-200" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-14 w-18 rounded-[0.8rem] bg-[linear-gradient(180deg,#ffd1e4_0%,#ffb6d4_100%)] shadow-[0_18px_36px_-20px_rgba(255,144,194,0.82)]">
          <div className="absolute bottom-0 left-0 h-3.5 w-6 rounded-tr-[0.7rem] bg-white/18" />
          <div className="absolute -bottom-2.5 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-[#f0bdd2]" />
        </div>
      </div>
    </div>
  );
}

const CARD_ICONS = [OrbIcon, BagIcon, ScreenIcon];

function splitHeadline(heading: string) {
  const words = heading.trim().split(/\s+/);
  if (words.length <= 3) {
    return [heading];
  }

  const midpoint = Math.ceil(words.length / 2);
  return [words.slice(0, midpoint).join(" "), words.slice(midpoint).join(" ")];
}

function TransformationCard({
  title,
  line,
  glow,
  index,
}: {
  title: string;
  line: string;
  glow: string;
  index: number;
}) {
  const Icon = CARD_ICONS[index % CARD_ICONS.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 48, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7 }}
      className="group relative overflow-hidden rounded-[1.8rem] border border-black/5 bg-[#f7f7f6] px-7 pb-8 pt-7 shadow-[0_24px_60px_-44px_rgba(22,22,30,0.26)]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.76),rgba(239,239,238,0.9))]" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.02))]" />

      <div className="relative z-10 flex h-full flex-col items-center text-center">
        <h3 className="m-0 text-[2rem] font-medium tracking-[-0.04em] text-[#1f2024] sm:text-[2.25rem]">
          {title}
        </h3>
        <p className="m-0 mt-3 max-w-[16ch] text-base leading-[1.55] text-neutral-500 sm:text-[1.05rem]">
          {line}
        </p>

        <div className="relative mt-10 flex min-h-[13rem] w-full items-end justify-center overflow-hidden rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(245,245,244,0.82))] px-6 pb-7 pt-6">
          <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.035)_1px,transparent_1px)] [background-position:center] [background-size:26px_26px]" />
          <div className={`absolute inset-x-8 bottom-4 h-24 rounded-full bg-gradient-to-r ${glow} blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-75`} />
          <motion.div
            whileHover={{ scale: 1.04, y: -4 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="relative z-10"
          >
            <Icon />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Transformation({ content }: TransformationProps) {
  const reduceMotion = useReducedMotion();
  const headlineLines = splitHeadline(content.heading);

  return (
    <motion.section
      initial={reduceMotion ? undefined : { opacity: 0, y: 72, scale: 0.985, filter: "blur(14px)" }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 bg-[#eeeeec] px-4 py-6 font-sans sm:px-6 sm:py-8 lg:px-8 lg:py-[10rem]"
    >
      <div className="mx-auto max-w-[1880px] overflow-hidden rounded-[2.15rem] border border-black/6 bg-[#fbfbfa] px-6 py-9 shadow-[0_30px_90px_-58px_rgba(17,17,22,0.28)] sm:px-8 sm:py-11 lg:px-12 lg:py-[10rem]">
        <div className="grid gap-8 lg:grid-cols-[0.22fr_0.5fr_0.28fr] lg:items-start">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, x: -20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="pt-2"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#ededeb] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.8px] text-neutral-500">
              <span className="text-[9px] text-neutral-700">■</span>
              <span>{content.kicker}</span>
            </div>
          </motion.div>

          <div className="max-w-4xl text-[3.5rem] font-medium uppercase leading-[0.88] tracking-[-0.08em] text-black sm:text-[4.75rem] lg:text-[3.2rem] xl:text-[4.2rem]">
            {headlineLines.map((line, index) => (
              <motion.div
                key={`${line}-${index}`}
                initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{
                  duration: 0.8,
                  delay: 0.08 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {line}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, x: 22 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl pt-3 text-base leading-[1.62] text-neutral-500 sm:text-[1.05rem]  inline-flex items-end justify-end gap-1.5"
          >
            
            {content.ctas[1]} 
            <ArrowRight />
          </motion.div>
        </div>

        <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-3">
          {content.without.map((line, index) => (
            <TransformationCard
              key={line}
              title={CARD_TITLES[index] ?? `0${index + 1}`}
              line={line}
              glow={CARD_GLOWS[index] ?? CARD_GLOWS[0]}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 32 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 0.85, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-col gap-5 border-t border-black/6 pt-7 sm:mt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full bg-[#111110] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.65px] text-white no-underline transition-transform duration-300 hover:-translate-y-0.5"
          >
            {content.ctas[0]}
          </a>

          <ArrowLink label={content.heading} />
        </motion.div>
      </div>
    </motion.section>
  );
}
