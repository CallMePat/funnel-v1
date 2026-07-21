"use client";

function RollingDigit({ digit }: { digit: number }) {
  return (
    <span className="inline-flex h-[1em] items-center overflow-hidden align-top">
      <span className="leading-none">{digit}</span>
    </span>
  );
}

export default RollingDigit;
