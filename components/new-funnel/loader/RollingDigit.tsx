"use client";

import { motion } from "motion/react";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function RollingDigit({ digit }: { digit: number }) {
  return (
    <span className="inline-block h-[1em] overflow-hidden align-top">
      <motion.span
        className="block"
        animate={{ y: `-${digit}em` }}
        transition={{ type: "spring", stiffness: 130, damping: 22 }}
      >
        {DIGITS.map((n) => (
          <span key={n} className="block h-[1em] leading-none">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export default RollingDigit;
