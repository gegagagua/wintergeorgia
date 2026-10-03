import { Link } from "@/i18n/navigation";
import { LinkButton } from "@/components/ui/button";

export default function LocaleNotFound() {
  return (
    <div className="site-container py-16 md:py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-small text-primary tabular">404</p>
        <h1 className="mt-2 font-serif text-[40px] leading-[48px] md:text-[52px] md:leading-[60px]">
          Off-piste — page not found.
        </h1>
        <p className="mt-4 text-ink-muted">
          That route does not exist. Head back to the main road, or check the live status board.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton href="/" variant="primary">Home</LinkButton>
          <LinkButton href="/road-status" variant="outline">Road status</LinkButton>
          <LinkButton href="/transfers" variant="cta">Book a transfer</LinkButton>
        </div>
        <p className="mt-8 text-small text-ink-muted">
          Looking for something specific?{" "}
          <Link href="/journal" className="text-primary hover:underline">Journal</Link> ·{" "}
          <Link href="/events" className="text-primary hover:underline">Events</Link> ·{" "}
          <Link href="/resorts" className="text-primary hover:underline">Resorts</Link>
        </p>
      </div>
    </div>
  );
}
