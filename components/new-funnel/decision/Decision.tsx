"use client";

import { motion, useReducedMotion } from "motion/react";
import type { NewFunnelContent } from "@/app/i18n/dictionaries/fr";

type DecisionContent = NewFunnelContent["decision"];

interface DecisionProps {
  content: DecisionContent;
}

function splitShapes(shapes: string[]) {
  return [
    shapes.slice(0, 2),
    shapes.slice(2, 4),
    shapes.slice(4),
  ];
}

function InfinityBurst() {
  return (
    <div className="relative h-30 w-30 sm:h-34 sm:w-34">
      <div
        className="absolute inset-0 bg-[#fff8ef] shadow-[0_24px_50px_-24px_rgba(255,171,60,0.45)]"
        style={{
          clipPath:
            "polygon(50% 0%, 59% 14%, 72% 4%, 74% 19%, 88% 12%, 83% 27%, 98% 26%, 87% 38%, 100% 50%, 87% 62%, 98% 74%, 83% 73%, 88% 88%, 74% 81%, 72% 96%, 59% 86%, 50% 100%, 41% 86%, 28% 96%, 26% 81%, 12% 88%, 17% 73%, 2% 74%, 13% 62%, 0% 50%, 13% 38%, 2% 26%, 17% 27%, 12% 12%, 26% 19%, 28% 4%, 41% 14%)",
        }}
      />
      <div
        className="absolute inset-[18%] bg-[#f4a432]"
        style={{
          clipPath:
            "polygon(50% 0%, 59% 14%, 72% 4%, 74% 19%, 88% 12%, 83% 27%, 98% 26%, 87% 38%, 100% 50%, 87% 62%, 98% 74%, 83% 73%, 88% 88%, 74% 81%, 72% 96%, 59% 86%, 50% 100%, 41% 86%, 28% 96%, 26% 81%, 12% 88%, 17% 73%, 2% 74%, 13% 62%, 0% 50%, 13% 38%, 2% 26%, 17% 27%, 12% 12%, 26% 19%, 28% 4%, 41% 14%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-[2.9rem] font-medium tracking-[-0.08em] text-[#20160c]">
        ∞
      </div>
    </div>
  );
}

function DecisionCard({
  eyebrow,
  lines,
  icon,
  index,
}: {
  eyebrow: string;
  lines: string[];
  icon?: React.ReactNode;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 48, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.88, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.1)" }}
      className="relative flex min-h-[16rem] flex-col justify-between overflow-hidden rounded-[1.65rem] border border-white/7 bg-[#0b0b0c] px-7 py-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] sm:min-h-[17rem] sm:px-8 sm:py-8"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.01),rgba(255,255,255,0))]" />
      <div className="relative z-10">
        {icon ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.85, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="-mt-2"
          >
            {icon}
          </motion.div>
        ) : (
          <div className="text-[3.7rem] font-medium leading-none tracking-[-0.08em] text-white sm:text-[4.2rem]">
            {eyebrow}
          </div>
        )}
      </div>

      <div className="relative z-10 space-y-2">
        {lines.map((line, lineIndex) => (
          <p
            key={`${line}-${lineIndex}`}
            className={lineIndex === 0
              ? "m-0 text-[1.15rem] font-medium leading-snug tracking-[-0.03em] text-neutral-100"
              : "m-0 text-base leading-[1.58] text-neutral-500"}
          >
            {line}
          </p>
        ))}
      </div>
    </motion.article>
  );
}

export default function Decision({ content }: DecisionProps) {
  const reduceMotion = useReducedMotion();
  const groupedShapes = splitShapes(content.shapes);
  const headingWords = content.heading.split(" ");
  const splitIndex = Math.max(3, Math.ceil(headingWords.length / 2));
  const headingTop = headingWords.slice(0, splitIndex).join(" ");
  const headingBottom = headingWords.slice(splitIndex).join(" ");

  return (
    <motion.section
      initial={reduceMotion ? undefined : { opacity: 0, y: 70, scale: 0.988, filter: "blur(14px)" }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 overflow-hidden bg-[#080809] px-4 py-12 font-sans text-white sm:px-6 sm:py-14 lg:px-8 lg:py-[10rem]"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="max-w-[72rem]">
          <motion.h2
            initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.82, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="m-0 text-[2.4rem] font-medium leading-[1.12] tracking-[-0.045em] text-white sm:text-[3.2rem] lg:text-[4.35rem]"
          >
            {headingTop}
          </motion.h2>

          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 26 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.88, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 text-[2.2rem] font-light leading-[1.08] tracking-[-0.045em] text-neutral-200 sm:text-[3rem] lg:text-[4.05rem]"
          >
            {headingBottom || content.intro}
          </motion.div>
        </div>

        <motion.p
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.78, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="m-0 mt-5 max-w-[24ch] text-base leading-[1.65] text-neutral-500 sm:text-lg"
        >
          {content.intro}
        </motion.p>

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3">
          <DecisionCard
            eyebrow={groupedShapes[0].length > 1 ? `${groupedShapes[0].length}X` : "01"}
            lines={groupedShapes[0]}
            index={0}
          />
          <DecisionCard
            eyebrow={groupedShapes[1].length > 1 ? `${groupedShapes[1].length}X` : "02"}
            lines={groupedShapes[1]}
            index={1}
          />
          <DecisionCard
            eyebrow="∞"
            lines={groupedShapes[2]}
            icon={<InfinityBurst />}
            index={2}
          />
        </div>
      </div>
    </motion.section>
  );
}
