import type { Route, I18n } from "./types";

export type RouteFaq = { q: I18n; a: I18n };

// Ten shared FAQs. Every active route reuses these; airport-specific entries
// are swapped on routes where `fromSlug` includes "airport".
const SHARED: RouteFaq[] = [
  {
    q: {
      en: "Is the price I see the final price?",
      ru: "Указанная цена — окончательная?",
      ka: "ნაჩვენები ფასი საბოლოოა?",
    },
    a: {
      en: "Yes. No dynamic pricing. Any extras (child seat, ski rack, return leg) show up on the booking page before you pay — no surprises when the driver arrives.",
      ru: "Да. Никакого динамического ценообразования. Все доплаты (детское кресло, лыжный багажник, обратный путь) видно на странице бронирования до оплаты — на месте водитель не торгуется.",
      ka: "დიახ. დინამიკური ფასი არ გვაქვს. ყველა დანამატი (ბავშვის სავარძელი, თხილამურის ჯიხური, უკან დაბრუნება) დაჯავშნის გვერდზე ჩანს გადახდამდე — ადგილზე მძღოლი არ ვაჭრობს.",
    },
  },
  {
    q: {
      en: "What happens if the road closes?",
      ru: "Что если дорога закрыта?",
      ka: "რა მოხდება თუ გზა დაიკეტება?",
    },
    a: {
      en: "Your booking is automatically rescheduled or fully refunded with no fee. You get both options by WhatsApp within minutes of the Roads Department announcing the closure.",
      ru: "Бронирование автоматически переносится или полностью возвращается, без комиссии. Оба варианта приходят в WhatsApp в течение нескольких минут после объявления закрытия.",
      ka: "დაჯავშნა ავტომატურად გადაინაცვლებს ან სრულად დაგიბრუნდებათ, უფასოდ. ორივე ვარიანტი WhatsApp-ით მოდის დახურვის გამოცხადებიდან რამდენიმე წუთში.",
    },
  },
  {
    q: {
      en: "When do I get the driver's details?",
      ru: "Когда получу контакты водителя?",
      ka: "როდის მივიღებ მძღოლის მონაცემებს?",
    },
    a: {
      en: "Twelve hours before pickup, by WhatsApp: driver's name and phone, vehicle make, model and plate. The driver confirms the exact pickup time at the same point.",
      ru: "За 12 часов до подачи, в WhatsApp: имя и телефон водителя, марка, модель и номер машины. Он же подтверждает точное время подачи.",
      ka: "აყვანამდე 12 საათით ადრე WhatsApp-ით: მძღოლის სახელი და ტელეფონი, მანქანის მოდელი და ნომერი. იქვე მძღოლი ზუსტ დროსაც ადასტურებს.",
    },
  },
  {
    q: {
      en: "Is a child seat available?",
      ru: "Можно ли заказать детское кресло?",
      ka: "შესაძლებელია ბავშვის სავარძლის დაკვეთა?",
    },
    a: {
      en: "Yes — add it as an extra on the booking page. Group 1 (9–18 kg) is the default; mention a smaller or larger seat in the pickup notes and we fit it.",
      ru: "Да — добавляется как доп-опция на этапе бронирования. По умолчанию группа 1 (9–18 кг); для меньшего или большего укажите в заметке — установим.",
      ka: "დიახ — დაჯავშნის ეტაპზე ემატება. ნაგულისხმევია ჯგუფი 1 (9–18 კგ); უფრო პატარისთვის ან დიდისთვის მიუთითეთ შენიშვნაში — დავამატებთ.",
    },
  },
  {
    q: {
      en: "Can I bring skis or a snowboard?",
      ru: "Можно ли везти лыжи или сноуборд?",
      ka: "შემიძლია ვზიდო თხილამურები ან სნოუბორდი?",
    },
    a: {
      en: "Yes. One pair of skis or one board per passenger fits inside without a rack. For three or more sets, add the ski-rack extra so the trunk stays usable for luggage.",
      ru: "Да. Одна пара лыж или один сноуборд на пассажира помещается без багажника. От трёх комплектов — выберите доплату «лыжный багажник», чтобы багажник остался для чемоданов.",
      ka: "დიახ. ერთი წყვილი თხილამური ან ერთი ბორდი თითო მგზავრზე სალონში ეტევა, ჯიხურის გარეშე. სამი კომპლექტიდან აიღეთ „თხილამურის ჯიხური“, რომ საბარგულში ჩანთებს ადგილი დარჩეს.",
    },
  },
  {
    q: {
      en: "How much luggage can I bring?",
      ru: "Сколько багажа можно взять?",
      ka: "რამდენი ბარგის წაღება შემიძლია?",
    },
    a: {
      en: "In a sedan: one checked bag + one carry-on per passenger up to three passengers. In a minivan: one checked bag + one carry-on per passenger up to seven. More than that — tell us before booking so we send the right vehicle.",
      ru: "В седане: один большой + одна ручная кладь на пассажира, до трёх человек. В минивэне: один большой + одна ручная кладь на пассажира, до семи. Больше — предупредите заранее, подадим машину побольше.",
      ka: "სედანი: ერთი დიდი + ერთი ხელჩანთა თითო მგზავრზე, სამ ადამიანამდე. მინივენი: იგივე სქემა, შვიდ ადამიანამდე. მეტია — წინასწარ გვითხარით, შესაბამისი მანქანა გავგზავნით.",
    },
  },
  {
    q: {
      en: "What if fewer passengers turn up?",
      ru: "Что если приедет меньше людей?",
      ka: "რა მოხდება, თუ ნაკლები ხალხი მოვა?",
    },
    a: {
      en: "The price stays the same — it's for the vehicle, not per head. For shared seats, you only pay for the seats you booked.",
      ru: "Цена не меняется — она за машину, а не за человека. Для шеринговых мест вы платите только за забронированные места.",
      ka: "ფასი არ იცვლება — ის მანქანაზეა, არა ერთ ადამიანზე. გაზიარებული ადგილების შემთხვევაში იხდით მხოლოდ დაჯავშნილ ადგილებს.",
    },
  },
  {
    q: {
      en: "What if there is a snowstorm or avalanche risk?",
      ru: "А если буран или лавинная опасность?",
      ka: "თოვლის ქარიშხალი ან ზვავის რისკი?",
    },
    a: {
      en: "If the Roads Department closes the pass, you get the full-refund-or-reschedule choice described above. If the road is still open but the drive is dangerous in the operator's judgement, we postpone — same choice, same no-fee rule.",
      ru: "Если Дорожный департамент закрывает перевал — выше указанный выбор возврата или переноса. Если дорога формально открыта, но операторы считают поездку опасной — переносим: тот же выбор, без штрафов.",
      ka: "საგზაო დეპარტამენტმა უღელტეხილი დახურა — ზემოთ ნათქვამი ვარიანტები. გზა ფორმალურად ღიაა, ოპერატორები კი საშიშად მიიჩნევენ — გადავწევთ ტრანსფერს: იგივე არჩევანი, ჯარიმის გარეშე.",
    },
  },
  {
    q: {
      en: "Can I pay the driver in cash on the spot?",
      ru: "Можно ли оплатить водителю на месте наличными?",
      ka: "შემიძლია მძღოლს ადგილზე ნაღდით გადავუხადო?",
    },
    a: {
      en: "No. Payment goes through the booking page by card or Apple/Google Pay — that is what fixes the price and triggers the free-cancellation window. The driver carries no card reader and no cash till.",
      ru: "Нет. Оплата — через страницу бронирования картой или Apple/Google Pay. Именно это фиксирует цену и включает окно бесплатной отмены. У водителя нет терминала и кассы.",
      ka: "არა. გადახდა დაჯავშნის გვერდზე ხდება ბარათით ან Apple/Google Pay-ით — სწორედ ეს აფიქსირებს ფასს და ააქტიურებს უფასო გაუქმების ფანჯარას. მძღოლს ტერმინალიც არ აქვს და სალაროც.",
    },
  },
  {
    q: {
      en: "Will the driver speak English?",
      ru: "Говорит ли водитель на английском?",
      ka: "მძღოლი ინგლისურად ლაპარაკობს?",
    },
    a: {
      en: "English level is on every driver's public profile. For passengers who prefer a specific language, filter by language on the booking page or tell us in the pickup notes.",
      ru: "Уровень английского указан в публичном профиле каждого водителя. Если нужен конкретный язык — фильтр на странице бронирования или заметка к заказу.",
      ka: "ინგლისურის დონე ყველა მძღოლის საჯარო პროფილშია. თუ კონკრეტული ენა გჭირდებათ — ფილტრი დაჯავშნის გვერდზე ან შენიშვნა შეკვეთისას.",
    },
  },
];

