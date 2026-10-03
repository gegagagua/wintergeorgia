/**
 * Full-colour illustrated scenes for the gallery. Rich gradients, atmospheric
 * palettes — each conveys a different moment of a ski day. All SVG (no
 * bitmaps) so they're crisp, tiny, and locale-independent.
 */

export function SunsetRunScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 340" className={className} preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="sr-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4C1D95" />
          <stop offset="40%" stopColor="#C13584" />
          <stop offset="75%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FCD34D" />
        </linearGradient>
        <radialGradient id="sr-sun" cx="70%" cy="55%" r="20%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="1" />
          <stop offset="60%" stopColor="#FCD34D" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FCD34D" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sr-snow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#F2F5F7" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect width="480" height="340" fill="url(#sr-sky)" />
      <circle cx="336" cy="188" r="46" fill="url(#sr-sun)" />
      <circle cx="336" cy="188" r="26" fill="#FEF08A" opacity="0.9" />
      {/* Far peaks */}
      <path d="M0 220 L60 180 L140 210 L220 160 L300 200 L380 170 L480 210 L480 340 L0 340 Z" fill="#3B0764" opacity="0.7" />
      {/* Mid peaks */}
      <path d="M0 250 L70 200 L160 240 L250 180 L340 230 L420 200 L480 240 L480 340 L0 340 Z" fill="#1E1B4B" opacity="0.85" />
      {/* Snow highlights */}
      <path d="M220 160 L245 170 L270 180 L220 195 Z M340 230 L365 240 L390 250 L340 260 Z" fill="url(#sr-snow)" opacity="0.7" />
      {/* Near slope */}
      <path d="M0 280 L120 230 L240 270 L360 220 L480 260 L480 340 L0 340 Z" fill="#0E1620" />
      {/* Skier trail */}
      <path d="M320 234 C 300 260, 280 290, 240 316" fill="none" stroke="#F2F5F7" strokeWidth="2" strokeDasharray="4 3" opacity="0.9" />
      <circle cx="320" cy="234" r="3.5" fill="#F2F5F7" />
      {/* Trees */}
      <g fill="#0B0B10">
        {[30, 80, 400, 450].map((x, i) => (
          <path key={i} d={`M${x} 300 L${x - 8} 322 L${x + 8} 322 Z M${x} 312 L${x - 12} 328 L${x + 12} 328 Z`} />
        ))}
      </g>
    </svg>
  );
}

export function PowderMorningScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 340" className={className} preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="pm-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="60%" stopColor="#7DD3FC" />
          <stop offset="100%" stopColor="#F0F9FF" />
        </linearGradient>
      </defs>
      <rect width="480" height="340" fill="url(#pm-sky)" />
      {/* Sun disc */}
      <circle cx="80" cy="80" r="34" fill="#FEF08A" opacity="0.9" />
      <circle cx="80" cy="80" r="42" fill="none" stroke="#FEF08A" strokeWidth="1" opacity="0.4" />
      {/* Distant peaks — blue tint */}
      <path d="M0 220 L80 150 L180 200 L260 130 L360 190 L440 160 L480 200 L480 340 L0 340 Z" fill="#0369A1" opacity="0.7" />
      {/* Sharp snow ridges */}
      <path d="M80 150 L110 160 L140 170 L80 195 Z M260 130 L290 140 L320 150 L260 175 Z" fill="#F0F9FF" opacity="0.9" />
      {/* Middle */}
      <path d="M0 260 L100 200 L200 250 L300 190 L400 240 L480 220 L480 340 L0 340 Z" fill="#075985" />
      {/* Foreground fresh powder */}
      <path d="M0 310 L120 275 L240 305 L360 270 L480 300 L480 340 L0 340 Z" fill="#F0F9FF" />
      {/* Fresh tracks */}
      <path d="M120 275 C 100 295, 80 320, 60 340" fill="none" stroke="#7DD3FC" strokeWidth="2" opacity="0.6" />
      <path d="M124 275 C 104 295, 84 320, 64 340" fill="none" stroke="#7DD3FC" strokeWidth="2" opacity="0.6" />
      {/* Snowflakes */}
      <g fill="#F0F9FF">
        {[[60,50],[180,90],[240,120],[380,60],[420,130],[100,140],[300,80]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 2 ? 2.4 : 1.6} opacity={0.85} />
        ))}
      </g>
    </svg>
  );
}

