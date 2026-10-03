import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { LogoLockup } from "./logo";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { ConditionsBar } from "./conditions-bar";

export async function Header() {
  const t = await getTranslations("nav");
  const locale = (await getLocale()) as Locale;
  return (
    <div className="sticky top-0 z-40">
      <ConditionsBar locale={locale} />
      <header
        className="border-b border-line bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-surface/75"
        role="banner"
      >
        <div className="site-container flex h-16 items-center gap-6">
          <Link href="/" className="shrink-0" aria-label="georgiawinter">
            <LogoLockup />
          </Link>

          <nav
            className="ml-auto hidden items-center gap-6 text-small md:flex"
            aria-label="Primary"
          >
            <Link className="text-ink hover:text-primary" href="/transfers">
              {t("transfers")}
            </Link>
            <Link className="text-ink hover:text-primary" href="/resorts">
              {t("resorts")}
            </Link>
            <Link className="text-ink hover:text-primary" href="/road-status">
              {t("conditions")}
            </Link>
            <Link className="text-ink hover:text-primary" href="/things-to-do">
              {t("thingsToDo")}
            </Link>
            <Link className="text-ink hover:text-primary" href="/events">
              {t("events")}
            </Link>
            <Link className="text-ink hover:text-primary" href="/journal">
              {t("journal")}
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-2 md:ml-0 md:gap-3">
            <LocaleSwitcher />
            <ThemeToggle />
            <Link
              href="/transfers"
              className="inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-sm bg-accent px-3 text-small font-medium text-white transition-[filter] duration-150 hover:brightness-95 md:px-4"
            >
              <span className="hidden md:inline">{t("bookTransfer")}</span>
              <span className="md:hidden">Book</span>
            </Link>
            <MobileNav />
          </div>
        </div>
      </header>
    </div>
  );
}
