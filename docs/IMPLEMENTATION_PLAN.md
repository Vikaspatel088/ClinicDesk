# ClinicDesk — Master Implementation Plan

> **Product Tagline:** *Run your clinic, not your calendar.*  
> **Market:** Independent Indian outpatient clinics (1–5 doctors)  
> **Architecture Focus:** Strict multi-tenant isolation, verifiable clinical workflows, high-trust no-show analytics.

---

## Executive Summary & Engineering Scope

ClinicDesk is a multi-tenant clinical operations and patient engagement SaaS designed specifically for independent Indian medical practitioners. Unlike legacy desktop software or superficial web dashboards, ClinicDesk enforces database-level tenant isolation (PostgreSQL Row-Level Security), auditable clinical workflows, automated reminder pipelines, and mathematically honest no-show reduction analytics.

This document serves as the canonical execution roadmap across all phases of implementation.

---

## Phase Breakdown

### Phase 0 — Foundation & Architecture (COMPLETED)
- [x] Workspace inspection and runtime tooling verification (Node.js v26.1.0, npm 11.13.0, PostgreSQL 18.6 binaries, Git 2.55.0).
- [x] Git repository initialization.
- [x] Creation of comprehensive architecture, implementation, and progress documentation (`docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/PROGRESS.md`).
- [x] Initialize Next.js 15+ App Router application with TypeScript (strict mode enabled).
- [x] Configure Tailwind CSS with the **Clinical Editorial** design system palette:
  - Midnight Navy: `#102B3B`
  - Clinic Teal: `#18B7A4`
  - Paper White: `#F5F7F4`
  - Mist: `#E6ECE9`
  - Coral: `#ED786B`
  - Ink: `#243D48`
- [x] Configure typography with Google Fonts optimization: `DM Serif Display`, `Plus Jakarta Sans`, and `IBM Plex Mono`.
- [x] Setup base UI component primitives (shadcn-compatible custom accessible components).
- [x] Author complete Prisma Schema covering all 19 core domain entities with UUIDs, foreign keys, indexes, and clinic tenant identifiers.
- [x] Implement database tenant context and PostgreSQL Row-Level Security (RLS) SQL policies and Prisma tenant context extension.
- [x] Provide comprehensive `.env.example` documenting all configuration keys.
- [x] Setup Vitest test runner and verify Phase 0 test harness.

---

### Phase 1 — Marketing Website & Signature Tour (COMPLETED)
- [x] Editorial marketing landing page (`/`):
  - Section 1: Navigation with brand mark and accessible mobile drawer (Escape key handling, ARIA dialog attributes).
  - Section 2: Hero with value proposition ("Your clinic deserves better than a paper register"), clinical editorial typography, interactive schedule preview.
  - Section 3: Honest trust positioning for independent Indian clinics (1–5 doctors), zero fabricated awards/endorsements.
  - Section 4: Three real clinical pain points (missed appointments, scattered paper records, manual front desk chaos).
  - Section 5: Six core product capability cards with deep-dive links.
  - Section 6: Signature feature spotlight with before/after comparison chart and interactive revenue recovery calculator.
  - Section 7: Six-step clinic workflow sequence (Booking $\rightarrow$ Reminder $\rightarrow$ Confirmation $\rightarrow$ Consultation $\rightarrow$ Invoice $\rightarrow$ Analytics).
  - Section 8: Honest security architecture explaining PostgreSQL RLS dual-layer isolation.
  - Section 9: Pricing preview with 3 tiers (Starter, Clinic, Multi-Doctor).
  - Section 10: Final editorial CTA and compliant footer.
- [x] Dedicated marketing subpages:
  - [x] `/features` — Detailed capability breakdowns for scheduling, records, clinical notes, reminders, billing, no-show reports, and multi-doctor rosters.
  - [x] `/how-it-works` — 8-step chronological timeline of a morning outpatient shift.
  - [x] `/no-show-report` — Signature analytics page with before/after comparison, mathematical formulas, and the interactive calculator.
  - [x] `/pricing` — 3 tiers (Starter, Clinic, Multi-Doctor), feature comparison matrix, FAQs, and monthly/annual toggle.
  - [x] `/security` — Multi-tenant architecture, RLS explanation, RBAC matrix, audit log specs, truthful status of implemented vs pending controls.
  - [x] `/about` — Mission, healthcare SaaS principles, why independent Indian practices need focused software.
  - [x] `/contact` — Demo enquiry / contact form with validation, accessible field errors, and honest technical disclaimer.
  - [x] `/demo` — Interactive tabbed product preview with synthetic clinic data, schedule, patient profile, clinical note, billing, and no-show reports.
- [x] Interactive Clinic Revenue Calculator:
  - Parameterized scenario inputs (weekly slots, baseline no-show %, avg consultation fee, expected relative reduction %, monthly reminder cost).
  - Non-causal statistical disclaimers.
  - 7 dedicated Vitest unit tests covering zero appointments, decimal percentages, boundary cases, and negative scenarios.
