import type { NewFunnelContent } from "@/app/i18n/dictionaries/fr";
import Parallax from "../reusable/Parallax";
import Reveal from "../reusable/Reveal";

type AssessmentContent = NewFunnelContent["assessment"];

interface AssessmentProps {
  content: AssessmentContent;
}

export default function Assessment({ content }: AssessmentProps) {
  return (
    <section className="relative z-10 w-full overflow-hidden bg-gradient-to-b from-neutral-100 to-neutral-200 py-24 font-sans lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 lg:max-w-3xl">
          <Reveal>
            <p className="m-0 font-mono text-[11px] uppercase tracking-[1.5px] text-neutral-500">
              {content.label}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="m-0 text-4xl font-medium uppercase leading-[1.02] tracking-[-0.03em] text-neutral-800 sm:text-5xl lg:text-6xl">
              {content.title}
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="m-0 max-w-2xl text-lg leading-snug text-neutral-500 lg:text-xl">
              {content.statement}{" "}
              <span className="text-neutral-800">{content.emphasis}</span>
            </p>
          </Reveal>
        </div>

        {/* Record / Analyze / Improve stepper */}
        <Parallax speed={40} className="mt-16 lg:mt-24">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-neutral-300 sm:grid-cols-3">
            {content.steps.map((step, index) => (
              <Reveal key={step} delay={index * 0.12}>
                <div className="flex h-full flex-col justify-between gap-16 bg-white/60 p-7 lg:p-8">
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 font-mono text-[12px] text-white">
                      {index + 1}
                    </span>
                    {index < content.steps.length - 1 && (
                      <span aria-hidden="true" className="text-neutral-400">→</span>
                    )}
                  </div>
                  <p className="m-0 text-2xl font-medium tracking-[-0.01em] text-neutral-900 lg:text-3xl">
                    {step}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Parallax>

        {/* Deliverables */}
        <div className="mt-16 lg:mt-20">
          <Reveal>
            <p className="m-0 mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[1.5px] text-neutral-500">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
              {content.receiveLabel}
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {content.deliverables.map((item, index) => (
              <Reveal key={item} delay={(index % 3) * 0.08}>
                <div className="flex items-baseline gap-4 border-t border-neutral-300 py-5">
                  <span className="font-mono text-[11px] tracking-[1.5px] text-neutral-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-medium leading-snug text-neutral-800">
                    {item}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 lg:mt-16">
            <a
              href="#"
              className="group inline-flex w-fit items-center gap-6 border-b border-neutral-400 pb-2 font-mono text-[12px] uppercase tracking-[2.5px] text-neutral-700 no-underline transition-colors hover:border-neutral-900 hover:text-neutral-900"
            >
              {content.cta}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
