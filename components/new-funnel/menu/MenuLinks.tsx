import type { DictShape } from "@/app/i18n/dictionaries/fr";

type MenuLinkItems = DictShape["newFunnel"]["menu"]["links"];

function MenuLinks({
  links,
  onNavigate,
}: {
  links: MenuLinkItems;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-6">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          onClick={onNavigate}
          className="text-3xl font-medium text-[#1c1c1c] no-underline"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

export default MenuLinks;
