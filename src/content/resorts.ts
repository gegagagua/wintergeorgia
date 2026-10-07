import type { Resort } from "./types";

export const resorts: Resort[] = [
  {
    slug: "gudauri",
    name: { en: "Gudauri", ru: "Гудаури", ka: "გუდაური" },
    region: "Mtskheta-Mtianeti",
    altMinM: 1990,
    altMaxM: 3279,
    slopeKm: 75,
    liftsTotal: 8,
    seasonFrom: "2026-12-01",
    seasonTo: "2027-04-15",
    hero: "gudauri",
    lat: 42.4794,
    lng: 44.4816,
    isLiftResort: true,
    description: {
      en: "Gudauri is Georgia's largest lift-served resort, an open-mountain amphitheatre two hours from Tbilisi. Wide beginner pistes on the lower slopes, real above-treeline freeriding higher up, and a growing paragliding scene make it the default first-week choice for most visitors.",
      ru: "Гудаури — крупнейший в Грузии горнолыжный курорт с подъёмниками, открытая горная чаша в двух часах от Тбилиси. Широкие учебные трассы внизу, настоящий фрирайд выше зоны леса и активная парапланерная сцена делают его выбором по умолчанию для большинства гостей на первую неделю.",
      ka: "გუდაური საქართველოს ყველაზე დიდი საბაგირო კურორტია — ღია მთის ამფითეატრი თბილისიდან ორ საათში. ფართო დამწყებთა ტრასები ქვედა ფერდობებზე, ნამდვილი ფრირაიდი ტყის ხაზის ზემოთ და მზარდი პარაპლანერული სცენა მას სტუმრების უმეტესობისთვის პირველი კვირის ნაგულისხმევ არჩევანად აქცევს.",
    },
    highlights: [
      {
        en: "Above-treeline terrain, wide freeride bowls",
        ru: "Рельеф выше зоны леса, широкие фрирайд-чаши",
        ka: "ტყის ხაზის ზემოთ რელიეფი, ფართო ფრირაიდის ჩარჩოები",
      },
      {
        en: "New Kudebi lift extends the top-station terrain",
        ru: "Новый подъёмник Кудеби расширяет верхнюю зону",
        ka: "ახალი კუდების საბაგირო აფართოებს ზედა ზონას",
      },
      {
        en: "Two hours from Tbilisi on the Jvari Pass",
        ru: "Два часа от Тбилиси по Крестовому перевалу",
        ka: "ორი საათი თბილისიდან ჯვრის უღელტეხილით",
      },
    ],
    bestFor: {
      en: "Intermediates and freeriders on their first Caucasus trip.",
      ru: "Райдеров среднего уровня и фрирайдеров, впервые едущих на Кавказ.",
      ka: "საშუალო დონის მოთხილამურეებისა და ფრირაიდერებისთვის, ვინც პირველად ჩამოდის კავკასიაში.",
    },
    terrain: { beginner: 30, intermediate: 45, advanced: 25 },
    longestRunKm: 7,
    verticalDropM: 1289,
    lifts: [
      { name: "Sadzele chair", kind: "chair", capacity: 2400, hours: "09:00–17:00" },
      { name: "Kudebi chair", kind: "chair", capacity: 2000, hours: "09:00–17:00" },
      { name: "New Gudauri gondola", kind: "gondola", capacity: 3000, hours: "09:00–17:00" },
      { name: "Beginner conveyor", kind: "conveyor", capacity: 1200, hours: "09:00–17:00" },
    ],
    parkingNote: {
      en: "Free parking at the base of New Gudauri and the Sadzele lift. On peak days, arrive before 09:00 or park at the Military Road pull-off and walk 400 m.",
      ru: "Бесплатная парковка у Нью-Гудаури и подъёмника Садзеле. В пиковые дни приезжайте до 09:00 либо оставьте машину у расширения Военно-Грузинской дороги и 400 м пешком.",
      ka: "უფასო პარკინგი ახალ გუდაურთან და სადძელეს საბაგიროსთან. პიკური დღეები — 09:00-მდე ან სამხედრო გზის ბოლოში, 400 მ ფეხით.",
    },
    faqs: [
      {
        q: { en: "Is Gudauri good for beginners?", ru: "Подходит ли Гудаури новичкам?", ka: "გუდაური ვარგა დამწყებებისთვის?" },
        a: {
          en: "Yes, on the lower slopes. The beginner conveyor and the lower Sadzele blues are gentle; the top-station reds and above-treeline terrain are not for a first week.",
          ru: "Да, но только внизу. Учебный конвейер и нижние синие Садзеле — мягкие; верхние красные и выше зоны леса — не для первой недели.",
          ka: "დიახ, ქვევით. დამწყებთა კონვეიერი და სადძელეს ქვედა ლურჯი ტრასები ნაზია; ზედა წითელი და ტყის ხაზის ზემოთ რელიეფი პირველი კვირისთვის არ ვარგა.",
        },
      },
      {
        q: { en: "When does Gudauri open?", ru: "Когда открывается Гудаури?", ka: "როდის იხსნება გუდაური?" },
        a: {
          en: "Early December in good snow years, mid-December in average ones. The 2026/27 season opens on 1 December with Sadzele, Kudebi and the beginner conveyor; the New Gudauri gondola joins on 20 December after its annual inspection.",
          ru: "В начале декабря — в снежные годы, в середине — в обычные. Сезон 2026/27 открывается 1 декабря (Садзеле, Кудеби, учебка); гондола Нью-Гудаури — с 20 декабря после техосмотра.",
          ka: "დეკემბრის დასაწყისში — თოვლიან წლებში, შუა რიცხვებში — ჩვეულებრივ. 2026/27 სეზონი 1 დეკემბრიდან იხსნება (სადძელე, კუდები, სასწავლო); ახალი გუდაურის გონდოლა 20 დეკემბრიდან, ტექდათვალიერების შემდეგ.",
        },
      },
      {
        q: { en: "How much is a lift pass?", ru: "Сколько стоит ски-пасс?", ka: "რამდენი ღირს აბონემენტი?" },
        a: {
          en: "90 GEL for the day pass in the 2026/27 season (+5 GEL vs last year). 470 GEL for the week; children under 6 free with a paying adult.",
          ru: "Дневной — 90 GEL в сезоне 2026/27 (+5 GEL к прошлому). Недельный — 470 GEL; дети до 6 лет бесплатно со взрослым.",
          ka: "დღიური — 90 GEL 2026/27 სეზონში (გასულ წელთან +5 GEL). კვირის — 470 GEL; 6 წლამდე ბავშვები უფასოდ ზრდასრულთან.",
        },
      },
      {
        q: { en: "Where should I rent gear?", ru: "Где брать прокат?", ka: "სად ვიქირაო აღჭურვილობა?" },
        a: {
          en: "The base-of-lift shops at Sadzele have the widest selection; prices are 30–40 GEL/day for the full set. Shops in the village (closer to the hotels on the ridge) are slightly cheaper and never run out of boots.",
          ru: "У подъёмника Садзеле — самый большой выбор, 30–40 GEL в день за полный комплект. В посёлке у хребта — чуть дешевле и всегда есть ботинки.",
          ka: "სადძელეს საბაგიროს ძირში — უდიდესი არჩევანი, 30–40 GEL დღეში სრული კომპლექტისთვის. ქედთან მდებარე მაღაზიები — ოდნავ იაფი და ფეხსაცმელი ყოველთვის აქვთ.",
        },
      },
      {
        q: { en: "Can I rent in Tbilisi and bring my own kit?", ru: "Можно ли арендовать в Тбилиси?", ka: "შემიძლია თბილისში ვიქირაო?" },
        a: {
          en: "Yes — two Tbilisi shops rent full sets for the week. Our vehicles carry a ski-rack for 3+ sets as a paid extra.",
          ru: "Да — в Тбилиси пара прокатов выдаёт комплекты на неделю. Для 3+ комплектов добавьте «лыжный багажник» при бронировании.",
          ka: "დიახ — თბილისში ორი მაღაზია ქირაობს კომპლექტებს კვირის ვადით. 3+ კომპლექტისთვის დაჯავშნისას „თხილამურის ჯიხური“ ემატება.",
        },
      },
      {
        q: { en: "What is parking like?", ru: "Как с парковкой?", ka: "როგორია პარკინგი?" },
        a: {
          en: "Free lots at New Gudauri and Sadzele. On peak days (New Year, long weekends), get there before 09:00 or park along the road and walk a few minutes.",
          ru: "Бесплатные стоянки у Нью-Гудаури и Садзеле. В пик — до 09:00 или вдоль дороги с коротким пешком.",
          ka: "უფასო პარკინგი ახალ გუდაურთან და სადძელესთან. პიკში — 09:00-მდე ან გზის გასწვრივ ფეხით.",
        },
      },
      {
        q: { en: "Is there backcountry access?", ru: "Есть ли бэккантри?", ka: "არის ბექქანთრი?" },
        a: {
          en: "Yes — the Kobi backcountry opens off the top station and the Chrdili ridge is a classic ski-tour. Guide required for both; the terrain is avalanche-prone and the local patrol does not sweep off-piste.",
          ru: "Да — бэккантри Коби из верхней станции и хребет Чрдили (классика ски-тура). Гид обязателен: лавиноопасно, патруль за трассами не ищет.",
          ka: "დიახ — კობის ბექქანთრი ზედა სადგურიდან და ჩრდილის ქედი — ski-tour-ის კლასიკა. გიდი აუცილებელი: ზვავური, პატრული ტრასის გარეთ არ ჩამოდის.",
        },
      },
      {
        q: { en: "What if the wind closes the top lift?", ru: "А если верхний закрыт из-за ветра?", ka: "თუ ზედა საბაგიროს ქარი დახურავს?" },
        a: {
          en: "Lower Sadzele and the New Gudauri gondola usually keep running. On wind-closure days the resort posts a sign at the base and refunds the top-ticket upgrade.",
          ru: "Нижний Садзеле и гондола Нью-Гудаури обычно продолжают работать. В такой день курорт возвращает доплату за верх.",
          ka: "ქვედა სადძელე და ახალი გუდაურის გონდოლა ჩვეულებრივ მუშაობენ. კურორტი ხელშეკრულებით აბრუნებს ზედა ბილეთის სხვაობას.",
        },
      },
    ],
  },
  {
    slug: "bakuriani",
    name: { en: "Bakuriani", ru: "Бакуриани", ka: "ბაკურიანი" },
    region: "Samtskhe-Javakheti",
    altMinM: 1700,
    altMaxM: 2702,
    slopeKm: 45,
    liftsTotal: 6,
    seasonFrom: "2026-12-15",
    seasonTo: "2027-04-01",
    hero: "bakuriani",
    lat: 41.7469,
    lng: 43.5311,
    isLiftResort: true,
    description: {
      en: "Bakuriani is where Georgian families learn to ski. Gentler terrain than Gudauri, several separated ski areas (Didveli, Kokhta, Mitarbi, 25) connected by shuttle, and a full village at the base with rentals, schools and cafés. Hosted the 2023 FIS Freestyle World Championships.",
      ru: "Бакуриани — то место, где грузинские семьи учатся кататься. Мягче рельефа, чем в Гудаури, несколько отдельных зон катания (Дидвели, Кохта, Митарби, 25), соединённых шаттлом, и полноценный посёлок у подножия с прокатом, школами и кафе. Здесь прошёл ЧМ FIS по фристайлу 2023.",
      ka: "ბაკურიანი — სადაც ქართული ოჯახები სწავლობენ თხილამურებით სრიალს. გუდაურთან შედარებით ნაზი რელიეფი, რამდენიმე ცალკე ზონა (დიდველი, კოხტა, მიტარბი, 25) შატლით დაკავშირებული, და სრული სოფელი ძირში ქირავნობით, სკოლებით და კაფეებით. აქ ჩატარდა FIS-ის 2023 წლის ფრისტაილის მსოფლიო ჩემპიონატი.",
    },
    highlights: [
      {
        en: "Four separated ski areas, all beginner-friendly at the base",
        ru: "Четыре отдельные зоны, все с учебными трассами у подножия",
        ka: "ოთხი ცალკე ზონა, ყველა დამწყებთათვის ხელსაყრელი ძირში",
      },
      {
        en: "Full-service village: rentals, schools, restaurants, spa",
        ru: "Полноценный посёлок: прокат, школы, рестораны, спа",
        ka: "სრული სოფელი: ქირავნობა, სკოლები, რესტორნები, სპა",
      },
      {
        en: "Narrow-gauge train from Borjomi is a genuine attraction",
        ru: "Узкоколейка из Боржоми — настоящий аттракцион",
        ka: "ვიწროლიანდაგიანი მატარებელი ბორჯომიდან — ცალკე ატრაქციონია",
      },
    ],
    bestFor: {
      en: "Families and first-timers who want a village, not just a mountain.",
      ru: "Семьям и новичкам, которым нужен посёлок, а не только гора.",
      ka: "ოჯახებისთვის და დამწყებთათვის, ვისაც სოფელი უნდა, არა მარტო მთა.",
    },
  },
  {
    slug: "tetnuldi",
    name: { en: "Tetnuldi", ru: "Тетнулди", ka: "თეთნულდი" },
    region: "Samegrelo-Zemo Svaneti",
    altMinM: 2265,
    altMaxM: 3165,
    slopeKm: 25,
    liftsTotal: 4,
    seasonFrom: "2026-12-20",
    seasonTo: "2027-04-30",
    hero: "tetnuldi",
    lat: 43.0292,
    lng: 42.9861,
    isLiftResort: true,
    description: {
      en: "Tetnuldi is the high, quiet resort above Mestia in Upper Svaneti. Long groomed reds, uncrowded lifts, and off-piste that opens straight from the top station. The catch: the access road is 4x4 only and there is nothing at the base — you sleep and eat in Mestia and shuttle up each day.",
      ru: "Тетнулди — высокий и малолюдный курорт над Местией в Верхней Сванетии. Длинные красные трассы, свободные подъёмники и фрирайд прямо с верхней станции. Минус: дорога наверх только для 4x4, а внизу нет ничего — жить и есть надо в Местии, а до горы ехать шаттлом.",
      ka: "თეთნულდი — მაღალი და მშვიდი კურორტი მესტიის ზემოთ ზემო სვანეთში. გრძელი წითელი ტრასები, თავისუფალი საბაგიროები და ფრირაიდი პირდაპირ ზედა სადგურიდან. ცუდი მხარე: გზა მხოლოდ 4x4-ისთვისაა და ძირში არაფერია — უნდა იცხოვრო და ჭამო მესტიაში და ყოველდღე შატლით ავიდე.",
    },
    highlights: [
      {
        en: "Highest lift-served skiing in Georgia",
        ru: "Самое высокогорное катание на подъёмниках в Грузии",
        ka: "ყველაზე მაღალი საბაგირო თხილამურობა საქართველოში",
      },
      {
        en: "Long, uncrowded reds through open bowls",
        ru: "Длинные малолюдные красные по открытым чашам",
        ka: "გრძელი, ცოტამოსახლიანი წითელი ტრასები ღია ჩარჩოებში",
      },
      {
        en: "Sleep in Mestia — a UNESCO tower village",
        ru: "Ночёвка в Местии — деревне-крепости из списка ЮНЕСКО",
        ka: "ღამე მესტიაში — იუნესკოს კოშკის სოფელში",
      },
    ],
    bestFor: {
      en: "Confident intermediates who want big terrain and no crowds.",
      ru: "Уверенным райдерам, которым нужны большие склоны и минимум народу.",
      ka: "თავდაჯერებული საშუალო დონის მოთხილამურეებისთვის, ვისაც დიდი რელიეფი და ცოტა ხალხი უნდა.",
    },
  },
  {
    slug: "hatsvali",
    name: { en: "Hatsvali", ru: "Хацвали", ka: "ჰაცვალი" },
    region: "Samegrelo-Zemo Svaneti",
    altMinM: 1860,
    altMaxM: 2347,
    slopeKm: 4,
    liftsTotal: 2,
    seasonFrom: "2026-12-15",
    seasonTo: "2027-03-30",
    hero: "hatsvali",
    lat: 43.0272,
    lng: 42.6994,
    isLiftResort: true,
    description: {
      en: "Hatsvali is the smaller resort ten minutes from Mestia — one gondola, one lift, a mid-station café. Perfect first day for anyone based in Mestia to test the legs and the snow before committing to a full Tetnuldi day.",
      ru: "Хацвали — маленький курорт в десяти минутах от Местии: одна гондола, один подъёмник, кафе на середине. Идеальный первый день для тех, кто живёт в Местии, чтобы проверить ноги и снег перед полноценным днём на Тетнулди.",
      ka: "ჰაცვალი — პატარა კურორტი მესტიიდან ათი წუთის სავალზე: ერთი გონდოლა, ერთი საბაგირო, კაფე შუაში. სრულყოფილი პირველი დღე ვინც მესტიაშია დაბინავებული, ფეხების და თოვლის შესამოწმებლად, სანამ სრულ დღეს გაატარებ თეთნულდზე.",
    },
    highlights: [
      {
        en: "Ten minutes from Mestia — day-trip friendly",
        ru: "Десять минут от Местии — удобно на день",
        ka: "ათი წუთი მესტიიდან — ერთდღიური მოგზაურობა",
      },
      {
        en: "Café at mid-station with the Ushba view",
        ru: "Кафе на середине с видом на Ушбу",
        ka: "კაფე შუა სადგურზე უშბის ხედით",
      },
    ],
    bestFor: {
      en: "A short warm-up day between Mestia and Tetnuldi.",
      ru: "Короткий разминочный день между Местией и Тетнулди.",
      ka: "მოკლე გასათბობი დღე მესტიასა და თეთნულდს შორის.",
    },
  },
  {
    slug: "goderdzi",
    name: { en: "Goderdzi", ru: "Годердзи", ka: "გოდერძი" },
    region: "Adjara",
    altMinM: 2025,
    altMaxM: 2390,
    slopeKm: 6,
    liftsTotal: 2,
    seasonFrom: "2027-01-01",
    seasonTo: "2027-04-15",
    hero: "goderdzi",
    lat: 41.6353,
    lng: 42.4894,
    isLiftResort: true,
    description: {
      en: "Goderdzi is Georgia's snowiest resort. Weather off the Black Sea dumps meters at a time onto tree-line terrain that is groomed but also ripe for cat-skiing and ski-touring. The catch: the road from Batumi is 4x4 only in winter and takes four hours.",
      ru: "Годердзи — самый снежный курорт Грузии. Черноморская погода валит по несколько метров зараз на террейн вокруг зоны леса, который есть и подготовленный, и созревший для кэт-ски и ски-тура. Минус: дорога из Батуми зимой только для 4x4 и занимает четыре часа.",
      ka: "გოდერძი — საქართველოს ყველაზე თოვლიანი კურორტი. შავი ზღვის ამინდი ჩამოგდის მეტრობით თოვლს ტყის ხაზის რელიეფზე, რომელიც არის მოკირწყლული და მზადაა cat-ski-სთვის და ტურინგისთვის. ცუდი მხარე: გზა ბათუმიდან ზამთარში მხოლოდ 4x4-ისთვისაა და ოთხ საათს იკავებს.",
    },
    highlights: [
      {
        en: "Deepest snow in the country — Atlantic feeds",
        ru: "Самый глубокий снег в стране — атлантические потоки",
        ka: "უღრმესი თოვლი ქვეყანაში — ატლანტიკური ჰაერი",
      },
      {
        en: "Cat-skiing and ski-touring straight from the parking",
        ru: "Кэт-ски и ски-тур прямо от парковки",
        ka: "Cat-ski და ski-touring პარკინგიდან პირდაპირ",
      },
    ],
    bestFor: {
      en: "Powder hunters who don't mind a hard drive in.",
      ru: "Пудрхантерам, которых не пугает тяжёлый заезд.",
      ka: "პაუდერზე მონადირეებისთვის, ვისაც რთული გზა არ აშინებს.",
    },
  },
  {
    slug: "kazbegi",
    name: { en: "Kazbegi", ru: "Казбеги", ka: "ყაზბეგი" },
    region: "Mtskheta-Mtianeti",
    altMinM: 1750,
    altMaxM: 5033,
    slopeKm: 0,
    liftsTotal: 0,
    seasonFrom: "2027-01-15",
    seasonTo: "2027-05-15",
    hero: "kazbegi",
    lat: 42.6613,
    lng: 44.6417,
    isLiftResort: false,
    description: {
      en: "Kazbegi is not a lift resort. What it is: a village at 1,750 m under a 5,033 m glaciated peak, with guided ski-touring, freeride day trips from Gudauri (30 km) and helicopter access. Come here for a route, not a lift ticket, and hire a certified mountain guide — the terrain is genuinely alpine.",
      ru: "Казбеги — не горнолыжный курорт с подъёмниками. Это село на 1750 м под пятитысячником Казбек, с ски-туром с гидом, фрирайд-выездами из Гудаури (30 км) и вертолётным заходом. Сюда едут за маршрутом, а не за ски-пассом, и обязательно с сертифицированным горным гидом — рельеф здесь настоящий альпийский.",
      ka: "ყაზბეგი — არაა კურორტი საბაგიროებით. ეს არის სოფელი 1750 მ-ზე, ხუთათასიანი მთის ქვეშ, ski-touring გიდით, ფრირაიდი გუდაურიდან (30 კმ) და ვერტმფრენით მისვლა. აქ მარშრუტისთვის ჩამოდიხარ, არა ski-pass-ისთვის, და აუცილებლად სერტიფიცირებული მთის გიდით — რელიეფი ნამდვილად ალპურია.",
    },
    highlights: [
      {
        en: "5,033 m Mkinvartsveri (Kazbek) — a real objective",
        ru: "Пик Мкинварцвери (Казбек) 5033 м — серьёзная цель",
        ka: "5033 მ მყინვარწვერი — ნამდვილი მიზანი",
      },
      {
        en: "Backcountry, not lifts. Guide mandatory.",
        ru: "Бэккантри, а не подъёмники. Гид обязателен.",
        ka: "Backcountry, არა საბაგიროები. გიდი აუცილებელია.",
      },
    ],
    bestFor: {
      en: "Ski-tourers and freeriders with mountain experience.",
      ru: "Ски-турщикам и фрирайдерам с горным опытом.",
      ka: "ski-tourers-ისა და ფრირაიდერებისთვის, ვისაც მთის გამოცდილება აქვს.",
    },
  },
];

export function findResort(slug: string) {
  return resorts.find((r) => r.slug === slug);
}
