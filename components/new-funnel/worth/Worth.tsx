import type { NewFunnelContent } from "@/app/i18n/dictionaries/fr";
import Reveal from "../reusable/Reveal";

type WorthContent = NewFunnelContent["worth"];

interface WorthProps {
  content: WorthContent;
}

export default function Worth({ content }: WorthProps) {
  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden py-28 font-sans bg-white text-black lg:py-36">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8 lg:px-10">
        <Reveal>
          <p className="m-0 mb-10 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[1.5px] ">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand text-black" />
            {content.label}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="m-0 text-3xl font-medium leading-[1.15] tracking-[-0.02em]  sm:text-5xl lg:text-[4rem]">
            {content.statement}{" "}
            <span className="text-brand">{content.emphasis}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
