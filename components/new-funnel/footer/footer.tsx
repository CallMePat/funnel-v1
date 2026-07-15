"use client";

import type { Locale } from "@/app/i18n";
import type { DictShape } from "@/app/i18n/dictionaries/fr";
import Link from "next/link";
import Wordmark from "../reusable/Wordmark";
import LinkColumn from "./LinkColumn";
import SubscribeForm from "../reusable/SubscribeForm";
import Headline from "./Headline";
import Logo from "../reusable/Logo";

type NewFunnelFooterContent = DictShape["footer"]["newFunnel"];

export interface FooterProps {
  locale: Locale;
  content: NewFunnelFooterContent;
  onSubscribe?: (email: string) => void;
}

export default function Footer({
  locale,
  content,
  onSubscribe,
}: FooterProps) {
  return (
    <footer className="flex min-h-screen flex-col justify-between overflow-hidden bg-[#111110] font-['Archivo',Helvetica,sans-serif] text-white">
      <div className="grid gap-12 px-5 pt-10 sm:px-8 sm:pt-12 md:gap-14 md:px-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10 lg:px-16 lg:pt-14">
        <div className="flex items-start gap-4 sm:gap-5 md:gap-6">
          <Logo />
          <Headline>{content.headline}</Headline>
        </div>

        <div className="flex flex-col gap-12 md:gap-16 lg:gap-24">
          <SubscribeForm
            tagline={content.tagline}
            placeholder={content.subscribe.placeholder}
            buttonLabel={content.subscribe.button}
            onSubscribe={onSubscribe}
          />

          <div className="grid gap-10 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            <LinkColumn title={content.sections.journey} links={content.links.journey} />
            <LinkColumn title={content.sections.focusAreas} links={content.links.focusAreas} />
            <LinkColumn title={content.sections.builtFor}>
              <p className="m-0 mt-1.5 text-[15px] leading-normal text-neutral-300">{content.audience}</p>
              <div className="mt-6 flex flex-col gap-3">
                <p className="m-0 text-xs font-semibold uppercase tracking-[0.4px] text-neutral-400">
                  {content.languageSwitcher.label}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/en/new-funnel"
                    className={`rounded-full border px-4 py-2 text-sm no-underline transition-colors ${
                      locale === "en"
                        ? "border-[#cfe58a] bg-[#cfe58a] text-[#111110]"
                        : "border-neutral-700 text-neutral-300 hover:border-white hover:text-white"
                    }`}
                  >
                    {content.languageSwitcher.en}
                  </Link>
                  <Link
                    href="/fr/new-funnel"
                    className={`rounded-full border px-4 py-2 text-sm no-underline transition-colors ${
                      locale === "fr"
                        ? "border-[#cfe58a] bg-[#cfe58a] text-[#111110]"
                        : "border-neutral-700 text-neutral-300 hover:border-white hover:text-white"
                    }`}
                  >
                    {content.languageSwitcher.fr}
                  </Link>
                </div>
              </div>
            </LinkColumn>
          </div>
        </div>
      </div>

      <Wordmark text={content.brandName} />
    </footer>
  );
}
