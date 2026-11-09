# ClinicDesk — Architecture & Technical Specifications

## 1. High-Level System Architecture

ClinicDesk is architected as an enterprise-grade multi-tenant healthcare SaaS built upon the Next.js App Router, PostgreSQL with Row-Level Security (RLS), and Prisma ORM.

```
                           +------------------------------------------+
                           |           Client / Web Browser           |
                           +------------------------------------------+
                                    |                      |
                            HTTPS / Next.js SSR       API / Server Actions
                                    v                      v
+-----------------------------------------------------------------------------------+
| Next.js App Router (Full-Stack Engine)                                            |
|                                                                                   |
|  [Public Routes]               [App Workspace]              [Admin Engine]        |
|  - Marketing & Tour            - Dashboard & Calendar       - Platform Dashboard  |
|  - Pricing & Calculators       - Patients & Clinical Notes  - Tenant Management   |
|  - Demo Sandbox Gate           - Reminders & Invoices       - System Audit Logs   |
|                                                                                   |
|  -------------------------------------------------------------------------------  |
|  [Cross-Cutting Middleware & Security]                                            |
|  - NextAuth Session Validation & Cookie Verification                              |
|  - Tenant Context Extraction (`x-clinic-id` validation against User Memberships)  |
|  - Role-Based Access Control (RBAC: OWNER, DOCTOR, RECEPTIONIST, PLATFORM_ADMIN)  |
|  - Zod Request Validation & Sanitization                                          |
|                                                                                   |
|  -------------------------------------------------------------------------------  |
|  [Application Services]                                                           |
|  - Appointment & Slot Engine (Optimistic & DB Locks)                              |
|  - Clinical Notes Engine (Drafting, Finalization, Audit Versioning)               |
|  - Reminder Notification Pipeline (Resend Email, SMS/WhatsApp Sandbox Adapter)   |
|  - Billing Engine (Itemized Consultation Invoicing & Razorpay Subscriptions)      |
|  - No-Show Intelligence Analytics Engine                                          |
+-----------------------------------------------------------------------------------+
                                    |
                    Prisma ORM with Tenant Context Extension
                                    |
                    PostgreSQL 16+ with Row-Level Security (RLS)
+-----------------------------------------------------------------------------------+
| Database Tier (PostgreSQL)                                                        |
|                                                                                   |
|  - Session Context: `SET LOCAL app.current_clinic_id = '<clinic-uuid>';`          |
|  - Row-Level Security: `CREATE POLICY tenant_isolation_policy ON <table> ...`     |
|  - B-Tree Indexes on `clinicId`, foreign keys, and temporal fields                |
|  - Immutable Audit Log Table for Medico-Legal Compliance                          |
+-----------------------------------------------------------------------------------+
```

---

## 2. Multi-Tenant Isolation & Row-Level Security (RLS)

### 2.1 The Security Problem in Healthcare SaaS
In multi-tenant SaaS, relying solely on application-level filtering (`where: { clinicId }`) creates catastrophic data leakage risks: a single omitted `where` clause in a complex relation or join exposes patient medical histories across competitive clinics.

### 2.2 Dual-Layer Defense Architecture
ClinicDesk enforces multi-tenancy at two independent layers:

1. **Application Layer (Prisma Client Extension)**:
   Every database query dispatched on behalf of a tenant automatically sets the transaction session variable `app.current_clinic_id` and adds `clinicId` filters:
   ```typescript
   export async function withTenantContext<T>(
     clinicId: string,
     operation: (tx: PrismaClient) => Promise<T>
   ): Promise<T> {
     return prisma.$transaction(async (tx) => {
       await tx.$executeRawUnsafe(
         `SET LOCAL app.current_clinic_id = '${clinicId}'`
       );
       return operation(tx as unknown as PrismaClient);
     });
   }
   ```

2. **Database Engine Layer (PostgreSQL Row-Level Security)**:
   Every tenant-owned table is secured with RLS enabled:
   ```sql
   ALTER TABLE "Patient" ENABLE ROW LEVEL SECURITY;
   ALTER TABLE "Patient" FORCE ROW LEVEL SECURITY;

   CREATE POLICY patient_tenant_isolation_policy ON "Patient"
     AS RESTRICTIVE
     USING (
       clinic_id = NULLIF(current_setting('app.current_clinic_id', true), '')::uuid
     )
     WITH CHECK (
       clinic_id = NULLIF(current_setting('app.current_clinic_id', true), '')::uuid
     );
   ```

---

## 3. Relational Database Schema & Entities

The relational data model covers 18 distinct entities:

```
[User] 1 <---> * [ClinicMembership] * <---> 1 [Clinic]
                   |                             |
                   +-- [DoctorProfile]           +-- [DoctorAvailability]
                   |                             +-- [Patient]
                   |                             +-- [Appointment]
                   |                             +-- [Visit]
                   |                             +-- [ClinicalNote]
                   |                             +-- [Vital]
                   |                             +-- [Reminder]
                   |                             +-- [Invoice]
                   |                             +-- [Subscription]
                   |                             +-- [AuditLog]
```

