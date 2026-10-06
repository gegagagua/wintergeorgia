import type { ResortSlug } from "./types";

export type Webcam = {
  slug: string;
  resort: ResortSlug;
  name: string;
  /** Public URL. We prefer link-out + attribution over hotlinking a frame. */
  url: string;
  /** Static preview image, only when the source allows embedding. */
  previewImage?: string;
  attribution: string;
  attributionUrl?: string;
  /** If true, we render a direct iframe. Default false (link-out only). */
  canEmbed?: boolean;
  elevationM?: number;
  /** Last known good check — the dashboard updates this manually. */
  lastCheckedAt?: string;
};

/**
 * TODO(owner): confirm the attribution block of every webcam source and
 * whether embedding is allowed. Default is link-out — do NOT flip
 * canEmbed to true without written permission from the operator.
 */
export const webcams: Webcam[] = [
  {
    slug: "gudauri-sadzele-top",
    resort: "gudauri",
    name: "Sadzele top station",
    url: "https://gudauri.com/webcam/sadzele",
    attribution: "Gudauri resort",
    attributionUrl: "https://gudauri.com",
    canEmbed: false,
    elevationM: 2600,
  },
  {
    slug: "gudauri-base",
    resort: "gudauri",
    name: "Gudauri base",
    url: "https://gudauri.com/webcam/base",
    attribution: "Gudauri resort",
    attributionUrl: "https://gudauri.com",
    canEmbed: false,
    elevationM: 2000,
  },
  {
    slug: "bakuriani-didveli",
    resort: "bakuriani",
    name: "Didveli slope",
    url: "https://bakuriani.ge/webcam/didveli",
    attribution: "Bakuriani Development Agency",
    attributionUrl: "https://bakuriani.ge",
    canEmbed: false,
    elevationM: 2200,
  },
  // TODO(owner): add tetnuldi, hatsvali, goderdzi, kazbegi webcams once
  // URLs are confirmed with the operators.
];

export function webcamsByResort(slug: ResortSlug) {
  return webcams.filter((w) => w.resort === slug);
}
