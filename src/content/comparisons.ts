import type { I18n, ResortSlug, RouteSlug } from "./types";

export type ComparisonColumn = {
  label: I18n;
  resort?: ResortSlug;
  cta?: {
    route?: RouteSlug;
    resort?: ResortSlug;
    label: I18n;
  };
};

export type ComparisonRow = {
  label: I18n;
  values: I18n[];
};

export type ComparisonPage = {
  slug: string;
  topic: "resort-vs" | "best-for" | "when";
  title: I18n;
  intro: I18n;
  updatedAt: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  verdictByReader: Array<{ reader: I18n; verdict: I18n }>;
};

const T = (en: string, ru: string, ka: string): I18n => ({ en, ru, ka });

export const comparisons: ComparisonPage[] = [
  {
    slug: "gudauri-vs-bakuriani",
    topic: "resort-vs",
    updatedAt: "2026-10-05",
    title: T(
      "Gudauri vs Bakuriani — which Georgian ski resort is right for you",
      "Гудаури или Бакуриани — какой курорт Грузии выбрать",
      "გუდაური თუ ბაკურიანი — რომელი ქართული კურორტი ავირჩიოთ",
    ),
    intro: T(
      "The two big names in Georgian skiing. One is a wide-open high-altitude amphitheatre; the other is a resort village of four separated areas. Here is the honest comparison, built from the resort data we keep up to date.",
      "Два главных имени грузинского горнолыжного спорта. Один — просторная высокогорная «чаша»; другой — курортный посёлок с четырьмя отдельными зонами. Честное сравнение на основе наших актуальных данных.",
      "ქართული სათხილამურო სპორტის ორი უდიდესი სახელი. ერთი — ფართო მაღალმთიანი „ჩარჩო“; მეორე — ოთხი ცალკე ზონისგან შემდგარი კურორტი-სოფელი. პატიოსანი შედარება ჩვენი განახლებული მონაცემებით.",
    ),
    columns: [
      {
        label: T("Gudauri", "Гудаури", "გუდაური"),
        resort: "gudauri",
        cta: { route: "tbilisi-airport-gudauri", label: T("Book transfer to Gudauri", "Трансфер в Гудаури", "ტრანსფერი გუდაურში") },
      },
      {
        label: T("Bakuriani", "Бакуриани", "ბაკურიანი"),
        resort: "bakuriani",
        cta: { route: "tbilisi-bakuriani", label: T("Book transfer to Bakuriani", "Трансфер в Бакуриани", "ტრანსფერი ბაკურიანში") },
      },
    ],
    rows: [
      {
        label: T("Altitude (base — top)", "Высота (низ — верх)", "სიმაღლე (ქვევით — ზევით)"),
        values: [T("1,990 – 3,279 m", "1 990 – 3 279 м", "1,990 – 3,279 მ"), T("1,700 – 2,702 m", "1 700 – 2 702 м", "1,700 – 2,702 მ")],
      },
      {
        label: T("Groomed slopes", "Подготовленные трассы", "მოკირწყლული ტრასები"),
        values: [T("~75 km", "~75 км", "~75 კმ"), T("~45 km (across 4 areas)", "~45 км (4 зоны)", "~45 კმ (4 ზონა)")],
      },
      {
        label: T("Lifts", "Подъёмники", "საბაგიროები"),
        values: [T("8", "8", "8"), T("6", "6", "6")],
      },
      {
        label: T("Best for", "Для кого", "ვისთვის"),
        values: [
          T("Intermediates and freeriders on their first Caucasus trip.", "Райдеров среднего уровня и фрирайдеров, впервые на Кавказе.", "საშუალო დონის და ფრირაიდერი ვინც პირველად ჩამოდის კავკასიაში."),
          T("Families and first-timers who want a village, not just a mountain.", "Семьям и новичкам, которым нужен посёлок, а не только гора.", "ოჯახებს და დამწყებებს, ვისაც სოფელი უნდა, არა მხოლოდ მთა."),
        ],
      },
      {
        label: T("Transfer time from Tbilisi", "Трансфер из Тбилиси", "ტრანსფერი თბილისიდან"),
        values: [T("2 h 15 (120 km)", "2 ч 15 (120 км)", "2 სთ 15 (120 კმ)"), T("3 h 15 (180 km)", "3 ч 15 (180 км)", "3 სთ 15 (180 კმ)")],
      },
      {
        label: T("Village at the base", "Посёлок у подножия", "სოფელი ძირში"),
        values: [T("Thin — hotels and apartments on the ridge", "Условный — отели и апартаменты на хребте", "მოკრძალებული — სასტუმროები ქედზე"), T("Full-service village with rentals, schools, cafés, spa", "Полноценный посёлок: прокат, школы, кафе, спа", "სრული სოფელი: ქირავნობა, სკოლები, კაფეები, სპა")],
      },
      {
        label: T("Beginner-friendly", "Удобно начинающим", "დამწყებებისთვის"),
        values: [T("Yes, lower slopes only", "Да, только низ", "დიახ, მხოლოდ ქვედა ტრასები"), T("Yes, every area has a bunny slope", "Да, в каждой зоне есть учебка", "დიახ, ყველა ზონაში სასწავლო ტრასაა")],
      },
      {
        label: T("Freeride and above-treeline terrain", "Фрирайд и выше зоны леса", "ფრირაიდი ტყის ხაზის ზემოთ"),
        values: [T("Yes — the main draw", "Да — главная причина сюда ехать", "დიახ — მთავარი ფაქტორი"), T("Limited — stays close to the trees", "Ограничен — у границы леса", "შეზღუდული — ტყის ხაზთან")],
      },
    ],
    verdictByReader: [
      {
        reader: T("First-time skier with kids", "Впервые на лыжах с детьми", "პირველად თხილამურებზე ბავშვებით"),
        verdict: T(
          "Bakuriani. The village, the ski schools, and the four separated zones make it the forgiving option.",
          "Бакуриани. Посёлок, школы и четыре отдельные зоны делают его прощающим вариантом.",
          "ბაკურიანი. სოფელი, სკოლები და ოთხი ცალკე ზონა — მომრიგებელი არჩევანი.",
        ),
      },
      {
        reader: T("Intermediate skier chasing terrain", "Средний уровень, хочу рельеф", "საშუალო დონე, რელიეფს ვეძებ"),
        verdict: T(
          "Gudauri. More vertical, more above-treeline terrain, more options the moment the plough turn is behind you.",
          "Гудаури. Больше перепада, больше рельефа выше зоны леса — после плуга появляется куда расти.",
          "გუდაური. მეტი ვერტიკალი, მეტი რელიეფი ტყის ხაზის ზემოთ — plough-ის შემდეგ გასაზრდელი ადგილია.",
        ),
      },
      {
        reader: T("Freerider or ski-tourer", "Фрирайдер или ски-турщик", "ფრირაიდერი ან ski-tourer"),
        verdict: T(
          "Gudauri. Open bowls, nearby backcountry, and the easiest connection to Kazbegi for a rest-day drive.",
          "Гудаури. Открытые чаши, доступный бэккантри и короткий заезд в Казбеги на выходной.",
          "გუდაური. ღია ჩარჩოები, ხელმისაწვდომი ბექქანთრი და მოკლე გზა ყაზბეგისკენ გასართობი დღისთვის.",
        ),
      },
    ],
  },
  {
    slug: "best-georgian-resort-for-beginners",
    topic: "best-for",
    updatedAt: "2026-10-05",
    title: T(
      "Best Georgian ski resort for beginners",
      "Лучший курорт Грузии для начинающих",
      "საქართველოს საუკეთესო კურორტი დამწყებებისთვის",
    ),
    intro: T(
      "A beginner needs three things: a gentle learning slope, a working ski school, and a village to eat dinner in without a 30-minute drive. Here is how the Georgian resorts stack up against that filter.",
      "Начинающему нужны три вещи: мягкий учебный склон, работающая школа и посёлок, где поужинать без получасовой дороги. Как грузинские курорты проходят этот фильтр.",
      "დამწყებს სჭირდება სამი რამ: ნაზი სასწავლო ფერდი, მომუშავე სკოლა და სოფელი სადაც საჭმელი ახლოს არის. ქართული კურორტები ამ ფილტრთან.",
    ),
    columns: [
      {
        label: T("Bakuriani", "Бакуриани", "ბაკურიანი"),
        resort: "bakuriani",
        cta: { route: "tbilisi-bakuriani", label: T("Book transfer to Bakuriani", "Трансфер в Бакуриани", "ტრანსფერი ბაკურიანში") },
      },
      {
        label: T("Gudauri", "Гудаури", "გუდაური"),
        resort: "gudauri",
        cta: { route: "tbilisi-airport-gudauri", label: T("Book transfer to Gudauri", "Трансфер в Гудаури", "ტრანსფერი გუდაურში") },
      },
      {
        label: T("Hatsvali", "Хацвали", "ჰაცვალი"),
        resort: "hatsvali",
        cta: { resort: "hatsvali", label: T("Hatsvali guide", "Про Хацвали", "ჰაცვალის გზამკვლევი") },
      },
    ],
    rows: [
      {
        label: T("Gentle learning slope", "Учебный пологий склон", "ნაზი სასწავლო ფერდი"),
        values: [T("Yes — the Didveli bunny slope is textbook", "Да — учебка в Дидвели эталонная", "დიახ — დიდველის სასწავლო ტრასა საცნობი"), T("Yes — the lower blues at the base", "Да — синие внизу", "დიახ — ქვედა ლურჯი ტრასები"), T("Short, but adequate for day one", "Короткая, но достаточна на первый день", "მოკლე, მაგრამ პირველი დღისთვის საკმარისი")],
      },
      {
        label: T("Ski schools", "Школы", "სკოლები"),
        values: [T("Many, Georgian + English + Russian", "Много, грузинский + английский + русский", "ბევრი, ქართული + ინგლისური + რუსული"), T("Several, mostly English", "Несколько, в основном английский", "რამდენიმე, ძირითადად ინგლისური"), T("One, Georgian + Russian", "Одна, грузинский + русский", "ერთი, ქართული + რუსული")],
      },
      {
        label: T("Village at the base", "Посёлок у подножия", "სოფელი ძირში"),
        values: [T("Yes", "Да", "დიახ"), T("No — the resort is on the ridge", "Нет — курорт на хребте", "არა — კურორტი ქედზეა"), T("No — you sleep in Mestia", "Нет — ночуют в Местии", "არა — ღამე მესტიაში")],
      },
      {
        label: T("Transfer from Tbilisi", "Трансфер из Тбилиси", "ტრანსფერი თბილისიდან"),
        values: [T("3 h 15", "3 ч 15", "3 სთ 15"), T("2 h 15", "2 ч 15", "2 სთ 15"), T("~9 h via Mestia", "~9 ч через Местию", "~9 სთ მესტიის გავლით")],
      },
    ],
    verdictByReader: [
      {
        reader: T("First-time skier, no kids", "Впервые на лыжах, без детей", "პირველად, ბავშვების გარეშე"),
        verdict: T(
          "Bakuriani. Dinner at the base, lessons in the morning, nothing on the agenda to intimidate you.",
          "Бакуриани. Ужин у подножия, школа утром — и никакого рельефа, который пугает.",
          "ბაკურიანი. ვახშამი ძირში, გაკვეთილი დილით, არაფერი რაც შეგაშინებს.",
        ),
      },
      {
        reader: T("Family with young children", "Семья с маленькими детьми", "ოჯახი პატარა ბავშვებით"),
        verdict: T(
          "Bakuriani. Four small areas means you can match the kids to the terrain, not the other way round.",
          "Бакуриани. Четыре маленькие зоны — проще подобрать склон под детей, а не наоборот.",
          "ბაკურიანი. ოთხი პატარა ზონა — ბავშვებს ფერდი ეარგოთ და არა პირიქით.",
        ),
      },
      {
        reader: T("A couple that just wants fewer travel hours", "Пара, которой важнее меньше времени в пути", "წყვილი ვისაც გზაში ნაკლები დრო სურს"),
        verdict: T(
          "Gudauri. Two hours door-to-door, booked ahead the night before.",
          "Гудаури. Два часа дверь в дверь, забронированный с вечера.",
          "გუდაური. ორი საათი კარიდან კარამდე, საღამოდან დაჯავშნილი.",
        ),
      },
    ],
  },
  {
    slug: "tetnuldi-vs-gudauri",
    topic: "resort-vs",
    updatedAt: "2026-10-05",
    title: T(
      "Tetnuldi vs Gudauri — big mountain or short drive",
      "Тетнулди или Гудаури — большая гора или короткий трансфер",
      "თეთნულდი თუ გუდაური — დიდი მთა თუ მოკლე გზა",
    ),
    intro: T(
      "Tetnuldi is bigger, quieter and higher. Gudauri is faster to reach, denser with services, and takes a weather hit less often. Which trade-off is right for your week?",
      "Тетнулди больше, тише, выше. Гудаури быстрее, с инфраструктурой и реже страдает от погоды. Какой компромисс подходит именно вам?",
      "თეთნულდი უფრო დიდი, მშვიდი და მაღალია. გუდაური — უფრო სწრაფი, უფრო დატვირთული სერვისებით და ამინდის დარტყმასაც ნაკლებად განიცდის. რომელი კომპრომისი უფრო გარგოთ?",
    ),
    columns: [
      {
        label: T("Tetnuldi", "Тетнулди", "თეთნულდი"),
        resort: "tetnuldi",
        cta: { route: "mestia-tetnuldi", label: T("Daily shuttle from Mestia", "Шаттл из Местии", "შატლი მესტიიდან") },
      },
      {
        label: T("Gudauri", "Гудаури", "გუდაური"),
        resort: "gudauri",
        cta: { route: "tbilisi-airport-gudauri", label: T("Airport transfer", "Трансфер из аэропорта", "ტრანსფერი აეროპორტიდან") },
      },
    ],
    rows: [
      {
        label: T("Top altitude", "Высота вверху", "მწვერვალის სიმაღლე"),
        values: [T("3,165 m", "3 165 м", "3,165 მ"), T("3,279 m", "3 279 м", "3,279 მ")],
      },
      {
        label: T("Groomed km", "Трассы", "მოკირწყლული ტრასები"),
        values: [T("~25 km (long reds)", "~25 км (длинные красные)", "~25 კმ (გრძელი წითელი)"), T("~75 km", "~75 км", "~75 კმ")],
      },
      {
        label: T("Lifts", "Подъёмники", "საბაგიროები"),
        values: [T("4", "4", "4"), T("8", "8", "8")],
      },
      {
        label: T("Lift queues", "Очереди на подъёмник", "საბაგიროზე რიგი"),
        values: [T("Rare — the resort is remote", "Почти нет — курорт удалённый", "თითქმის არა — კურორტი შორია"), T("Peak days: 10–20 min", "Пиковые дни: 10–20 мин", "პიკური დღეები: 10–20 წთ")],
      },
      {
        label: T("Travel time from TBS airport", "От TBS", "TBS-დან"),
        values: [T("~9 h (train + shuttle) or 1 h flight to Natakhtari", "~9 ч (поезд + шаттл) или 1 ч на Натахтари", "~9 სთ (მატარებელი + შატლი) ან 1 სთ ფრენა ნატახტარში"), T("~2 h 15 (direct road)", "~2 ч 15 (прямая дорога)", "~2 სთ 15 (პირდაპირ გზაზე)")],
      },
      {
        label: T("Base amenities", "Инфраструктура у подножия", "ინფრასტრუქტურა ძირში"),
        values: [T("None at the base — eat and sleep in Mestia", "Ничего у подножия — живут в Местии", "არაფერი ძირში — სადგომი მესტიაშია"), T("Hotels, cafés, rentals on the ridge", "Отели, кафе, прокат на хребте", "სასტუმროები, კაფეები, ქირავნობა ქედზე")],
      },
    ],
    verdictByReader: [
      {
        reader: T("Short Caucasus trip (3–4 days)", "Короткая поездка (3–4 дня)", "მოკლე მოგზაურობა (3–4 დღე)"),
        verdict: T(
          "Gudauri. The travel day you lose getting to Mestia hurts.",
          "Гудаури. День в дороге до Местии — слишком дорого на короткую поездку.",
          "გუდაური. მესტიამდე მისაღწევი დრო მოკლე მოგზაურობისთვის ძვირია.",
        ),
      },
      {
        reader: T("Full week, want a Caucasus adventure", "Полная неделя, настоящее Кавказское приключение", "სრული კვირა, ნამდვილი კავკასიური თავგადასავალი"),
        verdict: T(
          "Tetnuldi. Pair it with a Mestia tower-village stay — the trip you came for.",
          "Тетнулди. Сочетайте с ночёвкой в Местии — ради этого и ехали.",
          "თეთნულდი. მოიუსრეთ მესტიის კოშკების სოფელი — სწორედ ამისთვის ჩამოდით.",
        ),
      },
    ],
  },
  {
    slug: "when-to-ski-in-georgia",
    topic: "when",
    updatedAt: "2026-10-05",
    title: T(
      "When to ski in Georgia — month-by-month",
      "Когда ехать кататься в Грузию — по месяцам",
      "როდის ვისრიალოთ საქართველოში — თვეების მიხედვით",
    ),
    intro: T(
      "Georgia's season runs from early December to late April. Base snow, crowds and prices move in predictable ways; here is the honest picture by month, so you can match the trip to the dates.",
      "Сезон в Грузии: с начала декабря до конца апреля. Снежная база, толпы и цены двигаются предсказуемо. Честная картина по месяцам — чтобы подобрать поездку под даты.",
      "სეზონი საქართველოში: დეკემბრის დასაწყისიდან აპრილის ბოლომდე. თოვლის საფარი, ხალხი და ფასები — პროგნოზირებადად მოძრაობენ. პატიოსანი სურათი თვეების მიხედვით.",
    ),
    columns: [
      { label: T("Early (Dec)", "Старт (дек)", "დეკემბერი") },
      { label: T("High (Jan–Feb)", "Разгар (янв–фев)", "იანვარ–თებერვალი") },
      { label: T("Powder (Feb–Mar)", "Паудер (фев–мар)", "თებერვალ–მარტი") },
      { label: T("Spring (Apr)", "Весна (апр)", "აპრილი") },
    ],
    rows: [
      {
        label: T("Base snow", "База снега", "თოვლის საფარი"),
        values: [T("Thin, lower slopes only", "Тонкая, только внизу", "თხელი, მხოლოდ ქვევით"), T("Reliable, full mountain", "Устойчивая, вся гора", "სტაბილური, მთელი მთა"), T("Deepest of the year", "Глубокий — максимум сезона", "ყველაზე ღრმა"), T("Softening — ski by 13:00", "Таящий — до 13:00", "ლბება — 13:00-მდე")],
      },
      {
        label: T("Crowds", "Народу", "ხალხი"),
        values: [T("Thin", "Мало", "ცოტა"), T("Peak (New Year, Christmas weeks)", "Пик (НГ, Рождество)", "პიკი (ახალი წელი, შობა)"), T("Lower midweek", "Среди недели меньше", "შუა კვირაში ნაკლები"), T("Thin again", "Опять мало", "ისევ ცოტა")],
      },
      {
        label: T("Transfer prices", "Цены на трансфер", "ტრანსფერის ფასი"),
        values: [T("Normal", "Обычные", "ჩვეულებრივი"), T("Normal, book ahead", "Обычные, бронируйте заранее", "ჩვეულებრივი, წინასწარ დაჯავშნეთ"), T("Normal", "Обычные", "ჩვეულებრივი"), T("Normal", "Обычные", "ჩვეულებრივი")],
      },
      {
        label: T("Lift tickets", "Ски-пасс", "აბონემენტი"),
        values: [T("Early-bird in effect at Gudauri", "Early-bird в Гудаури", "early-bird გუდაურში"), T("Full-season price", "Полная цена", "სრული ფასი"), T("Full-season price", "Полная цена", "სრული ფასი"), T("End-of-season discounts possible", "Возможны скидки на закрытие", "სეზონის ბოლო ფასდაკლებები შესაძლებელია")],
      },
    ],
    verdictByReader: [
      {
        reader: T("Family holiday without school conflict", "Семья, нужны школьные каникулы", "ოჯახი, სკოლის არდადეგები"),
        verdict: T(
          "Last week of December or first week of January — book transfer 4+ weeks ahead.",
          "Последняя неделя декабря или первая января — трансфер за 4+ недели.",
          "დეკემბრის ბოლო ან იანვრის პირველი კვირა — ტრანსფერი 4+ კვირით ადრე.",
        ),
      },
      {
        reader: T("Powder-chasing freerider", "Фрирайдер за пудером", "ფრირაიდერი რომელიც პაუდერს ეძებს"),
        verdict: T(
          "Mid-February to mid-March at Gudauri or Goderdzi.",
          "С середины февраля до середины марта: Гудаури или Годердзи.",
          "თებერვლის შუა რიცხვებიდან მარტის შუა რიცხვებამდე: გუდაური ან გოდერძი.",
        ),
      },
      {
        reader: T("Budget-conscious couple, don't mind spring", "Бюджетная пара, не против весны", "ბიუჯეტური წყვილი, გაზაფხულზე წინააღმდეგი არ არის"),
        verdict: T(
          "First two weeks of April — soft snow, empty lifts, discounted passes.",
          "Первые две недели апреля — мягкий снег, пустые подъёмники, скидки.",
          "აპრილის პირველი ორი კვირა — რბილი თოვლი, ცარიელი საბაგიროები, ფასდაკლებები.",
        ),
      },
    ],
  },
];

export function findComparison(slug: string) {
  return comparisons.find((c) => c.slug === slug);
}
