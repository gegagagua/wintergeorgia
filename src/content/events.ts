import type { EventItem } from "./types";

export const events: EventItem[] = [
  {
    slug: "gudauri-season-opening-2026",
    resort: "gudauri",
    title: {
      en: "Gudauri Season Opening 2026/27",
      ru: "Открытие сезона Гудаури 2026/27",
      ka: "გუდაურის სეზონის გახსნა 2026/27",
    },
    body: {
      en: "First-run day, ribbon cut at Sadzele mid-station, live DJ set on the base deck, half-price lift pass for anyone in season colours before 11:00.",
      ru: "День первых спусков, лента на средней станции Садзеле, диджей-сет на нижней террасе, ски-пасс за полцены для всех в цветах сезона до 11:00.",
      ka: "პირველი დაშვების დღე, ლენტის გადაჭრა სადძელეს შუა სადგურზე, ცოცხალი DJ ძირის ტერასაზე, ნახევრადფასიანი საბაგირო სეზონის ფერებში ჩაცმულებისთვის 11:00-მდე.",
    },
    category: "season-opening",
    startsAt: "2026-12-14T09:00:00+04:00",
    endsAt: "2026-12-14T22:00:00+04:00",
    transferRoute: "tbilisi-gudauri",
    featured: true,
  },
  {
    slug: "new-year-in-gudauri",
    resort: "gudauri",
    title: {
      en: "New Year in Gudauri",
      ru: "Новый год в Гудаури",
      ka: "ახალი წელი გუდაურში",
    },
    body: {
      en: "Fireworks over Kudebi at midnight, torchlit descent from Sadzele at 23:30, resident DJs at Black Bar. Transfer packages available; book early — every hotel is full by early December.",
      ru: "Фейерверк над Кудеби в полночь, факельный спуск с Садзеле в 23:30, резиденты Black Bar. Пакеты с трансфером — в наличии; бронируйте заранее, все отели забиты уже к началу декабря.",
      ka: "ფეიერვერკი კუდების ზემოთ შუაღამეს, ჩირაღდნებით დაშვება სადძელედან 23:30-ზე, Black Bar-ის DJ-ები. ტრანსფერების პაკეტები ხელმისაწვდომია; ადრე დაჯავშნეთ — ყველა სასტუმრო დეკემბრის დასაწყისისთვის დაკავებულია.",
    },
    category: "party",
    startsAt: "2026-12-31T20:00:00+04:00",
    endsAt: "2027-01-01T03:00:00+04:00",
    transferRoute: "tbilisi-airport-gudauri",
    featured: true,
  },
  {
    slug: "bakuriani-freestyle-cup",
    resort: "bakuriani",
    title: {
      en: "Bakuriani Freestyle Cup",
      ru: "Кубок Бакуриани по фристайлу",
      ka: "ბაკურიანის ფრისტაილის თასი" ,
    },
    body: {
      en: "Two-day open freestyle competition on the 25 slope. Big air on day one, slopestyle final on day two, prize pool 20,000 GEL.",
      ru: "Двухдневные открытые соревнования по фристайлу на склоне 25. Big air в первый день, финал slopestyle во второй, призовой фонд 20 000 GEL.",
      ka: "ორდღიანი ღია ფრისტაილის შეჯიბრი 25-ე ტრასაზე. Big air პირველ დღეს, slopestyle-ის ფინალი მეორეზე, საპრიზო ფონდი 20 000 GEL.",
    },
    category: "competition",
    startsAt: "2027-02-14T10:00:00+04:00",
    endsAt: "2027-02-15T17:00:00+04:00",
    transferRoute: "tbilisi-bakuriani",
  },
  {
    slug: "mestia-heliski-week",
    resort: "tetnuldi",
    title: {
      en: "Mestia Heliski Week",
      ru: "Хелиски-неделя Местия",
      ka: "მესტიის ჰელი-ski კვირა",
    },
    body: {
      en: "Six-day operator week with UIAGM guides. Fixed morning briefing at 07:30, weather-window flying. Reserve a spot; there is no walk-up.",
      ru: "Шесть дней с UIAGM-гидами. Утренний брифинг в 07:30, полёты в погодное окно. Резервируйте место, спонтанно попасть нельзя.",
      ka: "ექვსდღიანი ოპერატორის კვირა UIAGM გიდებით. ფიქსირებული დილის ბრიფინგი 07:30-ზე, ფრენა ამინდის ფანჯარაში. ადგილი დაჯავშნეთ; ადგილზე მისვლით ვერ დარეგისტრირდებით.",
    },
    category: "festival",
    startsAt: "2027-02-28T07:30:00+04:00",
    endsAt: "2027-03-05T17:00:00+04:00",
    transferRoute: "zugdidi-mestia",
    ticketPriceGel: 8500,
  },
];
