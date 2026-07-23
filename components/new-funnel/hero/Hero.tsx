import type { NewFunnelContent } from "@/app/i18n/dictionaries/fr";
import ArrowLink from "../reusable/ArrowLink";
import Parallax from "../reusable/Parallax";
import Reveal from "../reusable/Reveal";
import EstBadge from "./EstBadge";
import ScrollHint from "./ScrollHint";

type HeroContent = NewFunnelContent["hero"];

export interface HeroProps {
  content: HeroContent;
}

export default function Hero({ content }: HeroProps) {
  return (
    <section className="relative z-10 flex min-h-screen flex-col overflow-hidden font-sans text-white">
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-black/10 to-black/40" />

      <div className="relative z-10 flex flex-1 flex-col justify-between px-5 pb-8 pt-28 sm:px-8 lg:px-10 lg:pt-32">
        <Parallax speed={90} className="flex flex-col gap-8">
          <Reveal>
            <h1 className="m-0 max-w-xl text-5xl font-medium leading-[1.05] tracking-[-1px] text-neutral-100 sm:text-4xl lg:text-5xl">
              {content.title[0]} {/* <br /> */}
              {content.title[1]}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <ArrowLink label={content.cta} />
          </Reveal>
        </Parallax>

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

          <Parallax speed={-40}>
            <EstBadge
              micLabel={content.micLabel}
              coaching={content.established.note.split("\n")}
              blurb={content.blurb}
              year={content.established.year}
              note={content.established.note}
            />
          </Parallax>
        </div>
      </div>
    </section>
  );
}
