# ClinicDesk — Authentication & Identity Architecture

> **Module:** Authentication, Session Management & Clinic Onboarding  
> **Milestone:** Phase 2  

---

## 1. Overview

ClinicDesk implements a custom, lightweight, cryptographically secure authentication engine designed specifically for multi-tenant medical practices.

---

## 2. Core Components

### 2.1 Password Hashing (`src/lib/auth/password.ts`)
- Implemented with `bcryptjs`.
- Cost factor: **12 salt rounds**.
- Validation: Minimum 8 characters enforced before hashing.
- Null/empty safety: Rejects malformed comparisons gracefully without throwing.

### 2.2 JWT Session Management (`src/lib/auth/session.ts`)
- Built on `jose/jwt/sign` and `jose/jwt/verify` for Edge Runtime compatibility.
- Algorithm: **HMAC-SHA256 (HS256)**.
- Cookie configuration:
  - Name: `clinicdesk_session`
  - `httpOnly: true` (prevents XSS exfiltration)
  - `sameSite: "lax"` (mitigates CSRF)
  - `secure: process.env.NODE_ENV === "production"`
  - `maxAge: 7 * 24 * 60 * 60` (7-day sliding window)

### 2.3 Rate Limiting (`src/lib/auth/rate-limit.ts`)
- In-memory sliding-window rate limiter protecting sensitive authentication endpoints:
  - `login:<email>`: 5 attempts / 60 seconds
  - `signup:<email>`: 3 attempts / 60 seconds
  - `reset:<email>`: 3 attempts / 120 seconds

### 2.4 Security Audit Logging (`src/lib/auth/audit.ts`)
- Records immutable security events directly to the `AuditLog` table.
- Automatic credential sanitization: strips `password`, `passwordHash`, `token`, and `secret` before writing.
- Key logged actions: `USER_REGISTERED`, `LOGIN_SUCCESS`, `LOGIN_FAILED`, `LOGOUT`, `CLINIC_REGISTERED`, `DOCTOR_PROFILE_CREATED`, `STAFF_INVITED`, `ONBOARDING_COMPLETED`, `CLINIC_SWITCHED`.

---

## 3. Resumable Onboarding State Machine

The clinic onboarding journey is designed to be **idempotent** and **resumable**:

```
[Registered User]
       │
       ▼
[/onboarding] ─── (Evaluates current progress via getOnboardingState)
       │
       ├─► No Clinic Created? ──────► [/onboarding/clinic]
       │                                      │ (Creates Clinic + OWNER membership)
       │                                      ▼
       ├─► No Doctor Schedule? ─────► [/onboarding/doctor]
       │                                      │ (Creates DoctorProfile + DoctorAvailability)
       │                                      ▼
       ├─► No Team Configured? ─────► [/onboarding/team]
       │                                      │ (Allows optional staff invites)
       │                                      ▼
       └─► Ready to Launch? ────────► [/onboarding/complete]
                                              │ (Activates tenant context)
                                              ▼
                                       [/app/dashboard]
```

---

## 4. Server-Side Role-Based Access Control (RBAC)

Hierarchy enforcement defined in `src/lib/tenant-context.ts`:

```typescript
const roleWeights: Record<MembershipRole, number> = {
  RECEPTIONIST: 1,
  DOCTOR: 2,
  OWNER: 3,
  PLATFORM_ADMIN: 4,
};
```

Access control helper:
```typescript
export async function withAuthenticatedTenant<T>(
  operation: (tx: PrismaClient, session: SessionUser) => Promise<T>,
  requiredRole?: MembershipRole
): Promise<T>;
```
This helper resolves the session, re-verifies active membership in PostgreSQL, enforces the role hierarchy, and wraps the operation in a transaction-scoped tenant context with RLS enabled.