const AIRPORT_SWAPS: RouteFaq[] = [
  {
    q: {
      en: "What if my flight is delayed?",
      ru: "Что если рейс задерживается?",
      ka: "რა მოხდება, თუ ფრენა დაგვიანდება?",
    },
    a: {
      en: "We track your flight number automatically. The driver waits for the real landing time at no charge; delayed flights are never penalised, and your booking can't be cancelled for a flight delay.",
      ru: "Мы автоматически отслеживаем номер рейса. Водитель ждёт по фактическому времени посадки без доплат; за задержку штрафов нет, бронь не может быть отменена из-за задержки.",
      ka: "თქვენი ფრენის ნომერი ავტომატურად ვთვალთვალებთ. მძღოლი ფაქტობრივ დაშვების დროზე გელით უფასოდ; დაგვიანებისთვის ჯარიმა არ არის და დაჯავშნა ფრენის დაგვიანების გამო ვერ გაუქმდება.",
    },
  },
  {
    q: {
      en: "How will I find the driver at the airport?",
      ru: "Как найти водителя в аэропорту?",
      ka: "აეროპორტში მძღოლს როგორ ვიპოვი?",
    },
    a: {
      en: "The driver meets you in the arrivals hall with a name sign — the exact meeting point (just past the exit of customs) is in your confirmation email. Twelve hours before pickup you also get the driver's photo on WhatsApp.",
      ru: "Водитель встречает в зале прилёта с табличкой — точное место (сразу за выходом из таможни) есть в подтверждении на email. За 12 часов до рейса в WhatsApp придёт ещё и его фото.",
      ka: "მძღოლი ჩამოსვლის ზონაში შეგხვდება სახელობითი ტაბლოთი — ზუსტი ადგილი (ბაჟის გასასვლელის შემდეგ) დადასტურების იმეილშია. ფრენამდე 12 საათით ადრე WhatsApp-ით მის ფოტოსაც მიიღებთ.",
    },
  },
  {
    q: {
      en: "How long will the driver wait at the airport?",
      ru: "Сколько водитель будет ждать в аэропорту?",
      ka: "აეროპორტში მძღოლი რამდენ ხანს დამელოდება?",
    },
    a: {
      en: "60 minutes free wait from the real landing time — more than enough for baggage and immigration. If you need extra time (lost bag, long queue), text the driver on WhatsApp and the clock stops without a charge.",
      ru: "60 минут бесплатно от фактической посадки — больше, чем надо на выдачу багажа и границу. Нужно больше (пропавший багаж, очередь) — напишите водителю, таймер остановится без доплаты.",
      ka: "60 წუთი უფასო ლოდინი ფაქტობრივი დაშვებიდან — ბარგისა და საზღვრისთვის სრულიად საკმარისი. მეტი თუ გჭირდება (დაკარგული ბარგი, რიგი) — მიწერეთ მძღოლს, ტაიმერი უფასოდ გაჩერდება.",
    },
  },
];

export function faqsForRoute(route: Route): RouteFaq[] {
  const isAirport = route.fromSlug.includes("airport");
  if (!isAirport) return SHARED;
  // On airport routes, prepend flight-delay, meeting-point and waiting-window
  // entries to the shared set — producing ~13 entries, trimmed to 10.
  return [...AIRPORT_SWAPS, ...SHARED].slice(0, 10);
}
