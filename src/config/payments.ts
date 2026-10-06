/**
 * Payment and refund facts rendered in the trust row on every booking surface
 * (route pages, quick-book, checkout). Edit here, never inline in JSX.
 */

import type { Locale } from "@/i18n/routing";

type I18n = Record<Locale, string>;

export type PaymentConfig = {
  /** The processor that actually clears the card. */
  provider: {
    name: string;
    /** Visible to the user as "processed by …" */
    publicLabel: string;
    /** Where to point the user if they want to verify. */
    url?: string;
  };
  acceptedBrands: Array<"visa" | "mastercard" | "amex" | "unionpay" | "applepay" | "googlepay">;
  secure3dsNote: I18n;
  cancellationShort: I18n;
  roadClosureRefund: I18n;
  currency: "GEL";
};

/**
 * TODO(owner): confirm which processor you ship with (BOG, TBC, Stripe…) and
 * replace the publicLabel accordingly. Default below reads "card processor" so
 * nothing invented ships to users.
 */
export const payments: PaymentConfig = {
  provider: {
    name: "card_processor",
    publicLabel: "a certified Georgian card processor",
    // TODO(owner): add url when the processor is picked, e.g. "https://bog.ge".
  },
  acceptedBrands: ["visa", "mastercard"],
  secure3dsNote: {
    en: "All card payments go through 3-D Secure. We never see your card number.",
    ru: "Все платежи проходят через 3-D Secure. Мы не видим номер карты.",
    ka: "ყველა გადახდა 3-D Secure-ით ხდება. ბარათის ნომერი ჩვენ არ გვიხილავს.",
  },
  cancellationShort: {
    en: "Free cancellation 24 hours before departure. 50% within 24 hours. Flight delays never penalised.",
    ru: "Бесплатная отмена за 24 часа. 50% — в последние 24 часа. Задержка рейса никогда не штрафуется.",
    ka: "უფასო გაუქმება 24 საათით ადრე. 50% — ბოლო 24 საათში. ფრენის დაგვიანებას ჯარიმა არ ეკისრება.",
  },
  roadClosureRefund: {
    en: "If the road closes on your travel day, your booking is rescheduled or refunded in full, no fee.",
    ru: "Если в день поездки дорога закрыта — бронь переносится или возвращается полностью, без комиссии.",
    ka: "თუ გასამგზავრებელ დღეს გზა დახურულია, ჯავშანი გადაინაცვლებს ან სრულად ბრუნდება, საკომისიოს გარეშე.",
  },
  currency: "GEL",
};
