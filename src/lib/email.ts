import "server-only";
import { Resend } from "resend";
import type { Booking } from "./booking-store";
import { findRoute } from "@/content/routes";

const BRAND = {
  night: "#0E1620",
  glacier: "#14323F",
  ice: "#2C7FA8",
  dawn: "#D98436",
  snow: "#F2F5F7",
  fog: "#6B7C89",
  line: "#D6DEE4",
  ink: "#0E1620",
};

type Lang = "en" | "ru" | "ka";

const strings = {
  en: {
    subject: (ref: string) => `Booking confirmed · ${ref}`,
    preheader: "Your transfer is confirmed. Driver details arrive 12 hours before pickup.",
    greeting: (name: string) => `Hi ${name},`,
    intro: "Your transfer is confirmed. Here are the details — keep this email, you'll need the reference on the day.",
    ref: "Reference",
    when: "When",
    passengers: "Passengers",
    vehicle: "Vehicle",
    luggage: "Luggage",
    sets: "sets",
    bags: "bags",
    pickup: "Pickup",
    flight: "Flight",
    total: "Total charged",
    next: "What happens next",
    steps: [
      "Driver is assigned within 24 hours.",
      "Driver name, phone, vehicle and plate arrive 12 hours before pickup.",
      "On the day, the driver texts you on arrival at your pickup address.",
      "After the trip: receipt and a short review request.",
    ],
    manage: "Manage booking",
    cancel: "Free cancellation up to 24 hours before departure.",
    footerHelp: "Questions? Reply to this email or write to us on WhatsApp.",
    siteName: "georgiawinter",
  },
  ru: {
    subject: (ref: string) => `Бронь подтверждена · ${ref}`,
    preheader: "Трансфер подтверждён. Детали водителя придут за 12 часов до подачи.",
    greeting: (name: string) => `Здравствуйте, ${name}!`,
    intro: "Ваш трансфер подтверждён. Сохраните это письмо — в день поездки понадобится номер брони.",
    ref: "Номер",
    when: "Когда",
    passengers: "Пассажиры",
    vehicle: "Автомобиль",
    luggage: "Багаж",
    sets: "комплектов",
    bags: "сумок",
    pickup: "Подача",
    flight: "Рейс",
    total: "К оплате",
    next: "Что дальше",
    steps: [
      "Водитель назначается в течение 24 часов.",
      "Имя, телефон, авто и номер приходят за 12 часов до подачи.",
      "В день поездки водитель напишет по прибытии на адрес.",
      "После поездки: чек и просьба оставить отзыв.",
    ],
    manage: "Управление бронью",
    cancel: "Бесплатная отмена не позднее чем за 24 часа до отправления.",
    footerHelp: "Вопросы? Ответьте на это письмо или напишите нам в WhatsApp.",
    siteName: "georgiawinter",
  },
  ka: {
    subject: (ref: string) => `ჯავშანი დადასტურებულია · ${ref}`,
    preheader: "ტრანსფერი დადასტურებულია. მძღოლის დეტალები მოდის მოტანამდე 12 საათით ადრე.",
    greeting: (name: string) => `გამარჯობა, ${name}!`,
    intro: "თქვენი ტრანსფერი დადასტურებულია. შეინახეთ ეს წერილი — მოგზაურობის დღეს დაგჭირდებათ ჯავშნის ნომერი.",
    ref: "ნომერი",
    when: "როდის",
    passengers: "მგზავრები",
    vehicle: "მანქანა",
    luggage: "ბარგი",
    sets: "კომპლექტი",
    bags: "ჩანთა",
    pickup: "აყვანა",
    flight: "ფრენა",
    total: "საერთო თანხა",
    next: "რა მოხდება შემდეგ",
    steps: [
      "მძღოლი ინიშნება 24 საათის განმავლობაში.",
      "მძღოლის სახელი, ტელეფონი, მანქანა და ნომერი — აყვანამდე 12 საათით ადრე.",
      "მოგზაურობის დღეს მძღოლი დაგიწერთ მისამართზე ჩამოსვლისთანავე.",
      "მოგზაურობის შემდეგ: ქვითარი და მიმოხილვის მოთხოვნა.",
    ],
    manage: "ჯავშნის მართვა",
    cancel: "უფასო გაუქმება გასვლამდე 24 საათით ადრე.",
    footerHelp: "კითხვები? უპასუხეთ ამ წერილს ან მოგვწერეთ WhatsApp-ზე.",
    siteName: "georgiawinter",
  },
} satisfies Record<Lang, Record<string, unknown>>;

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === '"' ? "&quot;" : "&#39;",
  );
}

