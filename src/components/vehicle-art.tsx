import type { VehicleClass } from "@/content/types";

/**
 * Side-view illustrations for the four transfer vehicle classes. Each has
 * a distinct silhouette (low sedan, tall boxy minivan, chunky high-clearance
 * SUV, shared multi-row van) plus a body colour and a winter detail — snow
 * on the roof, tail-light dot, headlight glow, or wheel chains.
 */
export function VehicleArt({
  type,
  className,
}: {
  type: VehicleClass;
  className?: string;
}) {
  switch (type) {
    case "shared":
      return <SharedArt className={className} />;
    case "sedan":
      return <SedanArt className={className} />;
    case "minivan":
      return <MinivanArt className={className} />;
    case "suv4x4":
      return <SuvArt className={className} />;
  }
}

/* ================================ SEDAN ================================
   Long hood, sloped rear roof line, trunk, low ground clearance, thin
   ski bag on the roof. Ice-blue body for identity vs the others.
   ====================================================================== */
function SedanArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 110" fill="none" className={className} role="img" aria-label="Sedan">
      {/* Ground line + shadow */}
      <ellipse cx="140" cy="98" rx="120" ry="4" fill="#0E1620" opacity="0.15" />

      {/* Ski bag on roof (thin cylinder) */}
      <rect x="60" y="30" width="140" height="6" rx="3" fill="#D98436" />
      <rect x="60" y="30" width="140" height="6" rx="3" fill="#0E1620" opacity="0.1" />
      <circle cx="200" cy="33" r="2" fill="#0E1620" opacity="0.4" />
      <circle cx="60" cy="33" r="2" fill="#0E1620" opacity="0.4" />

      {/* Body — long low sedan silhouette */}
      <path
        d="M22 84
           L34 62
           L58 46
           L104 40
           L172 40
           L212 46
           L246 62
           L262 76
           L262 88
           L254 92
           L228 91
           C 226 82, 218 76, 210 76
           C 202 76, 194 82, 192 91
           L 92 91
           C 90 82, 82 76, 74 76
           C 66 76, 58 82, 56 91
           L 30 92
           L 22 84 Z"
        fill="#2C7FA8"
      />
      {/* Snow line along the roof */}
      <path
        d="M60 40 L104 34 L172 34 L212 40"
        fill="none"
        stroke="#F2F5F7"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Windows */}
      <path d="M60 46 L108 42 L164 42 L206 48 L172 55 L108 55 Z" fill="#0E1620" opacity="0.5" />
      {/* Door line */}
      <line x1="128" y1="46" x2="128" y2="76" stroke="#0E1620" strokeWidth="0.8" opacity="0.35" />

      {/* Body highlight */}
      <path
        d="M22 84 L262 84"
        stroke="#3E97C4"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Headlight glow */}
      <circle cx="252" cy="72" r="4" fill="#FCD34D" opacity="0.9" />
      <circle cx="252" cy="72" r="7" fill="#FCD34D" opacity="0.25" />

      {/* Tail light */}
      <rect x="26" y="66" width="6" height="6" rx="1.5" fill="#DC2626" opacity="0.9" />

      {/* Wheels */}
      <Wheel cx={74} cy={91} r={13} />
      <Wheel cx={210} cy={91} r={13} />
    </svg>
  );
}

/* =============================== MINIVAN ================================
   Boxy front, tall long passenger cabin, three windows visible, ski rack
   loaded with skis. Dawn-accent body (this is the "most booked" model in
   the fleet — the warm colour rewards the visual hierarchy).
   ====================================================================== */
function MinivanArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 110" fill="none" className={className} role="img" aria-label="Minivan">
      <ellipse cx="140" cy="98" rx="120" ry="4" fill="#0E1620" opacity="0.15" />

      {/* Roof rack rails */}
      <line x1="42" y1="26" x2="232" y2="26" stroke="#0E1620" strokeWidth="1.5" opacity="0.65" />
      <line x1="42" y1="22" x2="232" y2="22" stroke="#0E1620" strokeWidth="1.5" opacity="0.4" />
      {/* Skis on rack */}
      <rect x="46" y="15" width="180" height="4" rx="1.5" fill="#D98436" />
      <rect x="46" y="15" width="180" height="1.5" fill="#0E1620" opacity="0.35" />
      {/* Ski tips */}
      <path d="M226 15 L232 17 L226 19 Z" fill="#0E1620" opacity="0.6" />

      {/* Body — tall, long minivan */}
      <path
        d="M18 86
           L24 44
           L44 34
           L60 30
           L206 30
           L232 42
           L256 56
           L262 68
           L262 88
           L252 92
           L232 91
           C 230 82, 222 76, 214 76
           C 206 76, 198 82, 196 91
           L 84 91
           C 82 82, 74 76, 66 76
           C 58 76, 50 82, 48 91
           L 28 92
           L 18 86 Z"
        fill="#D98436"
      />
      {/* Warm top highlight */}
      <path d="M60 30 L206 30" stroke="#F2A65A" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

      {/* Three big windows */}
      <path d="M50 42 L96 38 L96 60 L52 60 Z" fill="#0E1620" opacity="0.55" />
      <path d="M102 38 L154 38 L154 60 L102 60 Z" fill="#0E1620" opacity="0.55" />
      <path d="M160 38 L204 38 L226 50 L160 60 Z" fill="#0E1620" opacity="0.55" />

      {/* Reflection stripe on windows */}
      <line x1="60" y1="44" x2="220" y2="42" stroke="#F2F5F7" strokeWidth="0.6" opacity="0.65" />

      {/* Sliding door handle */}
      <rect x="120" y="72" width="16" height="3" rx="1" fill="#0E1620" opacity="0.4" />

      {/* Headlight glow */}
      <circle cx="252" cy="70" r="4.5" fill="#FCD34D" opacity="0.95" />
      <circle cx="252" cy="70" r="8" fill="#FCD34D" opacity="0.25" />

      {/* Tail light */}
      <rect x="22" y="66" width="6" height="8" rx="1.5" fill="#DC2626" opacity="0.9" />

      {/* Wheels */}
      <Wheel cx={66} cy={91} r={14} />
      <Wheel cx={214} cy={91} r={14} />
    </svg>
  );
}

/* =============================== 4x4 SUV ================================
   Tall body, high ground clearance (bigger wheel wells), rugged roof
   cargo box, chains on the wheels. Deep glacier body.
   ====================================================================== */
function SuvArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 110" fill="none" className={className} role="img" aria-label="4x4 SUV">
      <ellipse cx="140" cy="100" rx="120" ry="4" fill="#0E1620" opacity="0.15" />

      {/* Roof rack + cargo box */}
      <line x1="40" y1="22" x2="228" y2="22" stroke="#0E1620" strokeWidth="1.5" opacity="0.5" />
      <rect x="70" y="12" width="140" height="10" rx="2" fill="#0E1620" />
      <rect x="70" y="12" width="140" height="3" fill="#F2F5F7" opacity="0.35" />
      {/* Ski/board strap */}
      <line x1="100" y1="12" x2="100" y2="22" stroke="#D98436" strokeWidth="1.5" />
      <line x1="180" y1="12" x2="180" y2="22" stroke="#D98436" strokeWidth="1.5" />

      {/* Body — tall SUV, upright windshield */}
      <path
        d="M20 78
           L28 40
           L54 28
           L182 28
           L212 40
           L244 52
           L260 62
           L260 84
           L248 92
           L232 92
           C 230 82, 222 76, 212 76
           C 202 76, 194 82, 192 92
           L 88 92
           C 86 82, 78 76, 68 76
           C 58 76, 50 82, 48 92
           L 28 92
           L 20 78 Z"
        fill="#14323F"
      />
      {/* Ice highlight */}
      <path d="M54 28 L182 28" stroke="#2C7FA8" strokeWidth="2" strokeLinecap="round" opacity="0.65" />

      {/* Windows — upright */}
      <path d="M46 40 L110 34 L110 58 L50 58 Z" fill="#0E1620" opacity="0.55" />
      <path d="M116 34 L176 34 L200 46 L116 58 Z" fill="#0E1620" opacity="0.55" />
      <line x1="60" y1="42" x2="196" y2="40" stroke="#F2F5F7" strokeWidth="0.6" opacity="0.6" />

      {/* Fender-flare / off-road cue */}
      <path
        d="M48 92 C 48 78, 88 78, 88 92 Z"
        fill="#0B1219"
        opacity="0.6"
      />
      <path
        d="M192 92 C 192 78, 232 78, 232 92 Z"
        fill="#0B1219"
        opacity="0.6"
      />

      {/* Headlight */}
      <circle cx="252" cy="66" r="5" fill="#FCD34D" opacity="0.95" />
      <circle cx="252" cy="66" r="9" fill="#FCD34D" opacity="0.25" />
      {/* Tail light */}
      <rect x="24" y="62" width="6" height="10" rx="1.5" fill="#DC2626" opacity="0.9" />

      {/* Chunky wheels with visible snow chains (dashed outer ring) */}
      <ChainedWheel cx={68} cy={92} r={16} />
      <ChainedWheel cx={212} cy={92} r={16} />
    </svg>
  );
}

