import type { DictShape } from "@/app/i18n/dictionaries/fr";

type Enquiry = DictShape["newFunnel"]["footer"]["enquiry"];
type Social = DictShape["newFunnel"]["footer"]["social"];

function MenuContact({
  enquiry,
  social,
}: {
  enquiry: Enquiry;
  social: Social;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="m-0 mb-2 text-[11px] uppercase tracking-[0.5px] text-neutral-500">
          {enquiry.label}
        </p>
        <div className="flex flex-col gap-2">
          <a href={`mailto:${enquiry.email}`} className="text-[#1c1c1c] no-underline">
            {enquiry.email}
          </a>
          <a href={`tel:${enquiry.phone.replace(/\s/g, "")}`} className="text-[#1c1c1c] no-underline">
            {enquiry.phone}
          </a>
        </div>
      </div>
      <div>
        <p className="m-0 mb-2 text-[11px] uppercase tracking-[0.5px] text-neutral-500">
          {social.label}
        </p>
        <div className="flex flex-wrap gap-3">
          {social.links.map((link) => (
            <a key={link.label} href={link.href} className="text-[#1c1c1c] no-underline">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuContact;
