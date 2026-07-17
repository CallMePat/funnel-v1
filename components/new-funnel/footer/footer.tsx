import type { DictShape } from "@/app/i18n/dictionaries/fr";
import ArrowLink from "../reusable/ArrowLink";
import SocialIcon from "../reusable/SocialIcon";
import LocalTime from "./LocalTime";
import LabeledBlock from "./LabeledBlock";
import LinesWordmark from "./LinesWordmark";

type NewFunnelFooterContent = DictShape["newFunnel"]["footer"];

export interface FooterProps {
  content: NewFunnelFooterContent;
}

export default function Footer({ content }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="flex min-h-screen flex-col justify-between overflow-hidden bg-[#111110] font-['Archivo',Helvetica,sans-serif] text-white">
      <div className="px-5 pt-8 sm:px-8 lg:px-10 lg:pt-10">
        <div className="flex items-start justify-between gap-6">
          <p className="m-0 text-[11px] uppercase tracking-[0.5px] text-neutral-300">
            {content.tagline}
          </p>
          <LocalTime label={content.timezone.label} zone={content.timezone.zone} />
        </div>

        <div className="mt-3 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-10">
            <h2 className="m-0 text-[2.6rem] font-medium leading-[1.08] tracking-[-1px] text-neutral-100 sm:text-6xl lg:text-[4.2rem]">
              {content.headline[0]}
              <br />
              {content.headline[1]}
            </h2>
            <p className="m-0 text-[13px] tracking-[0.3px] text-neutral-500">
              ©{content.brandName}
              <sup className="text-[8px]">®</sup> {year}
            </p>
            <p className="m-0 text-[11px] uppercase tracking-[0.5px] text-neutral-300">
              {content.soundHint}
            </p>
          </div>

          <div className="flex flex-col gap-12 lg:pt-14">
            <div>
              <ArrowLink label={content.cta} />
            </div>

            <div className="grid gap-10 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
              <LabeledBlock label={content.enquiry.label}>
                <div className="flex flex-col gap-2">
                  <p className="m-0 text-[15px] text-neutral-200">
                    <span className="mr-2 text-neutral-500">E.</span>
                    <a
                      href={`mailto:${content.enquiry.email}`}
                      className="text-neutral-100 no-underline transition-colors hover:text-white hover:underline"
                    >
                      {content.enquiry.email}
                    </a>
                  </p>
                  <p className="m-0 text-[15px] text-neutral-200">
                    <span className="mr-2 text-neutral-500">P.</span>
                    <a
                      href={`tel:${content.enquiry.phone.replace(/\s/g, "")}`}
                      className="text-neutral-100 no-underline transition-colors hover:text-white hover:underline"
                    >
                      {content.enquiry.phone}
                    </a>
                  </p>
                </div>
              </LabeledBlock>

              <LabeledBlock label={content.social.label}>
                <div className="flex items-center gap-5">
                  {content.social.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      aria-label={link.label}
                      className="text-neutral-300 transition-colors hover:text-white"
                    >
                      <SocialIcon name={link.label} />
                    </a>
                  ))}
                </div>
              </LabeledBlock>
            </div>
          </div>
        </div>
      </div>

      <LinesWordmark text={content.wordmark} />
    </footer>
  );
}
