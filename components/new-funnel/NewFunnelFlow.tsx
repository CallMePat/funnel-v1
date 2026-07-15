import type { Locale } from "@/app/i18n";
import type { DictShape } from "@/app/i18n/dictionaries/fr";
import Footer from "./footer/footer";

interface NewFunnelFlowProps {
  dict: DictShape;
  locale: Locale;
}

function NewFunnelFlow({ dict, locale }: NewFunnelFlowProps) {
  return (
    <div>
      <Footer locale={locale} content={dict.footer.newFunnel} />
    </div>
  );
}

export default NewFunnelFlow;
