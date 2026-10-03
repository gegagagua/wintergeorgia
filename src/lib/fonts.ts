import { Noto_Sans_Georgian, Noto_Serif_Georgian } from "next/font/google";

/**
 * Self-hosted through next/font. Only the two weights actually used are loaded
 * (docs/03-seo.md — Core Web Vitals).
 * - Sans: 300 (light for wordmark), 400 (body), 500, 600, 700.
 * - Serif: 600 (display/H1/H2).
 */
export const sans = Noto_Sans_Georgian({
  subsets: ["latin", "georgian"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sans-georgian",
  preload: true,
});

export const serif = Noto_Serif_Georgian({
  subsets: ["latin", "georgian"],
  weight: ["600"],
  display: "swap",
  variable: "--font-noto-serif-georgian",
  preload: true,
});
