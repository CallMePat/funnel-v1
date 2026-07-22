import type { DictShape } from "@/app/i18n/dictionaries/fr";
import ArrowLink from "../reusable/ArrowLink";
import Parallax from "../reusable/Parallax";
import ScrollRevealText from "./ScrollRevealText";
import InfoBlock from "./InfoBlock";
import Marquee from "./Marquee";
import VideoExpand from "./VideoExpand";

type AboutContent = DictShape["newFunnel"]["about"];

export interface AboutProps {
  content: AboutContent;
}

export default function About({ content }: AboutProps) {
  return (
    <section className="relative z-10 flex min-h-screen flex-col justify-between overflow-hidden font-sans text-white">
      {/* Legibility scrim over the shared Spline scene */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/45" />

      <div className="px-5 pt-14 sm:px-8 lg:px-10 lg:pt-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <p className="m-0 shrink-0 font-mono text-[11px] uppercase tracking-[1.5px] text-neutral-400">
            {content.label}
          </p>
          <ScrollRevealText
            text={content.statement}
            className="m-0 max-w-4xl text-3xl font-medium leading-[1.25] tracking-[-0.5px] text-neutral-100 sm:text-4xl lg:pl-10 lg:text-[3.1rem]"
          />
        </div>

        <div className="mt-20 grid gap-16 lg:mt-28 lg:grid-cols-2 lg:gap-10">
          <Parallax speed={-30} className="flex flex-col gap-24 lg:gap-40 lg:pl-24">
            <InfoBlock text={content.notes[0]} withRule />
            <InfoBlock text={content.notes[1]} />
          </Parallax>

          <Parallax speed={70} className="flex max-w-88 flex-col gap-8 lg:justify-self-center">
            <span aria-hidden="true" className="text-neutral-400">✦</span>
            <p className="m-0 text-[15px] leading-relaxed text-neutral-200">{content.mission}</p>
            <div>
              <ArrowLink label={content.cta} />
            </div>
          </Parallax>
        </div>
      </div>

      {/* <VideoExpand content={content.video} /> */}

      <Marquee words={content.marquee} />
    </section>
  );
}
