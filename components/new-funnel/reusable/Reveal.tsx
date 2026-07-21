"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** seconds to stagger this element after its neighbours */
  delay?: number;
  /** distance in px the content rises from */
  y?: number;
}

// Fades content in and lifts it up as it scrolls into view. Runs once.
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 30,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
