"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { NewFunnelContent } from "@/app/i18n/dictionaries/fr";

type PainPointsContent = NewFunnelContent["painPoints"];

interface PainPointsProps {
  content: PainPointsContent;
}

// --- Decorative card artwork -------------------------------------------------

const PINK = {
  100: "#fbe0e9",
  200: "#f5c0d3",
  300: "#ee9db8",
  400: "#f8ccdb",
};

// Tiny "×" halftone that sits behind every card graphic.
const DITHER = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2 2L4 4M4 2L2 4' stroke='%23cbcbce' stroke-width='0.7' stroke-linecap='round'/%3E%3C/svg%3E")`;

function GraphicDiamonds() {
  const radii = [78, 64, 51, 38, 25, 13];
  const fills = [PINK[200], PINK[100], PINK[300], PINK[100], PINK[200], PINK[400]];
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      {radii.map((r, i) => (
        <polygon
          key={i}
          points={`100,${80 - r} ${100 + r},80 100,${80 + r} ${100 - r},80`}
          fill={fills[i]}
        />
      ))}
    </svg>
  );
}

function GraphicCircles() {
  const cx = [54, 88, 122, 156];
  const fills = [PINK[100], PINK[200], PINK[300], PINK[200]];
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      {cx.map((x, i) => (
        <circle key={i} cx={x} cy={80} r={47} fill={fills[i]} opacity={0.85} />
      ))}
    </svg>
  );
}

function GraphicPyramid() {
  const bars = [
    { w: 150, c: PINK[100] },
    { w: 124, c: PINK[200] },
    { w: 98, c: PINK[100] },
    { w: 74, c: PINK[300] },
    { w: 52, c: PINK[200] },
  ];
  const h = 22;
  const gap = 5;
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      {bars.map((b, i) => (
        <rect
          key={i}
          x={100 - b.w / 2}
          y={16 + i * (h + gap)}
          width={b.w}
          height={h}
          rx={3}
          fill={b.c}
        />
      ))}
    </svg>
  );
}

function GraphicDiagonal() {
  const squares = [
    { x: 24, y: 10, c: PINK[100] },
    { x: 48, y: 32, c: PINK[200] },
    { x: 72, y: 54, c: PINK[300] },
    { x: 96, y: 76, c: PINK[200] },
    { x: 120, y: 98, c: PINK[100] },
  ];
  const s = 54;
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      {squares.map((q, i) => (
        <rect key={i} x={q.x} y={q.y} width={s} height={s} rx={3} fill={q.c} opacity={0.9} />
      ))}
    </svg>
  );
}

const GRAPHICS = [GraphicDiamonds, GraphicCircles, GraphicPyramid, GraphicDiagonal];

function CardFace({ index, question }: { index: number; question: string }) {
  const Graphic = GRAPHICS[index % GRAPHICS.length];
  return (
    <div className="w-[84vw] max-w-[400px] overflow-hidden rounded-[26px] bg-white p-3.5 shadow-[0_30px_80px_-32px_rgba(20,20,28,0.4)]">
      <div className="relative overflow-hidden rounded-[16px]" style={{ aspectRatio: "13 / 10" }}>
        <div className="absolute inset-0 bg-white" style={{ backgroundImage: DITHER }} />
        <div className="absolute inset-0 flex items-center justify-center p-[9%]">
          <Graphic />
        </div>
      </div>
      <div className="px-2.5 pb-3 pt-5">
        <span className="font-mono text-[11px] tracking-[1.5px] text-neutral-400">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="m-0 mt-2 text-[19px] font-medium leading-snug tracking-[-0.01em] text-neutral-900 sm:text-[21px]">
          {question}
        </p>
      </div>
    </div>
  );
}

// --- Scroll-driven stack -----------------------------------------------------

const ACTIVE = 0.86; // fraction of scroll spent stacking; the rest holds the deck
const PEEK = 26; // px each buried card lifts above the one in front
const SCALE_STEP = 0.05; // scale lost per card as it sinks into the deck

function StackCard({
  index,
  total,
  progress,
  question,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  question: string;
}) {
  const seg = ACTIVE / total;
  const enterStart = index * seg;
  const rest = (index + 1) * seg;
  const behind = total - 1 - index;
  const bStart = Math.min(rest, ACTIVE - 0.0001);

  // Slide up from below into its resting place.
  const y = useTransform(progress, [enterStart, rest], ["120%", "0%"]);
  const opacity = useTransform(progress, [enterStart, enterStart + seg * 0.4], [0, 1]);

  // Once at rest, sink behind the cards that land on top of it.
  const peekY = useTransform(progress, [bStart, ACTIVE], [0, -behind * PEEK]);
  const scale = useTransform(progress, [bStart, ACTIVE], [1, 1 - behind * SCALE_STEP]);
  const dim = useTransform(progress, [bStart, ACTIVE], [0, Math.min(behind * 0.42, 0.8)]);

  return (
    <motion.div
      style={{ y, opacity, zIndex: index + 1 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div style={{ y: peekY, scale, transformOrigin: "center top" }} className="relative">
        <CardFace index={index} question={question} />
        <motion.div
          aria-hidden
          style={{ opacity: dim }}
          className="pointer-events-none absolute inset-0 rounded-[26px] bg-[#e3e3e6]"
        />
      </motion.div>
    </motion.div>
  );
}

export default function PainPoints({ content }: PainPointsProps) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  const questions = content.questions;
  const total = questions.length;

  const heading = (
    <h2 className="max-w-[18ch] text-center text-[2.6rem] font-light leading-[1.06] tracking-[-0.02em] text-neutral-900 sm:text-6xl lg:text-7xl">
      {content.label}
    </h2>
  );

  // Reduced-motion / no-JS friendly fallback: a plain stacked column.
  if (reduce) {
    return (
      <section className="relative z-10 bg-[#ededed] py-24 font-sans lg:py-32">
        <div className="flex justify-center px-5">{heading}</div>
        <div className="mx-auto mt-16 flex max-w-[400px] flex-col gap-8 px-5">
          {questions.map((question, index) => (
            <CardFace key={index} index={index} question={question} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-[#ededed] font-sans"
      style={{ height: `${(total + 1) * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
          {heading}
        </div>

        {questions.map((question, index) => (
          <StackCard
            key={index}
            index={index}
            total={total}
            progress={progress}
            question={question}
          />
        ))}
      </div>
    </section>
  );
}
