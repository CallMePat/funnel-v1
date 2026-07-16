interface LabeledBlockProps {
  label: string;
  children: React.ReactNode;
}

function LabeledBlock({ label, children }: LabeledBlockProps) {
  return (
    <div className="flex flex-col gap-5">
      <p className="m-0 text-[12px] uppercase tracking-[0.5px] text-neutral-500">{label}</p>
      {children}
    </div>
  );
}

export default LabeledBlock;
