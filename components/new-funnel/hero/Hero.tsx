import type { DictShape } from "@/app/i18n/dictionaries/fr";
import ArrowLink from "../reusable/ArrowLink";
import Navbar from "./Navbar";
import HeroVisual from "./HeroVisual";
import EstBadge from "./EstBadge";
import ScrollHint from "./ScrollHint";
import type { MenuContent } from "../menu/MenuOverlay";

type HeroContent = DictShape["newFunnel"]["hero"];

export interface HeroProps {
  content: HeroContent;
  menu: MenuContent;
}

export default function Hero({ content, menu }: HeroProps) {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#111110] font-['Archivo',Helvetica,sans-serif] text-white">
      <HeroVisual />

      <div className="relative z-10">
        <Navbar
          brand={content.brand}
          letsTalk={content.letsTalk}
          menu={content.menu}
          menuContent={menu}
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-between px-5 pb-8 pt-4 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8">
          <h1 className="m-0 max-w-xl text-5xl font-medium leading-[1.05] tracking-[-1px] text-neutral-100 sm:text-6xl lg:text-7xl">
            {content.title[0]}
            <br />
            {content.title[1]}
          </h1>
          <div>
            <ArrowLink label={content.cta} />
          </div>
        </div>

        <div className="flex items-end justify-between gap-6">
          <button
            type="button"
            aria-label="Scroll down"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-neutral-600 bg-transparent text-neutral-400 transition-colors hover:border-white hover:text-white"
          >
            <span aria-hidden="true">↓</span>
          </button>

          <div className="hidden pb-1 md:block">
            <ScrollHint lines={content.hint} />
          </div>

          <EstBadge
            year={content.established.year}
            note={content.established.note}
            blurb={content.blurb}
          />
        </div>
      </div>
    </section>
  );
}
