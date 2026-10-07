import { setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { MuiShowcase } from "./showcase";
import type { Locale } from "@/i18n/routing";

export const metadata = { robots: { index: false, follow: false } };

export default async function MuiShowcasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <div className="site-container py-10 md:py-14">
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Dev" }, { name: "MUI" }]} />
      <h1 className="mb-8 font-serif text-[40px] leading-[48px]">Material UI — themed</h1>
      <p className="mb-10 max-w-2xl text-ink-muted">
        MUI is wired to the design tokens in <code>design-tokens.css</code>. Buttons, inputs and
        surfaces follow the brand palette and respect light/dark mode. Use these when you need a
        standard primitive the custom <code>components/ui/*</code> set does not already cover.
      </p>
      <MuiShowcase />
    </div>
  );
}
