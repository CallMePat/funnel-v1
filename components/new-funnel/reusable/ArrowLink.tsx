function ArrowLink({ label, href = "#" }: { label: string; href?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.5px] text-white no-underline transition-opacity hover:opacity-80"
    >
      {label}
      <span aria-hidden="true">→</span>
    </a>
  );
}

export default ArrowLink;
