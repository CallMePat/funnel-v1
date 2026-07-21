"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import type { DictShape } from "@/app/i18n/dictionaries/fr";

type VideoContent = DictShape["newFunnel"]["about"]["video"];

function VideoExpand({ content }: { content: VideoContent }) {
  const trackRef = useRef<HTMLDivElement>(null);
  // progress runs 0 → 1 only while the panel is pinned: the page appears to
  // stop scrolling until the expansion has finished
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  // small card sitting right of center → full-bleed panel
  const width = useTransform(progress, [0.05, 0.85], ["36vw", "100vw"]);
  const height = useTransform(progress, [0.05, 0.85], ["24vh", "100vh"]);
  const x = useTransform(progress, [0.05, 0.85], ["24vw", "0vw"]);
  const borderRadius = useTransform(progress, [0.05, 0.85], ["18px", "0px"]);
  const hintOpacity = useTransform(progress, [0.05, 0.4], [1, 0]);

  return (
    <div ref={trackRef} className="relative h-[240vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          style={{ width, height, x, borderRadius }}
          className="relative min-h-44 min-w-72 overflow-hidden bg-[#1a1a19]"
        >
          {/* placeholder art until the real film drops in */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(212,161,106,0.22),transparent_55%),linear-gradient(160deg,#242422_0%,#0c0c0b_70%)]" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-neutral-500/70 transition-colors hover:border-white sm:h-20 sm:w-20">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-neutral-200" aria-hidden="true">
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            </div>
          </div>

          <p className="absolute left-5 top-4 m-0 font-mono text-[10px] uppercase tracking-[2px] text-neutral-400">
            {content.label}
          </p>
          <p className="absolute bottom-4 left-5 m-0 font-mono text-[11px] uppercase tracking-[1.5px] text-neutral-300">
            {content.caption}
          </p>
          <motion.p
            style={{ opacity: hintOpacity }}
            className="absolute bottom-4 right-5 m-0 font-mono text-[10px] uppercase tracking-[2px] text-neutral-500"
          >
            {content.hint}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default VideoExpand;
