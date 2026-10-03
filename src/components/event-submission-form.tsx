"use client";

import { useState, useTransition } from "react";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

export function EventSubmissionForm() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const startsAt = fd.get("startsAt") as string;
    const endsAt = (fd.get("endsAt") as string) || undefined;
    const ticketPriceGelRaw = fd.get("ticketPriceGel") as string;
    const payload = {
      title: fd.get("title"),
      body: fd.get("body"),
      resort: fd.get("resort"),
      category: fd.get("category"),
      startsAt: new Date(startsAt).toISOString(),
      endsAt: endsAt ? new Date(endsAt).toISOString() : undefined,
      ticketUrl: (fd.get("ticketUrl") as string) || undefined,
      ticketPriceGel: ticketPriceGelRaw ? Number(ticketPriceGelRaw) : undefined,
      organiserName: fd.get("organiserName"),
      organiserEmail: fd.get("organiserEmail"),
      organiserPhone: (fd.get("organiserPhone") as string) || undefined,
    };
    startTransition(async () => {
      const res = await fetch("/api/events/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as { message?: string; ok?: boolean };
      setResult({ ok: res.ok, message: body.message ?? (res.ok ? "Received." : "Something went wrong. Try again.") });
    });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Event title" htmlFor="title"><Input id="title" name="title" required minLength={4} maxLength={140} /></Field>
      <Field label="Description" htmlFor="body"><Textarea id="body" name="body" required minLength={20} rows={5} /></Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Resort" htmlFor="resort">
          <Select id="resort" name="resort" defaultValue="gudauri">
            <option value="gudauri">Gudauri</option>
            <option value="bakuriani">Bakuriani</option>
            <option value="tetnuldi">Tetnuldi</option>
            <option value="hatsvali">Hatsvali</option>
            <option value="goderdzi">Goderdzi</option>
            <option value="kazbegi">Kazbegi</option>
          </Select>
        </Field>
        <Field label="Category" htmlFor="category">
          <Select id="category" name="category" defaultValue="festival">
            <option value="party">Party</option>
            <option value="competition">Competition</option>
            <option value="festival">Festival</option>
            <option value="season-opening">Season opening</option>
            <option value="family">Family</option>
          </Select>
        </Field>
        <Field label="Starts at" htmlFor="startsAt"><Input id="startsAt" name="startsAt" type="datetime-local" required /></Field>
        <Field label="Ends at (optional)" htmlFor="endsAt"><Input id="endsAt" name="endsAt" type="datetime-local" /></Field>
        <Field label="Ticket price (₾, optional)" htmlFor="ticketPriceGel"><Input id="ticketPriceGel" name="ticketPriceGel" type="number" min={0} /></Field>
        <Field label="Ticket URL (optional)" htmlFor="ticketUrl"><Input id="ticketUrl" name="ticketUrl" type="url" placeholder="https://..." /></Field>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Organiser name" htmlFor="organiserName"><Input id="organiserName" name="organiserName" required /></Field>
        <Field label="Organiser email" htmlFor="organiserEmail"><Input id="organiserEmail" name="organiserEmail" type="email" required /></Field>
        <Field label="Organiser phone" htmlFor="organiserPhone"><Input id="organiserPhone" name="organiserPhone" type="tel" /></Field>
      </div>
      <div className="flex items-center gap-4">
        <Button type="submit" variant="cta" disabled={pending}>{pending ? "Sending…" : "Submit for moderation"}</Button>
        {result ? (
          <p className={result.ok ? "text-small text-status-open" : "text-small text-status-closed"}>{result.message}</p>
        ) : null}
      </div>
    </form>
  );
}
