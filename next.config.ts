import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Permanent 301 for every QA slug that used to live under /journal. Keeps the
// indexing we already earned. Any new QA slug should be added here as soon as
// it is created in content-pages.ts.
const QA_SLUGS = [
  "is-jvari-pass-open",
  "do-i-need-snow-chains-georgia",
  "tbilisi-to-gudauri-how-to-get-there",
  "how-much-is-taxi-tbilisi-gudauri",
  "is-gudauri-open-today",
  "gudauri-lift-pass-price",
  "how-long-tbilisi-to-gudauri",
  "tbilisi-airport-night-arrival",
  "can-you-drive-to-gudauri-yourself",
  "how-to-get-to-mestia-in-winter",
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "plus.unsplash.com", pathname: "/**" },
    ],
  },
  experimental: {
    typedRoutes: true,
  },
  async redirects() {
    const redirects: Array<{
      source: string;
      destination: string;
      permanent: boolean;
    }> = [];
    for (const slug of QA_SLUGS) {
      redirects.push({
        source: `/journal/${slug}`,
        destination: `/answers/${slug}`,
        permanent: true,
      });
      for (const locale of ["ru", "ka"]) {
        redirects.push({
          source: `/${locale}/journal/${slug}`,
          destination: `/${locale}/answers/${slug}`,
          permanent: true,
        });
      }
    }
    return redirects;
  },
};

export default withNextIntl(nextConfig);
