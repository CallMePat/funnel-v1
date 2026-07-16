interface EstBadgeProps {
  year: string;
  note: string;
  blurb: string;
}

function EstBadge({ year, note, blurb }: EstBadgeProps) {
  return (
    <div className="flex max-w-72 flex-col gap-4">
      <div className="flex items-stretch border border-neutral-700/70">
        <div className="flex flex-col items-center justify-center gap-1.5 border-r border-neutral-700/70 px-4 py-3">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-neutral-200" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <ellipse cx="12" cy="12" rx="4.5" ry="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M4 6.5C6 8 9 9 12 9s6-1 8-2.5M4 17.5C6 16 9 15 12 15s6 1 8 2.5" />
          </svg>
          <span className="font-mono text-[10px] tracking-[0.5px] text-neutral-300">{year}</span>
        </div>
        <p className="m-0 flex items-center px-4 py-3 font-mono text-[10px] leading-relaxed tracking-[0.5px] text-neutral-300">
          {note}
        </p>
      </div>
      <p className="m-0 text-justify text-[15px] leading-normal text-neutral-200">{blurb}</p>
    </div>
  );
}

export default EstBadge;
