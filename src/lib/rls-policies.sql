-- =============================================================================
-- ClinicDesk — PostgreSQL Row-Level Security (RLS) Policy Definitions
-- =============================================================================
-- This script configures PostgreSQL Row-Level Security (RLS) across all
-- tenant-owned tables. Isolation relies on a transaction-scoped session variable:
--   SET LOCAL app.current_clinic_id = '<clinic-uuid>';
-- =============================================================================

-- 1. Helper function to read the current clinic tenant context
DROP FUNCTION IF EXISTS current_clinic_id() CASCADE;

CREATE OR REPLACE FUNCTION current_clinic_id() RETURNS text AS $$
BEGIN
  RETURN NULLIF(current_setting('app.current_clinic_id', true), '');
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- 2. Apply RLS and Policies for Tenant Tables

-- Table: ClinicMembership
ALTER TABLE "ClinicMembership" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ClinicMembership" FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_isolation_clinic_membership ON "ClinicMembership";
CREATE POLICY tenant_isolation_clinic_membership ON "ClinicMembership"

  FOR ALL
  USING ("clinicId" = current_clinic_id())
  WITH CHECK ("clinicId" = current_clinic_id());

-- Table: DoctorProfile
ALTER TABLE "DoctorProfile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DoctorProfile" FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_isolation_doctor_profile ON "DoctorProfile";
CREATE POLICY tenant_isolation_doctor_profile ON "DoctorProfile"

  FOR ALL
  USING ("clinicId" = current_clinic_id())
  WITH CHECK ("clinicId" = current_clinic_id());

-- Table: DoctorAvailability
ALTER TABLE "DoctorAvailability" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DoctorAvailability" FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_isolation_doctor_availability ON "DoctorAvailability";
CREATE POLICY tenant_isolation_doctor_availability ON "DoctorAvailability"

  FOR ALL
  USING ("clinicId" = current_clinic_id())
  WITH CHECK ("clinicId" = current_clinic_id());

-- Table: Patient
ALTER TABLE "Patient" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Patient" FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_isolation_patient ON "Patient";
CREATE POLICY tenant_isolation_patient ON "Patient"

  FOR ALL
  USING ("clinicId" = current_clinic_id())
  WITH CHECK ("clinicId" = current_clinic_id());

-- Table: PatientMedicalHistory
ALTER TABLE "PatientMedicalHistory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PatientMedicalHistory" FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_isolation_patient_medical_history ON "PatientMedicalHistory";
CREATE POLICY tenant_isolation_patient_medical_history ON "PatientMedicalHistory"

  FOR ALL
  USING ("clinicId" = current_clinic_id())
  WITH CHECK ("clinicId" = current_clinic_id());

-- Table: Appointment
ALTER TABLE "Appointment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Appointment" FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_isolation_appointment ON "Appointment";
CREATE POLICY tenant_isolation_appointment ON "Appointment"

  FOR ALL
  USING ("clinicId" = current_clinic_id())
  WITH CHECK ("clinicId" = current_clinic_id());

-- Table: AppointmentStatusEvent
ALTER TABLE "AppointmentStatusEvent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AppointmentStatusEvent" FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_isolation_appointment_status_event ON "AppointmentStatusEvent";
CREATE POLICY tenant_isolation_appointment_status_event ON "AppointmentStatusEvent"

  FOR ALL
  USING ("clinicId" = current_clinic_id())
  WITH CHECK ("clinicId" = current_clinic_id());

-- Table: Visit
ALTER TABLE "Visit" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Visit" FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_isolation_visit ON "Visit";
CREATE POLICY tenant_isolation_visit ON "Visit"

  FOR ALL
  USING ("clinicId" = current_clinic_id())
  WITH CHECK ("clinicId" = current_clinic_id());

-- Table: ClinicalNote
ALTER TABLE "ClinicalNote" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ClinicalNote" FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_isolation_clinical_note ON "ClinicalNote";
CREATE POLICY tenant_isolation_clinical_note ON "ClinicalNote"

  FOR ALL
  USING ("clinicId" = current_clinic_id())
  WITH CHECK ("clinicId" = current_clinic_id());

-- Table: Vital
ALTER TABLE "Vital" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Vital" FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_isolation_vital ON "Vital";
CREATE POLICY tenant_isolation_vital ON "Vital"

  FOR ALL
  USING ("clinicId" = current_clinic_id())
  WITH CHECK ("clinicId" = current_clinic_id());

-- Table: Reminder
ALTER TABLE "Reminder" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Reminder" FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_isolation_reminder ON "Reminder";
CREATE POLICY tenant_isolation_reminder ON "Reminder"

  FOR ALL
  USING ("clinicId" = current_clinic_id())
  WITH CHECK ("clinicId" = current_clinic_id());

-- Table: ReminderEvent
ALTER TABLE "ReminderEvent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReminderEvent" FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_isolation_reminder_event ON "ReminderEvent";
CREATE POLICY tenant_isolation_reminder_event ON "ReminderEvent"

  FOR ALL
  USING ("clinicId" = current_clinic_id())
  WITH CHECK ("clinicId" = current_clinic_id());

-- Table: Invoice
ALTER TABLE "Invoice" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Invoice" FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_isolation_invoice ON "Invoice";
CREATE POLICY tenant_isolation_invoice ON "Invoice"

  FOR ALL
  USING ("clinicId" = current_clinic_id())
  WITH CHECK ("clinicId" = current_clinic_id());

-- Table: InvoiceLineItem
ALTER TABLE "InvoiceLineItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "InvoiceLineItem" FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_isolation_invoice_line_item ON "InvoiceLineItem";
CREATE POLICY tenant_isolation_invoice_line_item ON "InvoiceLineItem"

  FOR ALL
  USING ("clinicId" = current_clinic_id())
  WITH CHECK ("clinicId" = current_clinic_id());

-- Table: Payment
ALTER TABLE "Payment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Payment" FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_isolation_payment ON "Payment";
CREATE POLICY tenant_isolation_payment ON "Payment"

  FOR ALL
  USING ("clinicId" = current_clinic_id())
  WITH CHECK ("clinicId" = current_clinic_id());

-- Table: AuditLog
ALTER TABLE "AuditLog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AuditLog" FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_isolation_audit_log ON "AuditLog";
CREATE POLICY tenant_isolation_audit_log ON "AuditLog"

  FOR ALL
  USING ("clinicId" IS NULL OR "clinicId" = current_clinic_id())
  WITH CHECK ("clinicId" IS NULL OR "clinicId" = current_clinic_id());
