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
    images: [
      {
        src: "/routes/gudauri.jpg",
        caption: {
          en: "The Sadzele ridge on an open-sky morning",
          ru: "Хребет Садзеле ясным утром",
          ka: "სადძელეს ქედი ნათელ დილას",
        },
      },
      {
        src: "/resorts/gudauri-1.jpg",
        caption: {
          en: "New Gudauri gondola base station",
          ru: "Нижняя станция гондолы Нью-Гудаури",
          ka: "ახალი გუდაურის გონდოლის ქვედა სადგური",
        },
      },
      {
        src: "/resorts/gudauri-2.jpg",
        caption: {
          en: "Freeride lines off the Kudebi top station",
          ru: "Фрирайд-линии с верхней станции Кудеби",
          ka: "ფრირაიდის ხაზები კუდების ზედა სადგურიდან",
        },
      },
      {
        src: "/resorts/gudauri-3.jpg",
        caption: {
          en: "Paragliders over the Jvari Pass amphitheatre",
          ru: "Парапланы над чашей Крестового перевала",
          ka: "პარაპლანები ჯვრის უღელტეხილის ამფითეატრის თავზე",
        },
      },
      {
        src: "/resorts/gudauri-4.jpg",
        caption: {
          en: "Beginner conveyor on a bluebird afternoon",
          ru: "Учебный конвейер в ясный полдень",
          ka: "დამწყებთა კონვეიერი ნათელ შუადღეს",
        },
      },
      {
        src: "/resorts/gudauri-5.jpg",
        caption: {
          en: "Village ridge at dusk with the Caucasus horizon",
          ru: "Хребет посёлка на закате и панорама Кавказа",
          ka: "სოფლის ქედი მწუხრისას კავკასიონის პანორამით",
        },
      },
      {
        src: "/resorts/gudauri-6.jpg",
        caption: {
          en: "Après-ski terrace at New Gudauri",
          ru: "Терраса для апре-ски в Нью-Гудаури",
          ka: "აპრე-სკის ტერასა ახალ გუდაურში",
        },
      },
    ],
    videos: [
      {
        youtubeId: "jzIyljEo5_U",
        title: {
          en: "Gudauri from the air",
          ru: "Гудаури с воздуха",
          ka: "გუდაური ჰაერიდან",
        },
        description: {
          en: "Drone footage over the Sadzele and Kudebi ridges on a bluebird day.",
          ru: "Съёмка с дрона над хребтами Садзеле и Кудеби в ясный день.",
          ka: "დრონით გადაღებული კადრები სადძელესა და კუდების ქედებზე ნათელ დღეს.",
        },
      },
      {
        youtubeId: "BxP5bAq2cu8",
        title: {
          en: "First-person run from the top",
          ru: "Спуск с верхней станции от первого лица",
          ka: "დაშვება ზედა სადგურიდან პირველი პირის ხედვით",
        },
        description: {
          en: "A full top-to-bottom POV run showing the character of the main pistes.",
          ru: "Проезд сверху вниз от первого лица, показывающий характер основных трасс.",
          ka: "სრული დაშვება ზევიდან-ქვევით, პირველი პირის ხედვით — ძირითადი ტრასების ხასიათი.",
        },
      },
      {
        youtubeId: "ovxF2JmQ_FM",
        title: {
          en: "A season in Gudauri",
          ru: "Один сезон в Гудаури",
          ka: "ერთი სეზონი გუდაურში",
        },
        description: {
          en: "Short film tracking the mountain from early-December openings through April corn.",
          ru: "Короткий фильм о сезоне: от открытия в декабре до весеннего фирна в апреле.",
          ka: "მოკლე ფილმი სეზონის შესახებ: დეკემბრის გახსნიდან აპრილის გაზაფხულის თოვლამდე.",
        },
      },
    ],
    bestTime: {
      en: "Late January through early March is prime: the snowpack is deep, the wind-affected top station is skiing well, and the weeks between the New Year rush and the March school break are the quietest. February weekdays are the sweet spot if you can take them.",
      ru: "Лучшее время — с конца января по начало марта: снежный покров глубокий, верхнюю станцию уже не раздувает, а между новогодней волной и мартовскими каникулами курорт самый спокойный. Будни февраля — идеал, если можете их выбрать.",
      ka: "საუკეთესო პერიოდი — იანვრის ბოლო და მარტის დასაწყისი: თოვლის ფენა ღრმაა, ზედა სადგური უკვე კარგად მუშაობს, ხოლო ახალი წლის ტალღისა და მარტის არდადეგების შუა კვირები ყველაზე მშვიდია. თუ შეგიძლიათ, აარჩიეთ თებერვლის სამუშაო დღეები.",
    },
    apresSki: {
      en: "After the lifts close, the scene splits between New Gudauri's hotel terraces and the long-running Black Bar on the main road. Expect Georgian craft beer, chacha shots and a DJ by 22:00. Dinner is best booked ahead on weekends — the ridge hotels keep a short wait list.",
      ru: "После подъёмников всё делится между террасами отелей Нью-Гудаури и легендарным Black Bar на главной дороге. Крафтовое пиво, чача и DJ к 22:00. На выходных ужин лучше бронировать заранее — у отелей на хребте короткий лист ожидания.",
      ka: "საბაგიროების დახურვის შემდეგ სცენა იყოფა ახალი გუდაურის სასტუმრო ტერასებსა და მთავარ გზაზე მდებარე Black Bar-ს შორის. ქართული კრაფტ-ლუდი, ჭაჭა და DJ 22:00-ზე. შაბათ-კვირას ვახშმის ჯავშანი აუცილებელია — ქედის სასტუმროებს მოკლე მოლოდინის სია აქვთ.",
    },
    gearTips: {
      en: "The upper mountain is above the treeline and genuinely wind-exposed — a proper goggle with a spare lens and a buff beat a thin neck gaiter. Mornings in January are icy on groomed reds, so bring a sharp edge or ask the rental shop to tune. All-season tyres are fine on the Military Road, but keep a chain set in the car between December and February.",
      ru: "Верхняя гора открыта и реально выдуваема — нормальная маска с запасной линзой и бафф лучше тонкого ворота. По утрам в январе красные трассы жёсткие, так что берите острый кант или просите в прокате заточить. Всесезонка на Военно-Грузинской дороге пойдёт, но комплект цепей в багажнике с декабря по февраль обязателен.",
      ka: "ზედა მთა ტყის ხაზის ზემოთაა და ქარისგან დაუცველია — სათადარიგო ლინზით და ბაფით აღჭურვილი ნორმალური ნიღაბი უკეთესია, ვიდრე თხელი შარფი. იანვრის დილები წითელ ტრასებზე ყინულივითაა, ამიტომ წახვიდეთ გალესილი კიდით ან სთხოვეთ ქირავნობას დარეგულირება. სამხედრო გზაზე მრავალსეზონიანი საბურავები მუშაობენ, მაგრამ დეკემბრიდან თებერვლამდე ჯაჭვების კომპლექტი აუცილებლად გაქვთ მანქანაში.",
    },
    nearbyTowns: {
      en: "Stepantsminda (Kazbegi) is 30 km north on the same road — a one-hour detour for Gergeti Trinity Church and the Kazbek view. Pasanauri on the way back is the sulguni-and-khinkali stop every driver recommends. Ananuri Fortress above the reservoir is a 40-minute photo pause.",
      ru: "Степанцминда (Казбеги) — 30 км севернее по той же дороге, час в одну сторону ради Гергетской Троицы и вида на Казбек. Пасанаури на обратном пути — та самая остановка на сулгуни и хинкали, которую все водители советуют. Крепость Ананури над водохранилищем — 40 минут фотопаузы.",
      ka: "სტეფანწმინდა (ყაზბეგი) — 30 კმ ჩრდილოეთით იმავე გზაზე, ერთი საათი გერგეტის სამებისა და მყინვარწვერის ხედისთვის. უკანა გზაზე ფასანაური — სულგუნისა და ხინკლის ის სავარაუდო გაჩერება, ყველა მძღოლი რომ გირჩევთ. წყალსაცავის ზემოთ ანანურის ციხე — 40 წუთიანი ფოტოპაუზა.",
    },
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
    images: [
      {
        src: "/routes/bakuriani.jpg",
        caption: {
          en: "Didveli piste on a sunny weekday",
          ru: "Трасса Дидвели в солнечный будний день",
          ka: "დიდველის ტრასა მზიან სამუშაო დღეს",
        },
      },
      {
        src: "/resorts/bakuriani-1.jpg",
        caption: {
          en: "Kokhta-Mitarbi freestyle park",
          ru: "Фристайл-парк Кохта-Митарби",
          ka: "კოხტა-მიტარბის ფრისტაილის პარკი",
        },
      },
      {
        src: "/resorts/bakuriani-2.jpg",
        caption: {
          en: "Narrow-gauge «Kukushka» train from Borjomi",
          ru: "Узкоколейка «Кукушка» из Боржоми",
          ka: "ვიწროლიანდაგიანი „კუკუშკა“ ბორჯომიდან",
        },
      },
      {
        src: "/resorts/bakuriani-3.jpg",
        caption: {
          en: "Village café scene after the lifts close",
          ru: "Кафе в посёлке после закрытия подъёмников",
          ka: "სოფლის კაფე საბაგიროების დახურვის შემდეგ",
        },
      },
      {
        src: "/resorts/bakuriani-4.jpg",
        caption: {
          en: "Ski school parade on 25 January base",
          ru: "Парад лыжной школы у зоны «25 Января»",
          ka: "სათხილამურო სკოლის აღლუმი „25 იანვრის“ ზონაში",
        },
      },
      {
        src: "/resorts/bakuriani-5.jpg",
        caption: {
          en: "Snow-dusted pines on the ridge above the village",
          ru: "Заснеженные сосны на хребте над посёлком",
          ka: "დათოვლილი ფიჭვები სოფლის ზემოთ ქედზე",
        },
      },
      {
        src: "/resorts/bakuriani-6.jpg",
        caption: {
          en: "Chair out of the Kokhta base station",
          ru: "Кресло с нижней станции Кохта",
          ka: "სავარძელი კოხტას ქვედა სადგურიდან",
        },
      },
    ],
    videos: [
      {
        youtubeId: "yU8vfz5SRPQ",
        title: {
          en: "Bakuriani freestyle highlights",
          ru: "Фристайл в Бакуриани",
          ka: "ფრისტაილი ბაკურიანში",
        },
        description: {
          en: "Reels from the Kokhta park showing kickers, rails and the slopestyle course.",
          ru: "Нарезка из парка Кохта: трамплины, рейлы и слоуп-курс.",
          ka: "კადრები კოხტას პარკიდან: ტრამპლინები, რეილები და სლოუპსტაილის ტრასა.",
        },
      },
      {
        youtubeId: "oZNfQj3kR8Y",
        title: {
          en: "A walk through Bakuriani village",
          ru: "Прогулка по посёлку Бакуриани",
          ka: "სეირნობა ბაკურიანის სოფელში",
        },
        description: {
          en: "Winter stroll past bakeries, rental shops and the narrow-gauge station.",
          ru: "Зимняя прогулка мимо пекарен, прокатов и узкоколейной станции.",
          ka: "ზამთრის სეირნობა საცხობების, ქირავნობისა და ვიწროლიანდაგიანი სადგურის გავლით.",
        },
      },
      {
        youtubeId: "UKfvz6PmYrM",
        title: {
          en: "FIS Freestyle World Cup in Bakuriani",
          ru: "Кубок мира FIS по фристайлу в Бакуриани",
          ka: "FIS-ის ფრისტაილის მსოფლიოს თასი ბაკურიანში",
        },
        description: {
          en: "Highlights from the 2023 World Championships course on Didveli.",
          ru: "Хайлайты с чемпионата мира 2023 на трассе Дидвели.",
          ka: "მთავარი კადრები 2023 წლის მსოფლიო ჩემპიონატიდან დიდველზე.",
        },
      },
    ],
    bestTime: {
      en: "Mid-January to mid-February is the sweet spot: the snow line sits well below the base, the village is lively but not packed, and the Kokhta park is at full build-out. Avoid the week around 2 January — the whole country moves here for the holidays.",
      ru: "С середины января до середины февраля — лучшее время: снежная линия хорошо ниже базы, посёлок живой, но без столпотворения, парк Кохта уже «отстроен». Избегайте недели после 2 января — туда едет вся страна.",
      ka: "საუკეთესო პერიოდი — იანვრის შუა რიცხვებიდან თებერვლის შუა რიცხვებამდე: თოვლის ხაზი ბაზაზე ბევრად დაბლაა, სოფელი ცოცხალია, მაგრამ გადატვირთული არ არის, კოხტას პარკი სრულად მოწყობილია. აარიდეთ 2 იანვრის მომდევნო კვირას — მთელი ქვეყანა იქაა.",
    },
    apresSki: {
      en: "Après in Bakuriani is a village-café affair: hot wine and kubdari at the little places on Agmashenebeli Street, khinkali and chacha at Didveli Lodge, and the odd DJ night at the newer hotels on the ridge. Family-friendly, early close — most places wind down by midnight.",
      ru: "Апре в Бакуриани — это сельские кафе: глинтвейн и кубдари на улице Агмашенебели, хинкали и чача в Didveli Lodge, иногда DJ в новых отелях на хребте. Семейно и рано — к полуночи большинство закрывается.",
      ka: "ბაკურიანის აპრე — სოფლის კაფეების სცენაა: ცხელი ღვინო და კუბდარი აღმაშენებლის ქუჩის პატარა ადგილებში, ხინკალი და ჭაჭა Didveli Lodge-ში, ზოგჯერ DJ-ის ღამე ქედის ახალ სასტუმროებში. ოჯახური, ადრე სრულდება — უმეტესობა შუაღამემდე იკეტება.",
    },
    gearTips: {
      en: "The lower terrain is tree-lined and sheltered, so a mid-weight glove and a lighter jacket beat full expedition kit. Snow quality is softer than Gudauri — classic Caucasus tree-skiing after a dump. The Borjomi–Bakuriani road is paved and plowed; a sedan handles it, but keep chains in the trunk for the final 10 km after a storm.",
      ru: "Нижняя часть — лесная и укрытая, перчатки средней плотности и куртка полегче лучше полной экспедиции. Снег мягче, чем в Гудаури, — классическое кавказское катание по лесу после снегопада. Трасса Боржоми–Бакуриани — асфальт, чистят; седан справится, но после снегопада на последних 10 км пригодятся цепи.",
      ka: "ქვედა ზონა ტყიანი და დაცულია, საშუალო სისქის ხელთათმანები და მსუბუქი ქურთუკი უკეთესია სრულ საექსპედიციო აღჭურვილობაზე. თოვლი უფრო რბილია გუდაურთან შედარებით — კავკასიური კლასიკური ტყის სრიალი თოვას შემდეგ. ბორჯომი–ბაკურიანის გზა მოასფალტებულია და იწმინდება; სედანი გაუმკლავდება, მაგრამ თოვას შემდეგ ბოლო 10 კმ-ზე ჯაჭვები ჩანთაში გქონდეთ.",
    },
    nearbyTowns: {
      en: "Borjomi (30 min) is the mineral-water town with the central park and the historic baths — a classic rest-day pairing. Akhaltsikhe and Rabati fortress sit 90 minutes further south if you want a culture day. Tsagveri on the drive up is good for a quick lunch stop.",
      ru: "Боржоми (30 мин) — город минеральной воды, парк и исторические бани — классическая пара к дню отдыха. Ахалцихе и крепость Рабат — ещё 90 мин к югу, если нужен культурный день. Цагвери по дороге наверх — хорошая остановка на обед.",
      ka: "ბორჯომი (30 წთ) — მინერალური წყლის ქალაქი, ცენტრალური პარკი და ისტორიული აბანოები — კლასიკური წყვილი დასვენების დღესთან. ახალციხე და რაბათი 90 წთ უფრო სამხრეთით, თუ კულტურული დღე გინდათ. ცაღვერი ასვლის გზაზე — კარგი შესაჩერებელი სადილისთვის.",
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
    images: [
      {
        src: "/routes/tetnuldi.jpg",
        caption: {
          en: "The Tetnuldi peak above the top station",
          ru: "Вершина Тетнулди над верхней станцией",
          ka: "თეთნულდის მწვერვალი ზედა სადგურის ზემოთ",
        },
      },
      {
        src: "/resorts/tetnuldi-1.jpg",
        caption: {
          en: "Empty red piste under Mt Ushba",
          ru: "Пустая красная трасса под Ушбой",
          ka: "ცარიელი წითელი ტრასა უშბის ქვეშ",
        },
      },
      {
        src: "/resorts/tetnuldi-2.jpg",
        caption: {
          en: "Chairlift line with the Svan range behind",
          ru: "Канатка с видом на сванский хребет",
          ka: "საბაგიროს ხაზი სვანეთის ქედით უკანა ფონზე",
        },
      },
      {
        src: "/resorts/tetnuldi-3.jpg",
        caption: {
          en: "4x4 shuttle on the access road from Mestia",
          ru: "4x4 шаттл по дороге из Местии",
          ka: "4x4 შატლი მესტიიდან ასასვლელ გზაზე",
        },
      },
      {
        src: "/resorts/tetnuldi-4.jpg",
        caption: {
          en: "Mestia tower village after a snowfall",
          ru: "Местия с башнями после снегопада",
          ka: "მესტიის კოშკიანი სოფელი თოვას შემდეგ",
        },
      },
      {
        src: "/resorts/tetnuldi-5.jpg",
        caption: {
          en: "Off-piste bowl under the ridge",
          ru: "Фрирайд-чаша под хребтом",
          ka: "ფრირაიდის ჩარჩო ქედის ქვეშ",
        },
      },
      {
        src: "/resorts/tetnuldi-6.jpg",
        caption: {
          en: "Alpine sunset over Upper Svaneti",
          ru: "Альпийский закат над Верхней Сванетией",
          ka: "ალპური მწუხრი ზემო სვანეთზე",
        },
      },
    ],
    videos: [
      {
        youtubeId: "h4yK9Vl4owY",
        title: {
          en: "Mestia and Tetnuldi in winter",
          ru: "Местия и Тетнулди зимой",
          ka: "მესტია და თეთნულდი ზამთარში",
        },
        description: {
          en: "Short travelogue combining the Svan towers and a day on the mountain.",
          ru: "Короткий травелог: сванские башни и день на горе.",
          ka: "მოკლე მოგზაურობის ჩანაწერი: სვანური კოშკები და დღე მთაში.",
        },
      },
      {
        youtubeId: "pX_rXTT8CiU",
        title: {
          en: "Svaneti deep winter",
          ru: "Сванетия в глубокую зиму",
          ka: "სვანეთი ზამთრის სიღრმეში",
        },
        description: {
          en: "Aerial footage over the Svan villages after a heavy storm cycle.",
          ru: "Съёмка с дрона над сванскими сёлами после сильных снегопадов.",
          ka: "დრონით გადაღებული კადრები სვანური სოფლების თავზე ძლიერი ქარბუქის შემდეგ.",
        },
      },
      {
        youtubeId: "l1X7xZUm0bE",
        title: {
          en: "Lift-served runs at Tetnuldi",
          ru: "Трассы с подъёмником на Тетнулди",
          ka: "საბაგიროს ტრასები თეთნულდზე",
        },
        description: {
          en: "Full top-station descent showing the character of the main reds.",
          ru: "Полный спуск с верхней станции, показывающий характер основных красных.",
          ka: "სრული დაშვება ზედა სადგურიდან — ძირითადი წითელი ტრასების ხასიათი.",
        },
      },
    ],
    bestTime: {
      en: "Mid-February to mid-March is the right window: the Mestia road is reliably open, the sun reaches the top station long enough to warm the north faces, and the storm cycles still refresh the off-piste every week. Earlier than that and you risk a road closure; later and the lower reds get patchy.",
      ru: "С середины февраля до середины марта — лучший период: дорога на Местию стабильно открыта, солнце уже прогревает северные склоны, а циклоны ещё раз в неделю освежают фрирайд. Раньше — риск закрытия перевала, позже — на нижних красных появляются проталины.",
      ka: "საუკეთესო ფანჯარა — თებერვლის შუა რიცხვებიდან მარტის შუა რიცხვებამდე: მესტიის გზა საიმედოდ ღიაა, მზე უკვე ათბობს ჩრდილო ფერდობებს, ხოლო ციკლონები ყოველ კვირას ანახლებენ ფრირაიდს. უფრო ადრე — უღელტეხილის დახურვის რისკი; უფრო გვიან — ქვედა წითელ ტრასებზე მოხდება ჩამოდნობა.",
    },
    apresSki: {
      en: "There is nothing at the Tetnuldi base — the scene is in Mestia, 40 minutes down the hill. Café Laila on the main square, Sunset guesthouse's dining room and Cocktail Bar are where everyone ends up for kubdari, Svan ham and a litre of house red. Order the chvishtari.",
      ru: "У подножия Тетнулди нет ничего — вся жизнь в Местии, в 40 минутах вниз. Кафе «Laila» на главной площади, столовая гестхауса Sunset и Cocktail Bar — туда стекаются все на кубдари, сванский окорок и графин домашнего красного. Обязательно чвиштари.",
      ka: "თეთნულდის ძირში არაფერია — სცენა მესტიაშია, 40 წუთი დაბლა. „ლაილა“ მთავარ მოედანზე, Sunset-ის სასტუმრო სახლის სასადილო და Cocktail Bar — ყველა იქ იკრიბება კუბდარისთვის, სვანური ლორისთვის და დოქი სახლის წითელი ღვინისთვის. აუცილებლად ჭვიშტარი.",
    },
    gearTips: {
      en: "The top station is above 3,000 m and genuinely cold — down jacket under the shell on windy days, hand warmers in the gloves. Snow is drier than anywhere else in Georgia; wax accordingly and bring a shovel if you plan to drop ropes. The road from Mestia is 4x4 only in winter — book a shuttle rather than renting a car in Zugdidi.",
      ru: "Верхняя станция выше 3000 м, по-настоящему холодно — пуховка под мембраной в ветреный день, грелки в перчатки. Снег самый сухой в Грузии; подбирайте мазь и возьмите лопату, если собираетесь за верёвку. Дорога из Местии зимой — только 4x4, лучше шаттл, а не прокат из Зугдиди.",
      ka: "ზედა სადგური 3000 მ-ზე მაღლაა და ნამდვილად ცივა — ქარიან დღეს ბანდი ქურთუკს ქვეშ, ხელის გამათბობლები ხელთათმანებში. თოვლი ყველაზე მშრალია საქართველოში; მოამზადეთ ცვილი და წაიღეთ ბარი, თუ თოკიდან იშვებით. მესტიიდან გზა ზამთარში მხოლოდ 4x4-ისთვისაა — სჯობს შატლი, ვიდრე ზუგდიდში მანქანის ქირაობა.",
    },
    nearbyTowns: {
      en: "Mestia itself is the hub — stay in Lanchvali or Lagami for the quiet tower-house experience. Ushguli (90 min by 4x4 in summer, often cut off in winter) is Europe's highest permanently inhabited village. Becho and Mazeri on the way back are good for a Mt Ushba photo stop.",
      ru: "Сама Местия — узел; жить лучше в кварталах Ланчвали или Лагами ради тихих башенных домов. Ушгули (90 мин 4x4 летом, зимой часто отрезан) — высочайшее постоянно обитаемое село Европы. Бечо и Мазери по дороге обратно — ради фото Ушбы.",
      ka: "მესტია თავად არის ცენტრი — უკეთ დარჩეთ ლანჩვალში ან ლაგამში მშვიდი კოშკური სახლებისთვის. უშგული (ზაფხულში 90 წთ 4x4-ით, ზამთარში ხშირად მოჭრილია) — ევროპის ყველაზე მაღლა მდებარე მუდმივად დასახლებული სოფელი. ბეჩო და მაზერი დაბრუნების გზაზე — უშბის ფოტოგადასაღებად.",
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
    images: [
      {
        src: "/routes/hatsvali.jpg",
        caption: {
          en: "Hatsvali gondola with Ushba in the distance",
          ru: "Гондола Хацвали на фоне Ушбы",
          ka: "ჰაცვალის გონდოლა უშბის ფონზე",
        },
      },
      {
        src: "/resorts/hatsvali-1.jpg",
        caption: {
          en: "Mid-station café terrace",
          ru: "Терраса кафе на средней станции",
          ka: "შუა სადგურის კაფეს ტერასა",
        },
      },
      {
        src: "/resorts/hatsvali-2.jpg",
        caption: {
          en: "Short red piste back to the base",
          ru: "Короткая красная трасса к базе",
          ka: "მოკლე წითელი ტრასა ბაზისკენ",
        },
      },
      {
        src: "/resorts/hatsvali-3.jpg",
        caption: {
          en: "Snow-dusted forest below the station",
          ru: "Заснеженный лес ниже станции",
          ka: "დათოვლილი ტყე სადგურის ქვემოთ",
        },
      },
      {
        src: "/resorts/hatsvali-4.jpg",
        caption: {
          en: "Family lesson on the beginner slope",
          ru: "Семейный урок на учебном склоне",
          ka: "ოჯახური გაკვეთილი დამწყებთა ფერდობზე",
        },
      },
      {
        src: "/resorts/hatsvali-5.jpg",
        caption: {
          en: "Panorama of the Mestia valley from the top",
          ru: "Панорама Местийской долины с верхней точки",
          ka: "მესტიის ხეობის პანორამა ზედა წერტილიდან",
        },
      },
      {
        src: "/resorts/hatsvali-6.jpg",
        caption: {
          en: "Hatsvali base-area shuttle stop",
          ru: "Остановка шаттла у базы Хацвали",
          ka: "შატლის გაჩერება ჰაცვალის ბაზასთან",
        },
      },
    ],
    videos: [
      {
        youtubeId: "bWy1lL1oSuY",
        title: {
          en: "A day at Hatsvali",
          ru: "День на Хацвали",
          ka: "დღე ჰაცვალზე",
        },
        description: {
          en: "Short vlog with on-mountain shots and the Ushba view from the café.",
          ru: "Короткий влог: катание и вид на Ушбу с кафе.",
          ka: "მოკლე ვლოგი: სრიალი და უშბის ხედი კაფედან.",
        },
      },
      {
        youtubeId: "cQ4rCCg2nFI",
        title: {
          en: "Skiing above Mestia",
          ru: "Катание над Местией",
          ka: "სრიალი მესტიის ზემოთ",
        },
        description: {
          en: "POV descent through the trees back toward the Mestia valley.",
          ru: "Спуск от первого лица через лес к Местийской долине.",
          ka: "დაშვება პირველი პირის ხედვით ტყის გავლით მესტიის ხეობისკენ.",
        },
      },
      {
        youtubeId: "NbVnPgvGMs0",
        title: {
          en: "Svan towers under snow",
          ru: "Сванские башни под снегом",
          ka: "სვანური კოშკები თოვლში",
        },
        description: {
          en: "Walking tour of the Mestia tower neighborhoods in deep winter.",
          ru: "Прогулка по башенным кварталам Местии глубокой зимой.",
          ka: "სეირნობა მესტიის კოშკებიან უბნებში ზამთრის სიღრმეში.",
        },
      },
    ],
    bestTime: {
      en: "Late January and February are best — the days are already longer, the gondola is reliably open, and you can combine Hatsvali with a half-day in Mestia town. Early December runs are hit-and-miss until the valley snow settles.",
      ru: "Лучше всего — конец января и февраль: дни длиннее, гондола стабильно работает, можно совместить Хацвали с полдня в самой Местии. В начале декабря открывают через раз, пока снег в долине не ляжет.",
      ka: "საუკეთესო დრო — იანვრის ბოლო და თებერვალი: დღეები უკვე გრძელია, გონდოლა საიმედოდ მუშაობს, შეიძლება ჰაცვალი დააკავშიროთ ნახევარ დღე მესტიაში. დეკემბრის დასაწყისში ხანდახან ხსნიან — ხეობაში თოვლი ჯერ არ არის დადგრდობილი.",
    },
    apresSki: {
      en: "Nothing happens at the Hatsvali base after lifts close — grab a mulled wine at the mid-station café and drive back to Mestia for dinner. In town, Café Laila's stage usually has live Svan polyphony on Friday nights, and the Nikala Chkhetiani restaurant pours a decent Rachuli Tetra.",
      ru: "У базы Хацвали после подъёмников пусто — глинтвейн в кафе на середине и обратно в Местию ужинать. В городе на сцене «Laila» по пятницам живая сванская полифония, а в ресторане Никалы Чхетиани — приличное «Рачули Тетра».",
      ka: "ჰაცვალის ბაზაზე საბაგიროების დახურვის შემდეგ არაფერი ხდება — ცხელი ღვინო შუა სადგურის კაფეში და უკან მესტიაში ვახშმად. ქალაქში „ლაილას“ სცენაზე პარასკევ ღამეებში ცოცხალი სვანური მრავალხმიანობა, ხოლო ნიკალა ჩხეტიანის რესტორანში ფაილე „რაჭული ტეტრა“.",
    },
    gearTips: {
      en: "Hatsvali is lower and milder than Tetnuldi — a mid-weight jacket and softer-flex boots are plenty. The snow is forest-sheltered so you rarely need goggles on cloudy days; sunglasses often work. Rentals are easier to arrange in Mestia than at the base.",
      ru: "Хацвали ниже и мягче Тетнулди — хватит куртки средней плотности и мягких ботинок. Снег защищён лесом, в пасмурный день часто обходятся очками. Прокат проще взять в Местии, чем у базы.",
      ka: "ჰაცვალი თეთნულდზე დაბლაა და რბილია — საშუალო სისქის ქურთუკი და რბილი ფეხსაცმელი საკმარისია. თოვლი ტყითაა დაცული, ღრუბლიან დღეებში ხშირად საკმარისია სათვალე. ქირავნობა უფრო მარტივად მოგვარდება მესტიაში, ვიდრე ბაზაზე.",
    },
    nearbyTowns: {
      en: "Mestia (10 min) is where everyone bases. The Chalaadi glacier trailhead is a 20-minute drive and a flat two-hour snowshoe in winter. For a longer detour, Latali and its 12th-century frescoed church sit 15 minutes toward Becho.",
      ru: "Местия (10 мин) — база для всех. К языку ледника Чалаади 20 минут на машине и ровные два часа на снегоступах зимой. Если нужен длиннее крюк — Латали с фресками XII века в 15 минутах по дороге на Бечо.",
      ka: "მესტია (10 წთ) — ყველა იქ ბინავდება. ჭალაადის მყინვარის ბილიკი 20 წთ-ის სავალზეა, ზამთარში ბრტყელი ორი საათი თოვლის ფეხსაცმლებით. უფრო გრძელი გასაჩერებლად — ლატალი XII საუკუნის ფრესკებით, 15 წთ ბეჩოს გზაზე.",
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
    images: [
      {
        src: "/routes/goderdzi.jpg",
        caption: {
          en: "Goderdzi pass after a Black-Sea storm",
          ru: "Перевал Годердзи после черноморского шторма",
          ka: "გოდერძის უღელტეხილი შავი ზღვის ქარიშხლის შემდეგ",
        },
      },
      {
        src: "/resorts/goderdzi-1.jpg",
        caption: {
          en: "Birches buried to the knees in fresh snow",
          ru: "Берёзы, засыпанные свежим снегом по колено",
          ka: "არყის ხეები მუხლამდე ჩამარხული ახალ თოვლში",
        },
      },
      {
        src: "/resorts/goderdzi-2.jpg",
        caption: {
          en: "Cat-skiing cat loading on the pass",
          ru: "Ратрак для кэт-ски загружается на перевале",
          ka: "cat-ski-ის რატრაკი იტვირთება უღელტეხილზე",
        },
      },
      {
        src: "/resorts/goderdzi-3.jpg",
        caption: {
          en: "Ski-tour skinning out of the parking",
          ru: "Ски-тур на подъёме от парковки",
          ka: "ski-touring ასვლა პარკინგიდან",
        },
      },
      {
        src: "/resorts/goderdzi-4.jpg",
        caption: {
          en: "Adjaran guesthouse under heavy snow",
          ru: "Аджарский гостевой дом под шапкой снега",
          ka: "აჭარული სასტუმრო სახლი მძიმე თოვლის ქვეშ",
        },
      },
      {
        src: "/resorts/goderdzi-5.jpg",
        caption: {
          en: "Powder line off the ridge",
          ru: "Пудровая линия с хребта",
          ka: "პაუდერის ხაზი ქედიდან",
        },
      },
      {
        src: "/resorts/goderdzi-6.jpg",
        caption: {
          en: "The 4x4 road twisting up from Khulo",
          ru: "4x4 дорога, вьющаяся из Хуло",
          ka: "4x4 გზა, რომელიც ხულოდან ეშვება ზევით",
        },
      },
    ],
    videos: [
      {
        youtubeId: "BLq8IjMtAZk",
        title: {
          en: "Goderdzi from the air",
          ru: "Годердзи с воздуха",
          ka: "გოდერძი ჰაერიდან",
        },
        description: {
          en: "Drone pass over the resort and the deep-snow birch forests.",
          ru: "Пролёт дрона над курортом и глубокоснежными берёзовыми лесами.",
          ka: "დრონის გადაფრენა კურორტზე და ღრმათოვლიან არყის ტყეებზე.",
        },
      },
      {
        youtubeId: "kAcHd0g9c-k",
        title: {
          en: "Goderdzi freeride",
          ru: "Фрирайд в Годердзи",
          ka: "ფრირაიდი გოდერძში",
        },
        description: {
          en: "Powder lines through the trees on a classic Atlantic feed.",
          ru: "Пудровые линии через лес после классического атлантического заноса.",
          ka: "პაუდერის ხაზები ტყეში კლასიკური ატლანტიკური თოვას შემდეგ.",
        },
      },
      {
        youtubeId: "jk5EB7JQBPM",
        title: {
          en: "Adjara in winter",
          ru: "Аджария зимой",
          ka: "აჭარა ზამთარში",
        },
        description: {
          en: "Short film from Batumi up through Khulo and over the pass.",
          ru: "Короткий фильм: от Батуми через Хуло и дальше за перевал.",
          ka: "მოკლე ფილმი: ბათუმიდან ხულოს გავლით უღელტეხილის იქით.",
        },
      },
    ],
    bestTime: {
      en: "Mid-February through March is the window. Earlier in the season the road is dicey after every storm; later and the maritime snow is heavy wet mash. Target the window two or three days after a big Atlantic storm — the road reopens, the sun comes out, and the powder stays cold under the trees.",
      ru: "Лучшее окно — с середины февраля по март. Раньше дорогу закрывает каждый циклон; позже морской снег становится тяжёлой кашей. Цельтесь в два-три дня после большого атлантического шторма: дорогу откроют, выйдет солнце, а пудра под деревьями ещё холодная.",
      ka: "საუკეთესო ფანჯარა — თებერვლის შუა რიცხვებიდან მარტამდე. უფრო ადრე გზას ყოველი ციკლონი ხურავს; უფრო გვიან ზღვის თოვლი მძიმე სველ ფაფად იქცევა. უმიზნეთ ორი-სამი დღე დიდი ატლანტიკური ქარიშხლის შემდეგ: გზას გახსნიან, მზე ამოვა, პაუდერი ხეების ქვეშ ჯერ ცივი იქნება.",
    },
    apresSki: {
      en: "The scene is the Adjaran guesthouse dinner table, not a bar. Expect borano (molten cheese and butter), achma, home-pressed tkemali and chacha so strong the host won't tell you the ABV. Khulo (45 min down the road) has a couple of family cafés if you want a change of scenery.",
      ru: "Апре здесь — не бар, а стол аджарского гостевого дома. Борано (расплавленный сыр с маслом), ачма, домашняя ткемали и чача такой крепости, что хозяин «не знает» градус. В Хуло (45 мин вниз) пара семейных кафе, если хочется сменить обстановку.",
      ka: "აქ აპრე-სკი არის არა ბარი, არამედ აჭარული სასტუმრო სახლის სუფრა. ბორანო (გალღობილი ყველი და კარაქი), აჩმა, სახლის ტყემალი და ჭაჭა ისეთი ძლიერი, რომ მასპინძელი ხარისხს არ გეტყვის. ხულო (45 წთ დაბლა) ოჯახური კაფეებით, თუ გარემოს შეცვლა გინდათ.",
    },
    gearTips: {
      en: "This is maritime snow — wetter than Gudauri, deep and heavy once it settles. Wider skis (100+ underfoot) help enormously, and a waterproof shell matters more than insulation. The Batumi–Khulo–Goderdzi road is 4x4 only in winter and chains are often required; don't attempt it in a sedan.",
      ru: "Снег морской — влажнее, чем в Гудаури, глубокий и тяжёлый, когда уляжется. Шире лыжи (от 100 под ногой) очень помогают, а водонепроницаемая мембрана важнее утеплителя. Трасса Батуми–Хуло–Годердзи зимой только для 4x4, часто с цепями; седан туда не стоит.",
      ka: "აქ თოვლი ზღვიურია — უფრო სველი ვიდრე გუდაურში, ღრმა და მძიმე, როცა დადგრდება. უფრო განიერი თხილამურები (100+ ფეხის ქვეშ) ბევრად ეხმარება, წყალგაუმტარი გარე ფენა უფრო მნიშვნელოვანია თბილისაგან. ბათუმი–ხულო–გოდერძის გზა ზამთარში მხოლოდ 4x4-ისთვისაა, ხშირად ჯაჭვებით; სედანით არ სცადოთ.",
    },
    nearbyTowns: {
      en: "Khulo (45 min toward Batumi) is the pass-town — cable car over the gorge, Friday market, and a few family guesthouses. Beshumi, a summer resort 20 min further, is a shuttered winter curiosity. Batumi is a four-hour drive but worth a rest-day: Black Sea boulevard, Soviet-era architecture, acharuli khachapuri.",
      ru: "Хуло (45 мин в сторону Батуми) — село у перевала: канатка над ущельем, пятничный базар, несколько семейных гестхаусов. Бешуми, летний курорт в 20 мин дальше, зимой — закрытое любопытство. Батуми в четырёх часах, но ради дня отдыха стоит: приморский бульвар, советская архитектура, аджарули хачапури.",
      ka: "ხულო (45 წთ ბათუმის მიმართულებით) — უღელტეხილის სოფელი: საბაგირო ხეობის თავზე, პარასკევის ბაზარი, რამდენიმე ოჯახური სასტუმრო სახლი. ბეშუმი, საზაფხულო კურორტი 20 წთ უფრო მოშორებით, ზამთარში დახურული სანახაობაა. ბათუმი ოთხი საათის სავალზეა, მაგრამ დასვენების დღისთვის ღირს: ზღვისპირა ბულვარი, საბჭოთა არქიტექტურა, აჭარული ხაჭაპური.",
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
    images: [
      {
        src: "/routes/kazbegi.jpg",
        caption: {
          en: "Mt Kazbek over Stepantsminda village",
          ru: "Казбек над селом Степанцминда",
          ka: "მყინვარწვერი სტეფანწმინდის ზემოთ",
        },
      },
      {
        src: "/resorts/kazbegi-1.jpg",
        caption: {
          en: "Gergeti Trinity church in winter",
          ru: "Гергетская Троица зимой",
          ka: "გერგეტის სამება ზამთარში",
        },
      },
      {
        src: "/resorts/kazbegi-2.jpg",
        caption: {
          en: "Ski-tour approach on the Gergeti glacier",
          ru: "Ски-тур по леднику Гергети",
          ka: "ski-touring მისვლა გერგეტის მყინვარზე",
        },
      },
      {
        src: "/resorts/kazbegi-3.jpg",
        caption: {
          en: "Helicopter drop at 3,400 m",
          ru: "Высадка с вертолёта на 3400 м",
          ka: "ვერტმფრენიდან ჩამოსვლა 3400 მ-ზე",
        },
      },
      {
        src: "/resorts/kazbegi-4.jpg",
        caption: {
          en: "Snowy Military Road switchbacks",
          ru: "Серпантины снежной Военно-Грузинской дороги",
          ka: "საქართველოს სამხედრო გზის თოვლიანი სერპანტინები",
        },
      },
      {
        src: "/resorts/kazbegi-5.jpg",
        caption: {
          en: "Stepantsminda guesthouse supra in winter",
          ru: "Супра в гестхаусе Степанцминды зимой",
          ka: "სუფრა სტეფანწმინდის სასტუმრო სახლში ზამთარში",
        },
      },
      {
        src: "/resorts/kazbegi-6.jpg",
        caption: {
          en: "North face of Kazbek at sunrise",
          ru: "Северная стена Казбека на рассвете",
          ka: "მყინვარწვერის ჩრდილო კედელი ამომავალ მზეზე",
        },
      },
    ],
    videos: [
      {
        youtubeId: "_FQcCbQ_vF0",
        title: {
          en: "Gergeti Trinity under snow",
          ru: "Гергетская Троица под снегом",
          ka: "გერგეტის სამება თოვლში",
        },
        description: {
          en: "Short tour of the famous church with Mt Kazbek rising behind it.",
          ru: "Короткая прогулка у знаменитой церкви с Казбеком за спиной.",
          ka: "მოკლე სეირნობა ცნობილ ეკლესიასთან, უკან მყინვარწვერით.",
        },
      },
      {
        youtubeId: "ulFIq7UGmnw",
        title: {
          en: "Kazbegi drone footage",
          ru: "Казбеги с дрона",
          ka: "ყაზბეგი დრონით",
        },
        description: {
          en: "Aerial shots of the Dariali gorge, the glacier and the village.",
          ru: "Аэрокадры Дарьяльского ущелья, ледника и села.",
          ka: "საჰაერო კადრები დარიალის ხეობის, მყინვარისა და სოფლის.",
        },
      },
      {
        youtubeId: "rSJGQJ4-TzI",
        title: {
          en: "Stepantsminda in deep winter",
          ru: "Степанцминда глубокой зимой",
          ka: "სტეფანწმინდა ზამთრის სიღრმეში",
        },
        description: {
          en: "Life in the village after a storm cycle — guesthouses, bakeries, trails.",
          ru: "Жизнь села после снегопадов: гестхаусы, пекарни, тропы.",
          ka: "სოფლის ცხოვრება თოვას შემდეგ: სასტუმრო სახლები, საცხობები, ბილიკები.",
        },
      },
    ],
    bestTime: {
      en: "March and April are the ski-touring sweet spot: the snowpack has consolidated enough for safer glacier travel, the days are long, and the Jvari Pass is reliably open. Earlier than February and the road closes on short notice; later than mid-May and the glacier is cut up and running.",
      ru: "Март и апрель — лучший период для ски-тура: снег уплотнился, ледник безопаснее, дни длинные, Крестовый перевал стабильно открыт. Раньше февраля дорогу закрывают без предупреждения; позже середины мая ледник весь в трещинах и ручьях.",
      ka: "მარტი და აპრილი — ski-touring-ის საუკეთესო პერიოდი: თოვლი კონსოლიდირდა, მყინვარი უფრო უსაფრთხოა, დღეები გრძელია, ჯვრის უღელტეხილი საიმედოდ ღიაა. თებერვლამდე გზას გაფრთხილების გარეშე ხურავენ; მაისის შუა რიცხვების შემდეგ მყინვარი ბზარებით და ნაკადულებით სავსეა.",
    },
    apresSki: {
      en: "This is guesthouse country, not bars. Rooms Hotel's terrace is the one Western-style stop; everywhere else, you sit at a long table with the host family for khinkali, dambalkhacho and a jug of Khvanchkara. The wine is the main event — bring an empty bottle for the ride home.",
      ru: "Здесь не бары, здесь гестхаусы. Терраса Rooms Hotel — единственное «западное» место; в остальном — длинный стол с хозяевами, хинкали, дамбалхачо и кувшин «Хванчкары». Главное — вино, прихватите пустую бутылку домой.",
      ka: "ეს ბარების კი არა, სასტუმრო სახლების სამყაროა. Rooms Hotel-ის ტერასა — ერთადერთი „ვესტერნული“ გაჩერება; დანარჩენი — გრძელი სუფრა მასპინძელ ოჯახთან, ხინკალი, დამბალხაჭო და დოქი „ხვანჭკარისა“. ღვინო — მთავარი აქცენტია, თან წაიღეთ ცარიელი ბოთლი.",
    },
    gearTips: {
      en: "This is real alpine terrain — glacier kit (harness, rope, crevasse-rescue), avalanche gear, and the willingness to turn around if the weather closes in are non-negotiable. Hire a certified guide: the local guesthouse network can match you with one. The Jvari Pass can shut without notice, so plan a buffer day.",
      ru: "Это настоящая высокогория — ледниковая связка (обвязка, верёвка, спасение из трещины), лавинный комплект и готовность развернуться, если погода зажмёт, обязательны. Берите сертифицированного гида — сеть гестхаусов подбирает своих. Крестовый перевал закрывают без предупреждения, закладывайте запасной день.",
      ka: "ეს ნამდვილი ალპური რელიეფია — მყინვარული კომპლექტი (აღკაზმი, თოკი, ბზარიდან სამაშველო), ზვავური აღჭურვილობა და მზადყოფნა, უკან დაბრუნდე, თუ ამინდი გაჭედავს, აუცილებელია. აიყვანეთ სერტიფიცირებული გიდი — ადგილობრივი სასტუმრო სახლები უკავშირდებიან საკუთარ გიდებს. ჯვრის უღელტეხილი უეცრად იკეტება, ჩადეთ სარეზერვო დღე.",
    },
    nearbyTowns: {
      en: "Stepantsminda is the hub; Juta (10 km) is the trailhead for the Chaukhi massif and an alpine-village feel. Sno gorge below holds the old Erekle II tower. Gudauri (30 km south) is where everyone warms up with a lift day before touring days up here.",
      ru: "Степанцминда — центр; Джута (10 км) — старт к массиву Чаухи и ощущение альпийской деревни. В ущелье Сно внизу — старая башня Ираклия II. Гудаури (30 км к югу) — там разминаются днём на подъёмниках перед ски-туровыми днями.",
      ka: "სტეფანწმინდა არის ცენტრი; ჯუთა (10 კმ) — ჩაუხის მასივის ბილიკის დასაწყისი და ალპური სოფლის ხასიათი. ქვემოთ სნოს ხეობაში — ერეკლე II-ის ძველი კოშკი. გუდაური (30 კმ სამხრეთით) — სადაც ყველა თბება საბაგიროებით ski-touring-ის დღეების წინ.",
    },
  },
];

export function findResort(slug: string) {
  return resorts.find((r) => r.slug === slug);
}
