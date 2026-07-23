import type { NewFunnelContent } from "@/app/i18n/dictionaries/fr";
import Parallax from "../reusable/Parallax";
import Reveal from "../reusable/Reveal";
import ScrollRevealText from "../about/ScrollRevealText";

type MasterclassContent = NewFunnelContent["masterclass"];

interface MasterclassProps {
  content: MasterclassContent;
}

export default function Masterclass({ content }: MasterclassProps) {
  return (
    <section className="relative z-10 overflow-hidden bg-[#0e0e10] py-28 font-sans text-white lg:py-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <Reveal>
          <p className="m-0 font-mono text-[11px] uppercase tracking-[1.5px] text-neutral-500">
            {content.label}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="m-0 mt-8 max-w-4xl text-4xl font-medium uppercase leading-[1.02] tracking-[-0.03em] text-neutral-100 sm:text-5xl lg:text-6xl">
            {content.title}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          {/* Meta */}
          <Parallax speed={40} className="flex flex-col gap-10">
            <div className="flex flex-col gap-1">
              <p className="m-0 text-5xl font-medium tracking-[-0.03em] text-brand sm:text-6xl">
                {content.duration}
              </p>
              <p className="m-0 text-lg text-neutral-300">{content.host}</p>
            </div>
            <div className="flex flex-col">
              {content.features.map((feature) => (
                <p
                  key={feature}
                  className="m-0 border-t border-white/10 py-4 text-base text-neutral-400"
                >
                  {feature}
                </p>
              ))}
              <div className="border-t border-white/10" />
            </div>
          </Parallax>

          {/* Question + discovery */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <Reveal>
                <p className="m-0 font-mono text-[11px] uppercase tracking-[1.5px] text-neutral-500">
                  {content.questionIntro}
                </p>
              </Reveal>
              <ScrollRevealText
                text={content.question}
                className="m-0 text-3xl font-medium leading-[1.12] tracking-[-0.02em] text-white sm:text-4xl lg:text-[2.9rem]"
              />
            </div>

            <div className="flex flex-col gap-5">
              <Reveal>
                <p className="m-0 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[1.5px] text-neutral-500">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                  {content.discoverIntro}
                </p>
              </Reveal>
              <div className="flex flex-col">
                {content.discoverPoints.map((point, index) => (
                  <Reveal key={point} delay={index * 0.08}>
                    <div className="flex items-baseline gap-4 border-t border-white/10 py-4">
                      <span className="font-mono text-[11px] tracking-[1.5px] text-neutral-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] leading-snug text-neutral-300 sm:text-base">
                        {point}
                      </span>
                    </div>
                  </Reveal>
                ))}
                <div className="border-t border-white/10" />
              </div>
            </div>

            <Reveal delay={0.1}>
              <a
                href="#"
                className="inline-flex w-fit items-center justify-center rounded-full bg-brand px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.5px] text-brand-foreground no-underline transition-transform hover:-translate-y-0.5"
              >
                {content.cta}
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
