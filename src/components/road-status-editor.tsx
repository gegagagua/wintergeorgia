"use client";

import { useState, useTransition } from "react";
import { Select } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";
import type { Status, Restriction } from "@/content/types";

export function RoadStatusEditor({
  slug,
  name,
  status,
  restriction,
  updatedAt,
}: {
  slug: string;
  name: string;
  status: Status;
  restriction: Restriction;
  updatedAt: string;
}) {
  const [currentStatus, setCurrentStatus] = useState<Status>(status);
  const [currentRestriction, setCurrentRestriction] = useState<Restriction>(restriction);
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState<string | null>(null);
  const [affected, setAffected] = useState<number | null>(null);

  const save = () => {
    startTransition(async () => {
      const res = await fetch("/api/admin/road-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roadSlug: slug, status: currentStatus, restriction: currentRestriction }),
      });
      if (res.ok) {
        const body = (await res.json()) as { bookingsAffected?: number };
        setSaved(new Date().toISOString());
        setAffected(body.bookingsAffected ?? 0);
      }
    });
  };

  return (
    <div className="rounded-lg border border-line bg-surface p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-serif text-[17px]">{name}</p>
          <p className="text-small text-ink-muted">Last change: {new Date(updatedAt).toLocaleString()}</p>
        </div>
        <StatusPill status={currentStatus} label={currentStatus} />
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <label className="text-small">
          <span className="block text-ink-muted">Status</span>
          <Select value={currentStatus} onChange={(e) => setCurrentStatus(e.target.value as Status)}>
            <option value="open">open</option>
            <option value="limited">limited</option>
            <option value="closed">closed</option>
          </Select>
        </label>
        <label className="text-small">
          <span className="block text-ink-muted">Restriction</span>
          <Select value={currentRestriction} onChange={(e) => setCurrentRestriction(e.target.value as Restriction)}>
            <option value="none">none</option>
            <option value="chains">chains</option>
            <option value="4x4_only">4x4 only</option>
            <option value="lorries_banned">lorries banned</option>
          </Select>
        </label>
        <Button onClick={save} disabled={pending} variant="primary">
          {pending ? "Saving…" : "Save"}
        </Button>
      </div>
      {saved ? (
        <p className="mt-3 text-small text-status-open">
          Saved. {affected && affected > 0 ? `${affected} booking${affected === 1 ? "" : "s"} refunded automatically.` : "No affected bookings."}
        </p>
      ) : null}
    </div>
  );
}
