"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { ResortVideo } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

type Props = {
  videos: ResortVideo[];
  locale: Locale;
  className?: string;
};

/**
 * Lite YouTube embed: thumbnail + play button, only loads the iframe when
 * clicked. Keeps CWV healthy; honours prefers-reduced-motion.
 */
export function ResortVideos({ videos, locale, className }: Props) {
  const [playing, setPlaying] = useState<Set<string>>(new Set());

  if (videos.length === 0) return null;

  return (
    <div className={cn("grid gap-5 md:grid-cols-2 lg:grid-cols-3", className)}>
      {videos.map((v) => {
        const isPlaying = playing.has(v.youtubeId);
        return (
          <figure
            key={v.youtubeId}
            className="flex flex-col overflow-hidden rounded-xl border border-line bg-surface"
          >
            <div className="relative aspect-video bg-black/80">
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={v.title[locale]}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setPlaying((prev) => {
                      const next = new Set(prev);
                      next.add(v.youtubeId);
                      return next;
                    })
                  }
                  className="group absolute inset-0 flex items-center justify-center"
                  aria-label={v.title[locale]}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-[0_12px_30px_-10px_rgba(217,132,54,0.65)] transition-transform duration-200 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                    <Play className="h-7 w-7 translate-x-[2px]" strokeWidth={2} fill="currentColor" />
                  </span>
                </button>
              )}
            </div>
            <figcaption className="flex flex-1 flex-col p-4">
              <h3 className="font-serif text-[18px] leading-[26px]">{v.title[locale]}</h3>
              {v.description?.[locale] ? (
                <p className="mt-1.5 text-small leading-[1.5] text-ink-muted">
                  {v.description[locale]}
                </p>
              ) : null}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
