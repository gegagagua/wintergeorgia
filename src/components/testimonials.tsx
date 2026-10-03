"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/cn";

type Testimonial = {
  quote: string;
  name: string;
  origin: string;
  route: string;
  rating: number;
  hue: number; // for avatar background
};

const items: Testimonial[] = [
  {
    quote:
      "Driver waited at arrivals with a name sign despite my flight being late by 90 minutes. Winter tyres, chains, English. Best 40 GEL I have ever spent.",
    name: "Marta Kovač",
    origin: "Ljubljana",
    route: "TBS Airport → Gudauri · Sedan",
    rating: 5,
    hue: 20,
  },
  {
    quote:
      "Booked a minivan for six. Kids loved the ski rack outside, we loved the WhatsApp updates. Return leg fixed on the spot when weather changed.",
    name: "Yousef Al-Rashid",
    origin: "Dubai",
    route: "Tbilisi → Bakuriani · Minivan",
    rating: 5,
    hue: 200,
  },
  {
    quote:
      "The Jvari Pass closed the morning of my trip. I got a WhatsApp reschedule option within 20 minutes — zero drama, zero call centre.",
    name: "Anna Petrova",
    origin: "Saint Petersburg",
    route: "TBS Airport → Gudauri · Sedan",
    rating: 5,
    hue: 340,
  },
  {
    quote:
      "4x4 to Kazbegi with a driver who actually knew the mountain — showed me Gergeti Trinity as a bonus stop. Ten out of ten.",
    name: "Tom Whitfield",
    origin: "Manchester",
    route: "Gudauri → Kazbegi · 4x4 SUV",
    rating: 5,
    hue: 140,
  },
];

const AUTO_MS = 6000;

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % items.length), AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      className="site-container py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-small text-primary">From the guests</p>
          <h2 className="mt-1 font-serif text-[28px] leading-[36px] md:text-[32px] md:leading-[40px]">
            340+ trips a month, 4.9 average
          </h2>
        </div>
        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => setI((v) => (v - 1 + items.length) % items.length)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-line text-ink hover:border-primary-hover"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => setI((v) => (v + 1) % items.length)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-line text-ink hover:border-primary-hover"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-line bg-surface">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {items.map((t) => (
            <article key={t.name} className="w-full shrink-0 p-6 md:p-10">
              <div className="mb-4 flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className="h-4 w-4"
                    fill={s < t.rating ? "currentColor" : "none"}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <blockquote className="font-serif text-[22px] leading-[32px] text-ink md:text-[26px] md:leading-[36px]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <Avatar hue={t.hue} initials={initials(t.name)} />
                <div>
                  <p className="text-ink">{t.name} <span className="text-ink-muted">· {t.origin}</span></p>
                  <p className="text-small text-ink-muted tabular">{t.route}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {items.map((_, idx) => (
          <button
            type="button"
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={i === idx ? "true" : undefined}
            onClick={() => setI(idx)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-200",
              i === idx ? "w-6 bg-accent" : "w-1.5 bg-line hover:bg-primary/60",
            )}
          />
        ))}
      </div>
    </section>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");
}

function Avatar({ hue, initials }: { hue: number; initials: string }) {
  return (
    <div
      aria-hidden="true"
      style={{ background: `hsl(${hue} 30% 22%)`, color: `hsl(${hue} 40% 82%)` }}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-small font-medium"
    >
      {initials}
    </div>
  );
}
