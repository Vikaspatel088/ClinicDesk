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

### Phase 0 — Foundation & Architecture (Current Phase)
- [x] Workspace inspection and runtime tooling verification (Node.js v26.1.0, npm 11.13.0, PostgreSQL 18.6 binaries, Git 2.55.0).
- [x] Git repository initialization.
- [x] Creation of comprehensive architecture, implementation, and progress documentation (`docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/PROGRESS.md`).
- [ ] Initialize Next.js 15+ App Router application with TypeScript (strict mode enabled).
- [ ] Configure Tailwind CSS with the **Clinical Editorial** design system palette:
  - Midnight Navy: `#102B3B`
  - Clinic Teal: `#18B7A4`
  - Paper White: `#F5F7F4`
  - Mist: `#E6ECE9`
  - Coral: `#ED786B`
  - Ink: `#243D48`
- [ ] Configure typography with Google Fonts optimization: `DM Serif Display`, `Plus Jakarta Sans`, and `IBM Plex Mono`.
- [ ] Setup base UI component primitives (shadcn-compatible custom accessible components).
- [ ] Author complete Prisma Schema covering all 18 core domain entities with UUIDs, foreign keys, indexes, and clinic tenant identifiers.
- [ ] Implement database tenant context and PostgreSQL Row-Level Security (RLS) SQL policies and Prisma tenant context extension.
- [ ] Provide comprehensive `.env.example` documenting all configuration keys.
- [ ] Setup Vitest test runner and verify Phase 0 test harness.

---

### Phase 1 — Marketing & Public Surface
- [ ] Editorial marketing landing page (`/`):
  - Hero with value proposition, clinical editorial typography, interactive schedule preview.
  - Live ROI & No-Show calculator for Indian outpatient clinics (demonstrating loss per empty slot).
  - Feature highlights: Smart booking, WhatsApp/SMS/Email reminders, Digital consultation pad, GST-ready billing.
  - Interactive product tour carousel and testimonials from outpatient practitioners.
- [ ] Secondary marketing pages:
  - `/features` — Deep-dive on clinical notes, scheduling, queue management, billing.
  - `/how-it-works` — 3-step clinic onboarding & daily front-desk workflow.
  - `/no-show-report` — Deep-dive into ClinicDesk's signature intelligence methodology (before vs. after reminder delivery tracking, non-causal attribution transparency).
  - `/pricing` — Transparent INR pricing tiers (Starter, Clinic, Multi-Doctor) with feature comparison.
  - `/security` — Multi-tenant architecture, data residency, RLS enforcement, clinical audit logging.
  - `/about` & `/contact` — Company story, clinical advisory council, support channels.
  - `/demo` — Interactive guided sandbox access.
- [ ] Global header, mobile navigation drawer, and editorial footer with status badge.

---

### Phase 2 — Authentication & Multi-Tenant Organization Management
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
