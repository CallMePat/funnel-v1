interface InfoBlockProps {
  text: string;
  withRule?: boolean;
}

function InfoBlock({ text, withRule = false }: InfoBlockProps) {
  return (
    <div className="flex max-w-90 flex-col gap-6">
      {withRule && <hr className="m-0 w-full border-0 border-t border-neutral-700/70" />}
      <p className="m-0 whitespace-pre-line font-mono text-[11px] uppercase leading-relaxed tracking-[1px] text-neutral-300">
        {text}
      </p>
    </div>
  );
}

export default InfoBlock;
