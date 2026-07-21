"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import type { DictShape } from "@/app/i18n/dictionaries/fr";
import MenuLinks from "./MenuLinks";
import MenuContact from "./MenuContact";

export type MenuContent = DictShape["newFunnel"]["menu"] & {
  enquiry: DictShape["newFunnel"]["footer"]["enquiry"];
  social: DictShape["newFunnel"]["footer"]["social"];
};

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
  letsTalk: string;
  menuLabel: string;
  content: MenuContent;
}

const emptySubscribe = () => () => {};

function MenuOverlay({ open, onClose, letsTalk, menuLabel, content }: MenuOverlayProps) {
  // portals need document.body, which only exists after client mount
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/10"
            aria-hidden="true"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={menuLabel}
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 48 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-2 z-50 flex flex-col overflow-y-auto rounded-2xl bg-[#fbfbfa] font-sans text-[#1c1c1c] sm:left-auto sm:w-105"
          >
            <div className="flex items-center justify-end gap-2.5 px-5 py-5 sm:px-7">
              <button
                type="button"
                aria-label="Toggle sound"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-neutral-200 text-neutral-500 transition-colors hover:text-black"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M11 5 6 9H2v6h4l5 4V5z" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              </button>
              <a
                href="#"
                className="rounded-full bg-[#111110] px-4.5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.5px] text-white no-underline transition-colors hover:bg-black"
              >
                {letsTalk}
              </a>
              <button
                type="button"
                onClick={onClose}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-neutral-300 bg-transparent px-4.5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.5px] text-[#1c1c1c] transition-colors hover:border-black"
              >
                {menuLabel}
                <span aria-hidden="true" className="text-[13px] leading-none">×</span>
              </button>
            </div>

            <div className="flex flex-1 items-center px-5 sm:px-7">
              <MenuLinks links={content.links} onNavigate={onClose} />
            </div>

            <div className="flex flex-col gap-8 px-5 pb-5 pt-10 sm:px-7">
              <MenuContact enquiry={content.enquiry} social={content.social} />
              <div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2.5 rounded-full border border-neutral-300 px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.5px] text-[#1c1c1c] no-underline transition-colors hover:border-black"
                >
                  <span aria-hidden="true">✦</span>
                  {content.nameStory}
                </a>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default MenuOverlay;