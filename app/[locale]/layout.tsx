import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import { Archivo } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { hasLocale, locales, type Locale } from "@/app/i18n";
import SmoothScroll from "@/components/new-funnel/reusable/SmoothScroll";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "CompetitivIA — Executive Product Experience",
  description: "Découvrez ce que votre communication dit vraiment.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale as Locale}
      className={`${geistSans.variable} ${cormorant.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full text-ink">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
