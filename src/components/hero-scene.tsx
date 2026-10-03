/**
 * Cinematic hero scene v2. Layered peaks + sunset glow + aurora sky +
 * animated gondola + village lights + skier trails. Rich colours,
 * illustration-quality, single flat vector — no stock photos.
 *
 * The gondola cabin animates via a CSS keyframe defined in globals.css
 * (`gw-gondola`) — GPU-only translate along the dashed cable.
 */
export function HeroScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 620"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <defs>
        {/* Aurora sky — cool violet → pink → glacier */}
        <linearGradient id="hs-aurora" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4C1D95" stopOpacity="0.55" />
          <stop offset="35%" stopColor="#831843" stopOpacity="0.35" />
          <stop offset="70%" stopColor="#14323F" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0E1620" stopOpacity="0" />
        </linearGradient>
        {/* Warm sunset glow behind the highest ridge */}
        <radialGradient id="hs-sun" cx="50%" cy="70%" r="45%">
          <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.55" />
          <stop offset="30%" stopColor="#F59E0B" stopOpacity="0.35" />
          <stop offset="70%" stopColor="#D98436" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#D98436" stopOpacity="0" />
        </radialGradient>
        {/* Cool haze at bottom (valley mist) */}
        <linearGradient id="hs-mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5AAFD6" stopOpacity="0" />
          <stop offset="100%" stopColor="#5AAFD6" stopOpacity="0.18" />
        </linearGradient>
        {/* Snow-lit peak top */}
        <linearGradient id="hs-snow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2F5F7" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#F2F5F7" stopOpacity="0.15" />
        </linearGradient>
        <pattern id="hs-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.6" fill="#F2F5F7" opacity="0.5" />
        </pattern>
      </defs>

      {/* Aurora + sun stack */}
      <rect width="1600" height="620" fill="url(#hs-aurora)" />
      <ellipse cx="900" cy="380" rx="700" ry="220" fill="url(#hs-sun)" />
      {/* Sun disc */}
      <circle cx="900" cy="340" r="46" fill="#FCD34D" opacity="0.85" />
      <circle cx="900" cy="340" r="58" fill="none" stroke="#FCD34D" strokeWidth="1" opacity="0.35" />

      {/* Dot grid overlay */}
      <rect width="1600" height="620" fill="url(#hs-grid)" opacity="0.05" />

      {/* Distant ridge — palest, snowy top */}
      <path
        fill="#F2F5F7"
        opacity="0.14"
        d="M0 380 L120 320 L260 350 L400 280 L560 330 L720 260 L880 305 L1040 240 L1200 290 L1360 250 L1520 300 L1600 275 L1600 620 L0 620 Z"
      />
      {/* Snow highlight on peaks (distant) */}
      <path
        fill="url(#hs-snow)"
        opacity="0.6"
        d="M400 280 L440 288 L480 296 L400 312 Z M720 260 L760 268 L800 276 L720 292 Z M1040 240 L1080 248 L1120 256 L1040 272 Z M1360 250 L1400 258 L1440 266 L1360 282 Z"
      />

      {/* Mid ridge (warmer plum tint from aurora) */}
      <path
        fill="#3B1D4E"
        opacity="0.55"
        d="M0 440 L110 380 L230 410 L360 320 L490 380 L620 300 L760 360 L900 280 L1040 350 L1190 300 L1340 360 L1490 310 L1600 340 L1600 620 L0 620 Z"
      />
      {/* Sun-catching stroke on the top ridge */}
      <path
        d="M620 300 L760 360 L900 280 L1040 350"
        fill="none"
        stroke="#FDBA74"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.95"
      />

      {/* Gondola cable across the mid ridge */}
      <line
        x1="620" y1="302" x2="1040" y2="352"
        stroke="#F2F5F7" strokeWidth="0.9" opacity="0.55" strokeDasharray="3 3"
      />
      {/* Static gondola tower stubs */}
      <line x1="620" y1="302" x2="620" y2="320" stroke="#F2F5F7" strokeWidth="1" opacity="0.4" />
      <line x1="1040" y1="352" x2="1040" y2="368" stroke="#F2F5F7" strokeWidth="1" opacity="0.4" />

      {/* Animated gondola cabin (translates along the cable) */}
      <g className="gw-gondola-1">
        <g transform="translate(0, 0)">
          <rect x="-8" y="0" width="16" height="10" rx="2" fill="#F59E0B" />
          <line x1="0" y1="-6" x2="0" y2="0" stroke="#F2F5F7" strokeWidth="0.8" />
          <rect x="-6" y="2" width="12" height="2" fill="#0E1620" opacity="0.35" />
        </g>
      </g>
      <g className="gw-gondola-2">
        <g transform="translate(0, 0)">
          <rect x="-8" y="0" width="16" height="10" rx="2" fill="#EC4899" opacity="0.9" />
          <line x1="0" y1="-6" x2="0" y2="0" stroke="#F2F5F7" strokeWidth="0.8" />
          <rect x="-6" y="2" width="12" height="2" fill="#0E1620" opacity="0.35" />
        </g>
      </g>

      {/* Near ridge — deep glacier with contour line */}
      <path
        fill="#0F2432"
        opacity="0.82"
        d="M0 500 L100 440 L220 470 L340 400 L470 450 L600 380 L730 440 L860 380 L990 440 L1130 400 L1270 450 L1410 410 L1540 445 L1600 430 L1600 620 L0 620 Z"
      />
      <path
        d="M0 500 L100 440 L220 470 L340 400 L470 450 L600 380 L730 440 L860 380 L990 440 L1130 400 L1270 450 L1410 410 L1540 445 L1600 430"
        fill="none"
        stroke="#5AAFD6"
        strokeWidth="1"
        opacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Valley mist */}
      <rect x="0" y="480" width="1600" height="140" fill="url(#hs-mist)" />

      {/* Foreground tree silhouettes */}
      <g fill="#0B1219" opacity="0.55">
        {[80, 130, 200, 270, 340, 900, 970, 1040, 1360, 1440, 1520].map((x, i) => (
          <path key={i} d={`M${x} 570 L${x - 8} 596 L${x + 8} 596 Z M${x} 582 L${x - 12} 600 L${x + 12} 600 Z`} />
        ))}
      </g>

      {/* Village — warm lit windows nestled in the valley */}
      <g>
        <rect x="720" y="558" width="14" height="12" fill="#FCD34D" opacity="0.9" />
        <rect x="738" y="562" width="10" height="8" fill="#F59E0B" opacity="0.85" />
        <rect x="754" y="556" width="16" height="14" fill="#FCD34D" opacity="0.9" />
        <rect x="774" y="563" width="8" height="7" fill="#F59E0B" opacity="0.85" />
        <rect x="786" y="559" width="12" height="11" fill="#FDBA74" opacity="0.9" />
        {/* chalet roofs */}
        <path d="M718 558 L727 550 L736 558 Z" fill="#0E1620" opacity="0.9" />
        <path d="M752 556 L762 546 L772 556 Z" fill="#0E1620" opacity="0.9" />
        <path d="M784 559 L792 552 L800 559 Z" fill="#0E1620" opacity="0.9" />
      </g>

      {/* Winding road — dawn dashed line, thicker for presence */}
      <path
        d="M-20 590 C 200 560, 340 600, 480 560 S 780 530, 900 555 S 1200 520, 1360 545 S 1600 555, 1620 550"
        fill="none"
        stroke="#F2F5F7"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.12"
      />
      <path
        d="M-20 590 C 200 560, 340 600, 480 560 S 780 530, 900 555 S 1200 520, 1360 545 S 1600 555, 1620 550"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="10 8"
        opacity="0.8"
      />

      {/* Minivan on the road */}
      <g transform="translate(430, 550) rotate(-4)">
        <path
          d="M0 0 L4 -12 L18 -16 L54 -16 L64 -10 L72 -4 L72 4 L68 6 L64 5 C63 1 59 -2 55 -2 C51 -2 47 1 46 5 L24 5 C23 1 19 -2 15 -2 C11 -2 7 1 6 5 L2 5 L0 0 Z"
          fill="#F59E0B"
        />
        <path d="M12 -12 L28 -14 L42 -14 L58 -12 L42 -10 L28 -10 Z" fill="#0E1620" opacity="0.45" />
        <line x1="8" y1="-16" x2="60" y2="-18" stroke="#F2F5F7" strokeWidth="0.8" opacity="0.7" />
        <circle cx="15" cy="6" r="3" fill="#0E1620" />
        <circle cx="55" cy="6" r="3" fill="#0E1620" />
        <circle cx="66" cy="-6" r="1.2" fill="#FCD34D" opacity="0.9" />
      </g>

      {/* Distant skier trail on a slope */}
      <g>
        <path
          d="M1140 400 C 1160 440, 1180 470, 1200 505"
          fill="none"
          stroke="#F2F5F7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="2 3"
          opacity="0.7"
        />
        <g className="gw-skier">
          <circle cx="1140" cy="400" r="2.4" fill="#F2F5F7" />
          <path d="M1138 402 L1142 402" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" />
        </g>
      </g>

      {/* Aurora-tinted decorative snowflakes at various depths */}
      <g fill="#F2F5F7">
        <circle cx="120" cy="140" r="1.4" opacity="0.7" />
        <circle cx="360" cy="80" r="1" opacity="0.6" />
        <circle cx="520" cy="220" r="1.2" opacity="0.75" />
        <circle cx="820" cy="120" r="0.9" opacity="0.6" />
        <circle cx="1080" cy="200" r="1.4" opacity="0.8" />
        <circle cx="1280" cy="60" r="1" opacity="0.6" />
        <circle cx="1420" cy="180" r="1.1" opacity="0.7" />
        <circle cx="220" cy="300" r="1" opacity="0.55" />
        <circle cx="700" cy="240" r="0.9" opacity="0.5" />
        <circle cx="1180" cy="320" r="1.2" opacity="0.7" />
      </g>
    </svg>
  );
}