### Key Entities & Relations
1. **User**: Global authentication identities (email, password hash, phone, name).
2. **Clinic**: The primary tenant boundary (name, slug, phone, address, GSTIN, time zone, currency `INR`).
3. **ClinicMembership**: Links User to Clinic with explicit roles (`OWNER`, `DOCTOR`, `RECEPTIONIST`).
4. **DoctorProfile**: Specialization, registration number (MCI/NMC), consultation fee, appointment slot duration.
5. **DoctorAvailability**: Day-of-week recurrence, shift start/end times, break periods.
6. **Patient**: Demographic profile, medical record number (MRN), phone, WhatsApp consent.
7. **PatientMedicalHistory**: Allergies, chronic illnesses, ongoing medications, past surgeries.
8. **Appointment**: Scheduled slots, token numbers, status enum (`SCHEDULED`, `CONFIRMED`, `CHECKED_IN`, `IN_CONSULTATION`, `COMPLETED`, `CANCELLED`, `NO_SHOW`).
9. **AppointmentStatusEvent**: Audit trail of every appointment transition with user attribution and timestamps.
10. **Visit**: Physical attendance record connecting Appointment, Patient, and Doctor.
11. **ClinicalNote**: SOAP/Consultation note (Chief complaints, diagnosis, treatment, advice, follow-up date). Finalization locking with versioned amendment tracking.
12. **Vital**: Blood pressure (systolic/diastolic), pulse rate, temperature, SpO2, weight, height, BMI.
13. **Reminder**: Scheduled reminders per appointment (SMS, WhatsApp, Email).
14. **ReminderEvent**: Dispatch logs, delivery receipts, delivery time, mock vs. live status flag.
15. **Invoice**: Practice billing record (Invoice number, subtotal, discount, GST/tax, grand total, balance).
16. **InvoiceLineItem**: Item description, category (Consultation, Procedure, Lab, Medication), unit price, quantity, total.
17. **Payment**: Payment ledger entry (Cash, UPI, Card, Net Banking) linked to Invoice.
18. **Subscription**: ClinicDesk SaaS subscription (Plan: `STARTER`, `CLINIC`, `MULTI_DOCTOR`; Razorpay subscription ID, period start/end, status).
19. **AuditLog**: Tamper-evident ledger capturing security and clinical modifications.

---

## 4. Role-Based Access Control (RBAC) Matrix

| Resource / Action | Platform Admin | Clinic Owner | Doctor | Receptionist |
| :--- | :---: | :---: | :---: | :---: |
| Platform Analytics & Clinics | Yes | No | No | No |
| Clinic Settings & Subscriptions | Read/Write | Read/Write | Read | Read |
| Staff Management & Invites | Read/Write | Read/Write | Read | No |
| Doctor Availability Configuration | Read/Write | Read/Write | Own Only | Read |
| Patient Demographics | Read/Write | Read/Write | Read/Write | Read/Write |
| Patient Medical History & Vitals | Read/Write | Read/Write | Read/Write | Read/Write |
| Clinical Notes (View) | Read | Read | Read/Write | **Forbidden** |
| Clinical Notes (Draft/Sign/Amend) | No | Own Patients | Own Patients | **Forbidden** |
| Appointment Booking & Queue | Read/Write | Read/Write | Read/Write | Read/Write |
| Invoice Generation & Payments | Read/Write | Read/Write | Read | Read/Write |
| No-Show Intelligence Reports | Read | Read/Write | Read | View Only |

---

## 5. Design System: "Clinical Editorial"

The design system merges the authority and precision of traditional medical publications with modern, responsive SaaS usability.

### Color Tokens
- **Midnight Navy (`#102B3B`)**: Dominant branding, dark sections, high-contrast text.
- **Clinic Teal (`#18B7A4`)**: Primary brand accent, verified statuses, successful actions.
- **Paper White (`#F5F7F4`)**: Warm neutral canvas, eliminating sterile blue glare.
- **Mist (`#E6ECE9`)**: Border lines, subtle card backgrounds, dividers.
- **Coral (`#ED786B`)**: No-shows, cancellations, allergy alerts, critical vitals.
- **Ink (`#243D48`)**: Secondary text, subtle table headers, muted metadata.

### Typography Hierarchy
- **Editorial Headlines**: `DM Serif Display` — Used for marketing headers, report titles, and key value propositions.
- **Interface & Content**: `Plus Jakarta Sans` — Crisp, legible geometric sans-serif for forms, tables, buttons, and navigation.
- **Numerical & Technical Data**: `IBM Plex Mono` — Financial amounts (₹), token numbers, timestamps, vital signs, MRNs.
