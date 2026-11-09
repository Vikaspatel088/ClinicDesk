import { SignJWT } from "jose/jwt/sign";
import { jwtVerify } from "jose/jwt/verify";
import { cookies } from "next/headers";
import { MembershipRole } from "@prisma/client";

export const SESSION_COOKIE_NAME = "clinicdesk_session";
const SESSION_DURATION_SECONDS = 7 * 24 * 60 * 60; // 7 days

const SECRET_KEY = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "clinicdesk_development_secret_key_minimum_32_characters_length"
);

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  clinicId?: string | null;
  clinicName?: string | null;
  clinicSlug?: string | null;
  role?: MembershipRole | null;
}

/**
 * Signs and encodes a SessionUser into a verified JWT.
 */
export async function signSession(user: SessionUser): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(SECRET_KEY);
}

/**
 * Cryptographically verifies a JWT session token and returns the typed user.
 */
export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY, {
      algorithms: ["HS256"],
    });

    if (!payload.id || !payload.email) {
      return null;
    }

    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string,
      phone: (payload.phone as string) || null,
      clinicId: (payload.clinicId as string) || null,
      clinicName: (payload.clinicName as string) || null,
      clinicSlug: (payload.clinicSlug as string) || null,
      role: (payload.role as MembershipRole) || null,
    };
  } catch {
    return null;
  }
}

/**
 * Reads and verifies the current session cookie from the incoming request.
 */
export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return null;
  }

  return verifySessionToken(sessionToken);
}

/**
 * Sets a secure, HTTP-only cookie with the signed session token.
 */
export async function setSessionCookie(user: SessionUser): Promise<void> {
  const token = await signSession(user);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION_SECONDS,
    path: "/",
  });
}

/**
 * Clears the session cookie to securely log out the user.
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}
