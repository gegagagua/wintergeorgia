import Image from "next/image";
import type { ResortSlug } from "@/content/types";
import { resortImages } from "@/lib/images";

/**
 * Card header for a resort. Uses a curated real photograph with a subtle
 * bottom fade so the card body text stays legible and a soft top shade
 * for any overlaid meta labels.
 */
export function ResortThumb({ slug }: { slug: ResortSlug }) {
  const img = resortImages[slug];
  return (
    <div className="relative -mx-5 -mt-5 h-44 overflow-hidden rounded-t-lg border-b border-line bg-glacier">
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="gw-zoom object-cover"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/25 to-transparent" />
    </div>
  );
}
