interface ScrollHintProps {
  lines: string[];
}

function ScrollHint({ lines }: ScrollHintProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      {lines.map((line) => (
        <p
          key={line}
          className="m-0 text-center font-mono text-[11px] uppercase tracking-[1.5px] text-neutral-300"
        >
          {line}
        </p>
      ))}
    </div>
  );
}

export default ScrollHint;
