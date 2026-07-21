interface EstBadgeProps {
  micLabel: string;
  coaching: string[];
  blurb: string;
}

function EstBadge({ micLabel, coaching, blurb }: EstBadgeProps) {
  return (
    <div className="w-[210px]">
      <div
        className="flex h-[65px] w-[210px] overflow-hidden rounded-[2px] border"
        style={{ borderColor: "rgba(255,255,255,0.10)" }}
      >
        <div className="flex w-[40%] flex-col items-center justify-center gap-1.5 border-r px-2" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" aria-hidden="true">
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
          </svg>
          <span className="text-[9px] uppercase tracking-[0.5px] text-[#d0d0d0]">{micLabel}</span>
        </div>
        <div className="flex w-[60%] flex-col justify-center px-3">
          {coaching.map((line) => (
            <p key={line} className="m-0 text-[9px] uppercase leading-[1.05] tracking-[0.5px] text-[#d0d0d0]">
              {line}
            </p>
          ))}
        </div>
      </div>
      <p className="m-0 mt-[18px] w-[210px] text-left text-[14px] leading-[1.22] text-[#c5c5c5]">{blurb}</p>
    </div>
  );
}

export default EstBadge;
