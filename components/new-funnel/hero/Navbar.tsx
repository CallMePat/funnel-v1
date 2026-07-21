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
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <div className="text-sm font-semibold uppercase tracking-[0.5px] text-white">
          {brand}
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.5px] text-[#111110] no-underline"
          >
            {letsTalk}
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full border border-white/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.5px] text-white"
          >
            {menu}
          </button>
        </div>
      </div>
      <MenuOverlay
        open={open}
        onClose={() => setOpen(false)}
        letsTalk={letsTalk}
        menuLabel={menu}
        content={menuContent}
      />
    </>
  );
}

export default Navbar;
