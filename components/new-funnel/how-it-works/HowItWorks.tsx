"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import type { NewFunnelContent } from "@/app/i18n/dictionaries/fr";
import StepCard from "./StepCard";

type HowItWorksContent = NewFunnelContent["howItWorks"];

export interface HowItWorksProps {
  content: HowItWorksContent;
}

const LINE_COLOR = "#d4a16a";
const BG_COLOR = "#ececea";

// S-curve through the four step nodes (viewBox 1000 x 2400)
const CURVE_PATH =
  "M330 0 V500 C330 850 870 700 870 1050 C870 1400 300 1250 300 1600 C300 1950 830 1800 830 2150 V2340";

const NODES = [
  { cx: 330, cy: 500 },
  { cx: 870, cy: 1050 },
  { cx: 300, cy: 1600 },
  { cx: 830, cy: 2150 },
];

// text blocks sit beside their node, alternating sides
const STEP_LAYOUT: {
  align: "left" | "right";
  position: React.CSSProperties;
}[] = [
  { align: "left", position: { left: "42%", top: "17.5%" } },
  { align: "right", position: { right: "18%", top: "40.5%" } },
  { align: "left", position: { left: "39%", top: "63.5%" } },
  { align: "right", position: { right: "22%", top: "86.5%" } },
];

export default function HowItWorks({ content }: HowItWorksProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.65"],
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section
      className="relative overflow-hidden font-['Archivo',Helvetica,sans-serif]"
      style={{ backgroundColor: BG_COLOR }}
    >
      <div className="px-5 pt-16  sm:pt-20 sm:px-8 lg:px-10">
        {/* <p className="m-0 font-mono text-[11px] uppercase tracking-[2px] text-neutral-500">
          {content.label}
        </p> */}
        <p className="m-0 shrink-0 font-mono text-[11px] uppercase tracking-[1.5px] text-neutral-500">
          {content.label}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[68%] top-[8%] h-4 w-4 rounded-full bg-[#d4a16a] opacity-60 blur-md"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[36%] top-[52%] h-3 w-3 rounded-full bg-[#d4a16a] opacity-50 blur-md"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[88%] top-[92%] h-4 w-4 rounded-full bg-[#d4a16a] opacity-50 blur-md"
      />

      <div
        ref={trackRef}
        className="relative w-full"
        style={{ aspectRatio: "1000 / 2400" }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1000 2400"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            d={CURVE_PATH}
            stroke={LINE_COLOR}
            strokeWidth="15"
            strokeLinecap="round"
            style={{ pathLength }}
          />
          {NODES.map((node) => (
            <circle
              key={`${node.cx}-${node.cy}`}
              cx={node.cx}
              cy={node.cy}
              r="10"
              fill={BG_COLOR}
              stroke={LINE_COLOR}
              strokeWidth="15"
            />
          ))}
        </svg>

        {content.steps.map((step, i) => (
          <StepCard
            key={step.title}
            index={i}
            title={step.title}
            description={step.description}
            align={STEP_LAYOUT[i].align}
            position={STEP_LAYOUT[i].position}
          />
        ))}
      </div>
    </section>
  );
}