function formatDate(iso: string, time: string, locale: Lang): string {
  const d = new Date(`${iso}T${time}:00+04:00`);
  try {
    return new Intl.DateTimeFormat(locale, {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Asia/Tbilisi",
    }).format(d);
  } catch {
    return `${iso} ${time}`;
  }
}

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://georgiawinter.net";
}

function buildHtml(booking: Booking): { html: string; subject: string; text: string } {
  const l = (booking.locale ?? "en") as Lang;
  const t = strings[l] ?? strings.en;
  const route = findRoute(booking.routeSlug);
  const title = route ? `${route.from[l]} → ${route.to[l]}` : booking.routeSlug;
  const when = formatDate(booking.travelDate, booking.travelTime, l);
  const manageUrl = `${siteUrl()}/${l === "en" ? "" : `${l}/`}transfers/confirmation/${booking.ref}`;

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};color:${BRAND.fog};font-size:13px;width:40%;vertical-align:top;">${esc(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};color:${BRAND.ink};font-size:15px;vertical-align:top;">${esc(value)}</td>
    </tr>`;

  const steps = t.steps
    .map(
      (s, i) => `
      <tr>
        <td style="padding:6px 10px 6px 0;vertical-align:top;width:28px;">
          <div style="display:inline-block;width:22px;height:22px;line-height:22px;text-align:center;border-radius:999px;background:${BRAND.ice}1A;color:${BRAND.ice};font-size:12px;font-weight:600;">${i + 1}</div>
        </td>
        <td style="padding:6px 0;color:${BRAND.ink};font-size:14px;line-height:1.55;">${esc(s)}</td>
      </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="${l}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(t.subject(booking.ref))}</title>
