"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

export function SubscribeForm({ compact = false }: { compact?: boolean }) {
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
          locales: ["en"],
          topics: ["snow", "road", "events"],
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { message?: string };
      setResult({ ok: res.ok, message: body.message ?? (res.ok ? "Sent." : "Try again.") });
      if (res.ok) setEmail("");
    });
  };

  return (
    <form onSubmit={submit} className={compact ? "flex gap-2" : "grid gap-2 sm:flex sm:gap-2"}>
      <Input
        type="email"
        placeholder="Email for the weekly bulletin"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="min-w-0 flex-1 bg-white/5 border-white/20 text-snow placeholder:text-white/50"
      />
      <Button type="submit" variant="cta" disabled={pending}>
        {pending ? "…" : "Subscribe"}
      </Button>
      {result ? (
        <p className={result.ok ? "text-small text-status-open sm:basis-full" : "text-small text-status-closed sm:basis-full"}>
          {result.message}
        </p>
      ) : null}
    </form>
  );
}
