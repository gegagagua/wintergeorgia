import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="georgiawinter admin"' },
  });
}

/**
 * ADMIN_ALLOWED_EMAILS format: `user:password,user2:password2`.
 * When unset, admin is open — obvious for local dev, refuse in production.
 */
function checkAdminAuth(request: NextRequest): NextResponse | null {
  const raw = process.env.ADMIN_ALLOWED_EMAILS;
  if (!raw) {
    // In production without credentials configured, refuse — don't accidentally
    // ship an open admin.
    if (process.env.NODE_ENV === "production" && !process.env.GW_ADMIN_UNSAFE_OPEN) {
      return new NextResponse("Admin credentials not configured", { status: 503 });
    }
    return null;
  }
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return unauthorized();
  try {
    const decoded = atob(header.slice("Basic ".length));
    const [user, pass] = decoded.split(":");
    const allowed = raw.split(",").map((p) => p.trim());
    if (user && pass && allowed.includes(`${user}:${pass}`)) return null;
  } catch {
    // fall through
  }
  return unauthorized();
}

const REF_COOKIE = "gw_ref";
const REF_MAX_AGE_SECONDS = 30 * 24 * 60 * 60;

function applyReferralCookie(request: NextRequest, response: NextResponse) {
  const ref = request.nextUrl.searchParams.get("ref");
  if (!ref) return response;
  // Minimal safety: alphanumeric + dash, 3-32 chars.
  if (!/^[a-zA-Z0-9-]{3,32}$/.test(ref)) return response;
  response.cookies.set(REF_COOKIE, ref, {
    maxAge: REF_MAX_AGE_SECONDS,
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });
  return response;
}

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/admin")) {
    const auth = checkAdminAuth(request);
    if (auth) return auth;
    return applyReferralCookie(request, NextResponse.next());
  }

  const intl = intlMiddleware(request);
  return applyReferralCookie(request, intl);
}

export const config = {
  matcher: [
    // /admin/* runs through auth; all locale paths through next-intl; skip
    // api, static, files with a dot, and Next internals.
    "/((?!api|trpc|_next|_vercel|_not-found|_error|.*\\..*).*)",
  ],
};
