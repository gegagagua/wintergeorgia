"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ResortImage } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

type Props = {
  images: ResortImage[];
  locale: Locale;
  heroPriority?: boolean;
  className?: string;
};

/**
 * Lightbox gallery for real owner-supplied photos. Renders AVIF/WebP via
 * next/image automatically. If `images` is empty, the parent component is
 * expected to render the contour illustration fallback instead.
 */
export function PhotoGallery({ images, locale, heroPriority, className }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, next, prev]);

  if (images.length === 0) return null;

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-2 gap-2 md:grid-cols-4",
          className,
        )}
      >
        {images.slice(0, 8).map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            onClick={() => setOpen(i)}
            className={cn(
              "group relative aspect-[4/3] overflow-hidden rounded-md border border-line",
              i === 0 ? "col-span-2 row-span-2 aspect-[16/10] md:col-span-2" : "",
            )}
            aria-label={img.caption?.[locale] ?? `Open photo ${i + 1}`}
          >
            <Image
              src={img.src}
              alt={img.caption?.[locale] ?? ""}
              fill
              sizes={i === 0 ? "(min-width:768px) 50vw, 100vw" : "(min-width:768px) 25vw, 50vw"}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              priority={heroPriority && i === 0}
            />
            {img.caption?.[locale] ? (
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-left text-small text-snow">
                {img.caption[locale]}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {open !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-snow hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
            className="absolute left-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-snow hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
            className="absolute right-4 bottom-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-snow hover:bg-white/20 md:bottom-auto md:right-4 md:top-1/2 md:-translate-y-1/2"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div
            className="relative mx-auto flex max-h-[88vh] max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[3/2] w-full max-w-5xl">
              <Image
                src={images[open]!.src}
                alt={images[open]!.caption?.[locale] ?? ""}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            {images[open]!.caption?.[locale] ? (
              <p className="mt-3 text-small text-snow/80">
                {images[open]!.caption?.[locale]}
                {images[open]!.credit ? ` · ${images[open]!.credit}` : ""}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
