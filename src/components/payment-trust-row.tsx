import { ShieldCheck, Lock, RotateCcw } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { payments } from "@/config/payments";
import type { Locale } from "@/i18n/routing";

type Props = {
  locale: Locale;
  compact?: boolean;
  tone?: "light" | "dark";
  className?: string;
};

const brandLabel: Record<string, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "AMEX",
  unionpay: "UnionPay",
  applepay: "Apple Pay",
  googlepay: "Google Pay",
};

const localeStrings = {
  en: {
    processedBy: "Payments processed by",
    cancel: "Cancellation",
    refund: "Road-closure refund",
    cancelLink: "See full cancellation policy",
    noFee: "no fee",
  },
  ru: {
    processedBy: "Платежи обрабатывает",
    cancel: "Отмена",
    refund: "Возврат при закрытии дороги",
    cancelLink: "Полная политика отмены",
    noFee: "без комиссии",
  },
  ka: {
    processedBy: "გადახდებს ამუშავებს",
    cancel: "გაუქმება",
    refund: "დახურული გზის დაბრუნება",
    cancelLink: "სრული გაუქმების პოლიტიკა",
    noFee: "საკომისიოს გარეშე",
  },
};

/**
 * Compact trust strip that renders on every booking surface:
 * – accepted card brands
 * – processor label (from config)
 * – 3-D Secure note
 * – one-line cancellation + road-closure refund rule
 * – link to the full policy
 *
 * Reads from `src/config/payments.ts`. No hardcoded brand or processor copy.
 */
export function PaymentTrustRow({ locale, compact, tone = "light", className }: Props) {
  const s = localeStrings[locale];
  const dark = tone === "dark";

  return (
    <section
      aria-label="Payment and refund trust information"
      className={cn(
        "rounded-lg border p-4 text-small md:p-5",
        dark
          ? "border-white/10 bg-white/5 text-snow"
          : "border-line bg-surface-raised text-ink",
        className,
      )}
    >
      <div className={cn("flex flex-wrap items-center gap-3", compact ? "md:gap-4" : "md:gap-5")}>
        <div className="flex items-center gap-2">
          <Lock
            aria-hidden="true"
            className={cn("h-4 w-4", dark ? "text-dawn-soft" : "text-primary")}
            strokeWidth={1.75}
          />
          <span className={cn("tabular", dark ? "text-white/85" : "text-ink")}>
            {payments.acceptedBrands
              .map((b) => brandLabel[b] ?? b.toUpperCase())
              .join(" · ")}
          </span>
        </div>

        <span
          aria-hidden="true"
          className={cn("hidden h-4 w-px md:inline-block", dark ? "bg-white/15" : "bg-line")}
        />

        <div className={cn("flex items-center gap-2", dark ? "text-white/70" : "text-ink-muted")}>
          <ShieldCheck aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
          <span>
            {s.processedBy} <span className={dark ? "text-snow" : "text-ink"}>{payments.provider.publicLabel}</span>
          </span>
        </div>
      </div>

      <p
        className={cn(
          "mt-3 text-small",
          dark ? "text-white/70" : "text-ink-muted",
        )}
      >
        {payments.secure3dsNote[locale]}
      </p>

      {!compact ? (
        <ul
          className={cn(
            "mt-3 grid gap-2 border-t pt-3 text-small md:grid-cols-2",
            dark ? "border-white/10" : "border-line",
          )}
        >
          <li className="flex items-start gap-2">
            <RotateCcw
              aria-hidden="true"
              className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", dark ? "text-dawn-soft" : "text-primary")}
              strokeWidth={1.75}
            />
            <span>
              <span className={cn("font-medium", dark ? "text-snow" : "text-ink")}>{s.cancel}:</span>{" "}
              {payments.cancellationShort[locale]}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ShieldCheck
              aria-hidden="true"
              className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", dark ? "text-dawn-soft" : "text-primary")}
              strokeWidth={1.75}
            />
            <span>
              <span className={cn("font-medium", dark ? "text-snow" : "text-ink")}>{s.refund}:</span>{" "}
              {payments.roadClosureRefund[locale]}
            </span>
          </li>
        </ul>
      ) : null}

      <p className="mt-3">
        <Link
          href="/cancellation"
          className={cn("underline-offset-4 hover:underline", dark ? "text-dawn-soft" : "text-primary")}
        >
          {s.cancelLink} →
        </Link>
      </p>
    </section>
  );
}