- [x] SEO & Performance:
  - Route metadata across all pages.
  - `src/app/sitemap.ts` and `src/app/robots.ts` generated.
  - Static prerendering verified for all 14 routes.

---

### Phase 2 — Authentication & Multi-Tenant Organization Management (UP NEXT)
- [ ] NextAuth / Auth.js implementation with secure session management.
- [ ] Multi-tenant isolation engine:
  - User registration & clinic setup wizard (`/signup`, `/onboarding`).
  - Clinic switching and membership validation (`ClinicMembership` with roles: `OWNER`, `DOCTOR`, `RECEPTIONIST`).
  - Middleware protecting `/app/*` routes and injecting verified tenant context.
  - Secure tenant context helper `withTenantContext(clinicId, tx)` ensuring Prisma queries run under session context.
- [ ] Security audit logging for auth events, membership changes, and tenant switches.

---

### Phase 3 — Clinic Operations Engine
- [ ] **Dashboard (`/app/dashboard`)**:
  - Today's appointment schedule and live queue status (Checked-in, In-Consultation, Completed, No-Show).
  - Key performance indicators (Today's revenue, patient volume, reminder delivery rate).
  - Doctor availability summary and quick-action modals (Walk-in booking, new patient).
- [ ] **Appointment Management (`/app/appointments`)**:
  - Interactive multi-doctor calendar & day-list views.
  - Slot booking engine with conflict prevention (concurrency locks and database constraints).
  - Status progression workflow: Scheduled $\rightarrow$ Confirmed $\rightarrow$ Checked-in $\rightarrow$ In-Consultation $\rightarrow$ Completed / No-Show.
  - Rescheduling, cancellation reasons, and walk-in priority tags.
- [ ] **Patient Registry & Medical Records (`/app/patients`, `/app/patients/[id]`)**:
  - Fast Indian phone number and name search.
  - Demographics, emergency contacts, blood group, allergies, chronic conditions.
  - Chronological visit timeline and digital document attachments.
- [ ] **Clinical Notes & Consultation Workspace (`/app/visits/[id]`)**:
  - High-speed consultation note editor: Vitals tracking, Chief Complaints, Diagnosis (ICD-10/custom), Prescription/Treatment Plan, Advice, Follow-up date.
  - Role-based clinical guardrails: Read/write restricted to Doctor and Owner.
  - Draft autosaving, finalization lock, and auditable clinical amendments.

---

### Phase 4 — Reminders, Messaging & Billing
- [ ] **Automated Reminders Engine (`/app/reminders`)**:
  - Multi-channel notification pipeline (SMS, WhatsApp sandbox, Email via Resend).
  - Scheduled reminder queue triggers (24h before, 2h before).
  - Status tracking: Queued $\rightarrow$ Dispatched $\rightarrow$ Delivered $\rightarrow$ Confirmed / Failed.
  - Transparent sandbox simulator clearly distinguishing mock deliveries from live telecommunications.
- [ ] **Clinic Invoicing & Payment Tracker (`/app/billing`)**:
  - Itemized consultation bills (Doctor fees, procedure charges, medications, discounts, taxes).
  - Payment records: Cash, UPI, Card, Net Banking with partial payment tracking.
  - Clean printable PDF/paper receipt generator formatted for Indian outpatient practices.

---

### Phase 5 — No-Show Intelligence & Practice Analytics
- [ ] **No-Show Intelligence Report (`/app/reports`)**:
  - Longitudinal attendance rates: Pre-reminder baseline vs. Post-reminder adherence.
  - Transparent metric calculations with explicit mathematical denominators:
    $$\text{No-Show Rate} = \frac{\text{No-Shows}}{\text{Scheduled} - \text{Clinic Cancellations}}$$
  - Estimated recovered appointments and practice revenue saved, clearly labeled as estimated non-causal attribution.
  - Time-of-day, day-of-week, and doctor-level attendance heatmaps.
  - Exportable CSV and print-ready executive summaries.

---

### Phase 6 — Production Hardening, Demo Tenants & Razorpay Integration
- [ ] **Fictional Clinic Tenants & Seed Data**:
  - Clinic 1: *Aarogyam Family Health Clinic* (General Medicine & Pediatrics, Mumbai)
  - Clinic 2: *Pulse Cardiology & Chest Care* (Speciality Cardiology, Bangalore)
  - Clinic 3: *Twacha Dermatology & Aesthetics* (Dermatology, New Delhi)
  - Complete with 9 realistic users, 5 doctors, ~120 synthetic patients, ~450 historical appointments, invoices, and clinical notes.
  - Safe, isolated demo reset mechanism with production safeguards.
- [ ] **Subscription & Plan Billing**:
  - Razorpay test-mode integration for ClinicDesk SaaS subscriptions.
  - Webhook signature verification and idempotency handling.
  - Tier entitlement enforcement (Doctor seat limits, custom branding, analytics depth).
- [ ] **QA & Production Readiness**:
  - End-to-end integration tests (Vitest + Playwright).
  - Security audit and penetration check of RLS policies.
  - Performance profiling (Lighthouse, Core Web Vitals).
