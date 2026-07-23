import type { NewFunnelContent } from "@/app/i18n/dictionaries/fr";
import Parallax from "../reusable/Parallax";
import Reveal from "../reusable/Reveal";

type SprintContent = NewFunnelContent["sprint"];

interface SprintProps {
  content: SprintContent;
}

export default function Sprint({ content }: SprintProps) {
  return (
    <section className="relative z-10 overflow-hidden bg-[#0b0b0d] py-28 font-sans text-white lg:py-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <Reveal>
          <p className="m-0 font-mono text-[11px] uppercase tracking-[1.5px] text-neutral-500">
            {content.label}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          {/* Left: headline */}
          <div className="flex flex-col gap-10">
            <Reveal>
              <h2 className="m-0 text-6xl font-medium leading-[0.92] tracking-[-0.04em] text-neutral-100 sm:text-7xl lg:text-8xl">
                <span className="block">{content.days}</span>
                <span className="block text-brand">{content.objective}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="m-0 max-w-md text-lg leading-relaxed text-neutral-400 lg:text-xl">
                {content.statement}
              </p>
            </Reveal>

            <Parallax speed={-20}>
              <div className="flex flex-col gap-3 border-t border-white/10 pt-8">
                {content.negations.map((line) => (
                  <p
                    key={line}
                    className="m-0 text-lg text-neutral-600 line-through decoration-neutral-700 lg:text-xl"
                  >
                    {line}
                  </p>
                ))}
                <p className="m-0 mt-2 text-xl font-medium text-white lg:text-2xl">
                  {content.affirmation}
                </p>
              </div>
            </Parallax>
          </div>

          {/* Right: deliverables */}
          <Parallax speed={40} className="flex flex-col">
            <Reveal>
              <p className="m-0 mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[1.5px] text-neutral-500">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                {content.leaveLabel}
              </p>
            </Reveal>
            <div className="flex flex-col">
              {content.deliverables.map((item, index) => (
                <Reveal key={item} delay={index * 0.06}>
                  <div className="group flex items-center gap-5 border-t border-white/10 py-4 transition-colors hover:border-white/25">
                    <span className="font-mono text-[11px] tracking-[1.5px] text-neutral-600 transition-colors group-hover:text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] font-medium leading-snug text-neutral-200 transition-colors group-hover:text-white sm:text-base">
                      {item}
                    </span>
                  </div>
                </Reveal>
              ))}
              <div className="border-t border-white/10" />
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
