import React from "react";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  ShieldCheck, 
  TrendingDown, 
  FileText, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  MessageSquare,
  Receipt,
  Lock,
  ChevronRight,
  AlertTriangle,
  FileCheck2,
  PhoneCall,
  Activity
} from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { RevenueCalculator } from "@/components/marketing/revenue-calculator";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-midnight selection:bg-teal-200 selection:text-midnight">
      {/* Top Banner: Verification & India Outpatient Focus */}
      <div className="border-b border-midnight-800 bg-midnight px-4 py-2 text-center text-xs text-mist">
        <div className="mx-auto max-w-7xl flex items-center justify-center gap-2 font-mono">
          <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
          <span>CLINICDESK: BUILT SPECIFICALLY FOR INDEPENDENT INDIAN PRACTICES (1–5 DOCTORS)</span>
        </div>
      </div>

      {/* Section 1: Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Section 2: Hero */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-mist">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Editorial Value Proposition */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-mist-border bg-white px-3.5 py-1 text-xs text-ink shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-teal" />
                  <span className="font-medium">A practice-management engine for Indian outpatient care</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.12] tracking-tight text-midnight">
                  Your clinic deserves better than a <span className="italic text-teal">paper register.</span>
                </h1>

                <p className="max-w-xl text-lg text-ink leading-relaxed">
                  Appointments, patient records, reminders and billing — all in one simple workspace built for independent clinics.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-2 rounded-lg bg-midnight px-6 py-3.5 text-base font-semibold text-paper hover:bg-midnight-800 transition-all shadow-editorial"
                  >
                    <span>Explore the Product</span>
                    <ArrowRight className="h-4 w-4 text-teal" />
                  </Link>
                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center gap-2 rounded-lg border border-mist-border bg-white px-5 py-3.5 text-base font-medium text-midnight hover:bg-mist transition-all"
                  >
                    <span>See How It Works</span>
                  </Link>
                </div>

                {/* Assurance Indicators */}
                <div className="pt-6 border-t border-mist grid grid-cols-3 gap-4 text-xs text-ink-muted">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-teal flex-shrink-0" />
                    <span>PostgreSQL RLS Tenant Isolation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-teal flex-shrink-0" />
                    <span>&lt; 60s Doctor Consultation Note</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                    <span>GST Billing & Printable Invoices</span>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Fidelity Application Workspace Preview */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-mist-border bg-white p-6 shadow-elevated relative">
                  {/* Mock Window Controls & Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-mist">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-coral/60" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
                        <span className="h-2.5 w-2.5 rounded-full bg-teal/60" />
                      </div>
                      <span className="font-mono text-xs text-ink-muted pl-2">ClinicDesk OPD Workspace</span>
                    </div>
                    <span className="rounded-full bg-teal-50 border border-teal-200 px-2.5 py-0.5 text-[11px] font-mono font-medium text-teal-800">
                      Live Queue • Token #04
                    </span>
                  </div>

                  {/* Doctor Schedule Information */}
                  <div className="mt-4 flex items-center justify-between bg-paper p-3 rounded-lg border border-mist">
                    <div>
                      <p className="font-serif text-sm font-bold text-midnight">Dr. Rajesh Sharma, MD</p>
                      <p className="text-xs text-ink-muted">General Medicine • OPD Shift 09:30 – 13:30</p>
                    </div>
                    <div className="text-right font-mono text-xs text-midnight">
                      <span className="text-teal font-bold">18</span> / 22 slots booked
                    </div>
                  </div>

                  {/* Live Queue Cards */}
                  <div className="mt-4 space-y-2.5 font-sans">
                    {/* Item 1: In Consultation */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-teal-50/70 border border-teal-200">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-midnight bg-white px-2 py-1 rounded border border-mist-border">
                          #04
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-midnight">Sunita Verma (42 F)</p>
                          <p className="text-xs text-ink-muted">MRN-2026-089 • Follow-up HTN</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-teal-600 text-white font-mono">
                        In Doctor Cabin
                      </span>
                    </div>

                    {/* Item 2: Checked In */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-mist">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-ink-muted bg-paper px-2 py-1 rounded border border-mist-border">
                          #05
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-midnight">Amitabh Sengupta (58 M)</p>
                          <p className="text-xs text-ink-muted">WhatsApp Confirmed @ 08:45 AM</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        In Waiting Lounge
                      </span>
                    </div>

                    {/* Item 3: Confirmed via SMS */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-mist">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-ink-muted bg-paper px-2 py-1 rounded border border-mist-border">
                          #06
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-midnight">Meera Kulkarni (29 F)</p>
                          <p className="text-xs text-ink-muted">SMS Reminder Delivered (24h prior)</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                        En Route
                      </span>
                    </div>
                  </div>

                  {/* Attendance Performance Card */}
                  <div className="mt-4 rounded-xl bg-midnight p-4 text-paper">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-teal uppercase tracking-wider font-semibold">
                        Attendance Performance (30 Days)
                      </span>
                      <span className="font-mono text-midnight-300">N = 412 Slots</span>
                    </div>
                    <div className="mt-2 flex items-baseline justify-between">
                      <div>
                        <div className="font-serif text-3xl font-bold text-white">24.2% → 8.8%</div>
                        <p className="text-xs text-midnight-200">No-Show Rate Post-Reminders</p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-xl font-bold text-teal">₹42,600</span>
                        <p className="text-[11px] text-midnight-300">Est. Practice Upside</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Honest Trust Positioning */}
        <section className="bg-white py-12 border-b border-mist">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-xl border border-mist-border bg-paper p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal">
                  Honest Healthcare Architecture
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-midnight">
                  Engineered exclusively for independent Indian outpatient clinics.
                </h3>
                <p className="text-sm text-ink max-w-2xl leading-relaxed">
                  We don't sell to massive hospital conglomerates or invent celebrity doctor endorsements. ClinicDesk is built for solo consultants, pediatricians, dentists, and polyclinics running 1 to 5 consulting rooms.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <div className="rounded-lg bg-white border border-mist-border px-4 py-3 text-center">
                  <p className="font-mono text-xl font-bold text-midnight">1 – 5</p>
                  <p className="text-xs text-ink-muted">Doctor practices</p>
                </div>
                <div className="rounded-lg bg-white border border-mist-border px-4 py-3 text-center">
                  <p className="font-mono text-xl font-bold text-teal">100%</p>
                  <p className="text-xs text-ink-muted">Tenant RLS isolated</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: The 3 Real Clinical Pain Points */}
        <section className="py-20 bg-paper border-b border-mist">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl space-y-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal">
                The Independent Practice Challenge
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-midnight">
                Three friction points quietly eroding outpatient clinics every morning.
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Problem 1: Missed Appointments */}
              <div className="rounded-xl border border-mist-border bg-white p-7 shadow-editorial space-y-4">
                <div className="h-10 w-10 rounded-lg bg-coral-50 border border-coral-200 flex items-center justify-center text-coral">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-midnight">
                  Missed Appointments & Idle Doctors
                </h3>
                <p className="text-sm text-ink leading-relaxed">
                  In urban Indian clinics, 20% to 30% of scheduled patients never show up. The doctor sits idle while walk-in patients endure frustrating wait times. Without multi-channel reminders, empty slots permanently destroy daily clinic revenue.
                </p>
                <div className="pt-2 font-mono text-xs text-coral font-medium">
                  → Average loss: ₹35,000 to ₹70,000/doctor/month
                </div>
              </div>

              {/* Problem 2: Scattered Patient Records */}
              <div className="rounded-xl border border-mist-border bg-white p-7 shadow-editorial space-y-4">
                <div className="h-10 w-10 rounded-lg bg-midnight-50 border border-midnight-200 flex items-center justify-center text-midnight">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-midnight">
                  Scattered Paper Files & Lost Medical History
                </h3>
                <p className="text-sm text-ink leading-relaxed">
                  Paper prescription slips get lost by patients. Previous blood reports, medication allergies, and chronic dosage histories are absent when the patient returns six months later, forcing repeated clinical guesswork.
                </p>
                <div className="pt-2 font-mono text-xs text-ink font-medium">
                  → Fragmented longitudinal care & compliance risks
                </div>
              </div>

              {/* Problem 3: Manual Clinic Administration */}
              <div className="rounded-xl border border-mist-border bg-white p-7 shadow-editorial space-y-4">
                <div className="h-10 w-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal">
                  <Receipt className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-midnight">
                  Manual Desk Chaos & Uncollected Fees
                </h3>
                <p className="text-sm text-ink leading-relaxed">
                  Receptionists manually juggle phone calls, paper registers, cash envelopes, and handwritten bills. At the end of the day, reconciling UPI transactions against doctors' consultation counts takes over an hour of tedious accounting.
                </p>
                <div className="pt-2 font-mono text-xs text-teal-800 font-medium">
                  → Receptionist burnout & untracked patient balances
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Core Product Capabilities */}
        <section className="py-20 bg-white border-b border-mist">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl space-y-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal">
                  Comprehensive Clinical Workspace
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-midnight">
                  Six foundational modules. Zero unnecessary clutter.
                </h2>
              </div>
              <Link
                href="/features"
                className="inline-flex items-center gap-1.5 font-medium text-sm text-teal hover:text-teal-700 transition-colors"
              >
                <span>Read detailed feature specifications</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Capability 1 */}
              <Link 
                href="/features#scheduling" 
                className="group rounded-xl border border-mist-border bg-paper p-6 hover:border-teal hover:shadow-editorial transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-midnight text-teal flex items-center justify-center">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <ChevronRight className="h-4 w-4 text-ink-muted group-hover:text-teal group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-serif text-lg font-bold text-midnight mb-2">
                  Smart Appointment Scheduling
                </h3>
                <p className="text-sm text-ink leading-relaxed">
                  Doctor-specific slot durations, token queue generation, walk-in emergency prioritization, and database concurrency locks against double-bookings.
                </p>
              </Link>

              {/* Capability 2 */}
              <Link 
                href="/features#records" 
                className="group rounded-xl border border-mist-border bg-paper p-6 hover:border-teal hover:shadow-editorial transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-midnight text-teal flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <ChevronRight className="h-4 w-4 text-ink-muted group-hover:text-teal group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-serif text-lg font-bold text-midnight mb-2">
                  Digital Patient Registry
                </h3>
                <p className="text-sm text-ink leading-relaxed">
                  Sub-second mobile number search, tenant-scoped Medical Record Numbers (MRN), allergy tags, past surgeries, and chronological visit history.
                </p>
              </Link>

              {/* Capability 3 */}
              <Link 
                href="/features#clinical-notes" 
                className="group rounded-xl border border-mist-border bg-paper p-6 hover:border-teal hover:shadow-editorial transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-midnight text-teal flex items-center justify-center">
                    <FileCheck2 className="h-5 w-5" />
                  </div>
                  <ChevronRight className="h-4 w-4 text-ink-muted group-hover:text-teal group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-serif text-lg font-bold text-midnight mb-2">
                  Sub-60s Clinical Notes
                </h3>
                <p className="text-sm text-ink leading-relaxed">
                  High-speed consultation documentation with chief complaints, vitals, diagnosis, structured prescriptions, finalization locks, and auditable amendments.
                </p>
              </Link>

              {/* Capability 4 */}
              <Link 
                href="/features#reminders" 
                className="group rounded-xl border border-mist-border bg-paper p-6 hover:border-teal hover:shadow-editorial transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-midnight text-teal flex items-center justify-center">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <ChevronRight className="h-4 w-4 text-ink-muted group-hover:text-teal group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-serif text-lg font-bold text-midnight mb-2">
                  Automated Multi-Touch Reminders
                </h3>
                <p className="text-sm text-ink leading-relaxed">
                  Scheduled 24-hour and 2-hour notifications via WhatsApp, SMS, and Resend email with interactive confirmation and cancellation webhooks.
                </p>
              </Link>

              {/* Capability 5 */}
              <Link 
                href="/features#billing" 
                className="group rounded-xl border border-mist-border bg-paper p-6 hover:border-teal hover:shadow-editorial transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-midnight text-teal flex items-center justify-center">
                    <Receipt className="h-5 w-5" />
                  </div>
                  <ChevronRight className="h-4 w-4 text-ink-muted group-hover:text-teal group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-serif text-lg font-bold text-midnight mb-2">
                  Practice Billing & GST Invoices
                </h3>
                <p className="text-sm text-ink leading-relaxed">
                  Itemized consultation bills, procedure fees, discount controls, multi-mode payments (Cash, UPI, Card), outstanding balances, and printable receipts.
                </p>
              </Link>

              {/* Capability 6 */}
              <Link 
                href="/no-show-report" 
                className="group rounded-xl border border-teal-300 bg-teal-50/40 p-6 hover:border-teal hover:shadow-editorial transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-teal text-white flex items-center justify-center">
                    <TrendingDown className="h-5 w-5" />
                  </div>
                  <span className="rounded bg-teal px-2 py-0.5 text-[10px] font-mono font-bold text-white uppercase">
                    Signature
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-midnight mb-2">
                  No-Show Intelligence Report
                </h3>
                <p className="text-sm text-ink leading-relaxed">
                  Mathematically rigorous before/after attendance reporting, transparent denominator definitions, and honest practice revenue recovery projections.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 6: Signature Feature Spotlight & Interactive Calculator */}
        <section className="py-20 bg-paper border-b border-mist">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl space-y-4 mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-xs text-teal-800">
                <TrendingDown className="h-3.5 w-3.5 text-teal" />
                <span>SIGNATURE PRACTICE ANALYTICS</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-midnight leading-tight">
                Know what missed appointments are costing your clinic.
              </h2>
              <p className="text-base text-ink leading-relaxed">
                Most software treats missed appointments as an unavoidable mystery. ClinicDesk tracks exact attendance trends before and after automated reminders, isolating operational impact without making unscientific causal claims.
              </p>
            </div>

            {/* Embedded Live Revenue Calculator */}
            <RevenueCalculator className="mb-12" />

            <div className="text-center">
              <Link
                href="/no-show-report"
                className="inline-flex items-center gap-2 text-sm font-semibold text-midnight hover:text-teal transition-colors underline decoration-teal underline-offset-4"
              >
                <span>Read the complete No-Show mathematical methodology & audit documentation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Section 7: Complete Clinic Workflow Sequence */}
        <section className="py-20 bg-white border-b border-mist">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal">
                Daily Clinic Operational Flow
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-midnight">
                From morning booking to evening revenue reconciliation.
              </h2>
              <p className="text-sm text-ink">
                How ClinicDesk orchestrates a typical outpatient shift without friction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Step 1 */}
              <div className="rounded-xl border border-mist-border bg-paper p-5 relative">
                <span className="font-mono text-xs font-bold text-teal bg-white px-2 py-0.5 rounded border border-mist-border">
                  01
                </span>
                <h4 className="mt-3 font-serif text-base font-bold text-midnight">Booking</h4>
                <p className="mt-1 text-xs text-ink leading-relaxed">
                  Receptionist logs walk-in or phone call in under 15 seconds.
                </p>
              </div>

              {/* Step 2 */}
              <div className="rounded-xl border border-mist-border bg-paper p-5 relative">
                <span className="font-mono text-xs font-bold text-teal bg-white px-2 py-0.5 rounded border border-mist-border">
                  02
                </span>
                <h4 className="mt-3 font-serif text-base font-bold text-midnight">Reminder</h4>
                <p className="mt-1 text-xs text-ink leading-relaxed">
                  Automated WhatsApp & SMS sent 24h & 2h before the slot.
                </p>
              </div>

              {/* Step 3 */}
              <div className="rounded-xl border border-mist-border bg-paper p-5 relative">
                <span className="font-mono text-xs font-bold text-teal bg-white px-2 py-0.5 rounded border border-mist-border">
                  03
                </span>
                <h4 className="mt-3 font-serif text-base font-bold text-midnight">Confirmation</h4>
                <p className="mt-1 text-xs text-ink leading-relaxed">
                  Patient replies "1" to confirm or "9" to free up the slot.
                </p>
              </div>

              {/* Step 4 */}
              <div className="rounded-xl border border-mist-border bg-paper p-5 relative">
                <span className="font-mono text-xs font-bold text-teal bg-white px-2 py-0.5 rounded border border-mist-border">
                  04
                </span>
                <h4 className="mt-3 font-serif text-base font-bold text-midnight">Consultation</h4>
                <p className="mt-1 text-xs text-ink leading-relaxed">
                  Doctor writes SOAP note, reviews history, and prescribes.
                </p>
              </div>

              {/* Step 5 */}
              <div className="rounded-xl border border-mist-border bg-paper p-5 relative">
                <span className="font-mono text-xs font-bold text-teal bg-white px-2 py-0.5 rounded border border-mist-border">
                  05
                </span>
                <h4 className="mt-3 font-serif text-base font-bold text-midnight">Invoice</h4>
                <p className="mt-1 text-xs text-ink leading-relaxed">
                  Instant GST bill generated; UPI or Cash collected at desk.
                </p>
              </div>

              {/* Step 6 */}
              <div className="rounded-xl border border-mist-border bg-paper p-5 relative">
                <span className="font-mono text-xs font-bold text-teal bg-white px-2 py-0.5 rounded border border-mist-border">
                  06
                </span>
                <h4 className="mt-3 font-serif text-base font-bold text-midnight">Analytics</h4>
                <p className="mt-1 text-xs text-ink leading-relaxed">
                  No-show and revenue metrics update across practice ledgers.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-midnight hover:text-teal transition-colors"
              >
                <span>Follow a full clinic day scenario</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Section 8: Honest Security Architecture */}
        <section className="py-20 bg-midnight text-paper border-b border-midnight-800">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-midnight-800 border border-midnight-700 px-3 py-1 font-mono text-xs text-teal">
                  <Lock className="h-3.5 w-3.5" />
                  <span>DATA PRIVACY & TECHNICAL ENFORCEMENT</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
                  PostgreSQL Row-Level Security: Records never cross clinic boundaries.
                </h2>

                <p className="text-midnight-200 text-sm leading-relaxed">
                  In healthcare SaaS, relying on application-level filtering (`where: clinicId`) is dangerous. One omitted parameter exposes patient diagnoses. ClinicDesk enforces isolation inside the database engine itself via PostgreSQL RLS policies.
                </p>

                <div className="space-y-3 pt-2 text-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-teal mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Transaction-scoped Tenant Context:</strong> Session variables ensure queries run strictly under the authenticated clinic tenant.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-teal mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Role-Based Access Control (RBAC):</strong> Receptionists can never view sensitive clinical examination notes.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-teal mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Tamper-Evident Medical Audit Logs:</strong> Amendments to finalized consultation records are versioned and logged.
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/security"
                    className="inline-flex items-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-sm font-semibold text-midnight hover:bg-teal-400 transition-colors"
                  >
                    <span>Read Technical Security Architecture</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-xl border border-midnight-700 bg-midnight-950 p-6 font-mono text-xs text-midnight-200 space-y-3 shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-midnight-800 text-midnight-400">
                    <span>rls-policies.sql [Active Database Migration]</span>
                    <span className="text-teal font-bold">VERIFIED</span>
                  </div>
                  <pre className="overflow-x-auto text-[11px] text-midnight-300 leading-relaxed">
{`-- Enforce strict database tenant boundary
ALTER TABLE "Patient" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Patient" FORCE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_patient ON "Patient"
  AS RESTRICTIVE
  FOR ALL
  USING (clinic_id = current_clinic_id())
  WITH CHECK (clinic_id = current_clinic_id());

-- Clinical notes restricted from front-desk staff
CREATE POLICY clinical_notes_rbac ON "ClinicalNote"
  FOR ALL
  USING (
    clinic_id = current_clinic_id() 
    AND current_membership_role() IN ('DOCTOR', 'OWNER')
  );`}
                  </pre>
                  <p className="text-[10px] text-midnight-400 pt-2 border-t border-midnight-800">
                    * Tested against SQL injection & cross-tenant query bypass.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Pricing Preview */}
        <section className="py-20 bg-white border-b border-mist">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal">
                Transparent Clinic Subscription Tiers
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-midnight">
                Simple plans. No per-patient gouging.
              </h2>
              <p className="text-sm text-ink">
                Pricing designed for independent practices. Keep prices predictable as patient volume grows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Starter Plan */}
              <div className="rounded-xl border border-mist-border bg-paper p-8 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs uppercase font-bold text-ink-muted">Solo Practice</span>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-midnight">Starter</h3>
                  <p className="mt-1 text-xs text-ink-muted">Ideal for independent solo doctors starting digital practice.</p>

                  <div className="mt-6 pb-6 border-b border-mist">
                    <span className="font-mono text-3xl font-bold text-midnight">₹1,499</span>
                    <span className="text-xs text-ink-muted"> / month</span>
                    <p className="text-[11px] text-ink-muted mt-0.5">Configurable launch pricing</p>
                  </div>

                  <ul className="mt-6 space-y-3 text-xs text-ink">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>1 Doctor Seat + 1 Receptionist</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>Appointment Calendar & Queue</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>Digital Patient Records & History</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>Digital Consultation Notes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>Email Reminders (Resend)</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <Link
                    href="/demo"
                    className="w-full inline-flex items-center justify-center rounded-lg border border-mist-border bg-white py-2.5 text-xs font-semibold text-midnight hover:bg-mist transition-colors"
                  >
                    Explore Starter
                  </Link>
                </div>
              </div>

              {/* Clinic Plan (Featured) */}
              <div className="rounded-xl border-2 border-teal bg-white p-8 shadow-elevated flex flex-col justify-between relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                  Most Popular for OPD Clinics
                </span>

                <div>
                  <span className="font-mono text-xs uppercase font-bold text-teal">Full Practice</span>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-midnight">Clinic</h3>
                  <p className="mt-1 text-xs text-ink-muted">Complete automation, WhatsApp reminders, and billing.</p>

                  <div className="mt-6 pb-6 border-b border-mist">
                    <span className="font-mono text-3xl font-bold text-midnight">₹2,999</span>
                    <span className="text-xs text-ink-muted"> / month</span>
                    <p className="text-[11px] text-ink-muted mt-0.5">Configurable launch pricing</p>
                  </div>

                  <ul className="mt-6 space-y-3 text-xs text-ink">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>Up to 2 Doctor Seats + 2 Receptionists</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span><strong>Automated WhatsApp & SMS Reminders</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>GST Invoicing & Multi-mode Payments</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span><strong>Signature No-Show Intelligence Report</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>Patient WhatsApp Confirmation Pipeline</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <Link
                    href="/demo"
                    className="w-full inline-flex items-center justify-center rounded-lg bg-midnight py-2.5 text-xs font-semibold text-paper hover:bg-midnight-800 transition-colors shadow-sm"
                  >
                    Select Clinic Plan
                  </Link>
                </div>
              </div>

              {/* Multi-Doctor Plan */}
              <div className="rounded-xl border border-mist-border bg-paper p-8 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs uppercase font-bold text-ink-muted">Polyclinic</span>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-midnight">Multi-Doctor</h3>
                  <p className="mt-1 text-xs text-ink-muted">For multi-speciality polyclinics with 3 to 5 doctors.</p>

                  <div className="mt-6 pb-6 border-b border-mist">
                    <span className="font-mono text-3xl font-bold text-midnight">₹4,999</span>
                    <span className="text-xs text-ink-muted"> / month</span>
                    <p className="text-[11px] text-ink-muted mt-0.5">Configurable launch pricing</p>
                  </div>

                  <ul className="mt-6 space-y-3 text-xs text-ink">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>Up to 5 Doctor Seats + Unlimited Front Desk</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>Multi-Doctor Availability & Cross-Calendars</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>Advanced Practice Revenue Analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>Custom Letterhead & Digital Prescription Pad</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>Priority Support & Assisted Data Migration</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center rounded-lg border border-mist-border bg-white py-2.5 text-xs font-semibold text-midnight hover:bg-mist transition-colors"
                  >
                    Inquire for Multi-Doctor
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-teal transition-colors"
              >
                <span>View full plan comparison table and FAQs</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Section 10: Final Editorial CTA */}
        <section className="py-20 bg-paper">
          <div className="mx-auto max-w-5xl px-6">
            <div className="rounded-2xl bg-midnight text-paper p-8 sm:p-12 text-center relative overflow-hidden shadow-elevated">
              <div className="max-w-2xl mx-auto space-y-4 relative z-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-midnight-800 px-3 py-1 font-mono text-xs text-teal">
                  <Sparkles className="h-3 w-3" />
                  <span>TRANSFORM YOUR OUTPATIENT DESK</span>
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight">
                  Spend less time managing appointments. <br />
                  <span className="italic text-teal">More time caring for patients.</span>
                </h2>
                <p className="text-sm text-midnight-200 max-w-xl mx-auto leading-relaxed">
                  Join independent Indian medical practitioners who have transformed empty slots and chaotic waiting lounges into efficient, verifiable outpatient care.
                </p>
                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-2 rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-midnight hover:bg-teal-400 transition-colors shadow-sm"
                  >
                    <span>Book a Guided Demo</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-lg border border-midnight-700 bg-midnight-800 px-5 py-3 text-sm font-medium text-paper hover:bg-midnight-700 transition-colors"
                  >
                    <span>Contact Clinical Team</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
