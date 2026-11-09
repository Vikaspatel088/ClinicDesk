import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Database, 
  KeyRound, 
  ArrowRight,
  Sparkles,
  FileText,
  UserCheck
} from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export const metadata = {
  title: "Security & Multi-Tenant Data Architecture — ClinicDesk",
  description: "Technical transparency into ClinicDesk security: PostgreSQL Row-Level Security (RLS), Role-Based Access Control, audit ledgers, and honest compliance disclosure.",
};

export default function SecurityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-midnight">
      <Navbar />

      <main className="flex-1">
        {/* Editorial Header */}
        <section className="pt-16 pb-12 md:pt-20 md:pb-16 border-b border-mist bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-xs text-teal-800">
                <ShieldCheck className="h-3.5 w-3.5 text-teal" />
                <span>TECHNICAL TRANSPARENCY & DATA PRIVACY</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-normal text-midnight leading-tight">
                Healthcare security with zero fake compliance badges.
              </h1>
              <p className="text-lg text-ink leading-relaxed">
                Many healthcare tools paste meaningless certification logos on their websites. We prefer exact technical disclosure: how data is partitioned, how roles are enforced, and the precise boundary between implemented architecture and pending live verifications.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: Dual-Layer Multi-Tenancy (PostgreSQL RLS) */}
        <section className="py-16 md:py-24 border-b border-mist bg-paper">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-teal font-semibold">
                  <Database className="h-4 w-4" />
                  <span>CORE PILLAR 01 • DATABASE ISOLATION</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-midnight">
                  PostgreSQL Row-Level Security (RLS) at the database layer.
                </h2>
                <p className="text-sm text-ink leading-relaxed">
                  In multi-tenant SaaS, application-level isolation (e.g. `where: clinicId`) is the most common source of catastrophic medical data leaks. If a junior engineer forgets one query filter, patient records can spill across competing clinics.
                </p>
                <p className="text-sm text-ink leading-relaxed">
                  ClinicDesk solves this by pushing tenant isolation into the database engine itself using PostgreSQL Row-Level Security policies:
                </p>
                <ul className="space-y-2.5 text-xs text-ink">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-teal mt-0.5 flex-shrink-0" />
                    <span><strong>Transaction-Scoped Session Context:</strong> Every query runs inside a transaction setting `SET LOCAL app.current_clinic_id = '&lt;uuid&gt;'`.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-teal mt-0.5 flex-shrink-0" />
                    <span><strong>Database Engine Enforcement:</strong> The database engine automatically rejects any query attempting to touch a foreign tenant's rows.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-teal mt-0.5 flex-shrink-0" />
                    <span><strong>Zero Trust in Browser Input:</strong> Clinic IDs submitted by clients in HTTP headers or URLs are never trusted as proof of authorization.</span>
                  </li>
                </ul>
              </div>

              {/* Technical Code Representation */}
              <div className="lg:col-span-6">
                <div className="rounded-xl border border-midnight-700 bg-midnight-950 p-6 font-mono text-xs text-midnight-200 space-y-3 shadow-elevated">
                  <div className="flex items-center justify-between pb-3 border-b border-midnight-800 text-midnight-400">
                    <span>src/lib/rls-policies.sql</span>
                    <span className="text-teal font-bold text-[10px]">VERIFIED POLICY</span>
                  </div>
                  <pre className="overflow-x-auto text-[11px] text-midnight-300 leading-relaxed">
{`-- Helper function for session isolation
CREATE OR REPLACE FUNCTION current_clinic_id() 
RETURNS uuid AS $$
BEGIN
  RETURN NULLIF(
    current_setting('app.current_clinic_id', true), 
    ''
  )::uuid;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Enforced across all tenant tables
ALTER TABLE "Patient" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Patient" FORCE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_patient ON "Patient"
  AS RESTRICTIVE
  FOR ALL
  USING (clinic_id = current_clinic_id())
  WITH CHECK (clinic_id = current_clinic_id());`}
                  </pre>
                  <p className="text-[10px] text-midnight-400 pt-2 border-t border-midnight-800">
                    * Policies defined for: ClinicMembership, Patient, ClinicalNote, Appointment, Invoice, Vitals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Role-Based Access Control (RBAC) Matrix */}
        <section id="rbac" className="py-16 md:py-24 border-b border-mist bg-white scroll-mt-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl space-y-4 mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal">
                CORE PILLAR 02 • PERMISSION BOUNDARIES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-midnight">
                Strict separation between clinical notes and front desk duties.
              </h2>
              <p className="text-sm text-ink leading-relaxed">
                A receptionist needs to know if a patient has checked in, but should never have access to private psychiatric, gynecological, or general medical examination findings.
              </p>
            </div>

            <div className="rounded-xl border border-mist-border overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-mist bg-paper text-xs font-mono text-midnight">
                    <th className="py-4 px-6 font-semibold">Permission Scope</th>
                    <th className="py-4 px-4 font-semibold text-center">Clinic Owner</th>
                    <th className="py-4 px-4 font-semibold text-center">Doctor</th>
                    <th className="py-4 px-4 font-semibold text-center">Receptionist</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-mist text-xs">
                  <tr className="hover:bg-paper/50">
                    <td className="py-3.5 px-6 font-medium text-midnight">Manage Appointments & OPD Queue</td>
                    <td className="py-3.5 px-4 text-center text-teal font-bold">Full Access</td>
                    <td className="py-3.5 px-4 text-center text-teal font-bold">Own Queue</td>
                    <td className="py-3.5 px-4 text-center text-teal font-bold">Full Access</td>
                  </tr>
                  <tr className="hover:bg-paper/50">
                    <td className="py-3.5 px-6 font-medium text-midnight">Patient Demographic Registry (Name, Phone)</td>
                    <td className="py-3.5 px-4 text-center text-teal font-bold">Full Access</td>
                    <td className="py-3.5 px-4 text-center text-teal font-bold">Read / Write</td>
                    <td className="py-3.5 px-4 text-center text-teal font-bold">Read / Write</td>
                  </tr>
                  <tr className="hover:bg-paper/50 bg-coral-50/20">
                    <td className="py-3.5 px-6 font-medium text-midnight flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5 text-coral" />
                      <span>Doctor Clinical Examination & Diagnoses</span>
                    </td>
                    <td className="py-3.5 px-4 text-center text-teal font-bold">Full Access</td>
                    <td className="py-3.5 px-4 text-center text-teal font-bold">Own Patients</td>
                    <td className="py-3.5 px-4 text-center text-coral font-bold">FORBIDDEN</td>
                  </tr>
                  <tr className="hover:bg-paper/50 bg-coral-50/20">
                    <td className="py-3.5 px-6 font-medium text-midnight flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5 text-coral" />
                      <span>Sign & Amend Medical Prescription</span>
                    </td>
                    <td className="py-3.5 px-4 text-center text-teal font-bold">Full Access</td>
                    <td className="py-3.5 px-4 text-center text-teal font-bold">Own Patients</td>
                    <td className="py-3.5 px-4 text-center text-coral font-bold">FORBIDDEN</td>
                  </tr>
                  <tr className="hover:bg-paper/50">
                    <td className="py-3.5 px-6 font-medium text-midnight">Generate Invoices & Collect Payments</td>
                    <td className="py-3.5 px-4 text-center text-teal font-bold">Full Access</td>
                    <td className="py-3.5 px-4 text-center text-ink-muted">View Only</td>
                    <td className="py-3.5 px-4 text-center text-teal font-bold">Full Access</td>
                  </tr>
                  <tr className="hover:bg-paper/50">
                    <td className="py-3.5 px-6 font-medium text-midnight">Clinic Subscriptions & Staff Management</td>
                    <td className="py-3.5 px-4 text-center text-teal font-bold">Full Access</td>
                    <td className="py-3.5 px-4 text-center text-ink-muted">No Access</td>
                    <td className="py-3.5 px-4 text-center text-ink-muted">No Access</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 3: Clinical Audit Logging */}
        <section id="clinical-audit" className="py-16 md:py-24 border-b border-mist bg-paper scroll-mt-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl space-y-4 mb-10">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal">
                CORE PILLAR 03 • MEDICO-LEGAL AUDIT TRAIL
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-midnight">
                Tamper-evident medical record amendment tracking.
              </h2>
              <p className="text-sm text-ink leading-relaxed">
                Indian medical practice guidelines mandate that clinical records cannot be secretly deleted or overwritten. ClinicDesk implements versioned amendment tracking with permanent author attribution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-ink">
              <div className="rounded-xl border border-mist-border bg-white p-6 space-y-2">
                <FileText className="h-5 w-5 text-teal" />
                <h4 className="font-serif text-base font-bold text-midnight">Finalization Lock</h4>
                <p className="leading-relaxed">
                  Once a doctor signs a consultation note, the record transitions to `FINALIZED` and becomes read-only to prevent accidental overrides.
                </p>
              </div>

              <div className="rounded-xl border border-mist-border bg-white p-6 space-y-2">
                <Clock className="h-5 w-5 text-teal" />
                <h4 className="font-serif text-base font-bold text-midnight">Versioned Amendments</h4>
                <p className="leading-relaxed">
                  Any subsequent corrections require an explicit reason for amendment, creating a new timestamped version while preserving the original.
                </p>
              </div>

              <div className="rounded-xl border border-mist-border bg-white p-6 space-y-2">
                <ShieldCheck className="h-5 w-5 text-teal" />
                <h4 className="font-serif text-base font-bold text-midnight">Immutable Audit Ledger</h4>
                <p className="leading-relaxed">
                  Authentication events, status transitions, and data exports are permanently recorded in the tenant-scoped `AuditLog` table.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Honest Disclosure Matrix (Implemented vs Pending) */}
        <section className="py-16 md:py-24 bg-white border-b border-mist">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl space-y-4 mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal">
                TRANSPARENCY REPORT
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-midnight">
                Implemented controls vs. Pending live verifications.
              </h2>
              <p className="text-sm text-ink leading-relaxed">
                We believe in complete honesty. Here is the exact status of our security controls:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Implemented & Verified in Foundation */}
              <div className="rounded-xl border border-teal-200 bg-teal-50/30 p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-teal" />
                  <h3 className="font-serif text-lg font-bold text-midnight">
                    Implemented & Verified Architecture
                  </h3>
                </div>

                <ul className="space-y-3 text-xs text-ink">
                  <li className="flex items-start gap-2">
                    <span className="text-teal font-bold">✓</span>
                    <span><strong>PostgreSQL Row-Level Security:</strong> Restrictive policies defined on all 14 tenant-owned entities.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal font-bold">✓</span>
                    <span><strong>Strict TypeScript Strict Mode:</strong> Complete compile-time type safety preventing undefined data access.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal font-bold">✓</span>
                    <span><strong>UUID Format Validation:</strong> Tenant context wrapper rejects non-UUID strings to block injection vectors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal font-bold">✓</span>
                    <span><strong>Non-Causal Metric Formulas:</strong> Verified test suite enforcing transparent denominators.</span>
                  </li>
                </ul>
              </div>

              {/* Pending Live Integration Phase */}
              <div className="rounded-xl border border-mist-border bg-paper p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-ink-muted" />
                  <h3 className="font-serif text-lg font-bold text-midnight">
                    Pending Live Integration Gates (Phases 2–6)
                  </h3>
                </div>

                <ul className="space-y-3 text-xs text-ink-muted">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span><strong>Live Auth.js Session Validation:</strong> Scheduled for Phase 2 implementation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span><strong>Razorpay Webhook Signature Verification:</strong> Scheduled for Phase 6 test-mode integration.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span><strong>Automated Penetration & Vulnerability Scans:</strong> Scheduled for Phase 6 production hardening.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span><strong>Formal Regulatory Compliance Certifications:</strong> We do not claim unverified certifications.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-paper">
          <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
            <h2 className="font-serif text-3xl font-normal text-midnight">
              Questions about our security architecture?
            </h2>
            <p className="text-sm text-ink max-w-lg mx-auto">
              Our engineering team is glad to discuss technical security, data schemas, or tenant isolation in detail.
            </p>
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-midnight px-6 py-3 text-sm font-semibold text-paper hover:bg-midnight-800 transition-colors shadow-editorial"
              >
                <span>Contact Security Team</span>
                <ArrowRight className="h-4 w-4 text-teal" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
