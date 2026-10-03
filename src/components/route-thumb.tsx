import Image from "next/image";
import type { RouteSlug } from "@/content/types";
import { routeImages } from "@/lib/images";

/**
 * Photo header for a transfer route card. Uses the curated route imagery
 * with a dark glacier gradient at the top for legibility of any overlaid
 * labels (distance / duration).
 */
export function RouteThumb({ slug }: { slug: RouteSlug }) {
  const img = routeImages[slug];
  return (
    <div className="relative -mx-5 -mt-5 h-40 overflow-hidden rounded-t-lg border-b border-line bg-glacier">
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="gw-zoom object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/10" />
    </div>
  );
}
