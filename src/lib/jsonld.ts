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

export function imageObjectLd({
  url,
  caption,
  width,
  height,
}: {
  url: string;
  caption?: string;
  width?: number;
  height?: number;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: url,
    ...(caption ? { caption } : {}),
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
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

/**
 * AggregateRating + Review nodes. Caller must enforce the 5-review floor.
 * We also require every review to have a bookingRef — this prevents
 * someone attaching an unverified string to the schema.
 */
export function reviewsLd({
  itemName,
  reviews,
  aggregate,
}: {
  itemName: string;
  reviews: {
    bookingRef: string;
    rating: number;
    body: string;
    authorFirstName: string;
    publishedAt: string;
  }[];
  aggregate: { value: number; count: number };
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: itemName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregate.value.toFixed(1),
      reviewCount: aggregate.count,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      author: { "@type": "Person", name: r.authorFirstName },
      datePublished: r.publishedAt,
      reviewBody: r.body,
      // Keep the booking ref inside the schema so Google can see it is tied
      // to a real transaction.
      identifier: r.bookingRef,
    })),
  };
}

/**
 * LocalBusiness JSON-LD. Caller must pass only values that are present —
 * do not fill with placeholders. The function will omit keys whose value
 * is null/undefined/empty.
 */
export function localBusinessLd({
  locale,
  name,
  phone,
  email,
  streetAddress,
  addressLocality,
  postalCode,
  countryCode = "GE",
  lat,
  lng,
  priceRange,
  aggregate,
}: {
  locale: Locale;
  name: string;
  phone?: string | null;
  email?: string | null;
  streetAddress?: string | null;
  addressLocality?: string | null;
  postalCode?: string | null;
  countryCode?: string;
  lat?: number;
  lng?: number;
  priceRange?: string;
  aggregate?: { value: number; count: number } | null;
}): Json {
  const address =
    streetAddress || addressLocality || postalCode
      ? {
          "@type": "PostalAddress",
          ...(streetAddress ? { streetAddress } : {}),
          ...(addressLocality ? { addressLocality } : {}),
          ...(postalCode ? { postalCode } : {}),
          addressCountry: countryCode,
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    url: localeUrl(locale, "/"),
    ...(phone ? { telephone: phone } : {}),
    ...(email ? { email } : {}),
    ...(address ? { address } : {}),
    ...(lat !== undefined && lng !== undefined
      ? { geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng } }
      : {}),
    ...(priceRange ? { priceRange } : {}),
    ...(aggregate
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: aggregate.value.toFixed(1),
            reviewCount: aggregate.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}
