"use client";

import { useEffect } from "react";
import { LinkButton, Button } from "@/components/ui/button";

/**
 * Per-locale error boundary. Client component per Next 15 spec; reports the
 * error (Sentry-ready) then renders a professional retry surface.
 */
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[client-error]", error);
  }, [error]);

  return (
    <div className="site-container py-16 text-center">
      <p className="text-small text-primary">Something went sideways</p>
      <h1 className="mt-2 font-serif text-[40px] leading-[48px] md:text-[52px] md:leading-[60px]">
        A page failed to load.
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-ink-muted">
        The team was notified. You can retry, or head back to the road status page.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Button onClick={reset} variant="primary">Try again</Button>
        <LinkButton href="/road-status" variant="outline">Road status</LinkButton>
      </div>
      {error.digest ? (
        <p className="mt-6 text-small text-ink-muted tabular">ref {error.digest}</p>
      ) : null}
    </div>
  );
}
