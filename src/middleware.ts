import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose/jwt/verify";

const SESSION_COOKIE_NAME = "clinicdesk_session";
const SECRET_KEY = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "clinicdesk_development_secret_key_minimum_32_characters_length"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read session cookie
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  let sessionPayload = null;

  if (sessionToken) {
    try {
      const { payload } = await jwtVerify(sessionToken, SECRET_KEY, {
        algorithms: ["HS256"],
      });
      sessionPayload = payload;
    } catch {
      // Invalid or expired token
      sessionPayload = null;
    }
  }

  // 1. Protect Application Workspace routes (/app/*)
  if (pathname.startsWith("/app")) {
    if (!sessionPayload || !sessionPayload.id) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If user has no clinic context yet, redirect to onboarding
    if (!sessionPayload.clinicId) {
      return NextResponse.redirect(new URL("/onboarding/clinic", request.url));
    }
  }

  // 2. Protect Onboarding routes (/onboarding/*)
  if (pathname.startsWith("/onboarding")) {
    if (!sessionPayload || !sessionPayload.id) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 3. Prevent logged-in users with a clinic from lingering on auth pages
  if (pathname === "/login" || pathname === "/signup") {
    if (sessionPayload?.id && sessionPayload?.clinicId) {
      return NextResponse.redirect(new URL("/app/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/app/:path*",
    "/onboarding/:path*",
    "/login",
    "/signup",
  ],
};
