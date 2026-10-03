"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Ambient snow layer for the hero. Client-only so `Math.random()` doesn't
 * cause hydration mismatches. Respects prefers-reduced-motion (no drift).
 */
export function Snowflakes({ count = 24 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const flakes = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      left: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      delay: -Math.random() * 30,
      duration: 22 + Math.random() * 20,
      drift: -20 + Math.random() * 40,
      opacity: 0.35 + Math.random() * 0.45,
    }));
  }, [count]);

  if (!mounted) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {flakes.map((f, i) => (
        <span
          key={i}
          className="absolute top-[-10px] block rounded-full bg-white motion-reduce:hidden"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            animation: `gw-snow ${f.duration}s linear ${f.delay}s infinite`,
            "--gw-drift": `${f.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
