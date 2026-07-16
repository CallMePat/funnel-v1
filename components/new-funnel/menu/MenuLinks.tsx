import type { DictShape } from "@/app/i18n/dictionaries/fr";

type MenuLinkItems = DictShape["newFunnel"]["menu"]["links"];

function MenuLinks({ links, onNavigate }: { links: MenuLinkItems; onNavigate: () => void }) {
  return (
    <nav className="flex flex-col items-start gap-1">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          onClick={onNavigate}
          className="text-[2.2rem] font-medium leading-[1.25] tracking-[-0.5px] text-[#3d3d3d] no-underline transition-colors hover:text-black sm:text-[2.4rem]"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

export default MenuLinks;
