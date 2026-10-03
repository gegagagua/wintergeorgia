"use client";

import { useState, useTransition } from "react";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

export function PartnerApplicationForm() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      type: fd.get("type"),
      name: fd.get("name"),
      contactName: fd.get("contactName"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      notes: fd.get("notes"),
    };
    startTransition(async () => {
      const res = await fetch("/api/partners/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as { message?: string };
      setResult({ ok: res.ok, message: body.message ?? (res.ok ? "Received." : "Something went wrong.") });
    });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Partner type" htmlFor="type">
        <Select id="type" name="type" defaultValue="driver">
          <option value="driver">Driver</option>
          <option value="hotel">Hotel</option>
          <option value="rental">Rental shop</option>
          <option value="school">Ski school</option>
          <option value="venue">Venue (bar / restaurant)</option>
          <option value="organiser">Event organiser</option>
        </Select>
      </Field>
      <Field label="Business name" htmlFor="name"><Input id="name" name="name" required /></Field>
      <Field label="Contact name" htmlFor="contactName"><Input id="contactName" name="contactName" required /></Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Phone" htmlFor="phone"><Input id="phone" name="phone" type="tel" required /></Field>
        <Field label="Email" htmlFor="email"><Input id="email" name="email" type="email" required /></Field>
      </div>
      <Field label="Notes" htmlFor="notes"><Textarea id="notes" name="notes" rows={4} /></Field>
      <div className="flex items-center gap-4">
        <Button type="submit" variant="cta" disabled={pending}>{pending ? "Sending…" : "Apply"}</Button>
        {result ? (
          <p className={result.ok ? "text-small text-status-open" : "text-small text-status-closed"}>{result.message}</p>
        ) : null}
      </div>
    </form>
  );
}