export function NightLiftsScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 340" className={className} preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="nl-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020617" />
          <stop offset="60%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <radialGradient id="nl-moon" cx="80%" cy="20%" r="10%">
          <stop offset="0%" stopColor="#F1F5F9" stopOpacity="1" />
          <stop offset="100%" stopColor="#F1F5F9" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="480" height="340" fill="url(#nl-sky)" />
      <circle cx="380" cy="70" r="60" fill="url(#nl-moon)" />
      <circle cx="380" cy="70" r="18" fill="#F1F5F9" opacity="0.95" />
      {/* Stars */}
      <g fill="#F1F5F9">
        {[[50,40],[130,70],[200,30],[290,90],[440,140],[60,110],[220,60]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.4 : 0.8} opacity={0.85} />
        ))}
      </g>
      {/* Peaks */}
      <path d="M0 220 L90 150 L180 200 L260 130 L360 200 L440 170 L480 210 L480 340 L0 340 Z" fill="#0F172A" />
      {/* Snow-lit peak tops */}
      <path d="M90 150 L115 160 L140 170 L90 195 Z M260 130 L285 140 L310 150 L260 175 Z" fill="#E2E8F0" opacity="0.5" />
      {/* Slope */}
      <path d="M0 280 L120 230 L240 270 L360 220 L480 260 L480 340 L0 340 Z" fill="#020617" />
      {/* Lift towers */}
      <g stroke="#F1F5F9" strokeWidth="1.5" opacity="0.6">
        <line x1="80" y1="290" x2="80" y2="250" />
        <line x1="200" y1="270" x2="200" y2="220" />
        <line x1="340" y1="240" x2="340" y2="195" />
      </g>
      {/* Cable */}
      <path d="M80 250 L200 220 L340 195" fill="none" stroke="#F1F5F9" strokeWidth="0.8" opacity="0.5" />
      {/* Illuminated chairs */}
      <g>
        <circle cx="140" cy="234" r="4" fill="#F59E0B" opacity="0.9" />
        <circle cx="140" cy="234" r="8" fill="#F59E0B" opacity="0.2" />
        <circle cx="270" cy="207" r="4" fill="#EC4899" opacity="0.9" />
        <circle cx="270" cy="207" r="8" fill="#EC4899" opacity="0.2" />
      </g>
      {/* Piste lights along the slope */}
      <g>
        {[[60,290],[160,265],[280,240],[400,225]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="10" fill="#FCD34D" opacity="0.18" />
            <circle cx={x} cy={y} r="2" fill="#FCD34D" opacity="0.95" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function ChaletVillageScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 340" className={className} preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="cv-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E1B4B" />
          <stop offset="60%" stopColor="#4C1D95" />
          <stop offset="100%" stopColor="#831843" />
        </linearGradient>
      </defs>
      <rect width="480" height="340" fill="url(#cv-sky)" />
      {/* Stars */}
      <g fill="#F1F5F9">
        {[[40,30],[90,60],[180,40],[260,80],[350,30],[420,90],[200,100]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.4 : 0.8} opacity={0.85} />
        ))}
      </g>
      {/* Peaks */}
      <path d="M0 200 L80 130 L180 180 L280 120 L380 180 L480 150 L480 340 L0 340 Z" fill="#0F172A" opacity="0.85" />
      <path d="M80 130 L110 145 L140 160 L80 180 Z M280 120 L310 135 L340 150 L280 170 Z" fill="#F0F9FF" opacity="0.55" />
      {/* Snow-covered valley */}
      <path d="M0 260 L120 240 L260 270 L400 245 L480 265 L480 340 L0 340 Z" fill="#E0E7FF" opacity="0.9" />
      <path d="M0 320 L480 320 L480 340 L0 340 Z" fill="#F1F5F9" />
      {/* Chalets */}
      {[
        { x: 60, w: 60, h: 40, roof: "#7C2D12" },
        { x: 160, w: 80, h: 55, roof: "#831843" },
        { x: 280, w: 70, h: 50, roof: "#78350F" },
        { x: 380, w: 60, h: 45, roof: "#7C2D12" },
      ].map((c, i) => (
        <g key={i}>
          {/* Wall */}
          <rect x={c.x} y={280 - c.h} width={c.w} height={c.h} fill="#1E293B" />
          {/* Snowy roof */}
          <path d={`M${c.x - 4} ${280 - c.h} L${c.x + c.w / 2} ${280 - c.h - 22} L${c.x + c.w + 4} ${280 - c.h} Z`} fill={c.roof} />
          <path d={`M${c.x - 4} ${280 - c.h} L${c.x + c.w / 2} ${280 - c.h - 22} L${c.x + c.w + 4} ${280 - c.h} Z`} fill="#F1F5F9" opacity="0.55" transform={`translate(0, -2)`} />
          {/* Warm windows */}
          <rect x={c.x + 10} y={280 - c.h + 12} width="12" height="10" fill="#FCD34D" opacity="0.95" />
          <rect x={c.x + c.w - 22} y={280 - c.h + 12} width="12" height="10" fill="#FDBA74" opacity="0.9" />
          {c.h > 45 ? <rect x={c.x + c.w / 2 - 6} y={280 - c.h + 26} width="12" height="10" fill="#FCD34D" opacity="0.9" /> : null}
          {/* Smoke */}
          <circle cx={c.x + c.w / 2} cy={280 - c.h - 30} r="3" fill="#F1F5F9" opacity="0.3" />
          <circle cx={c.x + c.w / 2 + 4} cy={280 - c.h - 38} r="4" fill="#F1F5F9" opacity="0.2" />
        </g>
      ))}
      {/* Foreground trees */}
      <g fill="#020617">
        {[10, 50, 240, 250, 460].map((x, i) => (
          <path key={i} d={`M${x} 300 L${x - 10} 328 L${x + 10} 328 Z M${x} 314 L${x - 14} 335 L${x + 14} 335 Z`} />
        ))}
      </g>
    </svg>
  );
}

