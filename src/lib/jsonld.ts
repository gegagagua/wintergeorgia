import { localeUrl, siteUrl } from "./site";
import type { Locale } from "@/i18n/routing";

type Json = Record<string, unknown>;

export function organizationLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "georgiawinter",
    url: siteUrl(),
    logo: `${siteUrl()}/favicon.svg`,
    sameAs: [],
  };
}

export function webSiteLd(locale: Locale): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "georgiawinter",
    url: localeUrl(locale, "/"),
    inLanguage: locale,
    publisher: { "@type": "Organization", name: "georgiawinter" },
  };
}

export function breadcrumbLd(
  locale: Locale,
  items: { name: string; path: string }[],
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: localeUrl(locale, item.path),
    })),
  };
}

export function touristAttractionLd({
  locale,
  slug,
  name,
  description,
  image,
  lat,
  lng,
}: {
  locale: Locale;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  lat?: number;
  lng?: number;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name,
    description,
    image,
    url: localeUrl(locale, `/resorts/${slug}`),
    ...(lat !== undefined && lng !== undefined
      ? { geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng } }
      : {}),
  };
}

export function productWithOfferLd({
  locale,
  slug,
  name,
  description,
  priceGel,
  ratingCount,
}: {
  locale: Locale;
  slug: string;
  name: string;
  description?: string;
  priceGel: number;
  ratingCount?: number;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: localeUrl(locale, `/transfers/${slug}`),
    brand: { "@type": "Brand", name: "georgiawinter" },
    offers: {
      "@type": "Offer",
      priceCurrency: "GEL",
      price: priceGel.toFixed(2),
      availability: "https://schema.org/InStock",
      url: localeUrl(locale, `/transfers/${slug}`),
    },
    ...(ratingCount
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: ratingCount,
          },
        }
      : {}),
  };
}

export function eventLd({
  locale,
  slug,
  name,
  description,
  startsAt,
  endsAt,
  placeName,
  addressLocality,
  priceGel,
  ticketUrl,
  image,
}: {
  locale: Locale;
  slug: string;
  name: string;
  description?: string;
  startsAt: string;
  endsAt?: string;
  placeName: string;
  addressLocality: string;
  priceGel?: number;
  ticketUrl?: string;
  image?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description,
    startDate: startsAt,
    endDate: endsAt ?? startsAt,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: placeName,
      address: {
        "@type": "PostalAddress",
        addressLocality,
        addressCountry: "GE",
      },
    },
    image,
    url: localeUrl(locale, `/events/${slug}`),
    ...(priceGel !== undefined
      ? {
          offers: {
            "@type": "Offer",
            price: priceGel.toFixed(2),
            priceCurrency: "GEL",
            url: ticketUrl,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
    organizer: { "@type": "Organization", name: "georgiawinter" },
  };
}

export function newsArticleLd({
  locale,
  slug,
  headline,
  description,
  image,
  datePublished,
  author,
}: {
  locale: Locale;
  slug: string;
  headline: string;
  description?: string;
  image?: string;
  datePublished: string;
  author: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline,
    description,
    image,
    datePublished,
    dateModified: datePublished,
    author: { "@type": "Person", name: author },
    publisher: {
      "@type": "Organization",
      name: "georgiawinter",
      logo: { "@type": "ImageObject", url: `${siteUrl()}/favicon.svg` },
    },
    mainEntityOfPage: localeUrl(locale, `/journal/${slug}`),
  };
}

export function faqLd(items: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}
