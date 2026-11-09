"use server";

import { z } from "zod";
import { prisma } from "@/lib/tenant-context";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { setSessionCookie, clearSessionCookie, getSession, SessionUser } from "@/lib/auth/session";
import { checkRateLimit } from "@/lib/auth/rate-limit";
import { logAuditEvent } from "@/lib/auth/audit";

// -----------------------------------------------------------------------------
// Validation Schemas
// -----------------------------------------------------------------------------

const SignupSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    passwordConfirm: z.string(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms of service." }),
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match.",
    path: ["passwordConfirm"],
  });

const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

// -----------------------------------------------------------------------------
// 1. User Registration Action
// -----------------------------------------------------------------------------

export async function registerUser(formData: FormData) {
  const rawData = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
    acceptTerms: formData.get("acceptTerms") === "on",
  };

  const validation = SignupSchema.safeParse(rawData);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { fullName, email, phone, password } = validation.data;
  const normalizedEmail = email.toLowerCase().trim();

  // Rate Limiting
  const rateLimit = checkRateLimit(`signup:${normalizedEmail}`, 3, 60);
  if (!rateLimit.success) {
    return {
      success: false,
      message: `Too many registration attempts. Please try again in ${rateLimit.resetSeconds} seconds.`,
    };
  }

  // Check Email Collision
  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    return {
      success: false,
      message: "An account with this email address already exists. Please sign in.",
    };
  }

  try {
    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name: fullName,
        email: normalizedEmail,
        phone,
        passwordHash,
      },
    });

    // Record Security Audit Log
    await logAuditEvent({
      userId: user.id,
      action: "USER_REGISTERED",
      entityType: "User",
      entityId: user.id,
      metadata: { email: normalizedEmail, phone },
    });

    // Initialize session for onboarding
    const sessionUser: SessionUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      clinicId: null,
      clinicName: null,
      clinicSlug: null,
      role: null,
    };

    await setSessionCookie(sessionUser);

    return {
      success: true,
      redirectUrl: "/onboarding/clinic",
    };
  } catch (error) {
    console.error("[Register Error]", error);
    return {
      success: false,
      message: "Failed to create account due to a server error. Please try again.",
    };
  }
}

// -----------------------------------------------------------------------------
// 2. User Login Action
// -----------------------------------------------------------------------------

export async function loginUser(formData: FormData) {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validation = LoginSchema.safeParse(rawData);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validation.data;
  const normalizedEmail = email.toLowerCase().trim();

  // Rate Limiting
  const rateLimit = checkRateLimit(`login:${normalizedEmail}`, 5, 60);
  if (!rateLimit.success) {
    return {
      success: false,
      message: `Too many login attempts. Access temporarily restricted. Try again in ${rateLimit.resetSeconds} seconds.`,
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    include: {
      memberships: {
        where: { isActive: true },
        include: { clinic: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user || !user.isActive) {
    await logAuditEvent({
      action: "LOGIN_FAILED",
      entityType: "User",
      entityId: normalizedEmail,
      metadata: { reason: "User not found or disabled" },
    });
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  const passwordValid = await verifyPassword(password, user.passwordHash);
  if (!passwordValid) {
    await logAuditEvent({
      userId: user.id,
      action: "LOGIN_FAILED",
      entityType: "User",
      entityId: user.id,
      metadata: { reason: "Bad credentials" },
    });
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  // Determine active clinic context
  const primaryMembership = user.memberships[0] || null;

  const sessionUser: SessionUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    clinicId: primaryMembership?.clinicId || null,
    clinicName: primaryMembership?.clinic?.name || null,
    clinicSlug: primaryMembership?.clinic?.slug || null,
    role: primaryMembership?.role || null,
  };

  await setSessionCookie(sessionUser);

  await logAuditEvent({
    userId: user.id,
    clinicId: sessionUser.clinicId,
    action: "LOGIN_SUCCESS",
    entityType: "User",
    entityId: user.id,
  });

  // Redirect to dashboard if clinic exists; otherwise resume onboarding
  const redirectUrl = primaryMembership ? "/app/dashboard" : "/onboarding/clinic";

  return {
    success: true,
    redirectUrl,
  };
}

// -----------------------------------------------------------------------------
// 3. Logout Action
// -----------------------------------------------------------------------------

export async function logoutUser() {
  const session = await getSession();
  if (session?.id) {
    await logAuditEvent({
      userId: session.id,
      clinicId: session.clinicId,
      action: "LOGOUT",
      entityType: "User",
      entityId: session.id,
    });
  }
  await clearSessionCookie();
  return { success: true, redirectUrl: "/login" };
}

// -----------------------------------------------------------------------------
// 4. Switch Active Clinic Tenant
// -----------------------------------------------------------------------------

export async function switchClinic(targetClinicId: string) {
  const session = await getSession();
  if (!session?.id) {
    return { success: false, message: "Unauthenticated." };
  }

  const membership = await prisma.clinicMembership.findUnique({
    where: {
      userId_clinicId: {
        userId: session.id,
        clinicId: targetClinicId,
      },
    },
    include: { clinic: true },
  });

  if (!membership || !membership.isActive || !membership.clinic) {
    return { success: false, message: "Unauthorized clinic switch." };
  }

  const updatedSession: SessionUser = {
    ...session,
    clinicId: membership.clinicId,
    clinicName: membership.clinic.name,
    clinicSlug: membership.clinic.slug,
    role: membership.role,
  };

  await setSessionCookie(updatedSession);

  await logAuditEvent({
    userId: session.id,
    clinicId: targetClinicId,
    action: "CLINIC_SWITCHED",
    entityType: "Clinic",
    entityId: targetClinicId,
  });

  return { success: true };
}

// -----------------------------------------------------------------------------
// 5. Password Reset Request Action
// -----------------------------------------------------------------------------

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get("email") as string;
  if (!email || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email address." };
  }

  const normalizedEmail = email.toLowerCase().trim();

  // Rate Limiting
  const rateLimit = checkRateLimit(`reset:${normalizedEmail}`, 3, 120);
  if (!rateLimit.success) {
    return {
      success: false,
      message: `Too many reset requests. Please try again in ${rateLimit.resetSeconds} seconds.`,
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (user) {
    await logAuditEvent({
      userId: user.id,
      action: "PASSWORD_RESET_REQUESTED",
      entityType: "User",
      entityId: user.id,
    });
  }

  // Always return consistent message to prevent email enumeration
  return {
    success: true,
    message: "If an account exists with this email, reset instructions have been logged.",
  };
}
