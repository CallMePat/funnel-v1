function ScrollHint({ lines }: { lines: string[] }) {
  return (
    <div className="flex flex-col items-end gap-1 text-right">
      {lines.map((line) => (
        <p key={line} className="m-0 text-[11px] uppercase tracking-[0.5px] text-neutral-400">
          {line}
        </p>
      ))}
    </div>
  );
}

export default ScrollHint;
