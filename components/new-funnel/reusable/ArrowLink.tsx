interface ArrowLinkProps {
  label: string;
  href?: string;
}

function ArrowLink({ label, href = "#" }: ArrowLinkProps) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-8 border-b border-neutral-500 pb-2.5 font-mono text-[12px] uppercase tracking-[2.5px] text-neutral-200 no-underline transition-colors hover:border-white hover:text-white"
    >
      {label}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

export default ArrowLink;
