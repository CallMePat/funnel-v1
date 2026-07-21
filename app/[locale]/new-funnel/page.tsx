import { getDictionary, Locale } from "@/app/i18n";
import NewFunnelFlow from "@/components/new-funnel/NewFunnelFlow";

async function NewFunnelPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.locale);

  return (
    <div>
      <NewFunnelFlow dict={dict.newFunnel} locale={resolvedParams.locale} />
    </div>
  );
}

export default NewFunnelPage;
