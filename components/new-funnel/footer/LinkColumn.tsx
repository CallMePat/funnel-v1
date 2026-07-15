import { FooterLink } from "@/lib/types";

interface LinkColumnProps {
  title: string;
  links?: FooterLink[];
  children?: React.ReactNode;
}

function LinkColumn({ title, links, children }: LinkColumnProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="mb-3 mt-0 text-[1.35rem] font-medium text-white sm:mb-4 sm:text-2xl">{title}</h3>
      {links?.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="block py-1.5 text-[15px] text-neutral-300 no-underline transition-colors hover:text-white"
        >
          {link.label}
        </a>
      ))}
      {children}
    </div>
  );
}

export default LinkColumn;
