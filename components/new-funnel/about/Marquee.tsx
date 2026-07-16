interface MarqueeProps {
  words: string[];
}

function Marquee({ words }: MarqueeProps) {
  const sequence = (
    <>
      {words.map((word) => (
        <span key={word} className="flex items-center gap-[6vw]">
          {word}
          <span aria-hidden="true" className="text-[0.35em] font-light text-neutral-500">
            +
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div className="overflow-hidden py-10" aria-label={words.join(", ")}>
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-[6vw] whitespace-nowrap text-[13vw] font-medium leading-none tracking-[-0.3vw] text-neutral-100 md:text-[10vw]">
        <div aria-hidden="true" className="flex items-center gap-[6vw]">{sequence}</div>
        <div aria-hidden="true" className="flex items-center gap-[6vw]">{sequence}</div>
      </div>
    </div>
  );
}

export default Marquee;
