import type { Road, SnowReport } from "./types";

export const roads: Road[] = [
  {
    slug: "jvari-pass",
    name: { en: "Jvari Pass", ru: "Крестовый перевал", ka: "ჯვრის უღელტეხილი" },
    status: "open",
    restriction: "chains",
    updatedAt: "2026-09-28T07:15:00Z",
    serves: ["gudauri", "kazbegi"],
    note: {
      en: "Snow chains required above Kobi. One-way convoy 08:00–09:00.",
      ru: "Выше Коби требуются цепи. Реверс 08:00–09:00.",
      ka: "კობის ზემოთ ჯაჭვები საჭიროა. კონვოი 08:00–09:00.",
    },
  },
  {
    slug: "goderdzi-pass",
    name: { en: "Goderdzi Pass", ru: "Годердзский перевал", ka: "გოდერძის უღელტეხილი" },
    status: "limited",
    restriction: "4x4_only",
    updatedAt: "2026-09-28T06:50:00Z",
    serves: ["goderdzi"],
    note: {
      en: "4x4 only. Fresh snowfall overnight, plough at 06:00.",
      ru: "Только 4x4. Ночью выпал свежий снег, чистка с 06:00.",
      ka: "მხოლოდ 4x4. ღამით ახალი თოვლი, გაწმენდა 06:00-დან.",
    },
  },
  {
    slug: "mestia-road",
    name: { en: "Zugdidi → Mestia road", ru: "Дорога Зугдиди → Местия", ka: "ზუგდიდი → მესტიის გზა" },
    status: "open",
    restriction: "none",
    updatedAt: "2026-09-28T07:30:00Z",
    serves: ["tetnuldi", "hatsvali"],
  },
  {
    slug: "bakuriani-road",
    name: { en: "Borjomi → Bakuriani road", ru: "Дорога Боржоми → Бакуриани", ka: "ბორჯომი → ბაკურიანის გზა" },
    status: "open",
    restriction: "none",
    updatedAt: "2026-09-28T07:20:00Z",
    serves: ["bakuriani"],
  },
];

export const snow: SnowReport[] = [
  {
    resort: "gudauri",
    baseCm: 45,
    topCm: 95,
    new24hCm: 8,
    tempC: -6,
    windMs: 4,
    visibility: { en: "Good", ru: "Хорошая", ka: "კარგი" },
    liftsOpen: 7,
    liftsTotal: 8,
    measuredAt: "2026-09-28T08:00:00Z",
  },
  {
    resort: "bakuriani",
    baseCm: 35,
    topCm: 70,
    new24hCm: 3,
    tempC: -4,
    windMs: 2,
    visibility: { en: "Good", ru: "Хорошая", ka: "კარგი" },
    liftsOpen: 6,
    liftsTotal: 6,
    measuredAt: "2026-09-28T08:00:00Z",
  },
  {
    resort: "tetnuldi",
    baseCm: 60,
    topCm: 130,
    new24hCm: 12,
    tempC: -9,
    windMs: 6,
    visibility: { en: "Fair", ru: "Средняя", ka: "საშუალო" },
    liftsOpen: 3,
    liftsTotal: 4,
    measuredAt: "2026-09-28T08:00:00Z",
  },
  {
    resort: "hatsvali",
    baseCm: 40,
    topCm: 65,
    new24hCm: 5,
    tempC: -5,
    windMs: 3,
    visibility: { en: "Good", ru: "Хорошая", ka: "კარგი" },
    liftsOpen: 2,
    liftsTotal: 2,
    measuredAt: "2026-09-28T08:00:00Z",
  },
  {
    resort: "goderdzi",
    baseCm: 90,
    topCm: 160,
    new24hCm: 22,
    tempC: -3,
    windMs: 5,
    visibility: { en: "Snowfall", ru: "Снегопад", ka: "თოვლი" },
    liftsOpen: 2,
    liftsTotal: 2,
    measuredAt: "2026-09-28T08:00:00Z",
  },
  {
    resort: "kazbegi",
    baseCm: 55,
    topCm: 220,
    new24hCm: 10,
    tempC: -12,
    windMs: 8,
    visibility: { en: "Fair", ru: "Средняя", ka: "საშუალო" },
    liftsOpen: 0,
    liftsTotal: 0,
    measuredAt: "2026-09-28T08:00:00Z",
  },
];

export function findRoad(slug: string) {
  return roads.find((r) => r.slug === slug);
}

export function findSnow(resort: string) {
  return snow.find((s) => s.resort === resort);
}
