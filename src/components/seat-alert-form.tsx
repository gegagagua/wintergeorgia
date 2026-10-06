"use client";

import { useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { Input } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const strings = {
  en: {
    placeholder: "Email for seat alerts",
    cta: "Alert me",
    sending: "…",
    ok: "Watching this route for seat availability.",
    err: "Something went wrong. Try again.",
    privacy: "One email per matching trip. Unsubscribe any time.",
  },
  ru: {
    placeholder: "Email для оповещений о местах",
    cta: "Оповестить",
    sending: "…",
    ok: "Следим за свободными местами на этот маршрут.",
    err: "Что-то не так. Попробуйте снова.",
    privacy: "Одно письмо на совпадающий рейс. Отписка — в один клик.",
  },
  ka: {
    placeholder: "ელ-ფოსტა ადგილების შეტყობინებისთვის",
    cta: "შემატყობინე",
    sending: "…",
    ok: "ვადევნებ ამ მარშრუტზე თავისუფალ ადგილებს.",
    err: "შეცდომა. სცადეთ თავიდან.",
    privacy: "ერთი იმეილი შესაფერის მოგზაურობაზე. ერთ კლიკში გაუქმდება.",
  },
};

/**
 * Seat-available alert for scheduled shuttle routes. Writes a
 * `topics: ['seat-available']` subscription against the current route.
 */
export function SeatAlertForm({ routeSlug }: { routeSlug: string }) {
  const locale = (useLocale() as "en" | "ru" | "ka") ?? "en";
  const t = strings[locale];
  const [email, setEmail] = useState("");
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel: "email",
          address: email,
          locales: [locale],
          topics: ["seat-available"],
          routeSlug,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { message?: string };
      setResult({ ok: res.ok, message: body.message ?? (res.ok ? t.ok : t.err) });
      if (res.ok) setEmail("");
    });
  };

  return (
    <form onSubmit={submit} className="grid gap-2 sm:flex sm:gap-2">
      <Input
        type="email"
        placeholder={t.placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="min-w-0 flex-1"
      />
      <Button type="submit" variant="cta" disabled={pending}>
        {pending ? t.sending : t.cta}
      </Button>
      {result ? (
        <p
          className={
            result.ok
              ? "text-small text-status-open sm:basis-full"
              : "text-small text-status-closed sm:basis-full"
          }
        >
          {result.message}
        </p>
      ) : (
        <p className="text-small text-ink-muted sm:basis-full">{t.privacy}</p>
      )}
    </form>
  );
}