</head>
<body style="margin:0;background:${BRAND.snow};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Noto Sans Georgian',sans-serif;color:${BRAND.ink};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(t.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.snow};padding:32px 16px;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 1px 2px rgba(14,22,32,.04),0 8px 24px -16px rgba(14,22,32,.12);">
      <tr>
        <td style="background:${BRAND.glacier};padding:28px 32px;color:#fff;">
          <div style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:${BRAND.dawn};">${esc(t.siteName)}</div>
          <div style="margin-top:8px;font-family:Georgia,'Noto Serif Georgian',serif;font-size:24px;line-height:1.25;">${esc(t.subject(booking.ref))}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:28px 32px 8px 32px;">
          <p style="margin:0 0 8px 0;font-size:16px;">${esc(t.greeting(booking.customerName.split(" ")[0] || booking.customerName))}</p>
          <p style="margin:0 0 20px 0;font-size:15px;line-height:1.6;color:${BRAND.ink};">${esc(t.intro)}</p>
          <div style="padding:16px 18px;border:1px solid ${BRAND.line};border-radius:10px;background:${BRAND.snow};">
            <div style="font-family:Georgia,'Noto Serif Georgian',serif;font-size:20px;line-height:1.3;color:${BRAND.night};">${esc(title)}</div>
            <div style="margin-top:4px;font-size:13px;color:${BRAND.fog};font-variant-numeric:tabular-nums;">${esc(t.ref)} · ${esc(booking.ref)}</div>
          </div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
            ${row(t.when, when)}
            ${row(t.passengers, String(booking.pax))}
            ${row(t.vehicle, booking.vehicleClass)}
            ${row(t.luggage, `${booking.luggage} ${t.bags} · ${booking.skiCount} ${t.sets}`)}
            ${booking.pickupAddress ? row(t.pickup, booking.pickupAddress) : ""}
            ${booking.flightNo ? row(t.flight, booking.flightNo) : ""}
            ${row(t.total, `${booking.amountGel} ₾`)}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 32px 24px 32px;">
          <a href="${esc(manageUrl)}" style="display:inline-block;background:${BRAND.dawn};color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:10px;">${esc(t.manage)} →</a>
          <p style="margin:14px 0 0 0;font-size:12px;color:${BRAND.fog};">${esc(t.cancel)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:0 32px 24px 32px;">
          <div style="font-family:Georgia,'Noto Serif Georgian',serif;font-size:17px;color:${BRAND.night};margin-bottom:8px;">${esc(t.next)}</div>
          <table role="presentation" cellpadding="0" cellspacing="0">${steps}</table>
        </td>
      </tr>
      <tr>
        <td style="padding:18px 32px 24px 32px;border-top:1px solid ${BRAND.line};background:${BRAND.snow};">
          <p style="margin:0;font-size:12px;color:${BRAND.fog};line-height:1.55;">${esc(t.footerHelp)}</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;

  const text = [
    t.subject(booking.ref),
    "",
    t.greeting(booking.customerName.split(" ")[0] || booking.customerName),
    t.intro,
    "",
    `${title}`,
    `${t.ref}: ${booking.ref}`,
    `${t.when}: ${when}`,
    `${t.passengers}: ${booking.pax}`,
    `${t.vehicle}: ${booking.vehicleClass}`,
    `${t.luggage}: ${booking.luggage} ${t.bags} · ${booking.skiCount} ${t.sets}`,
    booking.pickupAddress ? `${t.pickup}: ${booking.pickupAddress}` : "",
    booking.flightNo ? `${t.flight}: ${booking.flightNo}` : "",
    `${t.total}: ${booking.amountGel} GEL`,
    "",
    `${t.manage}: ${manageUrl}`,
    t.cancel,
    "",
    t.next,
    ...t.steps.map((s, i) => `${i + 1}. ${s}`),
    "",
    t.footerHelp,
  ]
    .filter(Boolean)
    .join("\n");

  return { html, text, subject: t.subject(booking.ref) };
}

let client: Resend | null = null;
function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!client) client = new Resend(key);
  return client;
}

export async function sendBookingConfirmationEmail(booking: Booking): Promise<
  { ok: true; id: string } | { ok: false; reason: string }
> {
  const resend = getClient();
  if (!resend) {
    console.log(
      `[email] RESEND_API_KEY missing — skipped confirmation email for ${booking.ref} <${booking.email}>`,
    );
    return { ok: false, reason: "no_api_key" };
  }
  const from = process.env.EMAIL_FROM ?? "georgiawinter <bookings@georgiawinter.net>";
  const replyTo = process.env.EMAIL_REPLY_TO;
  const { html, text, subject } = buildHtml(booking);

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: booking.email,
      subject,
      html,
      text,
      replyTo,
      headers: { "X-GW-Booking-Ref": booking.ref },
      tags: [
        { name: "type", value: "booking_confirmation" },
        { name: "locale", value: booking.locale },
      ],
    });
    if (error) {
      console.error(`[email] Resend error for ${booking.ref}:`, error);
      return { ok: false, reason: error.message ?? "resend_error" };
    }
    console.log(`[email] sent ${booking.ref} → ${booking.email} (id=${data?.id})`);
    return { ok: true, id: data?.id ?? "" };
  } catch (err) {
    console.error(`[email] send failed for ${booking.ref}:`, err);
    return { ok: false, reason: err instanceof Error ? err.message : "unknown" };
  }
}
