"use client";

import { useState } from "react";
import MenuOverlay, { type MenuContent } from "../menu/MenuOverlay";

interface NavbarProps {
  brand: string;
  letsTalk: string;
  menu: string;
  menuContent: MenuContent;
}

function Navbar({ brand, letsTalk, menu, menuContent }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between w-full px-5 py-6 sm:px-8 lg:px-10">
      <a href="#" className="flex items-center gap-2 text-white no-underline">
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          aria-hidden="true"
        >
          <path d="M3 6h14l-3 4H8l4 10-3 2L3 6z" fill="currentColor" />
          <path d="M14 12h9l-2.5 3.5H16L14 12z" fill="currentColor" />
        </svg>
        <span className="text-lg font-bold tracking-[1px]">
          {brand}
          <sup className="text-[9px] font-normal">®</sup>
        </span>
      </a>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Toggle sound"
          className="hidden h-9 w-9 cursor-pointer items-center justify-center rounded-full border-none bg-neutral-800/80 text-neutral-400 transition-colors hover:text-white sm:flex"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        </button>
        <a
          href="#"
          className="rounded-full bg-neutral-100 px-5 py-2.5 font-mono text-[12px] font-semibold uppercase tracking-[0.5px] text-[#111110] no-underline transition-colors hover:bg-white"
        >
          {letsTalk}
        </a>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="flex cursor-pointer items-center gap-2 rounded-full border border-neutral-600 bg-transparent px-5 py-2.5 font-mono text-[12px] font-semibold uppercase tracking-[0.5px] text-white transition-colors hover:border-white"
        >
          {menu}
          <span aria-hidden="true" className="text-[14px] leading-none">≡</span>
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
