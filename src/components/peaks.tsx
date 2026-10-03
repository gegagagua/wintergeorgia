import type { ResortSlug } from "@/content/types";

/**
 * Hand-drawn peak silhouettes per resort. One flat stroke, dawn accent,
 * runs across the top of hero sections. Deliberately minimal — draws the
 * mountain, not a photo of it.
 */

type Path = { d: string; label: string; peakXPct: number; peakLabel: string };

const paths: Record<ResortSlug, Path> = {
  gudauri: {
    d: "M0 130 L60 92 L110 108 L160 60 L200 78 L260 34 L320 66 L390 46 L460 82 L520 58 L580 92 L640 74 L700 100 L760 82 L820 116 L880 90 L960 118 L1024 100 L1024 200 L0 200 Z",
    label: "Gudauri ridge — Sadzele to Kudebi",
    peakXPct: 41,
    peakLabel: "Sadzele 3007m",
  },
  bakuriani: {
    d: "M0 140 L80 118 L140 128 L210 92 L270 118 L340 100 L410 122 L470 90 L540 118 L610 108 L680 130 L750 112 L820 126 L900 110 L1024 130 L1024 200 L0 200 Z",
    label: "Bakuriani ridge — Kokhta and Didveli",
    peakXPct: 46,
    peakLabel: "Kokhta 2270m",
  },
  tetnuldi: {
    d: "M0 148 L70 108 L130 128 L200 70 L260 96 L330 42 L400 68 L470 34 L540 76 L610 54 L680 96 L740 70 L820 102 L890 84 L960 116 L1024 100 L1024 200 L0 200 Z",
    label: "Tetnuldi ridge under Ushba",
    peakXPct: 47,
    peakLabel: "Tetnuldi 4858m",
  },
  hatsvali: {
    d: "M0 150 L90 128 L170 116 L250 132 L330 106 L410 130 L490 100 L560 128 L640 108 L720 130 L800 118 L880 132 L960 122 L1024 138 L1024 200 L0 200 Z",
    label: "Hatsvali ridge above Mestia",
    peakXPct: 49,
    peakLabel: "Zuruldi 2347m",
  },
  goderdzi: {
    d: "M0 150 L100 118 L170 132 L250 110 L330 130 L410 108 L490 130 L560 106 L640 132 L720 112 L790 132 L870 114 L950 130 L1024 118 L1024 200 L0 200 Z",
    label: "Goderdzi pass ridge",
    peakXPct: 41,
    peakLabel: "Goderdzi 2390m",
  },
  kazbegi: {
    d: "M0 160 L60 128 L120 148 L180 88 L240 118 L300 42 L340 20 L390 58 L460 42 L530 88 L600 62 L680 108 L740 84 L820 122 L900 100 L960 130 L1024 118 L1024 200 L0 200 Z",
    label: "Mkinvartsveri and the Chaukhi range",
    peakXPct: 32,
    peakLabel: "Kazbek 5033m",
  },
};

export function PeakArt({
  slug,
  className,
  showLabel = true,
}: {
  slug: ResortSlug;
  className?: string;
  showLabel?: boolean;
}) {
  const p = paths[slug];
  return (
    <svg
      viewBox="0 0 1024 200"
      preserveAspectRatio="none"
      className={className}
      role="img"
      aria-label={p.label}
    >
      <defs>
        <linearGradient id={`peak-fade-${slug}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path d={p.d} fill={`url(#peak-fade-${slug})`} />
      <path
        d={p.d.split("L").slice(0, -3).join("L")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      {showLabel ? (
        <g
          transform={`translate(${p.peakXPct * 10.24}, 32)`}
          fontFamily="ui-monospace, monospace"
          fontSize="10"
          fill="currentColor"
          opacity="0.8"
        >
          <line x1="0" y1="-14" x2="0" y2="0" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
          <circle cx="0" cy="0" r="1.5" fill="currentColor" />
          <text x="6" y="3">{p.peakLabel}</text>
        </g>
      ) : null}
    </svg>
  );
}