/* =============================== SHARED ================================
   Multi-row van, one seat highlighted through a window with a dawn seat
   icon. Neutral fog body — "any seat, any driver" identity.
   ====================================================================== */
function SharedArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 110" fill="none" className={className} role="img" aria-label="Shared seat">
      <ellipse cx="140" cy="98" rx="120" ry="4" fill="#0E1620" opacity="0.15" />

      {/* Roof rack */}
      <line x1="42" y1="26" x2="232" y2="26" stroke="#0E1620" strokeWidth="1.5" opacity="0.55" />

      {/* Body */}
      <path
        d="M18 86
           L24 46
           L42 36
           L60 32
           L210 32
           L232 42
           L256 56
           L262 68
           L262 88
           L252 92
           L232 91
           C 230 82, 222 76, 214 76
           C 206 76, 198 82, 196 91
           L 84 91
           C 82 82, 74 76, 66 76
           C 58 76, 50 82, 48 91
           L 28 92
           L 18 86 Z"
        fill="#6B7C89"
      />

      {/* Four smaller windows */}
      <path d="M48 44 L88 40 L88 60 L50 60 Z" fill="#0E1620" opacity="0.5" />
      <path d="M94 40 L138 40 L138 60 L94 60 Z" fill="#0E1620" opacity="0.5" />
      <path d="M144 40 L188 40 L188 60 L144 60 Z" fill="#0E1620" opacity="0.5" />
      <path d="M194 40 L216 40 L232 50 L194 60 Z" fill="#0E1620" opacity="0.5" />

      {/* Highlighted seat marker in the middle window */}
      <g transform="translate(116, 46)">
        <circle r="9" fill="#D98436" />
        <circle r="12" fill="#D98436" opacity="0.25" />
        <circle cy="-2" r="2.5" fill="#FFFFFF" opacity="0.95" />
        <path d="M-4 2 C -4 -1, 4 -1, 4 2 L 4 6 L -4 6 Z" fill="#FFFFFF" opacity="0.95" />
      </g>

      {/* Reflection stripe */}
      <line x1="60" y1="46" x2="220" y2="44" stroke="#F2F5F7" strokeWidth="0.6" opacity="0.55" />

      {/* Headlight */}
      <circle cx="252" cy="70" r="4.5" fill="#FCD34D" opacity="0.9" />
      <circle cx="252" cy="70" r="8" fill="#FCD34D" opacity="0.22" />
      {/* Tail light */}
      <rect x="22" y="66" width="6" height="8" rx="1.5" fill="#DC2626" opacity="0.85" />

      {/* Wheels */}
      <Wheel cx={66} cy={91} r={13} />
      <Wheel cx={214} cy={91} r={13} />
    </svg>
  );
}

function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill="#0B1219" />
      <circle cx={cx} cy={cy} r={r - 4} fill="none" stroke="#F2F5F7" strokeWidth="0.6" opacity="0.35" />
      <circle cx={cx} cy={cy} r={r / 3} fill="#3E97C4" opacity="0.7" />
    </>
  );
}

function ChainedWheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill="#0B1219" />
      {/* Chain visualisation */}
      <circle cx={cx} cy={cy} r={r + 1} fill="none" stroke="#F2A65A" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.9" />
      <circle cx={cx} cy={cy} r={r - 4} fill="none" stroke="#F2F5F7" strokeWidth="0.6" opacity="0.4" />
      <circle cx={cx} cy={cy} r={r / 3} fill="#D98436" opacity="0.85" />
    </>
  );
}
