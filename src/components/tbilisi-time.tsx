"use client";

import { useEffect, useState } from "react";

/**
 * Live Tbilisi (Asia/Tbilisi) clock. Renders "—:—" on the server so
 * hydration matches, then swaps to the real value and updates every
 * 30 seconds. Uses tabular numerals so digits don't jitter.
 */
export function TbilisiTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string>("--:--");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Tbilisi",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(now),
      );
      setDate(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Tbilisi",
          weekday: "short",
          day: "numeric",
          month: "short",
        }).format(now),
      );
    };
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning className={className}>
      <span aria-hidden="true" className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-status-open align-middle" />
      <span className="tabular text-snow">{time}</span>
      <span className="ml-1.5 text-white/45">Tbilisi</span>
      {date ? <span className="ml-2 hidden text-white/40 md:inline">· {date}</span> : null}
    </span>
  );
}
