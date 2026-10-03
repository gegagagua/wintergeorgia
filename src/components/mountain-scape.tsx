/**
 * Layered mountain silhouettes for hero backgrounds. Three depth layers +
 * a distant snow ridge line drawn on top. Flat colors only (no gradients);
 * depth comes from opacity + stroke variation.
 */
export function MountainScape({
  className,
  variant = "wide",
}: {
  className?: string;
  variant?: "wide" | "compact";
}) {
  const h = variant === "wide" ? 460 : 320;
  return (
    <svg
      viewBox={`0 0 1600 ${h}`}
      preserveAspectRatio="none"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="ms-grid"
          x="0"
          y="0"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="0.6" fill="currentColor" opacity="0.5" />
        </pattern>
      </defs>

      {/* Subtle dot grid across the whole scene */}
      <rect
        width="1600"
        height={h}
        fill="url(#ms-grid)"
        opacity="0.06"
      />

      {/* Far ridge — palest */}
      <path
        fill="currentColor"
        opacity="0.10"
        d={`M0 ${h - 190} L120 ${h - 240} L260 ${h - 210} L400 ${h - 260} L560 ${h - 220} L720 ${h - 265} L880 ${h - 215} L1040 ${h - 255} L1200 ${h - 220} L1360 ${h - 250} L1520 ${h - 220} L1600 ${h - 235} L1600 ${h} L0 ${h} Z`}
      />

      {/* Middle ridge */}
      <path
        fill="currentColor"
        opacity="0.20"
        d={`M0 ${h - 130} L110 ${h - 170} L230 ${h - 145} L360 ${h - 200} L490 ${h - 155} L620 ${h - 205} L760 ${h - 160} L900 ${h - 200} L1040 ${h - 165} L1190 ${h - 195} L1340 ${h - 170} L1490 ${h - 200} L1600 ${h - 180} L1600 ${h} L0 ${h} Z`}
      />

      {/* Near ridge — darkest, with a subtle contour line */}
      <path
        fill="currentColor"
        opacity="0.32"
        d={`M0 ${h - 70} L100 ${h - 120} L220 ${h - 90} L340 ${h - 150} L470 ${h - 100} L600 ${h - 160} L730 ${h - 105} L860 ${h - 155} L990 ${h - 110} L1130 ${h - 150} L1270 ${h - 115} L1410 ${h - 145} L1540 ${h - 120} L1600 ${h - 130} L1600 ${h} L0 ${h} Z`}
      />
      <path
        d={`M0 ${h - 70} L100 ${h - 120} L220 ${h - 90} L340 ${h - 150} L470 ${h - 100} L600 ${h - 160} L730 ${h - 105} L860 ${h - 155} L990 ${h - 110} L1130 ${h - 150} L1270 ${h - 115} L1410 ${h - 145} L1540 ${h - 120} L1600 ${h - 130}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />

      {/* Single dawn accent stroke — sun catching the top ridge */}
      <path
        d={`M340 ${h - 150} L470 ${h - 100} L600 ${h - 160}`}
        fill="none"
        stroke="#D98436"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
