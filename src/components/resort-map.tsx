"use client";

import { useEffect, useRef } from "react";

/**
 * MapLibre wrapper with a custom winter style. Loads maplibre-gl dynamically
 * (no cost when the map isn't rendered). If NEXT_PUBLIC_MAPTILER_KEY is
 * absent, the caller should render the contour fallback instead.
 */
export function ResortMap({
  lat,
  lng,
  label,
  zoom = 11,
}: {
  lat: number;
  lng: number;
  label: string;
  zoom?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const key = process.env.NEXT_PUBLIC_MAPTILER_KEY;

  useEffect(() => {
    if (!ref.current || !key) return;
    let map: { remove: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const M = await import("maplibre-gl");
      if (cancelled || !ref.current) return;
      const winterStyle: string = `https://api.maptiler.com/maps/winter/style.json?key=${key}`;
      const m = new M.Map({
        container: ref.current,
        style: winterStyle,
        center: [lng, lat],
        zoom,
        attributionControl: { compact: true },
      });
      m.addControl(new M.NavigationControl({ visualizePitch: true }), "top-right");
      // Dawn-accent pin: minimal DOM marker.
      const el = document.createElement("div");
      el.style.width = "14px";
      el.style.height = "14px";
      el.style.borderRadius = "999px";
      el.style.background = "#D98436";
      el.style.border = "2px solid white";
      el.style.boxShadow = "0 1px 4px rgba(14,22,32,0.25)";
      new M.Marker({ element: el }).setLngLat([lng, lat]).addTo(m);
      map = m;
    })().catch((err) => {
      // Fail quietly — the fallback panel keeps the page usable.
      console.error("[map] load failed", err);
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [lat, lng, zoom, key]);

  if (!key) {
    return (
      <div
        role="img"
        aria-label={label}
        className="contour flex h-64 items-center justify-center rounded-lg border border-line text-small text-snow"
      >
        Map preview available with MAPTILER_KEY
      </div>
    );
  }

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className="h-64 w-full rounded-lg border border-line bg-glacier"
    />
  );
}
