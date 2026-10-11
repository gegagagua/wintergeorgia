"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ResortImage } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

type Props = {
  images: ResortImage[];
  locale: Locale;
  heroPriority?: boolean;
  className?: string;
};

export function GallerySlider({ images, locale, heroPriority, className }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [open, setOpen] = useState<number | null>(null);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-slide]");
    const step = first ? first.offsetWidth + 16 : el.clientWidth * 0.9;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

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
      <div className={cn("relative", className)}>
        <div
          ref={trackRef}
          className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2"
        >
          {images.map((img, i) => (
            <button
              key={img.src + i}
              type="button"
              data-slide
              onClick={() => setOpen(i)}
              className="group relative aspect-[4/3] w-[82%] shrink-0 snap-start overflow-hidden rounded-xl border border-line sm:w-[48%] md:w-[32%] lg:w-[28%]"
              aria-label={img.caption?.[locale] ?? `Open photo ${i + 1}`}
            >
              <Image
                src={img.src}
                alt={img.caption?.[locale] ?? ""}
                fill
                sizes="(max-width: 640px) 82vw, (max-width: 1024px) 48vw, 28vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                priority={heroPriority && i === 0}
              />
              {img.caption?.[locale] ? (
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3 text-left text-small text-snow">
                  {img.caption[locale]}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        {canPrev ? (
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous"
            className="absolute left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/90 text-ink shadow-lg backdrop-blur transition-opacity duration-150 hover:bg-surface md:inline-flex"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
        ) : null}
        {canNext ? (
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Next"
            className="absolute right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/90 text-ink shadow-lg backdrop-blur transition-opacity duration-150 hover:bg-surface md:inline-flex"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>
        ) : null}
      </div>

      {open !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
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
            className="absolute right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-snow hover:bg-white/20"
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
            <p className="mt-1 text-small text-snow/50 tabular">
              {open + 1} / {images.length}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
