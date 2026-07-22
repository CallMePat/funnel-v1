import { getDictionary, Locale } from "@/app/i18n";
import NewFunnelFlow from "@/components/new-funnel/NewFunnelFlow";
import { getNewFunnelContent } from "@/components/new-funnel/getNewFunnelContent";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.locale);
  return (
    <NewFunnelFlow
      dict={getNewFunnelContent(dict)}
      locale={resolvedParams.locale}
    />
  );
}
