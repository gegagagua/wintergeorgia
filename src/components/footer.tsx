import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LogoLockup } from "./logo";

const resortSlugs = ["gudauri", "bakuriani", "tetnuldi", "hatsvali", "goderdzi", "kazbegi"] as const;
const routeSlugs = [
  "tbilisi-airport-gudauri",
  "tbilisi-gudauri",
  "tbilisi-bakuriani",
  "tbilisi-kazbegi",
  "zugdidi-mestia",
] as const;

const routeLabel = (slug: string) =>
  slug
    .replace("tbilisi-airport-", "TBS airport → ")
    .replace("tbilisi-", "Tbilisi → ")
    .replace("zugdidi-", "Zugdidi → ")
    .replace("kutaisi-airport-", "KUT airport → ")
    .replace("batumi-", "Batumi → ")
    .replace("gudauri-", "Gudauri → ")
    .replace("mestia-", "Mestia → ");

const resortLabel = (s: string) => s[0]!.toUpperCase() + s.slice(1);

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-night text-snow" role="contentinfo">
      <div className="site-container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <LogoLockup className="text-snow" />
          <p className="mt-4 max-w-sm text-small text-white/60">
            Booking and live conditions for Georgia&apos;s ski season. Made in Tbilisi.
          </p>
        </div>
        <FooterColumn title={t("routes")}>
          {routeSlugs.map((slug) => (
            <FooterLink key={slug} href={`/transfers/${slug}`}>
              {routeLabel(slug)}
            </FooterLink>
          ))}
        </FooterColumn>
        <FooterColumn title={t("resorts")}>
          {resortSlugs.map((slug) => (
            <FooterLink key={slug} href={`/resorts/${slug}`}>
              {resortLabel(slug)}
            </FooterLink>
          ))}
        </FooterColumn>
        <FooterColumn title={t("legal")}>
          <FooterLink href="/terms">{t("terms")}</FooterLink>
          <FooterLink href="/privacy">{t("privacy")}</FooterLink>
          <FooterLink href="/cancellation">{t("cancellation")}</FooterLink>
          <FooterLink href="/partners">{t("partners")}</FooterLink>
        </FooterColumn>
      </div>

      <div className="border-t border-white/10">
        <div className="site-container flex flex-col items-start justify-between gap-2 py-5 text-small text-white/50 md:flex-row md:items-center">
          <span>© {year} georgiawinter. {t("rights")}</span>
          <span className="tabular">EU · Asia/Tbilisi · GEL</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 font-sans text-small font-medium tracking-tight text-white/80">
        {title}
      </h3>
      <ul className="space-y-2 text-small">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href as never} className="text-white/75 hover:text-snow">
        {children}
      </Link>
    </li>
  );
}