export function GondolaAerialScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 340" className={className} preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="ga-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#075985" />
          <stop offset="70%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#F0F9FF" />
        </linearGradient>
      </defs>
      <rect width="480" height="340" fill="url(#ga-sky)" />
      {/* Distant clouds */}
      <g fill="#F0F9FF" opacity="0.6">
        <ellipse cx="120" cy="80" rx="60" ry="8" />
        <ellipse cx="340" cy="120" rx="80" ry="7" />
        <ellipse cx="80" cy="150" rx="50" ry="6" />
      </g>
      {/* Sun disc */}
      <circle cx="380" cy="70" r="26" fill="#FEF08A" opacity="0.9" />
      {/* Big peaks in distance */}
      <path d="M0 260 L60 180 L140 240 L220 160 L300 230 L380 170 L480 240 L480 340 L0 340 Z" fill="#075985" opacity="0.9" />
      <path d="M60 180 L95 200 L130 220 L60 235 Z M220 160 L255 180 L290 200 L220 220 Z M380 170 L415 190 L450 210 L380 230 Z" fill="#F0F9FF" opacity="0.7" />
      {/* Even lower ridge */}
      <path d="M0 300 L100 260 L200 290 L300 260 L400 290 L480 270 L480 340 L0 340 Z" fill="#0369A1" opacity="0.9" />
      {/* Gondola cable diagonal */}
      <line x1="80" y1="70" x2="440" y2="260" stroke="#F0F9FF" strokeWidth="1.5" opacity="0.65" strokeDasharray="4 4" />
      {/* Towers */}
      <line x1="180" y1="115" x2="180" y2="140" stroke="#F0F9FF" strokeWidth="1.5" opacity="0.6" />
      <line x1="320" y1="192" x2="320" y2="218" stroke="#F0F9FF" strokeWidth="1.5" opacity="0.6" />
      {/* Big gondola in the foreground */}
      <g transform="translate(240, 155)">
        <rect x="-24" y="0" width="48" height="32" rx="6" fill="#F59E0B" />
        <line x1="0" y1="-16" x2="0" y2="0" stroke="#F0F9FF" strokeWidth="1.4" />
        <rect x="-18" y="8" width="36" height="14" rx="3" fill="#0F172A" opacity="0.45" />
        <rect x="-6" y="10" width="4" height="4" fill="#FCD34D" opacity="0.9" />
        <rect x="4" y="10" width="4" height="4" fill="#FCD34D" opacity="0.9" />
        {/* Cable attachment */}
        <circle cx="0" cy="-16" r="3" fill="#0F172A" />
      </g>
    </svg>
  );
}

