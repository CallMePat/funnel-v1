interface LabeledBlockProps {
  label: string;
  children: React.ReactNode;
}

function LabeledBlock({ label, children }: LabeledBlockProps) {
  return (
    <div className="flex flex-col">
      <p className="m-0 mb-[17px] text-[11px] uppercase tracking-[0.5px]" style={{ color: "#737378" }}>
        {label}
      </p>
      {children}
    </div>
  );
}

export default LabeledBlock;