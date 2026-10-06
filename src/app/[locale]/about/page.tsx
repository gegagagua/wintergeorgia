import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { ShieldCheck, Phone, MessageCircle, Mail, MapPin, Clock, BadgeCheck } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertBanner } from "@/components/ui/alert-banner";
import { company, isCompanyBlockReady } from "@/config/company";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd } from "@/lib/jsonld";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const t = {
    en: {
      title: "About georgiawinter",
      desc: "Who runs this service, where it is registered, how drivers are vetted and how to reach us.",
    },
    ru: {
      title: "О georgiawinter",
      desc: "Кто управляет сервисом, где он зарегистрирован, как проверяются водители и как с нами связаться.",
    },
    ka: {
      title: "ჩვენს შესახებ — georgiawinter",
      desc: "ვინ ხელმძღვანელობს სერვისს, სად არის რეგისტრირებული, როგორ მოწმდება მძღოლები და როგორ დაგვიკავშირდეთ.",
    },
  }[l];
  return pageMetadata({
    locale: l,
    path: "/about",
    title: t.title,
    description: t.desc,
    ogKicker: "About",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = locale as Locale;
  setRequestLocale(l);

  const label = {
    en: {
      crumb: "About",
      kicker: "About",
      title: `Who runs ${company.tradingName}`,
      legal: "Legal entity",
      idNo: "Georgian ID number",
      registered: "Registered address",
      base: "Operating base",
      founded: "Operating since",
      founder: "Who runs this",
      vetting: "How drivers are vetted",
      contactsTitle: "Contact",
      phone: "Phone",
      whatsapp: "WhatsApp",
      email: "Email",
      telegram: "Telegram",
      hours: "Hours",
      drivers: "Drivers you will meet",
      noProfiles: "Driver profiles are being added for the 2026/27 season.",
      cta: "Book a transfer",
      stats: "Facts, not slogans",
      yearsOp: "years operating",
      routes: "routes served",
      driversOnFile: "drivers on file",
      tripsLast: "trips last season",
      skeletonTitle: "This page is being filled in with real company details",
      skeletonBody:
        "We publish the legal entity, the founder and the vetting process once the owner has supplied them. Nothing on this page is placeholder copy.",
    },
    ru: {
      crumb: "О сервисе",
      kicker: "О нас",
      title: `Кто управляет ${company.tradingName}`,
      legal: "Юридическое лицо",
      idNo: "ID (ს/ნ)",
      registered: "Юридический адрес",
      base: "Операционная база",
      founded: "Работаем с",
      founder: "Кто ведёт сервис",
      vetting: "Как проверяются водители",
      contactsTitle: "Контакты",
      phone: "Телефон",
      whatsapp: "WhatsApp",
      email: "Email",
      telegram: "Telegram",
      hours: "Часы работы",
      drivers: "Водители, которых вы встретите",
      noProfiles: "Профили водителей добавляются к сезону 2026/27.",
      cta: "Забронировать трансфер",
      stats: "Факты, а не лозунги",
      yearsOp: "лет работы",
      routes: "маршрутов",
      driversOnFile: "водителей в деле",
      tripsLast: "поездок в прошлом сезоне",
      skeletonTitle: "Эта страница заполняется реальными данными компании",
      skeletonBody:
        "Юридическое лицо, основатель и процесс проверки водителей публикуются только после подтверждения владельцем. Здесь нет вымышленного текста.",
    },
    ka: {
      crumb: "ჩვენს შესახებ",
      kicker: "ჩვენს შესახებ",
      title: `ვინ ხელმძღვანელობს ${company.tradingName}-ს`,
      legal: "იურიდიული პირი",
      idNo: "საიდენტიფიკაციო ნომერი",
      registered: "იურიდიული მისამართი",
      base: "საოპერაციო ბაზა",
      founded: "ვფუნქციონირებთ",
      founder: "ვინ ხელმძღვანელობს",
      vetting: "როგორ მოწმდება მძღოლები",
      contactsTitle: "კონტაქტი",
      phone: "ტელეფონი",
      whatsapp: "WhatsApp",
      email: "ელ-ფოსტა",
      telegram: "Telegram",
      hours: "სამუშაო საათები",
      drivers: "მძღოლები, რომლებსაც შეხვდებით",
      noProfiles: "მძღოლების პროფილები ემატება 2026/27 სეზონისთვის.",
      cta: "დაჯავშნე ტრანსფერი",
      stats: "ფაქტები, არა ლოზუნგები",
      yearsOp: "წელი მოქმედებს",
      routes: "მარშრუტი",
      driversOnFile: "მძღოლი ფაილში",
      tripsLast: "მოგზაურობა გასულ სეზონში",
      skeletonTitle: "ეს გვერდი ვსებდება კომპანიის ნამდვილი ინფორმაციით",
      skeletonBody:
        "იურიდიული პირი, დამფუძნებელი და მძღოლების გადამოწმების პროცესი ქვეყნდება მფლობელის დადასტურების შემდეგ. აქ არ არის მოგონილი ტექსტი.",
    },
  }[l];

  const c = company;
  const ready = isCompanyBlockReady();
  const stats = c.publicStats;

  return (
    <div className="site-container py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd(l, [
              { name: "Home", path: "/" },
              { name: label.crumb, path: "/about" },
            ]),
          ),
        }}
      />

      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: label.crumb }]} />
      <SectionHeader kicker={label.kicker} title={label.title} />

      {!ready ? (
        <AlertBanner tone="info" title={label.skeletonTitle}>
          {label.skeletonBody}
        </AlertBanner>
      ) : null}

      <div className="mt-8 grid gap-8 md:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          <Card>
            <dl className="grid gap-4 sm:grid-cols-2">
              {c.legalName ? <Fact label={label.legal} value={c.legalName} /> : null}
              {c.idNumber ? (
                <Fact label={label.idNo} value={<span className="tabular">{c.idNumber}</span>} />
              ) : null}
              {c.registeredAddress ? (
                <Fact label={label.registered} value={c.registeredAddress[l]} wide />
              ) : null}
              {c.operatingBase ? (
                <Fact label={label.base} value={c.operatingBase[l]} wide />
              ) : null}
              {c.foundedYear ? (
                <Fact label={label.founded} value={<span className="tabular">{c.foundedYear}</span>} />
              ) : null}
            </dl>
          </Card>

          {c.founder ? (
            <Card>
              <p className="text-small text-primary">{label.founder}</p>
              <div className="mt-4 flex flex-col gap-5 md:flex-row">
                {c.founder.photo ? (
                  <div className="relative h-28 w-28 overflow-hidden rounded-md">
                    <Image
                      src={c.founder.photo}
                      alt={c.founder.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div>
                  <h3 className="font-serif text-[22px] leading-[30px]">{c.founder.name}</h3>
                  {c.founder.bio ? (
                    <p className="mt-2 text-ink">{c.founder.bio[l]}</p>
                  ) : null}
                </div>
              </div>
            </Card>
          ) : null}

          {c.driverVetting.length > 0 ? (
            <section>
              <h2 className="font-serif text-[24px] leading-[32px]">{label.vetting}</h2>
              <ul className="mt-5 grid gap-3">
                {c.driverVetting.map((step) => (
                  <li
                    key={step.id}
                    className="flex gap-3 rounded-lg border border-line bg-surface p-4"
                  >
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-primary">
                      <ShieldCheck className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-medium text-ink">{step.label[l]}</p>
                      {step.detail ? (
                        <p className="mt-1 text-small text-ink-muted">{step.detail[l]}</p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {c.featuredDrivers.length > 0 ? (
            <section>
              <h2 className="font-serif text-[24px] leading-[32px]">{label.drivers}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {c.featuredDrivers.map((d) => (
                  <Card key={d.slug}>
                    {d.photo ? (
                      <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                        <Image
                          src={d.photo}
                          alt={d.firstName}
                          fill
                          sizes="(min-width:1024px) 20vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <h3 className="mt-3 font-serif text-[18px] leading-[26px]">{d.firstName}</h3>
                    {d.vehicle ? (
                      <p className="mt-1 text-small text-ink-muted tabular">
                        {d.vehicle} {d.plate ? `· ${d.plate}` : ""}
                      </p>
                    ) : null}
                    {d.languages.length ? (
                      <p className="mt-1 text-small text-ink-muted">
                        {d.languages.join(" · ")}
                      </p>
                    ) : null}
                  </Card>
                ))}
              </div>
            </section>
          ) : null}

          {hasAnyStat(stats) ? (
            <section>
              <h2 className="font-serif text-[24px] leading-[32px]">{label.stats}</h2>
              <dl className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
                {stats.yearsOperating ? (
                  <StatCard value={stats.yearsOperating} label={label.yearsOp} />
                ) : null}
                {stats.routesServed ? (
                  <StatCard value={stats.routesServed} label={label.routes} />
                ) : null}
                {stats.driversOnFile ? (
                  <StatCard value={stats.driversOnFile} label={label.driversOnFile} />
                ) : null}
                {stats.tripsLastSeason ? (
                  <StatCard value={stats.tripsLastSeason} label={label.tripsLast} />
                ) : null}
              </dl>
            </section>
          ) : null}
        </div>

        <aside className="space-y-6">
          <Card>
            <p className="text-small text-primary">{label.contactsTitle}</p>
            <ul className="mt-4 space-y-3 text-small">
              {c.contacts.phone ? (
                <ContactRow
                  Icon={Phone}
                  label={label.phone}
                  href={`tel:${c.contacts.phone.replace(/\s+/g, "")}`}
                >
                  {c.contacts.phone}
                </ContactRow>
              ) : null}
              {c.contacts.whatsapp ? (
                <ContactRow
                  Icon={MessageCircle}
                  label={label.whatsapp}
                  href={`https://wa.me/${c.contacts.whatsapp.replace(/[^0-9]/g, "")}`}
                >
                  {c.contacts.whatsapp}
                </ContactRow>
              ) : null}
              {c.contacts.email ? (
                <ContactRow
                  Icon={Mail}
                  label={label.email}
                  href={`mailto:${c.contacts.email}`}
                >
                  {c.contacts.email}
                </ContactRow>
              ) : null}
              {c.contacts.telegram ? (
                <ContactRow
                  Icon={BadgeCheck}
                  label={label.telegram}
                  href={`https://t.me/${c.contacts.telegram.replace(/^@/, "")}`}
                >
                  {c.contacts.telegram}
                </ContactRow>
              ) : null}
              {c.contacts.hours ? (
                <ContactRow Icon={Clock} label={label.hours}>
                  {c.contacts.hours[l]}
                </ContactRow>
              ) : null}
              {c.registeredAddress ? (
                <ContactRow Icon={MapPin} label={label.registered}>
                  {c.registeredAddress[l]}
                </ContactRow>
              ) : null}
            </ul>
            <div className="mt-5">
              <LinkButton href="/transfers" variant="cta" className="w-full justify-center">
                {label.cta}
              </LinkButton>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function hasAnyStat(s: typeof company.publicStats) {
  return Boolean(s.yearsOperating || s.routesServed || s.driversOnFile || s.tripsLastSeason);
}

function Fact({
  label,
  value,
  wide,
}: {
  label: string;
  value: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <dt className="text-small text-ink-muted">{label}</dt>
      <dd className="mt-1 text-ink">{value}</dd>
    </div>
  );
}

function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-4">
      <div className="font-serif text-[28px] leading-[32px] tabular">{value.toLocaleString("en-US")}</div>
      <div className="mt-1 text-small text-ink-muted">{label}</div>
    </div>
  );
}

function ContactRow({
  Icon,
  label,
  children,
  href,
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-primary">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
      </span>
      <div>
        <p className="text-ink-muted">{label}</p>
        {href ? (
          <a href={href} className="text-ink hover:text-primary">
            {children}
          </a>
        ) : (
          <p className="text-ink">{children}</p>
        )}
      </div>
    </li>
  );
}
