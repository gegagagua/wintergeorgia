import type { Metadata } from "next";
import Link from "next/link";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin — georgiawinter",
  robots: { index: false, follow: false },
};

/**
 * Admin lives outside the [locale] segment and is deliberately English-only.
 * In production this layout enforces auth (NextAuth or Payload session).
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-ink antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-line bg-surface">
            <div className="site-container flex h-14 items-center justify-between">
              <div className="flex items-center gap-6">
                <Link href={"/admin" as never} className="font-serif text-[17px]">admin</Link>
                <nav className="flex items-center gap-4 text-small">
                  <Link href={"/admin/bookings" as never} className="hover:text-primary">Bookings</Link>
                  <Link href={"/admin/road-status" as never} className="hover:text-primary">Road status</Link>
                </nav>
              </div>
              <Link href={"/" as never} className="text-small text-ink-muted hover:text-primary">← Site</Link>
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
