/**
 * Curated Unsplash photo catalogue for georgiawinter surfaces.
 * IDs are stable Unsplash asset IDs. Alt text is descriptive so pages remain
 * accessible without JavaScript.
 *
 * All images are used under the Unsplash License (free to use, no attribution
 * required, no ML training / redistribution as the primary product).
 */

import type { ResortSlug, RouteSlug } from "@/content/types";

const U = (id: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const resortImages: Record<ResortSlug, { src: string; alt: string; blur?: string }> = {
  gudauri: {
    src: U("1551698618-1dfe5d97d256"),
    alt: "Snow-covered ridges of Gudauri with a lone skier",
  },
  bakuriani: {
    src: U("1517299321609-52687d1bc55a"),
    alt: "Chalet village at Bakuriani with snow-covered pines",
  },
  tetnuldi: {
    src: U("1483721310020-03333e577078"),
    alt: "Tetnuldi peak in Upper Svaneti at golden hour",
  },
  hatsvali: {
    src: U("1418985991508-e47386d96a71"),
    alt: "Wide alpine panorama near Mestia",
  },
  goderdzi: {
    src: U("1610901157620-340856d0a50f"),
    alt: "Fresh powder tracks across a Georgian slope",
  },
  kazbegi: {
    src: U("1519681393784-d120267933ba"),
    alt: "Mount Kazbek towering over Stepantsminda",
  },
};

export const routeImages: Record<RouteSlug, { src: string; alt: string }> = {
  "tbilisi-airport-gudauri": {
    src: "/routes/tbilisi-airport-gudauri.jpg",
    alt: "Georgian Military Road winding through the Caucasus toward Gudauri",
  },
  "tbilisi-gudauri": {
    src: "/routes/tbilisi-gudauri.jpg",
    alt: "Chair lifts and snowy slopes at Gudauri",
  },
  "tbilisi-bakuriani": {
    src: "/routes/tbilisi-bakuriani.jpg",
    alt: "Bakuriani resort village nestled below snowy forested mountains",
  },
  "tbilisi-kazbegi": {
    src: "/routes/tbilisi-kazbegi.jpg",
    alt: "Gergeti Trinity Church with snow-covered Mount Kazbek behind",
  },
  "gudauri-kazbegi": {
    src: "/routes/gudauri-kazbegi.jpg",
    alt: "Church at Gudauri backed by snow-covered Caucasus peaks",
  },
  "kutaisi-airport-mestia": {
    src: "/routes/kutaisi-airport-mestia.jpg",
    alt: "Mount Ushba above the Svaneti valley on the road to Mestia",
  },
  "zugdidi-mestia": {
    src: "/routes/zugdidi-mestia.jpg",
    alt: "Traditional Svan tower and mountain house in Upper Svaneti",
  },
  "mestia-tetnuldi": {
    src: "/routes/mestia-tetnuldi.jpg",
    alt: "Mestia village with cluster of Svan defensive towers",
  },
  "mestia-hatsvali": {
    src: "/routes/mestia-hatsvali.jpg",
    alt: "Chairlift climbing a snowy slope under a clear blue sky",
  },
  "batumi-goderdzi": {
    src: "/routes/batumi-goderdzi.jpg",
    alt: "Aerial view of a winding snowy road through a winter forest",
  },
  "tbilisi-airport-batumi": {
    src: "/routes/tbilisi-airport-batumi.jpg",
    alt: "Aerial view of Batumi's Black Sea coastline and skyline in winter",
  },
};

/** Bento gallery items — six evocative frames of a Georgian ski day. */
export const galleryImages = [
  {
    src: U("1551698618-1dfe5d97d256", 1600, 1100),
    alt: "Sunset run on Gudauri ridge",
    title: "Sunset run at Sadzele",
    meta: "Gudauri · March",
    href: "/resorts/gudauri",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: U("1610901157620-340856d0a50f"),
    alt: "Fresh powder morning",
    title: "Powder morning · Kudebi",
    meta: "Gudauri · February",
    href: "/snow-report",
    span: "md:col-span-1",
  },
  {
    src: U("1548704806-0c20f7f51e12"),
    alt: "Night lift running at Bakuriani",
    title: "Night lifts at 25",
    meta: "Bakuriani · January",
    href: "/resorts/bakuriani",
    span: "md:col-span-1",
  },
  {
    src: U("1517299321609-52687d1bc55a"),
    alt: "Snow-covered chalet village",
    title: "Chalet village · Mestia",
    meta: "Upper Svaneti",
    href: "/resorts/tetnuldi",
    span: "md:col-span-1",
  },
  {
    src: U("1478436127897-769e1538f1a2"),
    alt: "Gondola aerial view",
    title: "Gondola view · Tetnuldi",
    meta: "3,165 m top",
    href: "/resorts/tetnuldi",
    span: "md:col-span-1",
  },
  {
    src: U("1516466823543-8664a7dbfbd7", 1600, 800),
    alt: "Warm bar deck at the base of the mountain",
    title: "Après at Black Bar",
    meta: "Gudauri base",
    href: "/things-to-do/gudauri/gudauri-black-bar",
    span: "md:col-span-2",
  },
] as const;

/** How-it-works step imagery. */
export const stepImages = {
  route: {
    src: "/routes/tbilisi-airport-gudauri.jpg",
    alt: "A mountain road curving through snowy peaks",
  },
  vehicle: {
    src: "/fleet/shared.jpg",
    alt: "Passenger van parked by a snowy pine forest",
  },
  driver: {
    src: U("1521737604893-d14cc237f11d"),
    alt: "Driver holding a name sign at arrivals",
  },
} as const;

/** Fleet vehicle photos — real photography of each class. */
export const fleetImages: Record<"shared" | "sedan" | "minivan" | "suv4x4", { src: string; alt: string }> = {
  shared: {
    src: "/fleet/shared.jpg",
    alt: "White passenger shuttle van parked by a snowy pine forest",
  },
  sedan: {
    src: "/fleet/sedan.jpg",
    alt: "Side profile of a black executive sedan",
  },
  minivan: {
    src: "/fleet/minivan.jpg",
    alt: "Silver family minivan parked outside a cabin",
  },
  suv4x4: {
    src: "/fleet/suv4x4.jpg",
    alt: "White 4x4 SUV on a snowy mountain road during snowfall",
  },
};

/** Hero portrait / photograph. */
export const heroPhoto = {
  src: U("1483721310020-03333e577078", 2000, 1200),
  alt: "Snow-covered Caucasus peaks at first light",
};

/** Journal category header photos. */
export const journalCovers: Record<string, { src: string; alt: string }> = {
  news:            { src: U("1483450388369-9ed95738483c"), alt: "Snow mountains landscape" },
  price:           { src: U("1544198365-f5d60b6d8190"),   alt: "Ski slope with lifts" },
  alert:           { src: U("1520681279154-51b3fb4ea0f9"),   alt: "Warning sign on a mountain road" },
  infrastructure:  { src: U("1548704806-0c20f7f51e12"),  alt: "Ski lift construction" },
  event:           { src: U("1516466823543-8664a7dbfbd7"),   alt: "Winter festival evening" },
  guide:           { src: U("1610901157620-340856d0a50f"),   alt: "First tracks on fresh powder" },
};

/** Event category header photos. */
export const eventCovers: Record<string, { src: string; alt: string }> = {
  "season-opening": { src: U("1610901157620-340856d0a50f"), alt: "Opening day fresh tracks" },
  party:            { src: U("1516466823543-8664a7dbfbd7"), alt: "Night celebration on the mountain" },
  competition:      { src: U("1551524559-8af4e6624178"),  alt: "Freestyle competition slope" },
  festival:         { src: U("1548704806-0c20f7f51e12"),  alt: "Winter festival lights" },
  family:           { src: U("1517299321609-52687d1bc55a"),  alt: "Family day at the resort" },
};

/** Small placeholder we can render behind next/image while loading. */
export const shimmerDataUri =
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 30"><rect width="40" height="30" fill="#14323F"/></svg>`,
  ).toString("base64");
