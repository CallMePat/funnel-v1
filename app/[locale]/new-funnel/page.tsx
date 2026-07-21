import { getDictionary, Locale } from "@/app/i18n";
import FunnelFlow from "@/components/new-funnel/NewFunnelFlow";

async function NewFunnelPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.locale);

  return (
    <div>
      <FunnelFlow dict={dict.newFunnel} locale={resolvedParams.locale} />
    </div>
  );
}

export default NewFunnelPage;