export function ApresSkiScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 340" className={className} preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="ap-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7C2D12" />
          <stop offset="60%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <rect width="480" height="340" fill="url(#ap-sky)" />
      {/* Warm sun */}
      <circle cx="90" cy="90" r="36" fill="#FEF08A" opacity="0.85" />
      {/* Peaks (silhouette against warm sky) */}
      <path d="M0 200 L80 130 L180 180 L280 120 L380 180 L480 150 L480 340 L0 340 Z" fill="#0F172A" />
      {/* Warm cabin exterior + big windows glowing */}
      <g>
        <rect x="120" y="215" width="240" height="80" fill="#1E293B" />
        <path d="M112 215 L240 195 L368 215 Z" fill="#7C2D12" />
        {/* Windows with silhouettes */}
        <rect x="140" y="235" width="42" height="42" fill="#FCD34D" opacity="0.95" />
        <rect x="192" y="235" width="42" height="42" fill="#F59E0B" opacity="0.95" />
        <rect x="244" y="235" width="42" height="42" fill="#FCD34D" opacity="0.95" />
        <rect x="296" y="235" width="42" height="42" fill="#FDBA74" opacity="0.95" />
        {/* Silhouettes inside windows */}
        <g fill="#0F172A" opacity="0.85">
          <circle cx="150" cy="255" r="5" />
          <path d="M144 265 L156 265 L156 275 L144 275 Z" />
          <circle cx="205" cy="252" r="4" />
          <path d="M200 260 L210 260 L210 275 L200 275 Z" />
          <circle cx="220" cy="256" r="4" />
          <path d="M215 264 L225 264 L225 275 L215 275 Z" />
          <circle cx="260" cy="253" r="4" />
          <path d="M255 261 L265 261 L265 275 L255 275 Z" />
          <circle cx="275" cy="255" r="5" />
          <path d="M269 265 L281 265 L281 275 L269 275 Z" />
          <circle cx="315" cy="252" r="4" />
          <path d="M310 260 L320 260 L320 275 L310 275 Z" />
        </g>
      </g>
      {/* Snowy foreground with strung lights */}
      <path d="M0 296 L240 285 L480 296 L480 340 L0 340 Z" fill="#F1F5F9" opacity="0.9" />
      <path d="M0 260 Q 240 220, 480 260" fill="none" stroke="#78350F" strokeWidth="1" />
      <g>
        {[40, 100, 160, 220, 280, 340, 400, 460].map((x, i) => {
          const y = 260 + Math.sin((x / 480) * Math.PI) * -35;
          const colors = ["#FCD34D", "#EC4899", "#F59E0B", "#7DD3FC"];
          return (
            <g key={i}>
              <line x1={x} y1={y} x2={x} y2={y + 6} stroke="#78350F" strokeWidth="0.8" />
              <circle cx={x} cy={y + 8} r="3" fill={colors[i % 4]} />
              <circle cx={x} cy={y + 8} r="6" fill={colors[i % 4]} opacity="0.25" />
            </g>
          );
        })}
      </g>
      {/* Two silhouettes at bar */}
      <g fill="#0F172A">
        <g transform="translate(80, 285)">
          <circle cx="0" cy="0" r="5" />
          <path d="M-8 6 L8 6 L8 14 L-8 14 Z" />
        </g>
        <g transform="translate(400, 285)">
          <circle cx="0" cy="0" r="5" />
          <path d="M-8 6 L8 6 L8 14 L-8 14 Z" />
        </g>
      </g>
    </svg>
  );
}
