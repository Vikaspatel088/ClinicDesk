import React from "react";
import Link from "next/link";
import { 
  Calendar, 
  Users, 
  FileCheck2, 
  MessageSquare, 
  Receipt, 
  TrendingDown, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Lock,
  PhoneCall,
  Activity,
  FileText
} from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export const metadata = {
  title: "Clinical Capabilities & Feature Modules — ClinicDesk",
  description: "Detailed breakdown of ClinicDesk: Smart Scheduling, Digital Patient Records, Sub-minute Clinical Notes, WhatsApp/SMS Reminders, GST Billing, and No-Show Intelligence.",
};

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-midnight">
      <Navbar />

      <main className="flex-1">
        {/* Header / Intro */}
        <section className="pt-16 pb-12 md:pt-20 md:pb-16 border-b border-mist bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-xs text-teal-800">
                <Sparkles className="h-3.5 w-3.5 text-teal" />
                <span>CLINICDESK MODULE DIRECTORY</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-normal text-midnight leading-tight">
                Designed for speed inside the consulting room.
              </h1>
              <p className="text-lg text-ink leading-relaxed">
                Every screen in ClinicDesk is engineered to eliminate front-desk delays and keep doctors focused on clinical diagnostics rather than software data entry.
              </p>
            </div>
          </div>
        </section>

        {/* Feature 1: Smart Appointment Scheduling */}
        <section id="scheduling" className="py-16 md:py-24 border-b border-mist scroll-mt-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-teal font-semibold">
                  <Calendar className="h-4 w-4" />
                  <span>MODULE 01 • SCHEDULING & QUEUE ENGINE</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-midnight">
                  Eliminate waiting lounge friction with dynamic token queueing.
                </h2>
                <p className="text-sm text-ink leading-relaxed">
                  Indian outpatient clinics handle a constant mixture of pre-booked appointments and walk-in patients. ClinicDesk provides separate slot durations per doctor (e.g. 15 mins for general checkups, 30 mins for complex procedures) and automated token generation.
                </p>
                <ul className="space-y-2.5 text-xs text-ink">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                    <span><strong>Concurrency Protection:</strong> Database locks prevent double-booking identical slots.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                    <span><strong>Emergency Prioritization:</strong> One-click walk-in triage bumps critical patients without scrambling the queue.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                    <span><strong>Doctor Shift Customization:</strong> Configure individual OPD timings, break intervals, and day-of-week availabilities.</span>
                  </li>
                </ul>
              </div>

              {/* UI Preview: Calendar & Tokens */}
              <div className="lg:col-span-6">
                <div className="rounded-xl border border-mist-border bg-white p-6 shadow-elevated">
                  <div className="flex items-center justify-between pb-3 border-b border-mist">
                    <span className="font-mono text-xs font-semibold text-midnight">OPD Queue: Morning Shift</span>
                    <span className="font-mono text-xs text-teal font-bold">14 / 16 Slots</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-teal-50 border border-teal-200 text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold bg-white px-2 py-0.5 rounded text-midnight">#08</span>
                        <span className="font-semibold text-midnight">Kavita Narang (34 F)</span>
                        <span className="text-ink-muted hidden sm:inline">• Follow-up Thyroid</span>
                      </div>
                      <span className="font-mono text-[11px] font-bold text-teal-800">In Cabin</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-paper border border-mist-border text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold bg-white px-2 py-0.5 rounded text-ink-muted">#09</span>
                        <span className="font-semibold text-midnight">Rohan Mathur (45 M)</span>
                        <span className="text-ink-muted hidden sm:inline">• Walk-in Chest Pain</span>
                      </div>
                      <span className="font-mono text-[11px] font-semibold text-coral bg-coral-50 px-2 py-0.5 rounded">Triage Priority</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-mist text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold bg-paper px-2 py-0.5 rounded text-ink-muted">#10</span>
                        <span className="font-semibold text-midnight">Gauri Deshmukh (51 F)</span>
                        <span className="text-ink-muted hidden sm:inline">• WhatsApp Confirmed</span>
                      </div>
                      <span className="font-mono text-[11px] text-ink-muted">Waiting Lounge</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 2: Patient Records & History */}
        <section id="records" className="py-16 md:py-24 border-b border-mist bg-white scroll-mt-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* UI Preview: Patient Profile */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="rounded-xl border border-mist-border bg-paper p-6 shadow-elevated space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-mist">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-midnight">Vikramaditya Rao</h4>
                      <p className="font-mono text-xs text-ink-muted">MRN-2026-0419 • +91 98450 12345</p>
                    </div>
                    <span className="rounded-full bg-midnight text-paper px-2.5 py-0.5 font-mono text-xs">
                      52 M • O+ve
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded bg-white p-3 border border-mist">
                      <span className="text-ink-muted uppercase font-mono text-[10px] block">Critical Allergies</span>
                      <span className="font-semibold text-coral mt-1 block">Penicillin, Sulfa drugs</span>
                    </div>
                    <div className="rounded bg-white p-3 border border-mist">
                      <span className="text-ink-muted uppercase font-mono text-[10px] block">Chronic Conditions</span>
                      <span className="font-semibold text-midnight mt-1 block">Type 2 DM, HTN (10 yrs)</span>
                    </div>
                  </div>

                  <div className="rounded bg-white p-3 border border-mist text-xs">
                    <span className="text-ink-muted uppercase font-mono text-[10px] block">Recent Visit Timeline</span>
                    <div className="mt-2 space-y-1.5 font-mono text-[11px]">
                      <div className="flex justify-between text-midnight">
                        <span>14 Oct 2026</span>
                        <span className="text-ink-muted">HbA1c 7.4% • Metformin 500mg</span>
                      </div>
                      <div className="flex justify-between text-midnight">
                        <span>02 Aug 2026</span>
                        <span className="text-ink-muted">Routine Checkup • BP 130/84</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-teal font-semibold">
                  <Users className="h-4 w-4" />
                  <span>MODULE 02 • PATIENT IDENTITY & HISTORY</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-midnight">
                  Instant medical history retrieval by Indian phone number.
                </h2>
                <p className="text-sm text-ink leading-relaxed">
                  In India, patients rarely memorize hospital record numbers. ClinicDesk indexes patients by 10-digit mobile number, generating unique tenant-scoped MRNs automatically.
                </p>
                <ul className="space-y-2.5 text-xs text-ink">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                    <span><strong>Allergy & Alert Highlights:</strong> Drug interactions and critical warnings surface before the doctor starts typing.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                    <span><strong>Family & Emergency Contacts:</strong> Capture caregiver details for pediatric and geriatric patients.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                    <span><strong>WhatsApp Consent Tracking:</strong> Compliant opt-in records for automated reminder messaging.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 3: Digital Clinical Notes */}
        <section id="clinical-notes" className="py-16 md:py-24 border-b border-mist scroll-mt-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-teal font-semibold">
                  <FileCheck2 className="h-4 w-4" />
                  <span>MODULE 03 • HIGH-SPEED CONSULTATION NOTES</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-midnight">
                  Complete structured SOAP notes in under 60 seconds.
                </h2>
                <p className="text-sm text-ink leading-relaxed">
                  Doctors should not be forced into cumbersome dropdown menus during a patient consultation. ClinicDesk provides an efficient medical writing pad designed for fast keyboard entry.
                </p>
                <ul className="space-y-2.5 text-xs text-ink">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                    <span><strong>Integrated Vitals Recording:</strong> Systolic/Diastolic BP, Pulse, SpO2, Temp, and BMI calculation.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                    <span><strong>Finalization Locking:</strong> Signed notes are locked against unauthorized alteration for legal protection.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                    <span><strong>Auditable Clinical Amendments:</strong> Any post-consultation correction records author, timestamp, and clinical justification.</span>
                  </li>
                </ul>
              </div>

              {/* UI Preview: Clinical Note Editor */}
              <div className="lg:col-span-6">
                <div className="rounded-xl border border-mist-border bg-white p-6 shadow-elevated space-y-3 font-sans">
                  <div className="flex items-center justify-between pb-3 border-b border-mist">
                    <span className="font-serif font-bold text-midnight text-sm">Consultation Note #CN-881</span>
                    <span className="rounded bg-teal-50 border border-teal-200 px-2 py-0.5 font-mono text-[11px] font-bold text-teal-800">
                      Finalized & Locked
                    </span>
                  </div>

                  <div className="bg-paper p-3 rounded-lg border border-mist grid grid-cols-4 gap-2 text-center text-xs font-mono">
                    <div>
                      <span className="text-ink-muted text-[10px] block">BP</span>
                      <span className="font-bold text-midnight">128/82</span>
                    </div>
                    <div>
                      <span className="text-ink-muted text-[10px] block">Pulse</span>
                      <span className="font-bold text-midnight">74 bpm</span>
                    </div>
                    <div>
                      <span className="text-ink-muted text-[10px] block">SpO2</span>
                      <span className="font-bold text-midnight">99%</span>
                    </div>
                    <div>
                      <span className="text-ink-muted text-[10px] block">BMI</span>
                      <span className="font-bold text-midnight">23.4</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <strong className="text-midnight block">Chief Complaints:</strong>
                      <p className="text-ink">Persistent dry cough for 5 days, low-grade evening fever.</p>
                    </div>
                    <div>
                      <strong className="text-midnight block">Diagnosis:</strong>
                      <p className="text-ink">Acute Bronchitis (J20.9) • No signs of consolidation.</p>
                    </div>
                    <div>
                      <strong className="text-midnight block">Prescription:</strong>
                      <p className="font-mono text-midnight bg-paper p-2 rounded border border-mist text-[11px]">
                        1. Tab. Amoxicillin-Clav 625mg — 1 tab BD x 5 days (After food)<br />
                        2. Syp. Levodropropizine 30mg/5ml — 10ml TDS x 4 days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 4: Reminders Engine */}
        <section id="reminders" className="py-16 md:py-24 border-b border-mist bg-white scroll-mt-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* UI Preview: Message Cards */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="rounded-xl border border-mist-border bg-paper p-6 shadow-elevated space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-mist">
                    <span className="font-mono text-xs font-semibold text-midnight">WhatsApp Multi-Touch Pipeline</span>
                    <span className="text-xs font-mono text-emerald-700 font-bold">100% Delivery Tracked</span>
                  </div>

                  {/* Simulated WhatsApp Bubble */}
                  <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 space-y-2 text-xs text-emerald-950">
                    <div className="flex items-center justify-between text-[11px] text-emerald-800 font-mono">
                      <span>ClinicDesk • Twacha Dermatology</span>
                      <span>Yesterday 11:00 AM</span>
                    </div>
                    <p className="leading-relaxed">
                      "Namaste Meera Ji, this is a reminder for your consultation with <strong>Dr. Ananya Roy</strong> tomorrow at <strong>10:45 AM</strong>. Please reply <strong>1 to Confirm</strong> or <strong>9 to Reschedule</strong>."
                    </p>
                    <div className="pt-2 flex items-center justify-end gap-1 text-[11px] font-mono text-emerald-800">
                      <span>Patient replied: <strong>1 (Confirmed)</strong></span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded border border-mist text-xs text-ink space-y-1">
                    <p className="font-semibold text-midnight">Automated Slot Management:</p>
                    <p className="text-ink-muted text-[11px]">
                      When a patient replies to cancel, the slot is immediately released for waitlisted walk-ins.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-teal font-semibold">
                  <MessageSquare className="h-4 w-4" />
                  <span>MODULE 04 • REMINDERS & PATIENT PIPELINE</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-midnight">
                  WhatsApp, SMS, and Email reminders with instant reply handling.
                </h2>
                <p className="text-sm text-ink leading-relaxed">
                  Patients do not miss appointments out of malice; they simply forget. ClinicDesk dispatches polite, scheduled reminders at 24 hours and 2 hours prior to the slot.
                </p>
                <ul className="space-y-2.5 text-xs text-ink">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                    <span><strong>Real Telecommunication Adapters:</strong> Built on Resend for transactional email and dedicated SMS gateways.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                    <span><strong>Transparent Sandbox Mode:</strong> Testing reminders in demo mode never claims fake telecommunication delivery.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                    <span><strong>Automatic Rescheduling:</strong> Slot status updates to confirmed or cancelled automatically based on patient reply.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 5: Invoicing & Practice Billing */}
        <section id="billing" className="py-16 md:py-24 border-b border-mist scroll-mt-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-teal font-semibold">
                  <Receipt className="h-4 w-4" />
                  <span>MODULE 05 • CLINIC BILLING & RECEIPTS</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-midnight">
                  Itemized GST invoices, UPI reconciliation, and balance tracking.
                </h2>
                <p className="text-sm text-ink leading-relaxed">
                  Front-desk financial tracking does not need a bulky accounting system. ClinicDesk creates clean, printable consultation bills and payment receipts in seconds.
                </p>
                <ul className="space-y-2.5 text-xs text-ink">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                    <span><strong>Multiple Payment Modes:</strong> Record Cash, UPI (Google Pay, PhonePe, Paytm), Card, or Net Banking per invoice.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                    <span><strong>Partial Payments & Balances:</strong> Track outstanding dues without messy paper notes.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                    <span><strong>Printable PDF Receipts:</strong> Clean A4 or thermal receipt formatting ready for patient tax submissions.</span>
                  </li>
                </ul>
              </div>

              {/* UI Preview: Invoice Card */}
              <div className="lg:col-span-6">
                <div className="rounded-xl border border-mist-border bg-white p-6 shadow-elevated font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-mist">
                    <div>
                      <span className="font-serif font-bold text-midnight text-sm block">Invoice #INV-2026-0042</span>
                      <span className="text-[10px] text-ink-muted">Aarogyam Clinic • GSTIN: 27AABCA1234F1Z0</span>
                    </div>
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded text-[11px] font-bold">
                      PAID IN FULL
                    </span>
                  </div>

                  <table className="w-full text-left">
                    <thead className="border-b border-mist text-[10px] text-ink-muted">
                      <tr>
                        <th className="py-1">Description</th>
                        <th className="py-1 text-center">Qty</th>
                        <th className="py-1 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-mist/60 text-[11px]">
                      <tr>
                        <td className="py-2">Consultation — Dr. Rajesh Sharma</td>
                        <td className="py-2 text-center">1</td>
                        <td className="py-2 text-right">₹600.00</td>
                      </tr>
                      <tr>
                        <td className="py-2">ECG 12-Lead Rhythm Strip</td>
                        <td className="py-2 text-center">1</td>
                        <td className="py-2 text-right">₹350.00</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="pt-2 border-t border-mist space-y-1 text-right text-[11px]">
                    <div className="flex justify-between text-ink-muted">
                      <span>Subtotal:</span>
                      <span>₹950.00</span>
                    </div>
                    <div className="flex justify-between font-bold text-midnight text-sm pt-1 border-t border-mist">
                      <span>Total Collected (UPI):</span>
                      <span className="text-teal">₹950.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 6: Multi-Doctor Support */}
        <section id="multi-doctor" className="py-16 md:py-24 border-b border-mist bg-white scroll-mt-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="rounded-xl border border-mist-border bg-paper p-6 shadow-elevated space-y-3 font-sans">
                  <div className="flex items-center justify-between pb-3 border-b border-mist">
                    <span className="font-serif font-bold text-midnight text-sm">Practice Staff & Permissions</span>
                    <span className="font-mono text-xs text-teal font-semibold">4 Active Users</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded bg-white border border-mist">
                      <div>
                        <p className="font-semibold text-midnight">Dr. Sunita Patel (Clinic Owner)</p>
                        <p className="text-ink-muted text-[11px]">Full access to clinical notes, billing, settings</p>
                      </div>
                      <span className="font-mono text-[10px] bg-midnight text-paper px-2 py-0.5 rounded">OWNER</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded bg-white border border-mist">
                      <div>
                        <p className="font-semibold text-midnight">Dr. Vikramaditya Joshi (Consultant)</p>
                        <p className="text-ink-muted text-[11px]">Access to assigned patient notes & queue</p>
                      </div>
                      <span className="font-mono text-[10px] bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded">DOCTOR</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded bg-white border border-mist">
                      <div>
                        <p className="font-semibold text-midnight">Pooja Sharma (Front Desk Head)</p>
                        <p className="text-ink-muted text-[11px]">Appointments, registration, invoices (no medical notes)</p>
                      </div>
                      <span className="font-mono text-[10px] bg-paper text-ink border border-mist-border px-2 py-0.5 rounded">RECEPTIONIST</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-teal font-semibold">
                  <Layers className="h-4 w-4" />
                  <span>MODULE 06 • MULTI-DOCTOR COLLABORATION</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-midnight">
                  Seamless multi-room scheduling with strict clinical boundaries.
                </h2>
                <p className="text-sm text-ink leading-relaxed">
                  Whether your clinic has two consulting rooms or five doctors running morning and evening shifts, ClinicDesk keeps calendars synchronized while maintaining strict privacy boundaries.
                </p>
                <ul className="space-y-2.5 text-xs text-ink">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                    <span><strong>Staff Roles:</strong> Clinic Owner, Visiting Doctor, and Receptionist roles with fine-grained permissions.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                    <span><strong>Clinical Privacy:</strong> Receptionists can manage queues and take billing without seeing private medical diagnoses.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                    <span><strong>Cross-Doctor Transfers:</strong> Hand off a patient to a visiting specialist within the same clinic record.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-16 bg-paper">
          <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
            <h2 className="font-serif text-3xl font-normal text-midnight">
              Ready to see ClinicDesk in action?
            </h2>
            <p className="text-sm text-ink max-w-lg mx-auto">
              Test every workflow in our interactive sandbox or book a guided demonstration with our team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-lg bg-midnight px-6 py-3 text-sm font-semibold text-paper hover:bg-midnight-800 transition-colors shadow-editorial"
              >
                <span>Launch Interactive Demo</span>
                <ArrowRight className="h-4 w-4 text-teal" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-lg border border-mist-border bg-white px-5 py-3 text-sm font-medium text-midnight hover:bg-mist transition-colors"
              >
                <span>View Subscription Plans</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
