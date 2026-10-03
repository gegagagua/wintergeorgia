import "server-only";

/**
 * Error monitoring stub. Wire to Sentry (or another reporter) when
 * SENTRY_DSN is set; otherwise falls back to structured console output so
 * failures are still visible in dev and default deploys.
 */
export function reportError(err: unknown, context?: Record<string, unknown>) {
  const dsn = process.env.SENTRY_DSN;
  if (dsn) {
    // In production we'd import @sentry/nextjs conditionally. Keep the
    // module tree light — this stub avoids a compile-time dependency.
    console.error("[sentry-would-report]", { err, context });
    return;
  }
  console.error("[error]", err instanceof Error ? { message: err.message, stack: err.stack, ...context } : { err, ...context });
}
