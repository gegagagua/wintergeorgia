import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@/components/analytics";
import { AttributionCapture } from "@/components/attribution-capture";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { themeInitScript } from "@/components/theme-toggle";
import { organizationLd, webSiteLd, localBusinessLd } from "@/lib/jsonld";
import { company } from "@/config/company";
import { aggregateRating } from "@/config/reviews";
import { sans, serif } from "@/lib/fonts";
import { siteUrl } from "@/lib/site";
import { routing, isRtl, type Locale } from "@/i18n/routing";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  const path = locale === routing.defaultLocale ? "/" : `/${locale}`;
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: t("name"), template: `%s — ${t("name")}` },
    description: t("tagline"),
    applicationName: "georgiawinter",
    alternates: {
      canonical: path,
      languages: {
        en: "/",
        ru: "/ru",
        ka: "/ka",
        he: "/he",
        "x-default": "/",
      },
    },
    openGraph: {
      title: t("name"),
      description: t("tagline"),
      url: path,
      siteName: "georgiawinter",
      locale,
      type: "website",
      images: [`/api/og/home?locale=${locale}`],
    },
    twitter: {
      card: "summary_large_image",
      title: t("name"),
      description: t("tagline"),
      images: [`/api/og/home?locale=${locale}`],
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }
  const typedLocale = locale as Locale;
  setRequestLocale(typedLocale);
  const messages = await getMessages();

  return (
    <html
      lang={typedLocale}
      dir={isRtl(typedLocale) ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationLd(),
              webSiteLd(typedLocale),
              localBusinessLd({
                locale: typedLocale,
                name: company.tradingName,
                phone: company.contacts.phone,
                email: company.contacts.email,
                streetAddress: company.registeredAddress?.[typedLocale] ?? null,
                addressLocality: "Tbilisi",
                countryCode: "GE",
                priceRange: "₾₾",
                aggregate: aggregateRating(),
              }),
            ]),
          }}
        />
      </head>
      <body className="bg-bg text-ink antialiased">
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-accent focus:px-3 focus:py-2 focus:text-white"
            >
              Skip to content
            </a>
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Analytics />
          <AttributionCapture />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
