"use client";

import Reveal from "../reusable/Reveal";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
  return <Reveal className={className}>{text}</Reveal>;
}

export default ScrollRevealText;
