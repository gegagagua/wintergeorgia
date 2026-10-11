import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { LogoLockup } from "./logo";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { ConditionsBar } from "./conditions-bar";
import { LinkButton } from "./ui/button";
import { PrimaryNav } from "./primary-nav";

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

          <PrimaryNav />

          <div className="ml-auto flex items-center gap-2 lg:ml-0 lg:gap-3">
            <LocaleSwitcher />
            <ThemeToggle />
            <LinkButton href="/transfers" variant="cta" size="sm">
              <span className="hidden lg:inline">{t("bookTransfer")}</span>
              <span className="lg:hidden">Book</span>
            </LinkButton>
            <MobileNav />
          </div>
        </div>
      </header>
    </div>
  );
}
