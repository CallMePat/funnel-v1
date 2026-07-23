import type { NewFunnelContent } from "@/app/i18n/dictionaries/fr";
import Parallax from "../reusable/Parallax";
import Reveal from "../reusable/Reveal";

type InvestmentContent = NewFunnelContent["investment"];

interface InvestmentProps {
  content: InvestmentContent;
}

export default function Investment({ content }: InvestmentProps) {
  return (
    <section className="relative z-10 overflow-hidden bg-[#0e0e10] py-28 font-sans text-white lg:py-40">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
        <Reveal>
          <p className="m-0 mb-14 font-mono text-[11px] uppercase tracking-[1.5px] text-neutral-500">
            {content.label}
          </p>
        </Reveal>

        <Parallax speed={40}>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent">
            <div className="grid gap-px lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
              {/* Full price */}
              <Reveal className="flex flex-col justify-between gap-12 p-8 sm:p-10 lg:p-12">
                <p className="m-0 text-sm uppercase tracking-[0.5px] text-neutral-500">
                  {content.title}
                </p>
                <p className="m-0 text-5xl font-medium tracking-[-0.03em] text-neutral-500 line-through decoration-neutral-700 decoration-1 sm:text-6xl">
                  {content.fullPrice}
                </p>
              </Reveal>

              {/* Bonus + final price */}
              <Reveal delay={0.12} className="flex flex-col justify-between gap-10 border-t border-white/10 bg-brand/[0.05] p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                <div className="flex flex-col gap-3">
                  <p className="m-0 inline-flex w-fit items-center gap-2 rounded-full border border-brand/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[1.5px] text-brand">
                    {content.bonusTitle}
                  </p>
                  <p className="m-0 text-[15px] leading-snug text-neutral-300">
                    {content.bonusText}
                  </p>
                  <p className="m-0 text-[15px] font-medium leading-snug text-white">
                    {content.credit}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="m-0 font-mono text-[11px] uppercase tracking-[1.5px] text-neutral-500">
                    {content.becomesLabel}
                  </p>
                  <p className="m-0 text-6xl font-medium tracking-[-0.03em] text-brand sm:text-7xl">
                    {content.finalPrice}
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.16}>
              <div className="border-t border-white/10 p-8 sm:p-10 lg:px-12 lg:py-8">
                <a
                  href="#"
                  className="group inline-flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.5px] text-white no-underline transition-opacity hover:opacity-80"
                >
                  {content.cta}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </Parallax>
      </div>
    </section>
  );
}
