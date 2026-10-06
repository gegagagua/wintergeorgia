/**
 * Company facts, read by the About page, the LocalBusiness JSON-LD and the
 * trust rows. Owner fills these in. Fields are rendered only when present —
 * leave as `null` to hide the block. Never ship an invented value here.
 */

import type { Locale } from "@/i18n/routing";

type I18n = Record<Locale, string>;

export type DriverVettingStep = {
  id: string;
  label: I18n;
  detail?: I18n;
};

export type DriverPublicProfile = {
  slug: string;
  firstName: string;
  photo?: string;
  vehicle?: string;
  plate?: string;
  languages: string[];
  yearsDriving?: number;
  winterKit: Array<"winter_tyres" | "chains" | "4x4" | "ski_rack" | "child_seat">;
};

export type Company = {
  /** Public operating name, used in copy. Not the legal name. */
  tradingName: string;

  /** Legal entity (as registered in Georgia). `null` → block hidden. */
  legalName: string | null;

  /** Georgian საიდენტიფიკაციო ნომერი (ID / tax number). `null` → block hidden. */
  idNumber: string | null;

  /** Registered legal address (full line). */
  registeredAddress: I18n | null;

  /** Where the dispatcher sits and vehicles are based (if different). */
  operatingBase: I18n | null;

  foundedYear: number | null;

  founder: {
    name: string;
    photo: string | null;
    bio: I18n | null;
  } | null;

  /** The real vetting process. Each step rendered only if label present. */
  driverVetting: DriverVettingStep[];

  contacts: {
    phone: string | null;
    whatsapp: string | null;
    email: string | null;
    telegram: string | null;
    hours: I18n | null;
  };

  /** Optional driver photos for the About page strip. */
  featuredDrivers: DriverPublicProfile[];

  /** Social proof metrics the operator will stand behind, in writing. */
  publicStats: {
    yearsOperating?: number;
    routesServed?: number;
    driversOnFile?: number;
    tripsLastSeason?: number;
  };

  /** Links to live profiles — only shown if non-null. */
  socials: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    tripadvisor?: string;
  };
};

/**
 * TODO(owner): fill in. Nothing below is public-ready — every `null` and
 * every `TODO(owner)` string is a "do not render" signal. Replace, do not
 * invent. The About page and LocalBusiness JSON-LD will omit any block whose
 * data is still a placeholder.
 */
export const company: Company = {
  tradingName: "georgiawinter",

  // TODO(owner): legal entity exactly as on the registration certificate.
  legalName: null,

  // TODO(owner): 9-digit ID number from the registry.
  idNumber: null,

  // TODO(owner): registered address line.
  registeredAddress: null,

  // TODO(owner): dispatcher / vehicle base address if different.
  operatingBase: null,

  // TODO(owner): first operating year.
  foundedYear: null,

  // TODO(owner): one real human to put a face on the service.
  founder: null,

  driverVetting: [
    // TODO(owner): confirm the real process. Delete steps that do not apply.
    {
      id: "docs",
      label: {
        en: "Documents on file",
        ru: "Документы в деле",
        ka: "დოკუმენტები ფაილში",
      },
      detail: {
        en: "ID, driving licence, vehicle registration and third-party insurance verified before the first job.",
        ru: "ID, водительское удостоверение, регистрация ТС и ОСАГО проверяются до первого выезда.",
        ka: "ID, მართვის მოწმობა, ავტომობილის რეგისტრაცია და მესამე პირის დაზღვევა მოწმდება პირველ გასვლამდე.",
      },
    },
    {
      id: "winter",
      label: {
        en: "Winter kit confirmed each November",
        ru: "Зимний комплект подтверждается каждый ноябрь",
        ka: "ზამთრის კომპლექტი დასტურდება ყოველ ნოემბერს",
      },
      detail: {
        en: "Winter tyres, chains and (for 4×4 routes) a working transfer case checked by photo before season start.",
        ru: "Зимняя резина, цепи и (для 4×4-маршрутов) работающая раздатка проверяются по фото до старта сезона.",
        ka: "ზამთრის საბურავები, ჯაჭვები და (4×4 მარშრუტებისთვის) მომუშავე გადაცემის კოლოფი ფოტოთი ამოწმდება სეზონის დასაწყისამდე.",
      },
    },
    {
      id: "road",
      label: {
        en: "Pass driving experience",
        ru: "Опыт езды по перевалам",
        ka: "უღელტეხილზე მართვის გამოცდილება",
      },
      detail: {
        en: "At least two seasons of Jvari Pass driving history before a driver gets Gudauri airport jobs.",
        ru: "Не меньше двух сезонов опыта на Крестовом перевале — только после этого в Гудаури с аэропорта.",
        ka: "მინიმუმ ორი სეზონის ჯვრის უღელტეხილზე მართვის გამოცდილება — მხოლოდ ამის შემდეგ გუდაურის აეროპორტის რეისები.",
      },
    },
    {
      id: "feedback",
      label: {
        en: "Removed on first serious complaint",
        ru: "Отстранение после первой серьёзной жалобы",
        ka: "ჩამოცილება პირველივე სერიოზული საჩივრის შემდეგ",
      },
      detail: {
        en: "A single verified safety or honesty complaint ends the relationship. No warnings on those two.",
        ru: "Единственная подтверждённая жалоба на безопасность или честность — конец сотрудничества. Без вторых шансов.",
        ka: "ერთი დადასტურებული საჩივარი უსაფრთხოებაზე ან პატიოსნებაზე — თანამშრომლობის დასასრული. მეორე შანსის გარეშე.",
      },
    },
  ],

  contacts: {
    // TODO(owner): single public phone number in +995 format.
    phone: null,
    // TODO(owner): WhatsApp number (can be same as phone).
    whatsapp: null,
    // TODO(owner): bookings@... — the inbox you actually read.
    email: null,
    // TODO(owner): optional Telegram handle for Russian-speaking market.
    telegram: null,
    hours: {
      en: "Every day, 08:00 – 22:00 Tbilisi time",
      ru: "Каждый день, 08:00 – 22:00 по Тбилиси",
      ka: "ყოველდღე, 08:00 – 22:00 თბილისის დროით",
    },
  },

  // TODO(owner): add 2-3 real driver profiles with photos. Keep empty until then.
  featuredDrivers: [],

  publicStats: {
    // TODO(owner): fill the numbers you are willing to stand behind in writing.
    // yearsOperating: 3,
    // routesServed: 11,
    // driversOnFile: 24,
    // tripsLastSeason: 1800,
  },

  socials: {
    // TODO(owner): paste only when accounts are live.
  },
};

export function isCompanyBlockReady(): boolean {
  return Boolean(
    company.legalName &&
      company.idNumber &&
      company.registeredAddress &&
      company.founder?.name,
  );
}
