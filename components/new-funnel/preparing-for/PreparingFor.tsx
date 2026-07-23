"use client";

import { motion, useReducedMotion } from "motion/react";
import type { NewFunnelContent } from "@/app/i18n/dictionaries/fr";

type PreparingForContent = NewFunnelContent["preparingSection"];

interface PreparingForProps {
  content: PreparingForContent;
}

function splitIntoRows(options: string[]) {
  return [
    options.slice(0, 3),
    options.slice(3, 5),
    options.slice(5),
  ];
}

function splitTitle(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length <= 3) {
    return [title];
  }

  const firstLine = words.slice(0, Math.ceil(words.length / 2)).join(" ");
  const secondLine = words.slice(Math.ceil(words.length / 2)).join(" ");
  return [firstLine, secondLine];
}

function PreparingRow({
  items,
  index,
}: {
  items: string[];
  index: number;
}) {
  const [headline, ...rest] = items;
  const details = rest.length > 0 ? rest : [headline];

  return (
    <motion.div
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.85, delay: 0.12 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-black/24 pb-11 pt-3 last:pb-0"
    >
      <div className="grid">
        <div className=" text-[1.65rem] font-medium uppercase leading-[1.02] tracking-[-0.055em] text-[#232326] sm:text-[2rem] lg:text-[2.35rem]">
          {headline}
        </div>

        <div className="text-end  text-[0.88rem] mt-5 font-medium uppercase mb-2 leading-[1.22] tracking-[-0.015em] text-[#2d2d31] sm:text-[0.98rem] lg:text-[1.06rem]">
          {details.map((item, itemIndex) => (
            <div key={`${item}-${itemIndex}`} >
              {item}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function PreparingFor({ content }: PreparingForProps) {
  const reduceMotion = useReducedMotion();
  const rows = splitIntoRows(content.options);
  const titleLines = splitTitle(content.title);

  return (
    <motion.section
      initial={reduceMotion ? undefined : { opacity: 0, y: 72, scale: 0.988, filter: "blur(14px)" }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 bg-white px-6 py-10 font-sans text-[#111114] sm:px-10 sm:py-12 lg:px-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1380px]">
        <div className="grid min-h-[76vh] gap-14 lg:grid-cols-[0.48fr_0.52fr] lg:gap-18">
          <div className="flex min-h-full flex-col justify-between gap-10 pt-4">
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, x: -18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-lg text-[3.45rem] font-medium uppercase leading-[0.88] tracking-[-0.085em] text-[#18191c] sm:text-[4.9rem] lg:text-[6.1rem] xl:text-[4.7rem]"
            >
              {titleLines.map((line, index) => (
                <div key={`${line}-${index}`}>{line}</div>
              ))}
            </motion.div>

            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.65 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href="#"
                className="inline-flex items-center rounded-full bg-[#1b1b1d] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.55px] text-white no-underline transition-transform duration-300 hover:-translate-y-0.5"
              >
                {content.cta}
              </a>
            </motion.div>
          </div>

          <div className="space-y-12 pt-4 lg:pt-2">
            {rows.map((items, index) => (
              <PreparingRow
                key={`${items[0]}-${index}`}
                items={items}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
