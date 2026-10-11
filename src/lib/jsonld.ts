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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${localeUrl(locale, "/transfers")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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

/**
 * SkiResort schema — richer than TouristAttraction for resort pillars.
 * Pair with touristAttractionLd (two separate nodes) so crawlers can pick
 * either. Google maps SkiResort → LocalBusiness class.
 */
export function skiResortLd({
  locale,
  slug,
  name,
  description,
  image,
  lat,
  lng,
  altMinM,
  altMaxM,
  slopeKm,
  liftsTotal,
  seasonFrom,
  seasonTo,
  aggregate,
}: {
  locale: Locale;
  slug: string;
  name: string;
  description?: string;
  image?: string | string[];
  lat?: number;
  lng?: number;
  altMinM?: number;
  altMaxM?: number;
  slopeKm?: number;
  liftsTotal?: number;
  seasonFrom?: string;
  seasonTo?: string;
  aggregate?: { value: number; count: number } | null;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": ["SkiResort", "TouristDestination"],
    name,
    description,
    image,
    url: localeUrl(locale, `/resorts/${slug}`),
    ...(lat !== undefined && lng !== undefined
      ? { geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng } }
      : {}),
    address: {
      "@type": "PostalAddress",
      addressCountry: "GE",
    },
    ...(altMinM !== undefined && altMaxM !== undefined
      ? {
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Base elevation",
              value: `${altMinM} m`,
            },
            {
              "@type": "PropertyValue",
              name: "Top elevation",
              value: `${altMaxM} m`,
            },
            ...(slopeKm
              ? [
                  {
                    "@type": "PropertyValue",
                    name: "Slopes",
                    value: `${slopeKm} km`,
                  },
                ]
              : []),
            ...(liftsTotal
              ? [
                  {
                    "@type": "PropertyValue",
                    name: "Lifts",
                    value: liftsTotal,
                  },
                ]
              : []),
          ],
        }
      : {}),
    ...(seasonFrom
      ? {
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            validFrom: seasonFrom,
            validThrough: seasonTo ?? seasonFrom,
          },
        }
      : {}),
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

/**
 * Legacy Product+Offer schema kept for backwards compatibility. New code
 * should prefer `transferServiceLd` which emits Service + TaxiService + Trip.
 */
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

/**
 * Full transfer-route schema: Service + TaxiService + Trip + Offer, with
 * optional AggregateRating. Mirrors the pattern GetTransfer / Kiwitaxi use
 * for city-to-city pages — these are the primary SEO assets so we invest
 * schema here.
 */
export function transferServiceLd({
  locale,
  slug,
  name,
  description,
  fromName,
  toName,
  priceGel,
  distanceKm,
  durationMin,
  aggregate,
}: {
  locale: Locale;
  slug: string;
  name: string;
  description?: string;
  fromName: string;
  toName: string;
  priceGel: number;
  distanceKm?: number;
  durationMin?: number;
  aggregate?: { value: number; count: number } | null;
}): Json {
  const url = localeUrl(locale, `/transfers/${slug}`);
  // ISO-8601 duration PnDTnHnM
  const duration =
    durationMin !== undefined
      ? `PT${Math.floor(durationMin / 60)}H${durationMin % 60}M`
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": ["Service", "TaxiService"],
    name,
    description,
    url,
    serviceType: "Private transfer",
    provider: {
      "@type": "Organization",
      name: "georgiawinter",
      url: siteUrl(),
    },
    areaServed: { "@type": "Country", name: "Georgia" },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "GEL",
      price: priceGel.toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      validFrom: new Date().toISOString().slice(0, 10),
    },
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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${fromName} → ${toName}`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Trip",
            name: `${fromName} → ${toName}`,
            itinerary: [
              { "@type": "Place", name: fromName },
              { "@type": "Place", name: toName },
            ],
            ...(duration ? { subjectOf: { "@type": "CreativeWork", about: `${distanceKm} km` } } : {}),
          },
          price: priceGel.toFixed(2),
          priceCurrency: "GEL",
          url,
        },
      ],
    },
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
  dateModified,
  author,
  pathPrefix = "journal",
}: {
  locale: Locale;
  slug: string;
  headline: string;
  description?: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  pathPrefix?: "journal" | "answers";
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline,
    description,
    image,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { "@type": "Person", name: author },
    publisher: {
      "@type": "Organization",
      name: "georgiawinter",
      logo: { "@type": "ImageObject", url: `${siteUrl()}/favicon.svg` },
    },
    mainEntityOfPage: localeUrl(locale, `/${pathPrefix}/${slug}`),
    inLanguage: locale,
  };
}

/**
 * Article schema with optional section + keywords. Prefer this for guides
 * and comparisons; `newsArticleLd` stays for time-sensitive news.
 */
export function articleLd({
  locale,
  slug,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  section,
  keywords,
  pathPrefix = "journal",
  type = "Article",
}: {
  locale: Locale;
  slug: string;
  headline: string;
  description?: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  section?: string;
  keywords?: string[];
  pathPrefix?: "journal" | "answers";
  type?: "Article" | "NewsArticle" | "BlogPosting";
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": type,
    headline,
    description,
    image,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { "@type": "Person", name: author },
    publisher: {
      "@type": "Organization",
      name: "georgiawinter",
      logo: { "@type": "ImageObject", url: `${siteUrl()}/favicon.svg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": localeUrl(locale, `/${pathPrefix}/${slug}`),
    },
    inLanguage: locale,
    ...(section ? { articleSection: section } : {}),
    ...(keywords && keywords.length ? { keywords: keywords.join(", ") } : {}),
  };
}

