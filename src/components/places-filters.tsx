"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { Select, Input } from "@/components/ui/form";

const categories = [
  "all",
  "paragliding",
  "quad",
  "snowmobile",
  "tubing",
  "horse-riding",
  "heliski",
  "bar",
  "restaurant",
  "apres",
  "spa",
  "ski-school",
  "rental",
];

export function PlacesFilters({ category, q }: { category: string; q: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    router.replace((qs ? `${pathname}?${qs}` : pathname) as never, { scroll: false });
  };

  return (
    <div className="mb-6 flex flex-wrap items-end gap-3 rounded-lg border border-line bg-surface p-4">
      <label className="text-small">
        <span className="mb-1 block text-ink-muted">Category</span>
        <Select value={category} onChange={(e) => setParam("category", e.target.value)}>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </Select>
      </label>
      <label className="min-w-[240px] flex-1 text-small">
        <span className="mb-1 block text-ink-muted">Search</span>
        <Input value={q} onChange={(e) => setParam("q", e.target.value)} placeholder="Name, tag or phone…" />
      </label>
    </div>
  );
}
