"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { Select } from "@/components/ui/form";

const categories = ["all", "season-opening", "party", "competition", "festival", "family"];
const resortSlugs = ["all", "gudauri", "bakuriani", "tetnuldi", "hatsvali", "goderdzi", "kazbegi"];
const views = ["list", "month"];

export function EventFilters({ current }: { current: { resort: string; category: string; view: string } }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === "all") next.delete(key);
    else next.set(key, value);
    router.replace(`${pathname}?${next.toString()}` as never, { scroll: false });
  };

  const url = useMemo(() => `?${params.toString()}`, [params]);
  void url;

  return (
    <div className="mb-6 flex flex-wrap items-end gap-3 rounded-lg border border-line bg-surface p-4">
      <label className="text-small">
        <span className="mb-1 block text-ink-muted">Resort</span>
        <Select value={current.resort} onChange={(e) => setParam("resort", e.target.value)}>
          {resortSlugs.map((s) => <option key={s} value={s}>{s}</option>)}
        </Select>
      </label>
      <label className="text-small">
        <span className="mb-1 block text-ink-muted">Category</span>
        <Select value={current.category} onChange={(e) => setParam("category", e.target.value)}>
          {categories.map((s) => <option key={s} value={s}>{s}</option>)}
        </Select>
      </label>
      <label className="text-small">
        <span className="mb-1 block text-ink-muted">View</span>
        <Select value={current.view} onChange={(e) => setParam("view", e.target.value)}>
          {views.map((s) => <option key={s} value={s}>{s}</option>)}
        </Select>
      </label>
    </div>
  );
}
