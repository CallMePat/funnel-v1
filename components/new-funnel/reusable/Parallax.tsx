"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /**
   * Total vertical drift in px across the element's scroll pass. Larger values
   * read as further back. Positive = the layer trails the scroll (moves down
   * relative to it); negative = it leads (moves up faster than the scroll).
   */
  speed?: number;
}

// Drifts its children on the Y axis as the element passes through the viewport,
// so stacked layers separate in depth. Transform-only — layout, spacing and
// design are untouched. Honours reduced-motion.
export default function Parallax({
  children,
  className,
  speed = 60,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div ref={ref} className={className} style={{ y: reduce ? 0 : y }}>
      {children}
    </motion.div>
  );
}
