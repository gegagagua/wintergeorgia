"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type Theme = "light" | "dark";
const KEY = "gw-theme";

function getInitial(): Theme {
  if (typeof document === "undefined") return "light";
  const stored = document.documentElement.dataset.theme as Theme | undefined;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const t = useTranslations("theme");
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitial());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // ignore quota/privacy failures
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("toggle")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-line text-ink transition-colors hover:border-primary-hover"
    >
      {mounted && theme === "dark" ? (
        <Sun className="h-4 w-4" strokeWidth={1.75} />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={1.75} />
      )}
    </button>
  );
}

/** Inline script — runs before hydration to avoid a flash of the wrong theme. */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('${KEY}');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
  } catch (e) {}
})();
`;
