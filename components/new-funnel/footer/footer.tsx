"use client";

import type { Locale } from "@/app/i18n";
import type { DictShape } from "@/app/i18n/dictionaries/fr";
import LinesWordmark from "./LinesWordmark";
import SmokeBackground from "./SmokeBackground";
import SocialIcon from "../reusable/SocialIcon";

type NewFunnelFooterContent = DictShape["newFunnel"]["footer"];

export interface FooterProps {
  locale: Locale;
  content: NewFunnelFooterContent;
  onSubscribe?: (email: string) => void;
}

export default function Footer({
  content,
}: FooterProps) {
  return (
    <footer className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#111110] font-sans text-white">
      <SmokeBackground />

      <div className="relative z-10 px-5 pt-8 sm:px-8 lg:px-10 lg:pt-10">
        <div className="flex items-start justify-between gap-6">
          <p className="m-0 text-[11px] uppercase tracking-[0.5px] text-neutral-300">
            {content.tagline}
          </p>
          <p className="m-0 text-[11px] uppercase tracking-[0.5px] text-neutral-400">
            {content.timezone.label}
          </p>
        </div>

        <div className="mt-3 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-10">
            <h2 className="m-0 text-[2.6rem] font-medium leading-[1.08] tracking-[-1px] text-neutral-100 sm:text-6xl lg:text-[4.2rem]">
              {content.headline[0]}
              <br />
              {content.headline[1]}
            </h2>
            <p className="m-0 text-[13px] tracking-[0.3px] text-neutral-500">
              {content.brandName}
            </p>
          </div>

          <div className="flex flex-col gap-12 lg:pt-14">
            <div>
              <a
                href="#"
                className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.5px] text-white no-underline"
              >
                {content.cta}
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="grid gap-10 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
              <div>
                <p className="m-0 mb-3 text-[11px] uppercase tracking-[0.5px] text-neutral-400">
                  {content.enquiry.label}
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={`mailto:${content.enquiry.email}`}
                    className="text-neutral-100 no-underline"
                  >
                    {content.enquiry.email}
                  </a>
                  <a
                    href={`tel:${content.enquiry.phone.replace(/\s/g, "")}`}
                    className="text-neutral-100 no-underline"
                  >
                    {content.enquiry.phone}
                  </a>
                </div>
              </div>

              <div>
                <p className="m-0 mb-3 text-[11px] uppercase tracking-[0.5px] text-neutral-400">
                  {content.social.label}
                </p>
                <div className="flex items-center gap-5">
                  {content.social.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      aria-label={link.label}
                      className="text-neutral-300 transition-colors hover:text-white"
                    >
                      <SocialIcon name={link.label} className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full">
        <LinesWordmark text={content.wordmark} />
      </div>
    </footer>
  );
}
