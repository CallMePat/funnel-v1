"use client";

import type { Locale } from "@/app/i18n";
import type { DictShape } from "@/app/i18n/dictionaries/fr";
import Hero from "./hero/Hero";
import Navbar from "./hero/Navbar";
import SplineBackground from "./hero/SplineBackground";
import Spiral from "./spiral/Spiral";
import About from "./about/About";
import KeyFacts from "./key-facts/KeyFacts";
import SelectedWork from "./selected-work/SelectedWork";
import Footer from "./footer/footer";
import { useRef, useState } from "react";
import Preloader, { isInitialLoad } from "./Preloader/Preloader";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SPLINE_SCENE =
  "https://prod.spline.design/gQTzOsb39iXQFw09/scene.splinecode";

type NewFunnelContent = DictShape["newFunnel"];

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
  // const heroImgRef = useRef(null);
  // const heroHeaderRef = useRef(null);
  const heroSectionRef = useRef(null);

  const handlePreloaderComplete = () => {
    setLoaderAnimating(false);
  };

  // useGSAP(() => {
  //   if (!heroImgRef.current || !heroHeaderRef.current) return;

  //   gsap.set(heroImgRef.current, { y: 500 });
  //   // gsap.to(heroImgRef.current, {
  //   //   y: 0,
  //   //   duration: 0.75,
  //   //   ease: "power3.out",
  //   //   // delay: isInitialLoad ? 1.75 : 0,
  //   // });

  //   gsap.to(heroHeaderRef.current, {
  //     y: 10,
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: heroSectionRef.current,
  //       start: "top top",
  //       end: "bottom top",
  //       scrub: true,
  //     },
  //   });
  // });

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

        <Hero content={dict.hero} />
        <About content={dict.about} />

        <div className="relative z-30 bg-[#111110]">
          <KeyFacts content={dict.keyFacts} />
          <SelectedWork content={dict.selectedWork} />
          <Spiral content={dict.spiral} />

          <Footer locale={locale} content={dict.footer} />
        </div>
      </div>
    </div>
  );
}

export default NewFunnelFlow;
