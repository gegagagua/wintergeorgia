import type { SVGProps } from "react";

/**
 * Wordmark: `georgia` (700) + `winter` (300) on one line, no space.
 * Mark: three peaks with one line running through them as the road.
 * Never gradient, always one flat color (currentColor).
 */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 40 32"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2 26 L10 12 L16 20 L22 6 L30 22 L38 14"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 30 C 12 24, 28 24, 38 30"
        stroke="currentColor"
        strokeOpacity=".6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LogoLockup({ className }: { className?: string }) {
  return (
    <span className={className}>
      <LogoMark className="mr-2 inline-block h-6 w-8 align-[-4px] text-ice dark:text-primary" />
      <span className="font-sans text-[17px] tracking-tight">
        <span className="font-bold">georgia</span>
        <span className="font-light">winter</span>
      </span>
    </span>
  );
}
