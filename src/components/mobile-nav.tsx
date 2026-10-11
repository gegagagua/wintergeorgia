"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function MobileNav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-line text-ink lg:hidden"
      >
        {open ? <X className="h-5 w-5" strokeWidth={1.75} /> : <Menu className="h-5 w-5" strokeWidth={1.75} />}
      </button>

      {open ? (
        <div
          className="fixed inset-x-0 top-16 z-40 border-t border-line bg-surface lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <nav className="site-container flex flex-col divide-y divide-line py-2" aria-label="Mobile">
            <MobileLink href="/transfers" pathname={pathname}>{t("transfers")}</MobileLink>
            <MobileLink href="/resorts" pathname={pathname}>{t("resorts")}</MobileLink>
            <MobileLink href="/things-to-do" pathname={pathname}>{t("thingsToDo")}</MobileLink>
            <MobileLink href="/events" pathname={pathname}>{t("events")}</MobileLink>
            <MobileLink href="/journal" pathname={pathname}>{t("journal")}</MobileLink>
          </nav>
        </div>
      ) : null}
    </>
  );
}

function MobileLink({ href, pathname, children }: { href: string; pathname: string; children: React.ReactNode }) {
  const active = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href as never}
      aria-current={active ? "page" : undefined}
      className={active ? "block py-3 font-semibold text-primary" : "block py-3 text-ink"}
    >
      {children}
    </Link>
  );
}
