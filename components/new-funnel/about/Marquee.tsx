function Marquee({ words }: { words: string[] }) {
  return (
    <div className="overflow-hidden py-10">
      <div className="flex flex-wrap items-center justify-center gap-4 px-5 text-sm font-semibold uppercase tracking-[0.5px] text-neutral-400 sm:gap-6">
        {words.map((word) => (
          <span key={word}>{word}</span>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
