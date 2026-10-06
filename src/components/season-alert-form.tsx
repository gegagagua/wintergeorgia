"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";

type Props = {
  resort?: string;
  tone?: "light" | "dark";
};

const strings = {
  en: {
    placeholder: "Your email",
    cta: "Notify me",
    sending: "…",
    ok: "Subscribed. We will email you the day the lifts turn.",
    err: "Something went wrong. Try again.",
    privacy: "Double opt-in. Unsubscribe any time.",
  },
  ru: {
    placeholder: "Ваш email",
    cta: "Сообщить",
    sending: "…",
    ok: "Готово. Напишем в день открытия подъёмников.",
    err: "Что-то не так. Попробуйте снова.",
    privacy: "Двойное подтверждение. Отписка в один клик.",
  },
  ka: {
    placeholder: "თქვენი ელ-ფოსტა",
    cta: "შემატყობინე",
    sending: "…",
    ok: "მზადაა. შემოგატყობინებთ გახსნის დღეს.",
    err: "შეცდომა. სცადეთ თავიდან.",
    privacy: "ორმაგი დასტური. ერთ კლიკში გაუქმდება.",
  },
};

/**
 * Preseason capture form. Writes a `topics: ['season-opening']` subscription
 * via the existing /api/subscribe endpoint so the admin inbox is one list.
 */
export function SeasonAlertForm({ resort, tone = "light" }: Props) {
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
          topics: ["season-opening"],
          resort,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { message?: string };
      setResult({ ok: res.ok, message: body.message ?? (res.ok ? t.ok : t.err) });
      if (res.ok) setEmail("");
    });
  };

  const dark = tone === "dark";

  return (
    <form onSubmit={submit} className="grid gap-2 sm:flex sm:gap-2">
      <Input
        type="email"
        placeholder={t.placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={
          dark
            ? "min-w-0 flex-1 border-white/20 bg-white/5 text-snow placeholder:text-white/50"
            : "min-w-0 flex-1"
        }
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
        <p className={dark ? "text-small text-white/55 sm:basis-full" : "text-small text-ink-muted sm:basis-full"}>
          {t.privacy}
        </p>
      )}
    </form>
  );
}
