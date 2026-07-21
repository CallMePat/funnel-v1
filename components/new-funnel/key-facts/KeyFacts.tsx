import type { DictShape } from "@/app/i18n/dictionaries/fr";
import Image from "next/image";
import Reveal from "../reusable/Reveal";

type KeyFactsContent = DictShape["newFunnel"]["keyFacts"];
type KeyFactCard = KeyFactsContent["cards"][number];

interface KeyFactsProps {
  content: KeyFactsContent;
}

function Stat({ value, suffix }: { value: string; suffix: string }) {
  return (
    <span className="font-medium leading-none tracking-[-0.03em]">
      {value}
      <sup className="top-[-0.35em] text-[0.5em] font-medium">{suffix}</sup>
    </span>
  );
}

function ImageCard({ card }: { card: KeyFactCard }) {
  return (
    <article className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl p-6 text-white sm:p-7">
      <Image
        src={card.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 30vw, 100vw"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

      <p className="relative z-10 text-center font-mono text-[11px] uppercase tracking-[1.5px] text-white/80">
        {card.label}
      </p>

      <div className="relative z-10 flex items-end justify-between gap-4">
        <p className="m-0 max-w-[9rem] text-[15px] leading-snug text-white/90">
          {card.caption}
        </p>
        <p className="m-0 text-5xl text-white/95 sm:text-6xl">
          <Stat value={card.value} suffix={card.suffix} />
        </p>
      </div>
    </article>
  );
}

function CircleCard({ card }: { card: KeyFactCard }) {
  return (
    <article className="flex aspect-[4/5] flex-col items-center justify-between rounded-2xl bg-neutral-200/70 p-6 text-neutral-900 sm:p-7">
      <p className="font-mono text-[11px] uppercase tracking-[1.5px] text-neutral-500">
        {card.label}
      </p>

      <div className="flex aspect-square w-[62%] items-center justify-center rounded-full bg-white shadow-sm">
        <p className="m-0 text-4xl text-neutral-900 sm:text-5xl">
          <Stat value={card.value} suffix={card.suffix} />
        </p>
      </div>

      <p className="m-0 max-w-[16rem] text-center text-[15px] leading-snug text-neutral-500">
        {card.caption}
      </p>
    </article>
  );
}

function DarkCard({ card }: { card: KeyFactCard }) {
  return (
    <article className="flex aspect-[4/5] flex-col justify-between rounded-2xl bg-neutral-800 p-6 text-white sm:p-7">
      <p className="text-center font-mono text-[11px] uppercase tracking-[1.5px] text-white/70">
        {card.label}
      </p>

      <div className="relative mx-auto aspect-[3/4] w-[62%] overflow-hidden rounded-lg">
        <Image
          src={card.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 20vw, 60vw"
          className="object-cover"
        />
      </div>

      <div className="flex items-end justify-between gap-4">
        <p className="m-0 max-w-[9rem] text-[15px] leading-snug text-white/80">
          {card.caption}
        </p>
        <p className="m-0 text-5xl text-white/95 sm:text-6xl">
          <Stat value={card.value} suffix={card.suffix} />
        </p>
      </div>
    </article>
  );
}

function renderCard(card: KeyFactCard, index: number) {
  if (card.variant === "circle") return <CircleCard key={index} card={card} />;
  if (card.variant === "dark") return <DarkCard key={index} card={card} />;
  return <ImageCard key={index} card={card} />;
}

export default function KeyFacts({ content }: KeyFactsProps) {
  return (
    <section className="w-full bg-gradient-to-b from-neutral-200 to-neutral-100 py-20 font-sans lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-14 text-center lg:mb-20">
          <h2 className="m-0 text-6xl font-medium tracking-[-0.03em] text-neutral-700 sm:text-7xl">
            {content.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xs text-lg leading-snug text-neutral-500">
            {content.subtitle}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.cards.map((card, index) => (
            <Reveal key={index} delay={index * 0.12}>
              {renderCard(card, index)}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
