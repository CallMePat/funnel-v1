import type { Locale } from "@/app/i18n";
import type { DictShape } from "@/app/i18n/dictionaries/fr";
import Hero from "./hero/Hero";
import About from "./about/About";
import HowItWorks from "./how-it-works/HowItWorks";
import Footer from "./footer/footer";
import Preloader from "./loader/Preloader";

interface NewFunnelFlowProps {
  dict: DictShape;
  locale: Locale;
}

function NewFunnelFlow({ dict }: NewFunnelFlowProps) {
  return (
    <div>
      <Preloader />
      <Hero
        content={dict.newFunnel.hero}
        menu={{
          ...dict.newFunnel.menu,
          enquiry: dict.newFunnel.footer.enquiry,
          social: dict.newFunnel.footer.social,
        }}
      />
      <About content={dict.newFunnel.about} />
      <HowItWorks content={dict.newFunnel.howItWorks} />
      <Footer content={dict.newFunnel.footer} />
    </div>
  );
}

export default NewFunnelFlow;
