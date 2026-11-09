# ClinicDesk — Phase 2: Authentication & Multi-Tenant Identity Implementation Plan

> **Milestone:** Phase 2 (Authentication & Tenancy)  
> **Database:** Live PostgreSQL 18.6 on `127.0.0.1:54321/clinicdesk` with Row-Level Security (RLS)  
> **Security Mandate:** Security before features. Identity before patient records. Tenant isolation before clinic operations.

---

## 1. Authentication Architecture

### 1.1 Authentication Strategy
- **Password Security:** Passwords hashed with high-entropy salt using `bcryptjs` (cost factor 12) or Argon2id. No plaintext passwords or weak hashes ever touch storage or memory.
- **Session Model:** Secure, HTTP-only, SameSite=Lax signed session cookies (`clinicdesk_session`) carrying verified user identity (`userId`, `email`, active `clinicId`, active `role`).
- **Session Expiration:** Standard 7-day sliding session with explicit invalidation on logout and account suspension.
- **CSRF & Rate Limiting:** State-altering endpoints protected via Next.js Server Actions with origin verification and in-memory/sliding-window IP rate limiting.

### 1.2 User Lifecycle & Routes
```
[Visitor]
   │
   ├─► /signup ────────► Register user (Name, Email, Phone, Password)
   │                       │
   │                       ▼
   │                   /onboarding/clinic ──► Clinic Profile (Name, Address, City, Timezone)
   │                       │
   │                       ▼
   │                   /onboarding/doctor ──► Doctor Profile (Speciality, Fee, Slots)
   │                       │
   │                       ▼
   │                   /onboarding/team   ──► Staff Invitations (Receptionist/Doctor)
   │                       │
   │                       ▼
   │                   /onboarding/complete ──► Workspace Provisioned
   │                                              │
   ▼                                              ▼
 /login ────────────────────────────────────► /app/dashboard (Authenticated Shell)
   │
   ├─► /forgot-password
   └─► /reset-password
```

---

## 2. Multi-Tenant Onboarding State Machine

The onboarding journey is designed to be **resumable** and **idempotent**:
1. **Step 1: Account Creation (`/signup`)**
   - Validates email uniqueness.
   - Hashes password.
   - Creates `User` record in database.
   - Issues initial session cookie.
2. **Step 2: Clinic Registration (`/onboarding/clinic`)**
   - Collects Clinic Name, Type, Address, City, State, PIN, Contact Number, Email, Timezone, Operating Hours.
   - Generates unique tenant slug (e.g. `aarogyam-health`).
   - Creates `Clinic` record and assigns user as `OWNER` in `ClinicMembership`.
   - Prevents duplicate clinic creation if the user retries or refreshes.
3. **Step 3: Doctor Profile Setup (`/onboarding/doctor`)**
   - Creates `DoctorProfile` linked to the owner's membership.
   - Captures Specialization, Consultation Duration, Consultation Fee, Working Days, and Shift Hours.
   - Seeds `DoctorAvailability` schedule rows.
4. **Step 4: Team Invitations (`/onboarding/team`)**
   - Allows inviting a receptionist or visiting doctor via email/phone.
   - Stores invited memberships in `ClinicMembership` with pending status.
   - Provides honest disclosure of invitation delivery.
5. **Step 5: Completion (`/onboarding/complete`)**
   - Verifies all prerequisite records exist.
   - Transitions session to active clinic context.
   - Redirects to `/app/dashboard`.

---

## 3. Server-Side Role-Based Access Control (RBAC)

Authorization is enforced at the server boundary (Server Actions and data access layer), never purely by hiding frontend elements.

| Role | Appointments & Queue | Patient Registry | Medical Notes | Invoicing | Clinic Settings |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **OWNER** | Full | Full | Full | Full | Full |
| **DOCTOR** | Own Queue | Assigned | Read/Write | View Only | View Only |
| **RECEPTIONIST** | Full | Read/Write | **FORBIDDEN** | Full | **FORBIDDEN** |

---

## 4. PostgreSQL Row-Level Security & Tenant Context Engine

Tenant context is derived strictly from verified database membership, never from client-provided headers or query parameters:

```typescript
export async function withTenantContext<T>(
  clinicId: string,
  userRole: MembershipRole,
  operation: (tx: PrismaClient) => Promise<T>
): Promise<T> {
  // 1. Validate UUID structure
  // 2. Open PostgreSQL transaction
  // 3. SET LOCAL app.current_clinic_id = '<clinicId>'
  // 4. SET LOCAL app.current_user_role = '<role>'
  // 5. Execute operation under RLS
  // 6. Transaction commits or rolls back (clearing session variables)
}
```

---

## 5. Phase 2 Verification Checklist (11 Acceptance Gates)

- [ ] New clinic owner can register and log in
- [ ] Clinic onboarding persists after refresh (resumable)
- [ ] Owner membership is created correctly
- [ ] Doctor and receptionist invitations work
- [ ] Role permissions enforced server-side
- [ ] PostgreSQL RLS policies execute successfully on live DB
- [ ] Clinic A cannot access Clinic B records
- [ ] Connection pooling cannot leak tenant context
- [ ] Authenticated dashboard works with real clinic profile
- [ ] All previous marketing routes remain intact
- [ ] Production build and automated tests pass
