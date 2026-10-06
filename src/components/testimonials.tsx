"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Review } from "@/config/reviews";

const AUTO_MS = 6000;

const strings = {
  en: {
    kicker: "From the guests",
    titleWithRating: (count: number, avg: number) =>
      `${count} verified reviews · ${avg.toFixed(1)} average`,
    titleWithoutRating: "Reviews are published once the booking is complete",
    emptyBody:
      "We only publish reviews tied to a real booking. Nothing invented, nothing bought. Numbers appear below five reviews — the aggregate rating stays hidden until we have five.",
    prev: "Previous",
    next: "Next",
    goto: (n: number) => `Go to slide ${n}`,
  },
  ru: {
    kicker: "От гостей",
    titleWithRating: (count: number, avg: number) =>
      `${count} проверенных отзыва · ${avg.toFixed(1)} в среднем`,
    titleWithoutRating: "Отзывы публикуются после завершённой поездки",
    emptyBody:
      "Публикуем только отзывы, привязанные к реальному бронированию. Ничего придуманного, ничего купленного. Пока отзывов меньше пяти — средняя оценка скрыта.",
    prev: "Назад",
    next: "Вперёд",
    goto: (n: number) => `Слайд ${n}`,
  },
  ka: {
    kicker: "სტუმრებისგან",
    titleWithRating: (count: number, avg: number) =>
      `${count} შემოწმებული შეფასება · საშუალო ${avg.toFixed(1)}`,
    titleWithoutRating: "შეფასებები ქვეყნდება მოგზაურობის დასრულების შემდეგ",
    emptyBody:
      "ვაქვეყნებთ მხოლოდ ნამდვილ ჯავშანთან მიბმულ შეფასებებს. არაფერი მოგონილი, არაფერი ნაყიდი. ხუთ შეფასებამდე საშუალო ქულა იმალება.",
    prev: "უკან",
    next: "წინ",
    goto: (n: number) => `სლაიდი ${n}`,
  },
};

/**
 * Real-only review carousel. If `reviews` is empty, we render an honest
 * empty state (no fake quotes). The aggregate line only appears once the
 * owner has approved ≥5 reviews — enforced here *and* in reviews.ts.
 */
export function Testimonials({
  reviews,
  rating,
  locale = "en",
}: {
  reviews: Review[];
  rating: { value: number; count: number } | null;
  locale?: "en" | "ru" | "ka";
}) {
  const s = strings[locale];
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reviews.length <= 1) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % reviews.length), AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, reviews.length]);

  if (reviews.length === 0) {
    return (
      <section className="site-container py-16">
        <p className="text-small text-primary">{s.kicker}</p>
        <h2 className="mt-1 font-serif text-[28px] leading-[36px] md:text-[32px] md:leading-[40px]">
          {s.titleWithoutRating}
        </h2>
        <p className="mt-4 max-w-prose text-ink-muted">{s.emptyBody}</p>
      </section>
    );
  }

  return (
    <section
      className="site-container py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-small text-primary">{s.kicker}</p>
          <h2 className="mt-1 font-serif text-[28px] leading-[36px] md:text-[32px] md:leading-[40px]">
            {rating
              ? s.titleWithRating(rating.count, rating.value)
              : s.titleWithoutRating}
          </h2>
        </div>
        {reviews.length > 1 ? (
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              aria-label={s.prev}
              onClick={() => setI((v) => (v - 1 + reviews.length) % reviews.length)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-line text-ink hover:border-primary-hover"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              aria-label={s.next}
              onClick={() => setI((v) => (v + 1) % reviews.length)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-line text-ink hover:border-primary-hover"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        ) : null}
      </div>

      <div className="relative overflow-hidden rounded-lg border border-line bg-surface">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {reviews.map((r) => (
            <article key={r.id} className="w-full shrink-0 p-6 md:p-10">
              <div className="mb-4 flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="h-4 w-4"
                    fill={idx < r.rating ? "currentColor" : "none"}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <blockquote className="font-serif text-[22px] leading-[32px] text-ink md:text-[26px] md:leading-[36px]">
                &ldquo;{r.body}&rdquo;
              </blockquote>
              <div className="mt-6 text-small text-ink-muted">
                <span className="text-ink">{r.authorFirstName}</span>
                {r.authorOrigin ? ` · ${r.authorOrigin}` : ""}
                <span className="mx-2 tabular">·</span>
                <span className="tabular">
                  {new Date(r.travelDate).toLocaleDateString("en-GB", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="mx-2 tabular">·</span>
                <span className="tabular">ref {r.bookingRef}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {reviews.length > 1 ? (
        <div className="mt-4 flex justify-center gap-2">
          {reviews.map((_, idx) => (
            <button
              type="button"
              key={idx}
              aria-label={s.goto(idx + 1)}
              aria-current={i === idx ? "true" : undefined}
              onClick={() => setI(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                i === idx ? "w-6 bg-accent" : "w-1.5 bg-line hover:bg-primary/60",
              )}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
