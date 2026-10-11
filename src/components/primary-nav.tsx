"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const items = [
  { href: "/transfers", key: "transfers" },
  { href: "/resorts", key: "resorts" },
  { href: "/things-to-do", key: "thingsToDo" },
  { href: "/events", key: "events" },
  { href: "/journal", key: "journal" },
] as const;

export function PrimaryNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav
      className="ml-auto hidden items-center gap-5 text-small lg:flex xl:gap-6"
      aria-label="Primary"
    >
      {items.map((it) => {
        const active = pathname === it.href || pathname.startsWith(it.href + "/");
        return (
          <Link
            key={it.href}
            href={it.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative whitespace-nowrap transition-colors duration-150",
              "after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-primary after:transition-transform after:duration-200 after:ease-out",
              active
                ? "font-semibold text-primary after:scale-x-100"
                : "text-ink hover:text-primary after:scale-x-0 hover:after:scale-x-100",
            )}
          >
            {t(it.key)}
          </Link>
        );
      })}
    </nav>
  );
}
