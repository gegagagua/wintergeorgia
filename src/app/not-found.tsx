/**
 * Top-level not-found: rendered for paths that don't match any locale.
 * Cannot use next-intl because there is no request locale here — it renders
 * its own <html>/<body>.
 */
import Link from "next/link";
import { themeInitScript } from "@/components/theme-toggle";
import "./globals.css";

export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-bg text-ink antialiased">
        <div className="mx-auto max-w-[var(--container-site)] px-4 py-24 md:px-6">
          <p className="text-small text-primary">404</p>
          <h1 className="mt-2 font-serif text-[40px] leading-[48px]">
            Off-piste — page not found.
          </h1>
          <p className="mt-4 text-ink-muted">
            The route you took does not exist. Head back to the main road.
          </p>
          <Link
            href={"/" as never}
            className="mt-6 inline-flex h-11 items-center rounded-sm bg-accent px-5 font-medium text-white"
          >
            Home
          </Link>
        </div>
      </body>
    </html>
  );
}
