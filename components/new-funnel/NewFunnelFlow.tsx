"use client";

import type { Locale } from "@/app/i18n";
import type { NewFunnelContent } from "@/app/i18n/dictionaries/fr";
import Hero from "./hero/Hero";
import Navbar from "./hero/Navbar";
import SplineBackground from "./hero/SplineBackground";
import Spiral from "./spiral/Spiral";
import About from "./about/About";
import KeyFacts from "./key-facts/KeyFacts";
import SelectedWork from "./selected-work/SelectedWork";
import Footer from "./footer/footer";
import PainPoints from "./pain-points/PainPoints";
import CommunicationAsset from "./communication-asset/CommunicationAsset";
import Transformation from "./transformation/Transformation";
import Decision from "./decision/Decision";
import Worth from "./worth/Worth";
import PreparingFor from "./preparing-for/PreparingFor";
import Assessment from "./assessment/Assessment";
import Sprint from "./sprint/Sprint";
import Investment from "./investment/Investment";
import WhyIsidore from "./why-isidore/WhyIsidore";
import Masterclass from "./masterclass/Masterclass";
import { useRef, useState } from "react";
import Preloader, { isInitialLoad } from "./Preloader/Preloader";

const SPLINE_SCENE =
  "https://prod.spline.design/gQTzOsb39iXQFw09/scene.splinecode";

interface NewFunnelFlowProps {
  dict: NewFunnelContent;
  locale: Locale;
}

function NewFunnelFlow({ dict, locale }: NewFunnelFlowProps) {
  const menuContent = {
    ...dict.menu,
    enquiry: dict.footer.enquiry,
    social: dict.footer.social,
  };
  const [loaderAnimating, setLoaderAnimating] =
    useState<boolean>(isInitialLoad);
  const heroSectionRef = useRef(null);

  const handlePreloaderComplete = () => {
    setLoaderAnimating(false);
  };

  return (
    <div className="relative">
      <Preloader onAnimationComplete={handlePreloaderComplete} />

      <div
        className={`transition-opacity duration-75 ${
          loaderAnimating ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="pointer-events-none fixed inset-0 z-0">
          <SplineBackground scene={SPLINE_SCENE} />
        </div>

        <header className="fixed inset-x-0 top-0 z-20">
          <Navbar
            brand={dict.hero.brand}
            letsTalk={dict.hero.letsTalk}
            menu={dict.hero.menu}
            menuContent={menuContent}
          />
        </header>

        <main ref={heroSectionRef} className="relative z-10">
          {/* Opening — over the shared Spline scene */}
          <Hero content={dict.hero} />
          <PainPoints content={dict.painPoints} />
          <CommunicationAsset content={dict.communicationAsset} />
          <Transformation content={dict.transformation} />
          <Decision content={dict.decision} />
          <Worth content={dict.worth} />
          <PreparingFor content={dict.preparingSection} />
          <Assessment content={dict.assessment} />

          {/* The real problem — confidence over expertise */}
          <About content={dict.about} />
          <KeyFacts content={dict.keyFacts} />

          {/* The offer */}
          <Sprint content={dict.sprint} />
          <Investment content={dict.investment} />
          <WhyIsidore content={dict.whyIsidore} />

          {/* The journey */}
          {/* <HowItWorks content={dict.howItWorks} /> */}
          <SelectedWork content={dict.selectedWork} />

          {/* Masterclass + the big idea */}
          <Masterclass content={dict.masterclass} />
          <div className="relative bg-[#0b0b0d]">
            <Spiral content={dict.spiral} />
          </div>

          <Footer locale={locale} content={dict.footer} />
        </main>
      </div>
    </div>
  );
}

export default NewFunnelFlow;
