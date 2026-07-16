import type { DictShape } from "@/app/i18n/dictionaries/fr";

type FooterContent = DictShape["newFunnel"]["footer"];

interface MenuContactProps {
  enquiry: FooterContent["enquiry"];
  social: FooterContent["social"];
}

function MenuContact({ enquiry, social }: MenuContactProps) {
  return (
    <div className="flex max-w-xl flex-col gap-10">
      <div className="flex flex-col gap-4">
        <p className="m-0 text-[12px] uppercase tracking-[0.5px] text-neutral-400">
          {enquiry.label}
        </p>
        <div className="flex flex-col gap-2">
          <p className="m-0 text-[17px] text-[#1c1c1c]">
            <span className="mr-3 text-neutral-400">E.</span>
            <a
              href={`mailto:${enquiry.email}`}
              className="text-[#1c1c1c] no-underline transition-colors hover:underline"
            >
              {enquiry.email}
            </a>
          </p>
          <p className="m-0 text-[17px] text-[#1c1c1c]">
            <span className="mr-3 text-neutral-400">P.</span>
            <a
              href={`tel:${enquiry.phone.replace(/\s/g, "")}`}
              className="text-[#1c1c1c] no-underline transition-colors hover:underline"
            >
              {enquiry.phone}
            </a>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="m-0 text-[12px] uppercase tracking-[0.5px] text-neutral-400">
          {social.label}
        </p>
        <div className="grid max-w-90 grid-cols-2 gap-x-10 gap-y-2">
          {social.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[17px] text-[#1c1c1c] no-underline transition-colors hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuContact;
