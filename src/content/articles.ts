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
  {
    slug: "gudauri-new-kobi-gondola-section",
    locale: "all",
    title: {
      en: "Gudauri extends Kobi gondola with a new mid-station",
      ru: "В Гудаури у гондолы Коби появилась промежуточная станция",
      ka: "გუდაურის კობის გონდოლას შუალედური სადგური დაემატა",
    },
    excerpt: {
      en: "The new mid-station cuts queues on powder mornings and opens 1.2 km of previously off-piste terrain for intermediates.",
      ru: "Промежуточная станция разгрузит очереди в снежные утра и откроет 1,2 км нового маршрута для среднего уровня.",
      ka: "შუალედური სადგური ზვავიანი დილების რიგებს შეამცირებს და 1,2 კმ ახალ ტრასას გახსნის საშუალო დონისთვის.",
    },
    body: {
      en: "The resort finished welding the mid-station cabin last week and ran the first empty test cycles on Monday. The station sits at 2,470 m, roughly halfway up the Kobi gondola, and lets skiers skip the lower pitch when the lift queue builds up at the base.\n\nA new blue run drops from the mid-station back to the valley through a saddle that used to be hike-only. The piste team spent August clearing scree and installing padding on the two rock outcrops at the top.\n\nOfficial opening is tied to the resort's season start on 14 December, weather permitting.",
      ru: "На прошлой неделе на курорте закончили сварку кабины промежуточной станции и в понедельник прогнали первые холостые пуски. Станция расположена на высоте 2 470 м — примерно на середине гондолы Коби — и позволяет пропустить нижний склон, когда у подножия выстраивается очередь.\n\nОт промежуточной станции в долину уходит новая синяя трасса через седловину, куда раньше можно было только подняться пешком. Команда трасс в августе расчищала осыпь и ставила защиту на двух скальных выходах наверху.\n\nОфициальное открытие — вместе с началом сезона 14 декабря, если погода позволит.",
      ka: "კურორტმა შუალედური სადგურის კაბინის შედუღება გასულ კვირას დაასრულა და ორშაბათს პირველი ცარიელი ტესტები ჩაატარა. სადგური 2470 მ-ზე, კობის გონდოლის დაახლოებით შუაში, განთავსდა და მოთხილამურეებს ქვედა მონაკვეთის გვერდის ავლის საშუალებას აძლევს, როცა ძირში რიგი იკრიბება.\n\nშუალედური სადგურიდან ხეობისკენ ახალი ლურჯი ტრასა ჩამოდის ქედოვანი უნაგირის გავლით, სადაც აქამდე მხოლოდ ფეხით ავდიოდით. ტრასის გუნდმა აგვისტოში ქვიშაქვა გაასუფთავა და ზედა ორ კლდოვან გამონაშვერზე დამცავი დაამონტაჟა.\n\nოფიციალური გახსნა კურორტის სეზონის დასაწყისთანაა შეკრული — 14 დეკემბერს, ამინდის პირობის დაცვით.",
    },
    category: "infrastructure",
    author: "georgiawinter editorial",
    publishedAt: "2026-09-15T08:30:00Z",
    resort: "gudauri",
    cover: "/routes/tbilisi-gudauri.jpg",
  },
  {
    slug: "gudauri-cat-skiing-chaukhi",
    locale: "all",
    title: {
      en: "Cat-skiing tours to Chaukhi ridge launch this winter",
      ru: "Этой зимой стартуют кэт-ски туры на хребет Чаухи",
      ka: "ამ ზამთარს იწყება cat-skiing ტურები ჩაუხის ქედზე",
    },
    excerpt: {
      en: "Two operators are running daily snowcat shuttles to the Chaukhi ridge, 400 m of untracked vertical on each lap.",
      ru: "Два оператора запускают ежедневные ратраки на хребет Чаухи — 400 м нетронутого вертикала на спуск.",
      ka: "ორი ოპერატორი ყოველდღიურ ratrak-შატლებს უშვებს ჩაუხის ქედზე — თითო დაშვებაზე 400 მ ხელუხლებელი ვერტიკალი.",
    },
    body: {
      en: "After two seasons of permit back-and-forth, the Chaukhi cat-skiing concession went live in September. Both operators are starting with four laps per day, groups of eight, with a certified guide and a tail guide on every run.\n\nThe terrain is north-facing, so snow quality holds longer than on Gudauri's main faces. Expect wide, moderately-angled bowls up top and tighter birch glades near the valley road where the cat picks up for the lift back.\n\nPrice is 650 GEL per person including transceiver, shovel and probe rental; avalanche rescue training is bundled into the first lap of the day.",
      ru: "После двух сезонов разрешительной волокиты концессия кэт-ски на Чаухи заработала в сентябре. Оба оператора начинают с четырёх спусков в день, группы по восемь, у каждого проезда — сертифицированный гид и замыкающий.\n\nСклоны северной экспозиции, снег держится дольше, чем на основных фасадах Гудаури. Наверху — широкие цирки среднего уклона, ниже у долинной дороги — узкие берёзовые кулуары, откуда ратрак подбирает группу обратно к подъёмнику.\n\nЦена — 650 лари с человека, включая аренду бипера, лопаты и щупа; тренировка по лавинному поиску включена в первый спуск дня.",
      ka: "ორი სეზონის ნებართვების ლოდინის შემდეგ ჩაუხის cat-skiing-ის კონცესია სექტემბერში ამოქმედდა. ორივე ოპერატორი დღეში ოთხი დაშვებით, რვაკაციანი ჯგუფებით იწყებს; ყოველ გასვლაზე სერტიფიცირებული გიდი და მომყოლი.\n\nფერდობები ჩრდილოეთისაა, თოვლის ხარისხი უფრო დიდხანს ინარჩუნებს თავს, ვიდრე გუდაურის მთავარ ფასადებზე. ზევით — ფართო, საშუალო დახრილობის ცირკები, ხეობის გზასთან კი ვიწრო არყის ხეივნები, საიდანაც ratrak ჯგუფს ისევ საბაგიროსთან აბრუნებს.\n\nფასი — 650 ლარი თითო ადამიანზე, biiper-ის, ნიჩბის და ზონდის ქირა ჩათვლით; ზვავური ძიების ვარჯიში დღის პირველ დაშვებაშია შეტანილი.",
    },
    category: "guide",
    author: "georgiawinter editorial",
    publishedAt: "2026-08-22T10:00:00Z",
    resort: "gudauri",
    cover: "/routes/tbilisi-airport-gudauri.jpg",
  },
  {
    slug: "gudauri-season-opening-party",
    locale: "all",
    title: {
      en: "Gudauri season opening weekend: 13-14 December",
      ru: "Уикенд открытия сезона в Гудаури: 13-14 декабря",
      ka: "გუდაურის სეზონის გახსნის უიქენდი: 13-14 დეკემბერი",
    },
    excerpt: {
      en: "Live DJs at New Gudauri plaza, free beginner lessons on Saturday morning, and a fireworks finale on Sunday night.",
      ru: "Диджей-сеты на площади Нью-Гудаури, бесплатные уроки для начинающих утром в субботу и фейерверк в воскресенье вечером.",
      ka: "ცოცხალი DJ-ები ახალი გუდაურის მოედანზე, უფასო გაკვეთილები დამწყებთათვის შაბათ დილას და ფეიერვერკი კვირას საღამოს.",
    },
    body: {
      en: "The opening weekend has grown into Gudauri's biggest annual party. The resort is closing the plaza between New Gudauri and the gondola base to cars from Friday afternoon through Sunday night; expect food trucks, two stages and a small ski-swap market.\n\nSaturday morning from 10:00 to 12:00 the ski schools offer free 45-minute beginner lessons on the conveyor — booking is not required, just turn up with rented gear.\n\nSunday closes with fireworks at 20:30 from the Kudebi mid-station, visible from the whole New Gudauri strip. Transfer demand will be heavy both days; book early.",
      ru: "Уикенд открытия стал самой большой ежегодной вечеринкой Гудаури. С пятницы по воскресенье площадь между Нью-Гудаури и нижней станцией гондолы закрывают для машин: фуд-траки, две сцены и небольшой ски-своп.\n\nВ субботу с 10:00 до 12:00 школы проводят бесплатные 45-минутные уроки для начинающих на учебном конвейере — бронь не нужна, достаточно взять напрокат снаряжение.\n\nВоскресенье закроется фейерверком в 20:30 с промежуточной станции Кудеби — видно со всей полосы Нью-Гудаури. Трансферы в оба дня будут нарасхват; бронируйте заранее.",
      ka: "გახსნის უიქენდი გუდაურის ყველაზე დიდ ყოველწლიურ წვეულებად იქცა. კურორტი ახალ გუდაურსა და გონდოლის ქვედა სადგურს შორის მოედანს პარასკევი შუადღიდან კვირა ღამემდე მანქანებისთვის ხურავს: სატვირთო სამზარეულოები, ორი სცენა და პატარა ski-swap ბაზრობა.\n\nშაბათს 10:00-დან 12:00-მდე სასწავლო სკოლები უფასო 45-წუთიან გაკვეთილებს ატარებენ დამწყებთა კონვეიერზე — ჯავშნა არ სჭირდება, უბრალოდ ქირაობთ აღჭურვილობას და მოდიხართ.\n\nკვირა ფეიერვერკით დასრულდება 20:30-ზე კუდების შუალედური სადგურიდან — ჩანს ახალი გუდაურის მთელი ზოლიდან. ტრანსფერებზე მოთხოვნა ორივე დღეს დიდი იქნება; ადრე დაჯავშნეთ.",
    },
    category: "event",
    author: "georgiawinter editorial",
    publishedAt: "2026-10-02T09:00:00Z",
    resort: "gudauri",
    cover: "/routes/gudauri-kazbegi.jpg",
  },
  {
    slug: "bakuriani-didveli-children-ski-school",
    locale: "all",
    title: {
      en: "Didveli opens dedicated children's ski school",
      ru: "В Дидвели открывается отдельная детская горнолыжная школа",
      ka: "დიდველში ბავშვთა სათხილამურო სკოლა იხსნება",
    },
    excerpt: {
      en: "A fenced beginner area with magic carpet, warm indoor break room and instructors trained for ages 4-10.",
      ru: "Огороженная учебная зона с «волшебным ковром», тёплым помещением для отдыха и инструкторами для возраста 4-10 лет.",
      ka: "შემოღობილი სასწავლო ზონა magic carpet-ით, თბილი დასასვენებელი ოთახით და 4-10 წლის ბავშვებისთვის მომზადებული ინსტრუქტორებით.",
    },
    body: {
      en: "Bakuriani's municipality and a local operator jointly funded a children-only ski area at Didveli. The fenced plot sits between the current conveyor and the main lodge, with its own ticketing window to avoid long queues with adult beginners.\n\nInstructors have been through a dedicated child-pedagogy course run by a Czech partner school over the summer. The warm room has lockers sized for a six-year-old, a small cafe counter and a parent viewing window.\n\nHalf-day lessons start at 90 GEL and include equipment; book directly with the Didveli school or through the resort hotline.",
      ru: "Муниципалитет Бакуриани и местный оператор совместно профинансировали детскую зону катания в Дидвели. Огороженный участок между нынешним конвейером и главным домом имеет свою кассу, чтобы не стоять в общей очереди.\n\nИнструкторы прошли летом профильный курс по работе с детьми у чешской школы-партнёра. В тёплом помещении — шкафчики под рост шестилетки, маленькая кофейня и окно, через которое родители могут наблюдать за уроком.\n\nПолдневные занятия — от 90 лари с инвентарём; бронь через школу Дидвели или на горячей линии курорта.",
      ka: "ბაკურიანის მერიამ და ადგილობრივმა ოპერატორმა ერთობლივად დააფინანსეს ბავშვებისთვის განკუთვნილი ზონა დიდველში. შემოღობილი ტერიტორია ამჟამინდელ კონვეიერსა და მთავარ ქოხს შორისაა განთავსებული და აქვს თავისი სალარო, რათა ზრდასრული დამწყებების რიგში არ ვიდგეთ.\n\nინსტრუქტორებმა ზაფხულში ჩეხი პარტნიორი სკოლის მიერ წარმართული საბავშვო პედაგოგიკის კურსი გაიარეს. თბილ ოთახში ექვსი წლის ბავშვზე მორგებული კარადები, პატარა საკონდიტრო და მშობელთა სათვალთვალო ფანჯარაა.\n\nნახევარდღიანი გაკვეთილები 90 ლარიდან იწყება, აღჭურვილობის ჩათვლით; ჯავშნა უშუალოდ დიდველის სკოლაში ან კურორტის ცხელ ხაზზე.",
    },
    category: "infrastructure",
    author: "georgiawinter editorial",
    publishedAt: "2026-09-08T09:00:00Z",
    resort: "bakuriani",
    cover: "/routes/tbilisi-bakuriani.jpg",
  },
  {
    slug: "bakuriani-apres-ski-new-wine-bar",
    locale: "all",
    title: {
      en: "New wine bar on Bakuriani's main street for après-ski",
      ru: "На главной улице Бакуриани открылся новый винный бар для après-ski",
      ka: "ბაკურიანის მთავარ ქუჩაზე ახალი ღვინის ბარი გაიხსნა après-ski-სთვის",
    },
    excerpt: {
      en: "A small qvevri-focused bar poured its first glasses in September; wood stove, 14 seats and a tight list of Kakhetian producers.",
      ru: "Небольшой бар с акцентом на квеври открылся в сентябре: дровяная печь, 14 мест и короткая карта кахетинских производителей.",
      ka: "ქვევრზე აქცენტირებული პატარა ბარი სექტემბერში გაიხსნა: შეშის ღუმელი, 14 ადგილი და მოკლე ჩამონათვალი კახეთელი მწარმოებლებისა.",
    },
    body: {
      en: "The bar is run by a family from Sighnaghi who spent two winters working at Didveli and decided the village needed somewhere between a loud après club and a formal restaurant. The space is small — fourteen seats around a tiled wood stove — and the wine list fits on one laminated card.\n\nFood is a short board of walnut churchkhela, dried persimmon, Guda cheese and oven-warm shoti. No cocktails, no spirits; the owners say they would rather do one thing properly.\n\nOpen 16:00 to midnight, closed Tuesdays. Walk-ins only, no reservations.",
      ru: "Бар держит семья из Сигнаги: две зимы они проработали в Дидвели и решили, что посёлку не хватает места между шумным after и формальным рестораном. Внутри тесно — четырнадцать мест вокруг изразцовой дровяной печи, винная карта помещается на одной ламинированной карточке.\n\nИз еды — короткая доска с ореховой чурчхелой, сушёной хурмой, сыром гуда и тёплым шоти. Ни коктейлей, ни крепкого: хозяева говорят, что хотят делать одно, но хорошо.\n\nЧасы — с 16:00 до полуночи, вторник выходной. Только самотёк, бронь не принимают.",
      ka: "ბარს აწარმოებს სიღნაღელი ოჯახი, რომელმაც ორი ზამთარი დიდველში იმუშავა და გადაწყვიტა, რომ სოფელს ხმაურიან après-კლუბსა და ფორმალურ რესტორანს შორის რაღაცა აკლდა. შიგნით პატარაა — თოთხმეტი ადგილი კრამიტიანი შეშის ღუმლის გარშემო, ღვინის მენიუ ერთ ლამინირებულ ბარათზე თავსდება.\n\nსაჭმლიდან — მოკლე დაფა ნიგვზის ჩურჩხელით, გამხმარი ხურმით, გუდის ყველით და ცხელი შოთით. არც კოქტეილები, არც კრეპი: მფლობელების თქმით, ურჩევნიათ ერთი რამე კარგად აკეთონ.\n\nღიაა 16:00-დან შუაღამემდე, სამშაბათი დასვენების დღეა. მხოლოდ ადგილზე მოსვლა, ჯავშანი არ მიიღება.",
    },
    category: "news",
    author: "georgiawinter editorial",
    publishedAt: "2026-10-04T12:00:00Z",
    resort: "bakuriani",
    cover: "/routes/tbilisi-bakuriani.jpg",
  },
  {
    slug: "bakuriani-biathlon-world-cup-training",
    locale: "all",
    title: {
      en: "Biathlon World Cup teams train at Bakuriani in November",
      ru: "Сборные Кубка мира по биатлону тренируются в Бакуриани в ноябре",
      ka: "ბიათლონის მსოფლიო თასის გუნდები ნოემბერში ბაკურიანში ვარჯიშობენ",
    },
    excerpt: {
      en: "Four national teams booked the renovated biathlon arena for a pre-season camp from 10-24 November.",
      ru: "Четыре сборные забронировали обновлённый биатлонный стадион для предсезонного сбора с 10 по 24 ноября.",
      ka: "ოთხი ნაკრებმა გაახალისებული ბიათლონის არენა დაჯავშნა 10-24 ნოემბრის სასეზონო წინა შეკრებისთვის.",
    },
    body: {
      en: "The Bakuriani biathlon arena, upgraded ahead of the 2023 World Championships, is hosting Czech, Austrian, Latvian and Kazakh teams during a two-week pre-season camp. The 2.5 km loop and shooting range are closed to the public from 09:00 to 15:00 on weekdays.\n\nThe tourism office is organising open training sessions on Saturday 15 November and 22 November; spectators can watch for free from the finish grandstand.\n\nThe resort village gets a quiet-week bump before the main season starts: hotels report 70 percent occupancy, mostly team staff and parents.",
      ru: "Биатлонный стадион Бакуриани, обновлённый к ЧМ-2023, принимает чешскую, австрийскую, латвийскую и казахстанскую сборные на двухнедельный сбор. Круг 2,5 км и стрельбище закрыты для публики с 09:00 до 15:00 в будни.\n\nТуристический офис организует открытые тренировки в субботу 15 и 22 ноября — зрители смотрят бесплатно с финишной трибуны.\n\nПосёлок получает тихую, но заметную догрузку перед сезоном: отели сообщают о 70 % загрузки, в основном персонал команд и родители.",
      ka: "ბაკურიანის ბიათლონის არენა, რომელიც 2023 წლის მსოფლიო ჩემპიონატისთვის განახლდა, ჩეხური, ავსტრიული, ლატვიური და ყაზახური ნაკრებების ორკვირიან სეზონისწინა შეკრებას მასპინძლობს. 2,5 კმ ჰალხი და სასროლო მოედანი სამუშაო დღეებში 09:00-დან 15:00-მდე საჯარო სარგებლობისთვის დახურულია.\n\nტურიზმის ოფისი ღია ვარჯიშებს 15 და 22 ნოემბრის შაბათებს აწყობს — მაყურებლებს უფასოდ შეუძლიათ ფინიშის ტრიბუნიდან ნახონ.\n\nსოფელი სეზონის დასაწყისამდე მშვიდ, მაგრამ შესამჩნევ ჩატვირთვას იღებს: სასტუმროები 70 პროცენტიან დატვირთვას იუწყებიან, ძირითადად გუნდის პერსონალით და მშობლებით.",
    },
    category: "event",
    author: "georgiawinter editorial",
    publishedAt: "2026-09-30T08:00:00Z",
    resort: "bakuriani",
    cover: "/routes/tbilisi-bakuriani.jpg",
  },
  {
    slug: "tetnuldi-upper-chair-reopens-after-overhaul",
    locale: "all",
    title: {
      en: "Tetnuldi upper chair returns to service after full overhaul",
      ru: "Верхний кресельный Тетнулди возвращается в строй после капремонта",
      ka: "თეთნულდის ზედა საბაგირო სრული კაპიტალური რემონტის შემდეგ ბრუნდება",
    },
    excerpt: {
      en: "The chair that unlocks Tetnuldi's advanced bowls has new drive motors, swapped grips and a cleared evacuation line.",
      ru: "Кресельный, который открывает продвинутые цирки Тетнулди, получил новые двигатели, перебранные зажимы и расчищенный коридор эвакуации.",
      ka: "საბაგირო, რომელიც თეთნულდის მოწინავე ცირკებს ხსნის, ახალი ძრავებით, გადაწყობილი ჩამჭერებით და გაწმენდილი ევაკუაციის დერეფნით დაბრუნდა.",
    },
    body: {
      en: "The upper chair had been limping through two seasons with intermittent faults. The resort pulled it offline in April and spent six months on a full overhaul: new drive motors from Doppelmayr's Austrian plant, every grip taken off and re-pressed, and the hike-out track below the line cleared and marked.\n\nThe chair reopens 20 December alongside Tetnuldi's season start. With it, the top three bowls are open from day one — in previous seasons they often waited for late January.\n\nAvalanche control on the north-east aspect has been added to the resort patrol's daily sweep.",
      ru: "Верхний кресельный две сезона работал с перебоями. В апреле его сняли и шесть месяцев делали капиталку: новые двигатели с австрийского завода Doppelmayr, перепрессовка каждого зажима, расчищенный и промаркированный пеший коридор под трассой.\n\nПодъёмник открывается 20 декабря вместе с началом сезона Тетнулди. С ним верхние три цирка — с первого дня, тогда как раньше они часто ждали до конца января.\n\nЛавинный контроль северо-восточной экспозиции добавили в ежедневный обход патруля.",
      ka: "ზედა საბაგირო ორი სეზონის განმავლობაში პერიოდული გაფუჭებებით მუშაობდა. აპრილში კურორტმა ის დახურა და ექვსი თვე სრული კაპრემონტი ჩაუტარა: ახალი ძრავები Doppelmayr-ის ავსტრიული ქარხნიდან, თითოეული ჩამჭერი მოხსნილი და თავიდან დაპრესილი, ასევე გაწმენდილი და მონიშნული ფეხით გასასვლელი დერეფანი ტრასის ქვემოთ.\n\nსაბაგირო 20 დეკემბერს თეთნულდის სეზონის დასაწყისთან ერთად იხსნება. მასთან ერთად ზედა სამი ცირკი პირველივე დღიდან იხსნება — წინა სეზონებზე ხშირად იანვრის ბოლომდე ვუცდიდით.\n\nჩრდილო-აღმოსავლეთ ფერდობის ზვავური კონტროლი პატრულის ყოველდღიურ შემოვლაშია დამატებული.",
    },
    category: "infrastructure",
    author: "georgiawinter editorial",
    publishedAt: "2026-10-07T09:30:00Z",
    resort: "tetnuldi",
    cover: "/routes/mestia-tetnuldi.jpg",
  },
  {
    slug: "tetnuldi-backcountry-route-guida-dalla-mestia",
    locale: "all",
    title: {
      en: "A backcountry primer for Tetnuldi's north face",
      ru: "Бэккантри-введение в северный фасад Тетнулди",
      ka: "backcountry-ის შესავალი თეთნულდის ჩრდილოეთ ფასადზე",
    },
    excerpt: {
      en: "What a day on the Tetnuldi backcountry actually involves: skinning time, decision points, and when to turn around.",
      ru: "Как на самом деле выглядит день в бэккантри Тетнулди: время тропёжки, точки решений и когда разворачиваться.",
      ka: "როგორი ჩანს სინამდვილეში backcountry დღე თეთნულდზე: skinning-ის დრო, გადაწყვეტილების წერტილები და როდის უნდა შევბრუნდეთ.",
    },
    body: {
      en: "The north face of Tetnuldi is one of the most photographed lines in the Caucasus, and one of the most consequential. Even on a stable day a tour from the top lift to the valley is a six-hour commitment with a technical traverse and two couloir options that funnel to the same runout.\n\nGo with a local guide. The three operators we trust are listed on our Tetnuldi resort page. All of them run groups of four maximum, use rescue beacons rated for -30, and carry a satellite messenger for the sections with no mobile signal.\n\nTurn-around rules the guides enforce: wind over 15 m/s at the ridge, visibility under 200 m, any whumpfing on the test slope, or group pace below the planned schedule by more than 30 minutes.",
      ru: "Северный фасад Тетнулди — одна из самых фотографируемых линий Кавказа и одна из самых серьёзных. Даже в стабильный день тур от верхнего подъёмника в долину — это шесть часов, с технической траверсой и двумя кулуарами, которые сходятся в один выкат.\n\nИдите с местным гидом. Три проверенных оператора перечислены на нашей странице курорта Тетнулди. Все они работают с группами до четырёх человек, используют бипперы с рабочей температурой -30 и спутниковый мессенджер на участках без мобильной связи.\n\nПравила разворота, которых гиды держатся: ветер на гребне более 15 м/с, видимость менее 200 м, любое «уханье» на тестовом склоне или отставание группы от графика более чем на 30 минут.",
      ka: "თეთნულდის ჩრდილოეთი ფასადი კავკასიის ერთ-ერთი ყველაზე ფოტოგრაფირებული ხაზია და ერთ-ერთი ყველაზე სერიოზული. სტაბილურ დღესაც კი ზედა საბაგიროდან ხეობამდე ტური ექვსსაათიანი ვალდებულებაა, ტექნიკური ტრავერსით და ორი კულუარით, რომლებიც ერთ გასასვლელში იყრიან თავს.\n\nიარეთ ადგილობრივ გიდთან. ჩვენი სანდო სამი ოპერატორი თეთნულდის კურორტის გვერდზეა ჩამოთვლილი. ყველა მათგანი მაქსიმუმ ოთხკაციან ჯგუფებს ატარებს, -30-ზე მომუშავე biiper-ებს იყენებს და სატელიტურ მესენჯერს აქვს იმ მონაკვეთებზე, სადაც მობილური სიგნალი არ არის.\n\nშებრუნების წესები, რასაც გიდები იცავენ: ქედზე ქარი 15 მ/წმ-ზე მეტი, ხილვადობა 200 მ-ზე ნაკლები, ნებისმიერი „ბრახუნი“ სატესტო ფერდობზე ან ჯგუფის დაგვიანება გეგმიდან 30 წუთზე მეტით.",
    },
    category: "guide",
    author: "georgiawinter editorial",
    publishedAt: "2026-08-05T09:00:00Z",
    resort: "tetnuldi",
    cover: "/routes/mestia-tetnuldi.jpg",
  },
  {
    slug: "tetnuldi-avalanche-safety-course-december",
    locale: "all",
    title: {
      en: "Two-day avalanche safety course in Mestia, December",
      ru: "Двухдневный курс по лавинной безопасности в Местии, декабрь",
      ka: "ორდღიანი ზვავური უსაფრთხოების კურსი მესტიაში, დეკემბერი",
    },
    excerpt: {
      en: "Theory on day one, companion rescue drills on day two above Tetnuldi. Certified AIARE-equivalent, 12 places only.",
      ru: "Теория в первый день, спасательные учения на второй над Тетнулди. Сертификат, эквивалентный AIARE, всего 12 мест.",
      ka: "პირველი დღე თეორია, მეორე — თანაგუნდელის გადარჩენის სავარჯიშოები თეთნულდის ზემოთ. AIARE-ის ეკვივალენტური სერტიფიკატი, სულ 12 ადგილი.",
    },
    body: {
      en: "The Caucasus Mountaineering School is running a two-day avalanche safety course on 13-14 December, before the main season crowd arrives. Day one is classroom in Mestia: snowpack layers, slope evaluation, group management. Day two is on-snow above the Tetnuldi upper lift: beacon drill, probing, strategic shoveling.\n\nThe course is capped at twelve and already has eight bookings as of this week. Price is 480 GEL per person and includes beacon rental for anyone who does not own one.\n\nThe school's lead instructor spent eight winters as a patroller at Chamonix and holds Georgian federation guide credentials.",
      ru: "Школа кавказского альпинизма проводит двухдневный курс по лавинной безопасности 13-14 декабря, до основного наплыва сезона. Первый день — аудитория в Местии: слои снега, оценка склона, работа с группой. Второй — на снегу над верхним подъёмником Тетнулди: работа с биппером, щупы, стратегическое откапывание.\n\nМест — двенадцать, на этой неделе уже восемь броней. Цена — 480 лари с человека, прокат биппера входит в стоимость для тех, у кого его нет.\n\nВедущий инструктор отработал восемь зим патрульным в Шамони и имеет гидский сертификат грузинской федерации.",
      ka: "კავკასიის ალპინიზმის სკოლა ორდღიან ზვავური უსაფრთხოების კურსს 13-14 დეკემბერს ატარებს, სეზონის მთავარ ტურისტულ ტალღამდე. პირველი დღე — აუდიტორია მესტიაში: თოვლის შრეები, ფერდობის შეფასება, ჯგუფის მართვა. მეორე — თოვლზე თეთნულდის ზედა საბაგიროს ზემოთ: biiper-ის სავარჯიშო, ზონდირება, სტრატეგიული ბარვა.\n\nკურსი თორმეტზეა შეზღუდული, ამ კვირისთვის უკვე რვა ჯავშანია. ფასი 480 ლარია თითო ადამიანზე, biiper-ის ქირა ჩათვლით მათთვის, ვისაც არ აქვს.\n\nწამყვანი ინსტრუქტორი რვა ზამთარი შამონიში პატრულად მუშაობდა და აქვს ქართული ფედერაციის გიდის სერტიფიკატი.",
    },
    category: "event",
    author: "georgiawinter editorial",
    publishedAt: "2026-09-18T10:00:00Z",
    resort: "tetnuldi",
    cover: "/routes/mestia-tetnuldi.jpg",
  },
  {
    slug: "hatsvali-cafe-renovation",
    locale: "all",
    title: {
      en: "Hatsvali summit cafe reopens after full renovation",
      ru: "Кафе на вершине Хацвали открывается после полного ремонта",
      ka: "ჰაცვალის მწვერვალზე კაფე სრული რემონტის შემდეგ იხსნება",
    },
    excerpt: {
      en: "New double-glazed windows, a proper espresso machine and a wood-burning stove — plus the same khachapuri from the same family.",
      ru: "Двойные стеклопакеты, нормальная кофемашина и дровяная печь — и тот же хачапури от той же семьи.",
      ka: "ორფენიანი მინაპაკეტები, ნორმალური ყავის აპარატი და შეშის ღუმელი — და იგივე ხაჭაპური იმავე ოჯახისგან.",
    },
    body: {
      en: "The small cafe at the top of the Hatsvali gondola had been running on charm and single-pane windows for a decade. The owners used the summer to replace the glazing, add a wood-burning stove, swap the kettle-based coffee for an actual espresso machine and extend the deck.\n\nThe menu is unchanged. Svan-style khachapuri, boiled lobio, a honey-lemon ginger brew. Prices went up by two lari each — the family said it was the first increase in four years.\n\nThe cafe opens with the gondola on 15 December. Cash still preferred, card now accepted via a satellite terminal.",
      ru: "Маленькое кафе наверху гондолы Хацвали десять лет работало на обаянии и одностворчатых окнах. Летом хозяева заменили стеклопакеты, поставили дровяную печь, перешли с кипятка в чайнике на нормальную кофемашину и расширили веранду.\n\nМеню не меняется. Хачапури по-свански, варёное лобио, медово-лимонный с имбирём. Цены подняли на два лари за позицию — семья сказала, что это первое повышение за четыре года.\n\nКафе открывается вместе с гондолой 15 декабря. Наличные по-прежнему предпочтительнее, карты теперь принимают через спутниковый терминал.",
      ka: "ჰაცვალის გონდოლის ზედა სადგურის პატარა კაფე ათი წელი ხიბლით და ერთფენიანი ფანჯრებით მუშაობდა. მფლობელებმა ზაფხული გამოიყენეს: შეცვალეს მინაპაკეტები, დადგეს შეშის ღუმელი, გადავიდნენ ქვაბში ადუღებული წყლის ყავიდან ნამდვილ ესპრესოს აპარატზე და გააფართოვეს აივანი.\n\nმენიუ არ იცვლება. სვანური ხაჭაპური, მოხარშული ლობიო, თაფლ-ლიმონ-ჯანჯაფილის სასმელი. ფასები ორი ლარით გაიზარდა თითოეულ პოზიციაზე — ოჯახის თქმით, ეს ოთხი წლის განმავლობაში პირველი ზრდაა.\n\nკაფე გონდოლასთან ერთად 15 დეკემბერს იხსნება. ნაღდი ფული ჯერ კიდევ სასურველია, ბარათი ახლა სატელიტური ტერმინალით მიიღება.",
    },
    category: "news",
    author: "georgiawinter editorial",
    publishedAt: "2026-10-01T09:00:00Z",
    resort: "hatsvali",
    cover: "/routes/mestia-hatsvali.jpg",
  },
  {
    slug: "hatsvali-family-ski-weekend-january",
    locale: "all",
    title: {
      en: "Family ski weekend at Hatsvali: 24-25 January",
      ru: "Семейный ски-уикенд в Хацвали: 24-25 января",
      ka: "საოჯახო სათხილამურო უიქენდი ჰაცვალში: 24-25 იანვარი",
    },
    excerpt: {
      en: "Discounted family passes, free gear try-outs for kids, and a snow-sculpting contest at the base.",
      ru: "Скидки на семейные пассы, бесплатные пробы инвентаря для детей и конкурс снежных скульптур у подножия.",
      ka: "ფასდაკლებული საოჯახო აბონემენტები, უფასო აღჭურვილობის მოსინჯვა ბავშვებისთვის და თოვლის ქანდაკებების კონკურსი ძირში.",
    },
    body: {
      en: "Hatsvali is quieter than Gudauri or Bakuriani, and the resort is leaning into that for a dedicated family weekend. Family passes (two adults plus up to three children) are 30 percent off; a demo tent at the base lets kids try shaped skis and a few junior snowboards without a rental deposit.\n\nSaturday afternoon from 14:00 the children's school runs a snow-sculpting contest with prizes for ages 5-7, 8-10 and 11-13. Entries judged by two of the resort's instructors.\n\nMestia's two main hotels have a 15 percent discount for the weekend if you book directly and mention the family weekend.",
      ru: "Хацвали тише Гудаури и Бакуриани — и курорт делает на этом акцент в семейном уикенде. Семейный пасс (двое взрослых и до трёх детей) со скидкой 30 %; палатка демо-инвентаря у подножия даёт детям покатать карвинговые лыжи и несколько юниорских сноубордов без залога.\n\nВ субботу с 14:00 детская школа проводит конкурс снежных скульптур с призами в трёх возрастных группах: 5-7, 8-10 и 11-13 лет. Жюри — два инструктора курорта.\n\nДва главных отеля Местии дают 15 % скидки на уикенд при прямом бронировании с упоминанием акции.",
      ka: "ჰაცვალი უფრო მშვიდია, ვიდრე გუდაური ან ბაკურიანი — და კურორტი ამ უპირატესობაზე საოჯახო უიქენდში ამახვილებს ყურადღებას. საოჯახო აბონემენტი (ორი უფროსი და მაქსიმუმ სამი ბავშვი) 30 პროცენტით იაფდება; ძირში დემო-კარავი ბავშვებს shaped სათხილამურო ფეხსაცმლის და რამდენიმე უმცროსი სნოუბორდის მოსინჯვას დეპოზიტის გარეშე სთავაზობს.\n\nშაბათს 14:00-დან საბავშვო სკოლა თოვლის ქანდაკებების კონკურსს ატარებს პრიზებით ასაკობრივ ჯგუფებში: 5-7, 8-10 და 11-13 წელი. ჟიური — კურორტის ორი ინსტრუქტორი.\n\nმესტიის ორი მთავარი სასტუმრო უიქენდზე 15% ფასდაკლებას გვთავაზობს პირდაპირი ჯავშნისას, თუ აქციას ახსენებთ.",
    },
    category: "event",
    author: "georgiawinter editorial",
    publishedAt: "2026-09-25T08:00:00Z",
    resort: "hatsvali",
    cover: "/routes/mestia-hatsvali.jpg",
  },
  {
    slug: "hatsvali-skinning-track-mestia",
    locale: "all",
    title: {
      en: "A beginner skinning track from Mestia to Hatsvali",
      ru: "Учебный скитур от Местии до Хацвали",
      ka: "დამწყებთა skinning ტრასა მესტიიდან ჰაცვალამდე",
    },
    excerpt: {
      en: "Six kilometres on a gentle logging road — the right way to try touring without exposing yourself to real avalanche terrain.",
      ru: "Шесть километров по пологой лесовозной дороге — правильный способ попробовать скитур без выхода на лавиноопасный рельеф.",
      ka: "ექვსი კილომეტრი ნაზი ტყის გზით — სწორი გზა skitour-ის მოსინჯვისთვის რეალური ზვავური რელიეფის გარეშე.",
    },
    body: {
      en: "The old logging road from the north edge of Mestia to the Hatsvali base is one of the safest places in the Caucasus to try ski touring. The grade averages 7 percent, there is no overhead avalanche terrain for the first five kilometres, and the only tree-hazard is the two switchbacks near the top where fallen branches are common.\n\nAllow two to three hours up with gear rental weight. Local tours start at 180 GEL for a half-day with a guide, equipment and a thermos of coffee at the top.\n\nSki back down the Hatsvali piste, or ride the gondola if your legs are done. Hot tip: eat lunch at the renovated summit cafe before you commit to the descent.",
      ru: "Старая лесовозная дорога от северной окраины Местии до нижней станции Хацвали — одно из самых безопасных мест на Кавказе, где можно попробовать скитур. Средний уклон 7 %, первые пять километров над головой нет лавинного рельефа, а древесная опасность — только на двух серпантинах у вершины, где часто падают ветки.\n\nЗакладывайте два-три часа наверх с весом арендованной снаряги. Местные туры — от 180 лари за полдня с гидом, инвентарём и термосом кофе наверху.\n\nСпуск по трассе Хацвали или на гондоле, если ноги уже сдали. Совет: пообедайте в обновлённом кафе на вершине перед спуском.",
      ka: "ძველი სატყეო გზა მესტიის ჩრდილოეთი კიდიდან ჰაცვალის ქვედა სადგურამდე კავკასიის ერთ-ერთი ყველაზე უსაფრთხო ადგილია skitour-ის მოსინჯვისთვის. საშუალო დახრილობა 7 პროცენტია, პირველ ხუთ კილომეტრზე თავზე ზვავური რელიეფი არ არის, ხოლო ხის საშიშროება მხოლოდ ზედა ორ სერპანტინზეა, სადაც ხშირად ცვივა ტოტები.\n\nზევით ასვლაზე 2-3 საათი დათვალეთ ქირაობული აღჭურვილობის წონით. ადგილობრივი ტურები 180 ლარიდან იწყება ნახევარ დღეზე — გიდი, აღჭურვილობა და ზევით ყავის თერმოსი.\n\nუკან ჰაცვალის ტრასით ჩამოდით ან გონდოლით, თუ ფეხები უკვე მოგეტანებით. რჩევა: დაშვებამდე მწვერვალის განახლებულ კაფეში ჭამეთ.",
    },
    category: "guide",
    author: "georgiawinter editorial",
    publishedAt: "2026-07-28T09:00:00Z",
    resort: "hatsvali",
    cover: "/routes/mestia-hatsvali.jpg",
  },
  {
    slug: "goderdzi-new-upper-lift-online",
    locale: "all",
    title: {
      en: "Goderdzi's new upper lift finally online",
      ru: "Новый верхний подъёмник Годердзи наконец запущен",
      ka: "გოდერძის ახალი ზედა საბაგირო ბოლოს ამოქმედდა",
    },
    excerpt: {
      en: "Three seasons overdue, the chair that opens the north bowl is finally running — and it changes the resort.",
      ru: "С опозданием в три сезона кресельный на северный цирк наконец работает — и курорт меняется.",
      ka: "სამი სეზონის დაგვიანებით, საბაგირო, რომელიც ჩრდილოეთ ცირკს ხსნის, ბოლოს მუშაობს — და კურორტი იცვლება.",
    },
    body: {
      en: "The upper chair at Goderdzi has been under construction since 2023. Component delays, a dispute with the Turkish contractor and two winters of weather closures pushed the opening back three times. The commissioning crew finished acceptance testing in September.\n\nThe chair adds 240 vertical metres and about 1.5 km of pisted runs facing north — the aspect that holds Goderdzi's famously dry maritime snow longest. For strong skiers, the top also unlocks easy access to a wide, mellow backcountry bowl that previously meant a 90-minute skin.\n\nDay pass goes up by 10 GEL to reflect the chair's operating cost. Season passes bought before 1 December keep the old price.",
      ru: "Верхний кресельный Годердзи строят с 2023 года. Задержки комплектующих, спор с турецким подрядчиком и две зимы с погодными остановками трижды переносили открытие. Пуско-наладка закончилась в сентябре.\n\nПодъёмник добавляет 240 вертикальных метров и около 1,5 км пистированных трасс северной экспозиции — именно эта сторона дольше всех держит знаменитый сухой приморский снег Годердзи. Сильные катальщики получают простой доступ в широкий пологий бэккантри-цирк, куда раньше шли полтора часа на тропёжке.\n\nДневной пасс поднимается на 10 лари с учётом работы подъёмника. Сезонные абонементы, купленные до 1 декабря, сохраняют прежнюю цену.",
      ka: "გოდერძის ზედა საბაგიროს 2023 წლიდან აშენებენ. კომპონენტების დაგვიანებამ, თურქ კონტრაქტორთან დავამ და ორმა ზამთარმა ამინდის გამო გაჩერებებით გახსნა სამჯერ გადადო. ექსპლუატაციაში მიღების ტესტები სექტემბერში დასრულდა.\n\nსაბაგირო 240 ვერტიკალურ მეტრს და დაახლოებით 1,5 კმ გაპრანსულ ტრასას ამატებს ჩრდილოეთი ფასადისთვის — სწორედ ეს მხარე ინარჩუნებს ყველაზე დიდხანს გოდერძის ცნობილ მშრალ საზღვაო თოვლს. გამოცდილი მოთხილამურეებისთვის ზედა სადგური ფართო, რბილი backcountry ცირკს აადვილებს, რომლისთვისაც აქამდე საათნახევრიანი skinning იყო საჭირო.\n\nდღიური აბონემენტი 10 ლარით გაიზრდება საბაგიროს ექსპლუატაციის გასათვალისწინებლად. 1 დეკემბრამდე ნაყიდი სეზონური აბონემენტები ძველ ფასს ინარჩუნებენ.",
    },
    category: "infrastructure",
    author: "georgiawinter editorial",
    publishedAt: "2026-09-20T09:00:00Z",
    resort: "goderdzi",
    cover: "/routes/batumi-goderdzi.jpg",
  },
  {
    slug: "goderdzi-batumi-driver-meetup",
    locale: "all",
    title: {
      en: "Driver meetup in Batumi for the Goderdzi season",
      ru: "Встреча водителей в Батуми перед сезоном Годердзи",
      ka: "მძღოლთა შეკრება ბათუმში გოდერძის სეზონისთვის",
    },
    excerpt: {
      en: "Twenty-two drivers running the Batumi-Goderdzi route sat down in October to align on winter standards.",
      ru: "В октябре двадцать два водителя маршрута Батуми-Годердзи встретились, чтобы согласовать зимние стандарты.",
      ka: "ოქტომბერში ბათუმი-გოდერძის მარშრუტზე მომუშავე ოცდაორი მძღოლი შეიკრიბა, რათა ზამთრის სტანდარტები შეეთანხმებინათ.",
    },
    body: {
      en: "The road up to Goderdzi is the most consequential winter drive in Georgia's commercial transfer network. We hosted a meetup in Batumi this October with twenty-two of the drivers who regularly run the route — including every driver on our platform.\n\nTopics: minimum chain and tyre standards (studded or full winter M+S, chains carried from Khulo), the shared radio frequency for pass closures, communication templates in all three languages for passengers when the road is held, and child-seat availability.\n\nWe also agreed a maximum operating temperature of -22°C at the pass. Below that, departures are postponed to the next clear window and passengers are offered reschedule or refund without a fee.",
      ru: "Дорога на Годердзи — самая серьёзная зимняя трасса в коммерческой трансферной сети Грузии. В октябре мы собрали в Батуми встречу с двадцатью двумя водителями, регулярно работающими на маршруте — включая всех водителей нашей платформы.\n\nТемы: минимальные стандарты шин и цепей (шипы или полная зимняя M+S, цепи обязательны от Хуло), общая радиочастота на случай закрытия перевала, шаблоны сообщений пассажирам на трёх языках при ожидании открытия и наличие детских автокресел.\n\nЗафиксировали максимум рабочей температуры на перевале −22 °C. Ниже — выезд переносится на следующее окно, пассажирам предлагается перенос или возврат без комиссии.",
      ka: "გოდერძისკენ გზა საქართველოს კომერციული ტრანსფერების ქსელის ყველაზე სერიოზული ზამთრის მონაკვეთია. ოქტომბერში ბათუმში შევკრიბეთ ოცდაორი მძღოლი, რომლებიც რეგულარულად მუშაობენ ამ მარშრუტზე — მათ შორის ჩვენი პლატფორმის ყველა მძღოლი.\n\nთემები: ჯაჭვების და საბურავების მინიმალური სტანდარტები (ლურსმნიანი ან სრული ზამთრის M+S, ჯაჭვები ხულოდან უკვე სავალდებულო), საერთო რადიოსიხშირე უღელტეხილის დახურვის შემთხვევაში, მგზავრების ინფორმირების სამენოვანი შაბლონები გზის ლოდინის დროს და საბავშვო სავარძლების ხელმისაწვდომობა.\n\nშევთანხმდით მაქსიმალურ ოპერაციულ ტემპერატურაზე უღელტეხილზე — -22°C. ამ ზღვარს ქვემოთ გასვლა გადაინაცვლებს მომდევნო ფანჯარაზე, მგზავრებს კი უფასო გადაწევა ან დაბრუნება შესთავაზებს.",
    },
    category: "news",
    author: "georgiawinter editorial",
    publishedAt: "2026-10-10T08:00:00Z",
    resort: "goderdzi",
    cover: "/routes/batumi-goderdzi.jpg",
  },
  {
    slug: "goderdzi-storm-skier-primer",
    locale: "all",
    title: {
      en: "A storm-skier's primer to Goderdzi",
      ru: "Гид по шторм-скиингу в Годердзи",
      ka: "შტორმ-სკიერის გზამკვლევი გოდერძისთვის",
    },
    excerpt: {
      en: "Why Goderdzi gets more snow than anywhere else in Georgia, and how to plan a trip around a Black Sea storm.",
      ru: "Почему в Годердзи выпадает больше снега, чем где-либо в Грузии, и как спланировать поездку под черноморский шторм.",
      ka: "რატომ მოდის გოდერძიში მეტი თოვლი, ვიდრე სადმე საქართველოში, და როგორ დავგეგმოთ მოგზაურობა შავი ზღვის შტორმის ქვეშ.",
    },
    body: {
      en: "Goderdzi's secret is geography. The pass is the first high ground that Black Sea moisture hits coming inland, and when a cold front follows a warm Mediterranean low, the snow totals are hard to believe. Fifty centimetres in 24 hours is a normal January.\n\nTo chase storms responsibly: pick a seven-day window with flexible lodging, start watching the GFS 500 mb map a week ahead, and have a transfer booked that lets you push the departure by 24 hours without a fee. We built that flexibility into our Batumi-Goderdzi route explicitly for this reason.\n\nIn-storm skiing at Goderdzi is a particular pleasure if you accept the trade-off: visibility is often terrible, the main lift closes when the ridge wind exceeds 25 m/s, and the lower lifts become the whole resort for a day or two.",
      ru: "Секрет Годердзи — география. Перевал — первая высокая гряда, в которую упирается влага Чёрного моря, и когда за средиземноморским циклоном приходит холодный фронт, снегонакопления становятся трудно поверить: полметра за сутки — обычный январь.\n\nЧтобы охотиться за штормами ответственно: берите недельное окно с гибким проживанием, за семь дней начинайте смотреть карту GFS 500 мб и бронируйте трансфер с бесплатным переносом на 24 часа. Мы специально заложили эту гибкость в маршрут Батуми-Годердзи.\n\nКатание в шторм в Годердзи — особое удовольствие, если принять трейд-офф: видимость часто плохая, верхний подъёмник закрывают при ветре на гребне выше 25 м/с, и на день-два работает только нижняя сеть.",
      ka: "გოდერძის საიდუმლო გეოგრაფიაა. უღელტეხილი არის პირველი მაღალი რელიეფი, რომელსაც შავი ზღვის ტენიანობა ხვდება ხმელეთისკენ, და როცა მედიტერანულ ცირკულარს ცივი ფრონტი მოჰყვება, თოვლის რაოდენობა უბრალოდ წარმოუდგენელია — ნახევარი მეტრი 24 საათში იანვარში ჩვეულებრივი რამაა.\n\nშტორმებზე პასუხისმგებლობით ნადირობისთვის: აიღეთ შვიდდღიანი ფანჯარა მოქნილი განთავსებით, GFS 500 მბ რუკას დაიწყეთ შვიდი დღით ადრე თვალთვალი და დაჯავშნეთ ტრანსფერი 24-საათიანი უფასო გადანაცვლებით. ჩვენ ეს მოქნილობა ბათუმი-გოდერძის მარშრუტში სპეციალურად ჩავდეთ ამ მიზნით.\n\nშტორმის დროს სრიალი გოდერძიში განსაკუთრებული სიამოვნებაა, თუ ტრედოფს მიიღებ: ხილვადობა ხშირად ცუდია, ზედა საბაგირო ქედზე 25 მ/წმ-ზე მეტი ქარისას იხურება და დღე-ორი დღე ქვედა ქსელი ხდება მთელი კურორტი.",
    },
    category: "guide",
    author: "georgiawinter editorial",
    publishedAt: "2026-08-14T09:00:00Z",
    resort: "goderdzi",
    cover: "/routes/batumi-goderdzi.jpg",
  },
  {
    slug: "kazbegi-stepantsminda-winter-service",
    locale: "all",
    title: {
      en: "Winter transfers to Stepantsminda now run every two hours",
      ru: "Зимние трансферы в Степанцминду теперь каждые два часа",
      ka: "ზამთრის ტრანსფერები სტეფანწმინდაში ყოველ ორ საათში ხდება",
    },
    excerpt: {
      en: "From 1 December through 31 March, our Tbilisi-Kazbegi shuttle moves to a two-hourly departure between 06:00 and 18:00.",
      ru: "С 1 декабря по 31 марта наш шаттл Тбилиси-Казбеги ходит каждые два часа с 06:00 до 18:00.",
      ka: "1 დეკემბრიდან 31 მარტამდე ჩვენი თბილისი-ყაზბეგის შატლი ყოველ ორ საათში დადის 06:00-დან 18:00-მდე.",
    },
    body: {
      en: "Demand on the Tbilisi-Kazbegi route grew 40 percent last winter — mostly day-trippers from Tbilisi for Gergeti Trinity Church and the Dariali Gorge. We are moving from four daily departures to a two-hourly cadence between 06:00 and 18:00 for the main winter season.\n\nThe return legs mirror the outbound: departures from Stepantsminda every two hours between 08:00 and 20:00. Same price as the current schedule, but you can now walk up to the pickup point in Tbilisi without a booking if seats are free.\n\nWe recommend booking anyway on weekends and around holidays; vehicles filled on short notice in February 2026 twice.",
      ru: "Спрос на маршрут Тбилиси-Казбеги вырос за прошлую зиму на 40 % — в основном это однодневные поездки из Тбилиси в Гергетскую Троицу и Дарьяльское ущелье. Мы переходим с четырёх ежедневных рейсов на двухчасовой интервал с 06:00 до 18:00 на основной зимний сезон.\n\nОбратный график зеркальный: из Степанцминды каждые два часа с 08:00 до 20:00. Цена та же, но теперь на остановке в Тбилиси можно подойти без брони — если есть места.\n\nПо выходным и праздникам всё же лучше бронировать: в феврале 2026 машины уходили битком дважды.",
      ka: "მოთხოვნა თბილისი-ყაზბეგის მარშრუტზე წინა ზამთარს 40 პროცენტით გაიზარდა — ძირითადად თბილისიდან ერთდღიანი მოგზაურობები გერგეთის სამებისა და დარიალის ხეობისთვის. ვცვლით ოთხ ყოველდღიურ გასვლას ორსაათიანი ინტერვალით 06:00-დან 18:00-მდე ზამთრის მთავარ სეზონზე.\n\nუკანა გასვლები სარკისებურია: სტეფანწმინდიდან ყოველ ორ საათში 08:00-დან 20:00-მდე. ფასი იგივეა, მაგრამ ახლა თბილისში შეკრების წერტილზე ჯავშნის გარეშე მოსვლა შეიძლება, თუ ადგილები თავისუფალია.\n\nუიქენდებსა და დღესასწაულებზე მაინც გირჩევთ ჯავშნას: 2026 წლის თებერვალში მანქანები ორჯერ გავსებული გავიდა.",
    },
    category: "infrastructure",
    author: "georgiawinter editorial",
    publishedAt: "2026-10-08T09:00:00Z",
    resort: "kazbegi",
    cover: "/routes/tbilisi-kazbegi.jpg",
  },
  {
    slug: "kazbegi-winter-day-trip-guide",
    locale: "all",
    title: {
      en: "A winter day-trip from Tbilisi to Kazbegi, hour by hour",
      ru: "Зимний однодневный выезд из Тбилиси в Казбеги, по часам",
      ka: "ზამთრის ერთდღიანი მოგზაურობა თბილისიდან ყაზბეგამდე, საათობრივად",
    },
    excerpt: {
      en: "The realistic schedule, including the Jvari Pass photo stop and how long Gergeti actually takes in snow.",
      ru: "Реалистичный план с фотоостановкой на Крестовом перевале и реальным временем на Гергети по снегу.",
      ka: "რეალური გრაფიკი ჯვრის უღელტეხილის ფოტოპაუზით და იმ ფაქტობრივი დროით, რასაც გერგეთი თოვლში მოითხოვს.",
    },
    body: {
      en: "A winter day-trip to Kazbegi works if you leave Tbilisi by 07:00 and accept that the final hike up to Gergeti Trinity Church takes longer in snow. Here is the schedule that actually fits a day: 07:00 depart Tbilisi, 09:30 photo stop at the Russia-Georgia Friendship Monument, 11:00 arrive Stepantsminda, 11:30 start the Gergeti walk-up.\n\nIn deep snow the walk up from Gergeti village takes 90 minutes rather than the summer 60. A 4x4 taxi to the final switchbacks saves an hour; the drivers wait at the lower square and charge 60 GEL round trip.\n\nLunch back in Stepantsminda at 14:30, Dariali Gorge quick stop at 15:30, Tbilisi by 19:00 with a buffer for the pass. If you want to split it over two days, book a night at a Stepantsminda guesthouse and come back fresh.",
      ru: "Зимняя однодневка в Казбеги работает, если выехать из Тбилиси в 07:00 и принять, что финальный подъём к Троице Гергети по снегу занимает больше. Реалистичный план: 07:00 выезд, 09:30 фото у Монумента дружбы России и Грузии, 11:00 Степанцминда, 11:30 выход на Гергети.\n\nВ глубоком снегу подъём из села Гергети занимает 90 минут вместо летних 60. Полноприводное такси до финальных серпантинов экономит час; водители ждут на нижней площади и просят 60 лари в оба конца.\n\nОбед обратно в Степанцминде в 14:30, Дарьял — короткая остановка в 15:30, Тбилиси к 19:00 с запасом на перевал. Если хочется растянуть на два дня, бронируйте ночь в гестхаусе и возвращайтесь свежими.",
      ka: "ზამთრის ერთდღიანი ყაზბეგი შესაძლებელია, თუ თბილისიდან 07:00-ზე გავდივართ და ვთანხმდებით, რომ გერგეთის სამებამდე საბოლოო ასვლა თოვლში მეტ დროს მოითხოვს. რეალური გრაფიკი: 07:00 გასვლა თბილისიდან, 09:30 ფოტოპაუზა რუსეთ-საქართველოს მეგობრობის მონუმენტთან, 11:00 სტეფანწმინდა, 11:30 გერგეთზე ასვლის დასაწყისი.\n\nღრმა თოვლში სოფელ გერგეთიდან ასვლა 90 წუთი გრძელდება ზაფხულის 60-ის ნაცვლად. 4x4 ტაქსი ბოლო სერპანტინებამდე საათს დაგზოგავთ; მძღოლები ქვედა მოედანზე გელოდებათ და ორმხრივად 60 ლარს ითხოვენ.\n\nლანჩი უკან სტეფანწმინდაში 14:30-ზე, დარიალში ხანმოკლე გაჩერება 15:30-ზე, თბილისში 19:00-ზე უღელტეხილის რეზერვით. თუ ორ დღეზე გინდათ გაწელოთ, დაჯავშნეთ ღამე სტუმრის სახლში და დასვენებული დაბრუნდით.",
    },
    category: "guide",
    author: "georgiawinter editorial",
    publishedAt: "2026-07-20T09:00:00Z",
    resort: "kazbegi",
    cover: "/routes/gudauri-kazbegi.jpg",
  },
  {
    slug: "kazbegi-ice-climbing-festival",
    locale: "all",
    title: {
      en: "Kazbegi Ice Climbing Festival returns, 7-9 February",
      ru: "Фестиваль ледолазания в Казбеги возвращается 7-9 февраля",
      ka: "ყაზბეგის ყინულზე ცოცვის ფესტივალი ბრუნდება, 7-9 თებერვალი",
    },
    excerpt: {
      en: "Three days of fixed top-ropes, beginner clinics, and a mixed-climbing competition at the Gveleti falls.",
      ru: "Три дня закреплённых топ-ропов, вводных клиник и соревнований по микст-климбингу у водопадов Гвелети.",
      ka: "სამი დღე ფიქსირებული top-rope-ით, დამწყებთა კლინიკებით და mixed-climbing-ის შეჯიბრით გველეთის ჩანჩქერებთან.",
    },
    body: {
      en: "The ice festival returns to the Gveleti falls between Stepantsminda and the Russian border for its fifth edition. The lower falls host beginner clinics with rented tools and crampons — no experience needed, kids over 10 welcome. The upper falls carry the mixed route competition on Sunday.\n\nAll routes are set and belayed by the organising club. Day pass is 90 GEL, three-day pass 220 GEL; tool rental is 40 GEL per day.\n\nAccommodation in Stepantsminda fills early for the festival weekend. Transfer demand from Tbilisi is heavy; our regular two-hourly shuttle adds four extra Friday-afternoon departures on 7 February.",
      ru: "Ледовый фестиваль пятый раз проходит у водопадов Гвелети между Степанцминдой и российской границей. На нижних водопадах — вводные клиники с арендой инструментов и кошек; опыт не нужен, детей от 10 лет допускают. На верхних — воскресный микст-климбинг.\n\nВсе маршруты провешены и страхуются клубом-организатором. Дневной пропуск — 90 лари, трёхдневный — 220 лари; аренда инструмента — 40 лари в день.\n\nЖильё в Степанцминде на фестивальный уикенд разбирают заранее. Трансферы из Тбилиси нарасхват; наш регулярный двухчасовой шаттл добавляет четыре рейса в пятницу днём 7 февраля.",
      ka: "ყინულის ფესტივალი მეხუთედ იმართება გველეთის ჩანჩქერებთან სტეფანწმინდასა და რუსეთის საზღვარს შორის. ქვედა ჩანჩქერებზე დამწყებთა კლინიკებია, ინსტრუმენტებისა და კრამპონების ქირაობით — გამოცდილება არ არის საჭირო, 10 წელზე უფროსი ბავშვები მიიღებიან. ზედა ჩანჩქერზე კვირას mixed-climbing-ის შეჯიბრია.\n\nყველა ტრასა ორგანიზატორი კლუბის მიერაა გაშლილი და დაზღვეული. დღიური ბილეთი 90 ლარია, სამდღიანი — 220 ლარი; ინსტრუმენტების ქირა დღეში 40 ლარი.\n\nსტეფანწმინდაში განთავსება ფესტივალის უიქენდზე ადრე იფარგლება. ტრანსფერებზე მოთხოვნა თბილისიდან დიდია; ჩვენი რეგულარული ორსაათიანი შატლი 7 თებერვალს ოთხ დამატებით პარასკევ შუადღის გასვლას ამატებს.",
    },
    category: "event",
    author: "georgiawinter editorial",
    publishedAt: "2026-09-12T09:00:00Z",
    resort: "kazbegi",
    cover: "/routes/tbilisi-kazbegi.jpg",
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
