interface StepCardProps {
  index: number;
  title: string;
  description: string;
  align: "left" | "right";
  position: React.CSSProperties;
}

function StepCard({ index, title, description, align, position }: StepCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`absolute flex w-[34%] max-w-80 flex-col gap-3 sm:gap-4 ${
        align === "right" ? "items-end text-right" : "items-start text-left"
      }`}
      style={position}
    >
      <p
        aria-hidden="true"
        className="m-0 text-4xl font-medium leading-none text-transparent [-webkit-text-stroke:1.5px_#d4a16a] sm:text-6xl"
      >
        {number}
      </p>
      <h3 className="m-0 text-[1.5rem] font-medium leading-tight text-[#1d1d1f] sm:text-[1.9rem]">
        <span className="sr-only">{number} — </span>
        {title}
      </h3>
      <p className="m-0 text-[13px] leading-relaxed text-neutral-500 sm:text-[15px]">
        {description}
      </p>
    </div>
  );
}

export default StepCard;
