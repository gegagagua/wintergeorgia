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
        className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-line text-ink md:hidden"
      >
        {open ? <X className="h-5 w-5" strokeWidth={1.75} /> : <Menu className="h-5 w-5" strokeWidth={1.75} />}
      </button>

      {open ? (
        <div
          className="fixed inset-x-0 top-16 z-40 border-t border-line bg-surface md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <nav className="site-container flex flex-col divide-y divide-line py-2" aria-label="Mobile">
            <MobileLink href="/transfers">{t("transfers")}</MobileLink>
            <MobileLink href="/resorts">{t("resorts")}</MobileLink>
            <MobileLink href="/road-status">{t("conditions")}</MobileLink>
            <MobileLink href="/things-to-do">{t("thingsToDo")}</MobileLink>
            <MobileLink href="/events">{t("events")}</MobileLink>
            <MobileLink href="/journal">{t("journal")}</MobileLink>
          </nav>
        </div>
      ) : null}
    </>
  );
}

function MobileLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href as never} className="block py-3 text-ink">
      {children}
    </Link>
  );
}
