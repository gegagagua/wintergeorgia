import type { Article } from "./types";

/**
 * First 10 pages from CONTENT-PLAN.md section A, scaffolded as drafts.
 *
 * Each entry has:
 *  - a strong one-sentence answer (shown as the lede)
 *  - a target query line
 *  - an FAQ block (3–5 Qs)
 *  - a matched CTA (route or resort)
 *
 * The long-form `body` is intentionally thin — the writer fills it in
 * before flipping `draft: false`.
 */

const E = (en: string) => ({ en, ru: en, ka: en });

export const contentPages: Article[] = [
  // 1. is-jvari-pass-open
  {
    slug: "is-jvari-pass-open",
    locale: "all",
    template: "qa",
    title: {
      en: "Is the Jvari Pass open today?",
      ru: "Крестовый перевал сегодня открыт?",
      ka: "ჯვრის უღელტეხილი დღეს ღიაა?",
    },
    excerpt: E(
      "Live road status for the Jvari Pass (Mtskheta → Gudauri → Kazbegi), plus what to do when it closes.",
    ),
    targetQuery: "is jvari pass open today",
    oneSentenceAnswer: {
      en: "The Jvari Pass road is open today, with the live status shown above and chains required above Kobi — but closures happen fast on avalanche days, so our status is refreshed by drivers on the pass every hour.",
      ru: "Крестовый перевал сегодня открыт — статус выше, выше Коби нужны цепи. Закрытия случаются быстро из-за лавин: мы обновляем статус от водителей на перевале каждый час.",
      ka: "ჯვრის უღელტეხილი დღეს ღიაა — სტატუსი ზემოთაა, კობის ზემოთ ჯაჭვები აუცილებელია. ზვავის დროს დახურვა მოულოდნელია: სტატუსი ყოველ საათში ვანახლებთ უღელტეხილზე მომუშავე მძღოლებისგან.",
    },
    body: E(""),
    faqs: [
      {
        q: E("What is the Jvari Pass?"),
        a: E(
          "The 2,379 m pass on the Georgian Military Road between Tbilisi and Vladikavkaz. Every winter road from Tbilisi to Gudauri or Kazbegi crosses it.",
        ),
      },
      {
        q: E("Who decides when to close it?"),
        a: E(
          "The Roads Department of Georgia, based on avalanche risk and weather. In practice they consult the drivers on the pass. Closures are usually overnight and reopen after the morning inspection at 08:00.",
        ),
      },
      {
        q: E("What happens to my transfer if the pass is closed?"),
        a: E(
          "Your booking is rescheduled or refunded in full with no fee. We WhatsApp you both options the moment the closure is announced.",
        ),
      },
    ],
    ctaRoute: "tbilisi-airport-gudauri",
    resort: "gudauri",
    category: "guide",
    topic: "conditions",
    author: "georgiawinter editorial",
    publishedAt: "2026-10-02T09:00:00Z",
    updatedAt: "2026-10-02T09:00:00Z",
    draft: true,
  },

  // 2. do-i-need-snow-chains-georgia
  {
    slug: "do-i-need-snow-chains-georgia",
    locale: "all",
    template: "qa",
    title: {
      en: "Do I need snow chains in Georgia?",
      ru: "Нужны ли цепи в Грузии зимой?",
      ka: "საჭიროა თოვლის ჯაჭვები საქართველოში?",
    },
    excerpt: E(
      "When chains are mandatory, when 4×4 is enough, and when neither is a good idea.",
    ),
    targetQuery: "do i need snow chains in georgia",
    oneSentenceAnswer: {
      en: "You need snow chains in winter on the Jvari Pass above Kobi, on the Goderdzi Pass from Batumi, and on the Tetnuldi access road — any booking with us carries them in the vehicle regardless of what the forecast says.",
      ru: "Зимой цепи обязательны на Крестовом перевале выше Коби, на перевале Годердзи из Батуми и на подъезде к Тетнулди — в наших машинах они есть всегда, независимо от прогноза.",
      ka: "ზამთარში ჯაჭვები აუცილებელია ჯვრის უღელტეხილზე კობის ზემოთ, გოდერძის უღელტეხილზე ბათუმიდან და თეთნულდის მისასვლელ გზაზე — ჩვენი ყველა მანქანა მათ ქონისას დამოუკიდებლად ატარებს პროგნოზისგან.",
    },
    body: E(""),
    faqs: [
      {
        q: E("Will a 4×4 without chains be fine?"),
        a: E(
          "On the Jvari Pass only when the Roads Department has not posted a chains sign. On the Goderdzi Pass: no — chains are mandatory from December to April.",
        ),
      },
      {
        q: E("Do I need to bring my own?"),
        a: E(
          "No. Every georgiawinter vehicle has winter tyres and chains checked each November. Your driver fits them if the pass requires it.",
        ),
      },
    ],
    ctaRoute: "tbilisi-airport-gudauri",
    category: "guide",
    topic: "gear",
    author: "georgiawinter editorial",
    publishedAt: "2026-07-15T09:00:00Z",
    updatedAt: "2026-09-30T09:00:00Z",
    draft: true,
  },

  // 3. tbilisi-to-gudauri-how-to-get-there
  {
    slug: "tbilisi-to-gudauri-how-to-get-there",
    locale: "all",
    template: "qa",
    title: {
      en: "How to get from Tbilisi to Gudauri",
      ru: "Как добраться из Тбилиси в Гудаури",
      ka: "როგორ ჩავიდეთ თბილისიდან გუდაურში",
    },
    excerpt: E(
      "Four options from fastest to cheapest, with real winter travel times, prices and the tradeoff.",
    ),
    targetQuery: "how to get from tbilisi to gudauri",
    oneSentenceAnswer: {
      en: "The fastest Tbilisi → Gudauri option in winter is a private transfer (about 2 h 15 for 160 GEL in a sedan); a shared marshrutka from Didube takes 2 h 40 and costs 15 GEL, but doesn't wait for your flight.",
      ru: "Самый быстрый вариант зимой — частный трансфер (около 2 ч 15 за 160 GEL в седане); маршрутка с Дидубе едет 2 ч 40 за 15 GEL, но не ждёт самолёт.",
      ka: "ყველაზე სწრაფი ზამთარში — ინდივიდუალური ტრანსფერი (დაახლ. 2 სთ 15 წთ, 160 GEL სედანში); მარშრუტკა დიდუბიდან მიდის 2 სთ 40-ში, 15 GEL ღირს, მაგრამ ფრენას არ ელოდება.",
    },
    body: E(""),
    faqs: [
      {
        q: E("How long does the drive take in good weather?"),
        a: E("Two hours door to door is typical, including a short stop at the viewpoint before the pass."),
      },
      {
        q: E("What about the marshrutka from Didube bus station?"),
        a: E(
          "Departs every 1–2 hours in winter from Didube station, 15 GEL, no reserved seats. Does not run late in the evening and does not meet flights.",
        ),
      },
      {
        q: E("Can I share a transfer to save money?"),
        a: E(
          "Yes — shared seats on the morning run are 35 GEL per seat. You share with other skiers heading up for the day.",
        ),
      },
    ],
    ctaRoute: "tbilisi-gudauri",
    resort: "gudauri",
    category: "guide",
    topic: "getting-there",
    author: "georgiawinter editorial",
    publishedAt: "2026-09-05T09:00:00Z",
    updatedAt: "2026-09-30T09:00:00Z",
    draft: true,
  },

  // 4. how-much-is-taxi-tbilisi-gudauri
  {
    slug: "how-much-is-taxi-tbilisi-gudauri",
    locale: "all",
    template: "qa",
    title: {
      en: "How much is a taxi from Tbilisi to Gudauri?",
      ru: "Сколько стоит такси из Тбилиси в Гудаури?",
      ka: "რამდენი ღირს ტაქსი თბილისიდან გუდაურამდე?",
    },
    excerpt: E(
      "Street-taxi quotes vs the fixed-price transfer: what you actually pay, and when the cheaper number is a trap.",
    ),
    targetQuery: "taxi tbilisi to gudauri price",
    oneSentenceAnswer: {
      en: "A street-hailed taxi from Tbilisi to Gudauri usually quotes 150–200 GEL in a sedan, but the real seasonal price with winter tyres and chains is 160 GEL — booked ahead so the driver does not haggle on arrival.",
      ru: "Уличное такси обычно просит 150–200 GEL за седан, реальная сезонная цена с зимней резиной и цепями — 160 GEL — заранее, чтобы не торговаться на месте.",
      ka: "ქუჩიდან აყვანილი ტაქსი ჩვეულებრივ 150–200 GEL ითხოვს, რეალური სეზონური ფასი ზამთრის საბურავებით და ჯაჭვებით — 160 GEL, წინასწარ, რომ მანქანაში ვაჭრობა არ იყოს.",
    },
    body: E(""),
    faqs: [
      {
        q: E("Is Bolt / Yandex cheaper?"),
        a: E(
          "In Tbilisi city, yes. For the Gudauri run most app drivers refuse the trip in winter because they lack winter tyres and chains.",
        ),
      },
    ],
    ctaRoute: "tbilisi-gudauri",
    resort: "gudauri",
    category: "price",
    topic: "prices",
    author: "georgiawinter editorial",
    publishedAt: "2026-09-20T09:00:00Z",
    updatedAt: "2026-09-30T09:00:00Z",
    draft: true,
  },

  // 5. is-gudauri-open-today
  {
    slug: "is-gudauri-open-today",
    locale: "all",
    template: "qa",
    title: {
      en: "Is Gudauri open today? Are the lifts running?",
      ru: "Гудаури сегодня работает? Подъёмники открыты?",
      ka: "გუდაური დღეს მუშაობს? საბაგიროები ჩართულია?",
    },
    excerpt: E(
      "Live lift and base status; what to do when wind closes the top but the base is spinning.",
    ),
    targetQuery: "is gudauri open today lifts working",
    oneSentenceAnswer: {
      en: "Gudauri's base lifts open from mid-December through mid-April; wind on the Sadzele ridge closes the top lift intermittently, in which case the beginner and intermediate zones usually keep running.",
      ru: "Гудаури работает с середины декабря до середины апреля; верхний Садзеле периодически закрывается из-за ветра, нижние и средние трассы, как правило, работают.",
      ka: "გუდაური მოქმედებს დეკემბრის შუა რიცხვებიდან აპრილის შუა რიცხვებამდე; ზედა საბაგირო სადძელე ქარით პერიოდულად იკეტება, დამწყებთა და საშუალო ზონები — ჩვეულებრივ გრძელდება.",
    },
    body: E(""),
    faqs: [],
    ctaResort: "gudauri",
    resort: "gudauri",
    category: "guide",
    topic: "conditions",
    author: "georgiawinter editorial",
    publishedAt: "2026-09-28T09:00:00Z",
    updatedAt: "2026-10-01T09:00:00Z",
    draft: true,
  },

  // 6. gudauri-lift-pass-price
  {
    slug: "gudauri-lift-pass-price",
    locale: "all",
    template: "qa",
    title: {
      en: "Gudauri lift pass prices for 2026/27",
      ru: "Ски-пасс Гудаури на сезон 2026/27",
      ka: "გუდაურის აბონემენტის ფასი 2026/27",
    },
    excerpt: E(
      "Day, multi-day, child and season passes — confirmed with the resort office.",
    ),
    targetQuery: "gudauri ski pass price",
    oneSentenceAnswer: {
      en: "The 2026/27 Gudauri day pass is 90 GEL (confirmed with the resort office, 5 Oct 2026); the week pass is 470 GEL and children under 6 are free with a paying adult.",
      ru: "На сезон 2026/27 дневной ски-пасс Гудаури — 90 GEL (подтверждено с офисом курорта 5 октября 2026); недельный — 470 GEL, дети до 6 лет бесплатно со взрослым.",
      ka: "2026/27 სეზონზე გუდაურის დღიური აბონემენტი — 90 GEL (დადასტურებული კურორტის ოფისთან 5 ოქტ 2026); კვირის — 470 GEL, 6 წლამდე ბავშვები უფასოდ ზრდასრულთან ერთად.",
    },
    body: E(""),
    faqs: [],
    ctaResort: "gudauri",
    resort: "gudauri",
    category: "price",
    topic: "prices",
    author: "georgiawinter editorial",
    publishedAt: "2026-10-05T09:00:00Z",
    updatedAt: "2026-10-05T09:00:00Z",
    draft: true,
  },

  // 7. how-long-tbilisi-to-gudauri
  {
    slug: "how-long-tbilisi-to-gudauri",
    locale: "all",
    template: "qa",
    title: {
      en: "How long does Tbilisi → Gudauri take in winter?",
      ru: "Сколько ехать из Тбилиси в Гудаури зимой?",
      ka: "რამდენი ხანი სჭირდება თბილისი–გუდაურის გზას ზამთარში?",
    },
    excerpt: E("Real winter times by weather, with the chain-up and police convoy penalties."),
    targetQuery: "how long does it take to gudauri",
    oneSentenceAnswer: {
      en: "In good weather Tbilisi → Gudauri is 2 h 15 min; expect 2 h 45 on a chain-up day and up to 3 h 30 if the pass runs a one-way convoy.",
      ru: "В хорошую погоду 2 ч 15 мин; в день, когда нужны цепи — 2 ч 45; при одностороннем конвое — до 3 ч 30.",
      ka: "კარგი ამინდით — 2 სთ 15 წთ; ჯაჭვების დღეს — 2 სთ 45 წთ; ცალმხრივი კონვოის დროს — 3 სთ 30 წთ-მდე.",
    },
    body: E(""),
    faqs: [],
    ctaRoute: "tbilisi-gudauri",
    resort: "gudauri",
    category: "guide",
    topic: "getting-there",
    author: "georgiawinter editorial",
    publishedAt: "2026-08-14T09:00:00Z",
    updatedAt: "2026-09-28T09:00:00Z",
    draft: true,
  },

  // 8. tbilisi-airport-night-arrival
  {
    slug: "tbilisi-airport-night-arrival",
    locale: "all",
    template: "qa",
    title: {
      en: "Arriving at Tbilisi Airport at night — how do I get to Gudauri?",
      ru: "Ночной прилёт в Тбилиси — как попасть в Гудаури?",
      ka: "ღამე ჩამოვფრინდი თბილისში — როგორ ავიდე გუდაურში?",
    },
    excerpt: E(
      "A pre-booked transfer meets late and delayed flights with a name sign. Marshrutkas and buses don't run after midnight.",
    ),
    targetQuery: "arriving at tbilisi airport at night how to get to gudauri",
    oneSentenceAnswer: {
      en: "A pre-booked transfer from Tbilisi Airport (TBS) to Gudauri is the only reliable late-night option — public marshrutkas stop around 22:00 and taxi drivers at the airport often refuse the Jvari Pass without winter tyres.",
      ru: "Единственный надёжный ночной вариант из аэропорта Тбилиси (TBS) в Гудаури — заранее заказанный трансфер: маршрутки останавливаются около 22:00, а таксисты у терминала часто отказываются ехать на перевал без зимней резины.",
      ka: "ერთადერთი საიმედო ვარიანტი ღამით თბილისის აეროპორტიდან (TBS) გუდაურამდე — წინასწარ დაჯავშნილი ტრანსფერი: მარშრუტკები ჩერდება დაახ. 22:00-ზე, ტერმინალთან ტაქსისტები ხშირად უარს ამბობენ ზამთრის საბურავების გარეშე.",
    },
    body: E(""),
    faqs: [],
    ctaRoute: "tbilisi-airport-gudauri",
    resort: "gudauri",
    category: "guide",
    topic: "getting-there",
    author: "georgiawinter editorial",
    publishedAt: "2026-09-14T09:00:00Z",
    updatedAt: "2026-09-30T09:00:00Z",
    draft: true,
  },

  // 9. can-you-drive-to-gudauri-yourself
  {
    slug: "can-you-drive-to-gudauri-yourself",
    locale: "all",
    template: "qa",
    title: {
      en: "Can I drive to Gudauri myself in winter?",
      ru: "Можно ли самому ехать в Гудаури зимой?",
      ka: "შეიძლება თვითონ ვიარო გუდაურში ზამთარში?",
    },
    excerpt: E(
      "The honest answer: yes if you have winter tyres and have driven alpine roads before — otherwise take a transfer.",
    ),
    targetQuery: "driving to gudauri in winter, is it safe",
    oneSentenceAnswer: {
      en: "You can drive yourself to Gudauri in winter in a 4×4 with proper winter tyres and chains, but if you have never driven alpine switchbacks in snow, a 160 GEL transfer is safer than any insurance deductible.",
      ru: "Самому в Гудаури зимой можно — на 4×4 с зимней резиной и цепями, — но если альпийский серпантин в снегу для вас в новинку, трансфер за 160 GEL безопаснее любой франшизы.",
      ka: "შეიძლება თვითონ იარო გუდაურში ზამთარში — 4×4-ით, ზამთრის საბურავებით და ჯაჭვებით — მაგრამ თუ ალპური სერპანტინი თოვლში პირველადაა, ტრანსფერი 160 GEL-ად უფრო უსაფრთხოა, ვიდრე რომელიმე ფრანშიზა.",
    },
    body: E(""),
    faqs: [],
    ctaRoute: "tbilisi-gudauri",
    resort: "gudauri",
    category: "guide",
    topic: "getting-there",
    author: "georgiawinter editorial",
    publishedAt: "2026-08-28T09:00:00Z",
    updatedAt: "2026-09-28T09:00:00Z",
    draft: true,
  },

  // 10. how-to-get-to-mestia-in-winter
  {
    slug: "how-to-get-to-mestia-in-winter",
    locale: "all",
    template: "qa",
    title: {
      en: "How to get to Mestia / Tetnuldi in winter",
      ru: "Как попасть в Местию и на Тетнулди зимой",
      ka: "როგორ ჩავიდეთ მესტია / თეთნულდში ზამთარში",
    },
    excerpt: E(
      "Overnight train to Zugdidi + 3 h shuttle, Kutaisi flight + 5 h transfer, or Natakhtari airstrip — compared.",
    ),
    targetQuery: "how to get to mestia / tetnuldi in winter",
    oneSentenceAnswer: {
      en: "The cheapest Mestia route in winter is the overnight train to Zugdidi (35 GEL) plus a 3-hour shuttle (250 GEL private, 30 GEL shared); the fastest is the Natakhtari airstrip flight when weather permits.",
      ru: "Самый дешёвый вариант зимой — ночной поезд в Зугдиди (35 GEL) + 3-часовой шаттл (250 GEL частный, 30 GEL место); самый быстрый — рейс с аэродрома Натахтари при хорошей погоде.",
      ka: "ყველაზე იაფი ზამთარში — ღამის მატარებელი ზუგდიდში (35 GEL) + 3-საათიანი შატლი (250 GEL პირადი, 30 GEL ადგილი); ყველაზე სწრაფი — ფრენა ნატახტარიდან კარგი ამინდის დროს.",
    },
    body: E(""),
    faqs: [],
    ctaRoute: "zugdidi-mestia",
    resort: "tetnuldi",
    category: "guide",
    topic: "getting-there",
    author: "georgiawinter editorial",
    publishedAt: "2026-08-02T09:00:00Z",
    updatedAt: "2026-09-28T09:00:00Z",
    draft: true,
  },
];
