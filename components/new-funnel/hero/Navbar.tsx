"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import MenuOverlay, { type MenuContent } from "../menu/MenuOverlay";

interface NavbarProps {
  brand: string;
  letsTalk: string;
  menu: string;
  menuContent: MenuContent;
}

function Navbar({ brand, letsTalk, menu, menuContent }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const menuIconRef = useRef<SVGSVGElement>(null);

  const onMenuEnter = () => {
    gsap.to(menuBtnRef.current, { backgroundColor: "#ffffff", color: "#000000", duration: 0.3, ease: "power2.out" });
    gsap.to(menuIconRef.current, { color: "#000000", duration: 0.3, ease: "power2.out" });
  };
  const onMenuLeave = () => {
    gsap.to(menuBtnRef.current, { backgroundColor: "rgba(0,0,0,0)", color: "#d7d7d7", duration: 0.3, ease: "power2.out" });
    gsap.to(menuIconRef.current, { color: "#d7d7d7", duration: 0.3, ease: "power2.out" });
  };

  return (
    <nav>
      <a
        href="#"
        className="absolute left-[29px] top-[30px] flex items-center gap-2 text-[#f2f2f2] no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-300"
      >
        <svg width="16" height="16" viewBox="0 0 26 26" fill="none" aria-hidden="true">
          <path d="M3 6h14l-3 4H8l4 10-3 2L3 6z" fill="currentColor" />
          <path d="M14 12h9l-2.5 3.5H16L14 12z" fill="currentColor" />
        </svg>
        <span className="text-[13px] font-semibold tracking-[0.5px]">
          {brand}
          <sup className="text-[8px] font-normal">®</sup>
        </span>
      </a>

      <div className="absolute right-[29px] top-[31px] flex items-center gap-2">
        <button
          type="button"
          aria-label="Toggle sound"
          className="flex h-[27px] w-[27px] cursor-pointer items-center justify-center rounded-full border-none bg-[#292929] text-[#8a8a8a] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-300"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        </button>
        <a
          href="#"
          className="flex h-[28px] items-center rounded-full bg-[#f0f0f0] px-4 text-[11px] font-medium uppercase tracking-[0.5px] text-[#151515] no-underline transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0b]"
        >
          {letsTalk}
        </a>
        <button
          ref={menuBtnRef}
          type="button"
          onClick={() => setMenuOpen(true)}
          onMouseEnter={onMenuEnter}
          onMouseLeave={onMenuLeave}
          onFocus={onMenuEnter}
          onBlur={onMenuLeave}
          className="flex h-[28px] cursor-pointer items-center gap-1.5 rounded-full border px-[13px] text-[11px] uppercase tracking-[0.5px] text-[#d7d7d7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-300"
          style={{ borderColor: "rgba(255,255,255,0.75)" }}
        >
          {menu}
          <svg ref={menuIconRef} width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true" className="text-[#d7d7d7]">
            <line x1="0" y1="1" x2="12" y2="1" stroke="currentColor" strokeWidth="1" />
            <line x1="0" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
      </div>

      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        letsTalk={letsTalk}
        menuLabel={menu}
        content={menuContent}
      />
    </nav>
  );
}

export default Navbar;