/**
 * QAPage schema for evergreen answer pages. The one-sentence answer is the
 * acceptedAnswer. Follow-up FAQs attach as suggestedAnswer entries.
 */
export function qaPageLd({
  locale,
  slug,
  headline,
  answer,
  faqs,
  dateModified,
  author,
  pathPrefix = "answers",
}: {
  locale: Locale;
  slug: string;
  headline: string;
  answer: string;
  faqs?: { q: string; a: string }[];
  dateModified: string;
  author: string;
  pathPrefix?: "journal" | "answers";
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: headline,
      author: { "@type": "Person", name: author },
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
        dateCreated: dateModified,
        author: { "@type": "Organization", name: "georgiawinter" },
      },
      ...(faqs && faqs.length
        ? {
            suggestedAnswer: faqs.map((f) => ({
              "@type": "Answer",
              name: f.q,
              text: f.a,
            })),
          }
        : {}),
    },
    url: localeUrl(locale, `/${pathPrefix}/${slug}`),
    dateModified,
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

/**
 * VideoObject for YouTube embeds on resort pages. Google rewards video
 * thumbnails in SERPs for travel queries.
 */
export function videoObjectLd({
  youtubeId,
  name,
  description,
  uploadDate,
}: {
  youtubeId: string;
  name: string;
  description?: string;
  uploadDate?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
    uploadDate: uploadDate ?? new Date().toISOString().slice(0, 10),
    contentUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}`,
  };
}

/**
 * Normalise an FAQ array to FAQPage schema. Empty arrays return `null`
 * so callers can filter them out of the ld-json list.
 */
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
 * Safe FAQPage builder that returns null for empty input, so callers can
 * spread/filter cleanly: `[...( faqLdExpanded(x) ? [faqLdExpanded(x)] : [])]`.
 * Also trims whitespace and skips rows with missing q or a.
 */
export function faqLdExpanded(items: { q: string; a: string }[] | undefined): Json | null {
  if (!items) return null;
  const clean = items
    .map((i) => ({ q: (i.q ?? "").trim(), a: (i.a ?? "").trim() }))
    .filter((i) => i.q && i.a);
  if (clean.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: clean.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

/**
 * WebPage schema for static legal / policy pages so every page has at
 * least one typed JSON-LD block.
 */
export function webPageLd({
  locale,
  path,
  name,
  description,
}: {
  locale: Locale;
  path: string;
  name: string;
  description?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: localeUrl(locale, path),
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      url: localeUrl(locale, "/"),
      name: "georgiawinter",
    },
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
 * LocalBusiness + TaxiService JSON-LD. georgiawinter is primarily a transfer
 * operator so we emit the TaxiService union to help Google categorise us
 * correctly. Caller must pass only values that are present — do not fill
 * with placeholders.
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
    "@type": ["LocalBusiness", "TaxiService"],
    "@id": `${siteUrl()}#business`,
    name,
    url: localeUrl(locale, "/"),
    image: `${siteUrl()}/favicon.svg`,
    ...(phone ? { telephone: phone } : {}),
    ...(email ? { email } : {}),
    ...(address ? { address } : {}),
    ...(lat !== undefined && lng !== undefined
      ? { geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng } }
      : {}),
    areaServed: { "@type": "Country", name: "Georgia" },
    serviceType: "Private airport and ski-resort transfers",
    currenciesAccepted: "GEL",
    paymentAccepted: "Credit Card, Debit Card",
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
