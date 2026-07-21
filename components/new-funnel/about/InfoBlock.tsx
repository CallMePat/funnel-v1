function InfoBlock({ text, withRule = false }: { text: string; withRule?: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      {withRule ? <div className="h-px w-full bg-white/10" /> : null}
      <p className="m-0 whitespace-pre-line text-sm uppercase leading-[1.5] tracking-[0.5px] text-neutral-300">
        {text}
      </p>
    </div>
  );
}

export default InfoBlock;
