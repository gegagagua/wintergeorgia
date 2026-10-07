import type { Article } from "./types";
import { contentPages } from "./content-pages";

const seedArticles: Article[] = [
  {
    slug: "gudauri-opens-december-14",
    locale: "all",
    template: "news",
    title: {
      en: "Gudauri opens on 14 December",
      ru: "Гудаури открывается 14 декабря",
      ka: "გუდაური იხსნება 14 დეკემბერს",
    },
    excerpt: {
      en: "Sadzele and Kudebi chairs run from opening day; New Gudauri gondola follows on the 20th.",
      ru: "Кресельные Садзеле и Кудеби — с открытия; гондола Нью-Гудаури — с 20-го.",
      ka: "სადძელეს და კუდების საბაგიროები — გახსნიდან; ახალი გუდაურის გონდოლა — 20-დან.",
    },
    body: {
      en: "The resort confirmed the opening date last week. Sadzele, Kudebi and the beginner conveyor are ready from opening day. New Gudauri gondola opens on 20 December once its annual inspection finishes.\n\nSeason passes are on sale from 1 December; the early-bird price ends at midnight the day before opening.",
      ru: "Курорт подтвердил дату открытия на прошлой неделе. Садзеле, Кудеби и учебный конвейер — с первого дня. Гондола Нью-Гудаури — с 20 декабря после ежегодного техосмотра.\n\nСезонные абонементы поступают в продажу с 1 декабря; цена «раннего бронирования» действует до полуночи накануне открытия.",
      ka: "კურორტმა გახსნის თარიღი გასულ კვირას დაადასტურა. სადძელე, კუდები და დამწყებთა კონვეიერი — გახსნის დღიდანვე. ახალი გუდაურის გონდოლა — 20 დეკემბრიდან, წლიური ტექდათვალიერების შემდეგ.\n\nსეზონური აბონემენტები 1 დეკემბრიდან იყიდება; early-bird ფასი მოქმედებს გახსნის წინა დღის შუაღამემდე.",
    },
    category: "news",
    author: "georgiawinter editorial",
    publishedAt: "2026-10-06T09:00:00Z",
    resort: "gudauri",
  },
  {
    slug: "lift-pass-price-2026-27",
    locale: "all",
    title: {
      en: "Lift pass prices for 2026/27",
      ru: "Цены на ски-пассы 2026/27",
      ka: "საბაგირო ბილეთის ფასები 2026/27",
    },
    excerpt: {
      en: "Gudauri +5 GEL, Bakuriani flat, Tetnuldi flat, Goderdzi +10 GEL. Prices confirmed with resort offices.",
      ru: "Гудаури +5 GEL, Бакуриани без изменений, Тетнулди без изменений, Годердзи +10 GEL. Цены подтверждены с офисами курортов.",
      ka: "გუდაური +5 GEL, ბაკურიანი უცვლელი, თეთნულდი უცვლელი, გოდერძი +10 GEL. ფასები კურორტების ოფისებთან დადასტურებულია.",
    },
    body: {
      en: "The full price table for the 2026/27 season is live on our prices page. Notable changes: Gudauri raised the day pass by 5 GEL to 90; Goderdzi added 10 GEL to reflect the new upper lift's operating cost.",
      ru: "Полная таблица цен на сезон 2026/27 обновлена на странице цен. Заметные изменения: Гудаури поднял дневной пасс на 5 GEL до 90; Годердзи прибавил 10 GEL с учётом эксплуатации нового верхнего подъёмника.",
      ka: "2026/27 სეზონის სრული ფასების ცხრილი ჩვენს ფასების გვერდზეა. მთავარი ცვლილებები: გუდაურმა დღიური აბონემენტი 5 GEL-ით 90-მდე გაზარდა; გოდერძიმ 10 GEL დაამატა ახალი ზედა საბაგიროს ექსპლუატაციისთვის.",
    },
    category: "price",
    author: "georgiawinter editorial",
    publishedAt: "2026-09-24T09:00:00Z",
  },
  {
    slug: "first-time-on-skis-where-to-start",
    locale: "all",
    title: {
      en: "First time on skis: where in Georgia to start",
      ru: "Первый раз на лыжах: где в Грузии начать",
      ka: "პირველად თხილამურებზე: სად დავიწყოთ საქართველოში",
    },
    excerpt: {
      en: "Bakuriani for the village, Gudauri for the terrain. A practical guide to the first three days.",
      ru: "Бакуриани — за посёлок, Гудаури — за рельеф. Практический гид на первые три дня.",
      ka: "ბაკურიანი — სოფლისთვის, გუდაური — რელიეფისთვის. პრაქტიკული გზამკვლევი პირველი სამი დღისთვის.",
    },
    body: {
      en: "If you have never skied before, the two Georgian resorts to consider are Bakuriani and Gudauri. Bakuriani has the softer beginner terrain, a real village at the base and more ski schools per square metre than anywhere else in the country. Gudauri has more terrain to progress into once you are past the plough turn.\n\nDay 1: half-day group lesson, rest of the day off. Day 2: full-day rental, one lesson in the morning, the beginner lift in the afternoon. Day 3: the second-level lift, no lesson.",
      ru: "Если вы никогда не катались, рассмотрите Бакуриани и Гудаури. У Бакуриани мягче учебный рельеф, у подножия — настоящий посёлок, а школ на квадратный метр здесь больше, чем где-либо в стране. У Гудаури — больше рельефа, куда расти после плуга.\n\nДень 1: групповой урок на полдня, дальше отдых. День 2: аренда на день, утренний урок, вечер — на учебном подъёмнике. День 3: следующий подъёмник, без урока.",
      ka: "თუ არასდროს გისრიალიათ, ორი ქართული კურორტი განიხილეთ — ბაკურიანი და გუდაური. ბაკურიანში ნაზი დამწყებთა რელიეფია, ძირში ნამდვილი სოფელი და კვადრატულ მეტრზე მეტი სასწავლო სკოლა, ვიდრე სადმე ქვეყანაში. გუდაურში კი მეტი რელიეფია გასაზრდელი, როცა plough-ს გავცდები.\n\nდღე 1: ნახევარდღიანი ჯგუფური გაკვეთილი, დანარჩენი დღე დასვენება. დღე 2: სრული დღის ქირავნობა, დილის გაკვეთილი, საღამოს დამწყებთა საბაგირო. დღე 3: შემდეგი დონის საბაგირო, გაკვეთილის გარეშე.",
    },
    category: "guide",
    author: "georgiawinter editorial",
    publishedAt: "2026-07-12T09:00:00Z",
  },
  {
    slug: "jvari-pass-closed-avalanche",
    locale: "all",
    title: {
      en: "Alert: Jvari Pass closed — avalanche risk",
      ru: "Оповещение: Крестовый перевал закрыт — лавинная опасность",
      ka: "შეტყობინება: ჯვრის უღელტეხილი დაკეტილია — ზვავის რისკი",
    },
    excerpt: {
      en: "Closed both directions until the morning inspection. All Gudauri transfers today are being rescheduled or refunded automatically.",
      ru: "Закрыт в обе стороны до утренней проверки. Все сегодняшние трансферы в Гудаури автоматически переносятся или возвращаются.",
      ka: "დაკეტილია ორივე მიმართულებით დილის შემოწმებამდე. დღევანდელი ყველა გუდაურის ტრანსფერი ავტომატურად გადაინაცვლებს ან დაბრუნდება.",
    },
    body: {
      en: "The Roads Department closed the Jvari Pass at 14:00 today after fresh avalanche activity above Kobi. Reopen decision at 08:00 tomorrow after the morning inspection.\n\nIf you have a booking with georgiawinter for today or tomorrow morning, we have already emailed and WhatsApped the two options: reschedule (no fee) or full refund (no fee). No action needed from you if you take the refund.",
      ru: "Дорожный департамент закрыл Крестовый перевал в 14:00 сегодня из-за свежего лавинного схода выше Коби. Решение об открытии — в 08:00 завтра после утренней проверки.\n\nЕсли у вас бронирование в georgiawinter на сегодня или завтра до обеда, мы уже отправили письмо и WhatsApp с двумя опциями: перенос (бесплатно) или полный возврат (бесплатно). Для возврата ничего делать не нужно.",
      ka: "საგზაო დეპარტამენტმა ჯვრის უღელტეხილი დღეს 14:00-ზე დახურა კობის ზემოთ ახალი ზვავური აქტივობის გამო. გახსნის გადაწყვეტილება ხვალ 08:00-ზე დილის შემოწმების შემდეგ.\n\nთუ georgiawinter-ში დაჯავშნა გაქვთ დღეს ან ხვალ დილას, უკვე გამოვგზავნეთ იმეილი და WhatsApp ორი ვარიანტით: გადაწევა (უფასოდ) ან სრული დაბრუნება (უფასოდ). დაბრუნებისთვის აქტიური მოქმედება არ სჭირდება.",
    },
    category: "alert",
    author: "georgiawinter operations",
    publishedAt: "2026-09-28T11:12:00Z",
    isAlert: true,
    resort: "gudauri",
  },
];

/**
 * Hard rule: a published article cannot carry a future publishedAt. The CMS
 * will enforce this at save time; this check guards the TS-authored seed
 * data at build time.
 */
function assertNoFuturePublishDates(list: Article[], now = new Date()): void {
  const future = list.filter(
    (a) => !a.draft && new Date(a.publishedAt).getTime() > now.getTime(),
  );
  if (future.length > 0) {
    const slugs = future.map((a) => a.slug).join(", ");
    throw new Error(
      `Article(s) have a future publishedAt and are not marked draft: ${slugs}. ` +
        `Backdate or set draft: true. See docs/03-seo.md.`,
    );
  }
}

const allArticles = [...seedArticles, ...contentPages];
assertNoFuturePublishDates(allArticles);

export const articles: Article[] = allArticles.sort((a, b) =>
  a.publishedAt < b.publishedAt ? 1 : -1,
);
