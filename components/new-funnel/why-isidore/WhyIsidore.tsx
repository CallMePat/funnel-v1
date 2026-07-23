import type { NewFunnelContent } from "@/app/i18n/dictionaries/fr";
import Parallax from "../reusable/Parallax";
import Reveal from "../reusable/Reveal";

type WhyIsidoreContent = NewFunnelContent["whyIsidore"];

interface WhyIsidoreProps {
  content: WhyIsidoreContent;
}

export default function WhyIsidore({ content }: WhyIsidoreProps) {
  return (
    <section className="relative z-10 overflow-hidden bg-[#0b0b0d] py-28 font-sans text-white lg:py-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div className="flex flex-col gap-10">
            <Reveal>
              <h2 className="m-0 text-4xl font-medium uppercase leading-[1.02] tracking-[-0.03em] text-neutral-100 sm:text-5xl lg:text-6xl">
                {content.title}
              </h2>
            </Reveal>
            <Parallax speed={-20} className="flex flex-col gap-6">
              <Reveal>
                <p className="m-0 text-xl leading-snug text-neutral-500 lg:text-2xl">
                  {content.dontTeach}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="m-0 max-w-md text-xl font-medium leading-snug text-white lg:text-2xl">
                  {content.buildAssets}
                </p>
              </Reveal>
            </Parallax>
          </div>

          <div className="flex flex-col">
            <Reveal>
              <p className="m-0 mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[1.5px] text-neutral-500">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                {content.approachLabel}
              </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {content.features.map((feature, index) => (
                <Reveal key={feature} delay={(index % 2) * 0.08}>
                  <div className="group flex h-full items-center gap-4 border-t border-white/10 py-6 transition-colors hover:border-white/25 sm:even:border-l sm:even:pl-6">
                    <span className="font-mono text-[11px] tracking-[1.5px] text-neutral-600 transition-colors group-hover:text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-medium leading-snug text-neutral-200 transition-colors group-hover:text-white">
                      {feature}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
