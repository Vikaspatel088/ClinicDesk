# ClinicDesk — Multi-Tenant Security & PostgreSQL RLS Integration Tests

> **Security Mandate:** Security before features. Identity before patient records. Tenant isolation before clinic operations.  
> **Database:** PostgreSQL 18.6 on `127.0.0.1:54321/clinicdesk`  
> **Application DB User:** `clinicdesk_app` (`NOSUPERUSER`, `NOBYPASSRLS`)  

---

## 1. Threat Model & Dual-Layer Defense

In healthcare practice management, cross-tenant data leakage is a critical compliance and privacy violation. ClinicDesk defends against multi-tenant vulnerabilities at two separate layers:

```
[Incoming Request]
       │
       ▼
[Layer 1: Application Server Boundary]
  ├── Session Token Verification (JWT HMAC-SHA256)
  ├── Database Membership & Role Check (`withAuthenticatedTenant`)
  └── Input Sanitization & UUID Regex Validation
       │
       ▼
[Layer 2: Database Engine Row-Level Security]
  ├── Transaction-Local Session Variable (`SET LOCAL app.current_clinic_id`)
  ├── Restricted DB Role (`clinicdesk_app` with NOBYPASSRLS)
  ├── Table Policy Enforcement (`FORCE ROW LEVEL SECURITY`)
  └── WITH CHECK Constraint Rejection on Write Spoofing
```

---

## 2. PostgreSQL Role Configuration

To guarantee that RLS policies are enforced on every application query:

```sql
-- Role definition
CREATE ROLE clinicdesk_app WITH LOGIN PASSWORD 'clinicdesk_secure_app_password_2026'
  NOSUPERUSER
  NOBYPASSRLS
  NOCREATEDB
  NOCREATEROLE;

-- Privilege grant
GRANT USAGE ON SCHEMA public TO clinicdesk_app;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO clinicdesk_app;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO clinicdesk_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO clinicdesk_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO clinicdesk_app;
```

---

## 3. Row-Level Security Policy Definitions

Applied to all 14 tenant-owned tables (`ClinicMembership`, `DoctorProfile`, `DoctorAvailability`, `Patient`, `PatientMedicalHistory`, `Appointment`, `AppointmentStatusEvent`, `Visit`, `ClinicalNote`, `Vital`, `Reminder`, `ReminderEvent`, `Invoice`, `InvoiceLineItem`, `Payment`, `AuditLog`):

```sql
-- Helper function to read the current transaction tenant
CREATE OR REPLACE FUNCTION current_clinic_id() RETURNS text AS $$
BEGIN
  RETURN NULLIF(current_setting('app.current_clinic_id', true), '');
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Example: Patient Table Policy
ALTER TABLE "Patient" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Patient" FORCE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_patient ON "Patient"
  FOR ALL
  USING ("clinicId" = current_clinic_id())
  WITH CHECK ("clinicId" = current_clinic_id());
```

---

## 4. Test Suite Specification (`tests/rls-tenant-isolation.test.ts`)

| Test Case | Scenario | Expected Behavior | Result |
| :--- | :--- | :--- | :---: |
| **Test 1** | Tenant reads and writes own data | Patient record created and retrieved under Clinic A context | **PASS** |
| **Test 2** | Clinic B queries Clinic A patient | Direct `findUnique` and `findMany` return 0 rows (`null`) | **PASS** |
| **Test 3** | Clinic B attempts to update Clinic A record | `updateMany` updates 0 rows; patient record in Clinic A remains pristine | **PASS** |
| **Test 4** | Clinic B attempts to insert record with Clinic A's `clinicId` | Transaction fails with PostgreSQL Error `42501` (`violates row-level security policy`) | **PASS** |
| **Test 5** | Concurrent tenants coexist | Clinic A and Clinic B read only their respective patient lists | **PASS** |
| **Test 6** | Connection pooling leakage prevention | Subsequent query outside transaction context finds `app.current_clinic_id` empty | **PASS** |

---

## 5. Execution Output Log

```
 RUN  v3.2.7 C:/_OTHER STUFF/5 SEM/GITHUB/ClinicDesk

 ✓ tests/rls-tenant-isolation.test.ts (6 tests) 140ms
   ✓ permits tenant to insert and read its own records
   ✓ CRITICAL: completely hides Clinic A patients when queried under Clinic B context
   ✓ CRITICAL: rejects cross-tenant write attempts from Clinic B into Clinic A
   ✓ CRITICAL: prevents Clinic B from inserting a record belonging to Clinic A (WITH CHECK enforcement)
   ✓ allows both tenants to coexist with strict data separation
   ✓ CRITICAL: proves connection pooling cannot leak tenant context to subsequent queries

 Test Files  1 passed (1)
      Tests  6 passed (6)
```
