import { getDictionary, Locale } from "@/app/i18n";
import FunnelFlow from "@/components/funnel/FunnelFlow";

async function FunnelPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.locale);

  return (
    <div>
      <FunnelFlow dict={dict} />
    </div>
  );
}

export default FunnelPage;
