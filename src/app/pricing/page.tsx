"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  X, 
  ArrowRight, 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  Calendar,
  MessageSquare,
  FileCheck2,
  Receipt,
  TrendingDown
} from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

const COMPARISON_ROWS = [
  { feature: "Doctor Consulting Rooms / Seats", starter: "1 Doctor", clinic: "Up to 2 Doctors", multi: "Up to 5 Doctors" },
  { feature: "Receptionist / Front Desk Accounts", starter: "1 Account", clinic: "2 Accounts", multi: "Unlimited Accounts" },
  { feature: "Daily Token Queue & Walk-In Scheduling", starter: true, clinic: true, multi: true },
  { feature: "Digital Patient Registry (MRN & History)", starter: true, clinic: true, multi: true },
  { feature: "Sub-minute Clinical Notes & Vitals", starter: true, clinic: true, multi: true },
  { feature: "Automated Email Reminders (Resend)", starter: true, clinic: true, multi: true },
  { feature: "Automated WhatsApp & SMS Reminders", starter: false, clinic: true, multi: true },
  { feature: "Patient WhatsApp Reply & Confirmation Engine", starter: false, clinic: true, multi: true },
  { feature: "GST Consultation Invoicing & Payment Ledger", starter: false, clinic: true, multi: true },
  { feature: "Signature No-Show Intelligence Analytics", starter: false, clinic: true, multi: true },
  { feature: "Multi-Doctor Shared Calendars & Availability", starter: false, clinic: false, multi: true },
  { feature: "Role-Based Access (Doctor vs Receptionist Privacy)", starter: false, clinic: true, multi: true },
  { feature: "Custom Digital Prescription Letterhead", starter: false, clinic: true, multi: true },
  { feature: "Dedicated Assisted Data Onboarding", starter: false, clinic: false, multi: true },
];

const FAQS = [
  {
    q: "Are these final fixed subscription prices?",
    a: "These figures represent our current configurable pilot pricing for independent Indian practices. Final subscription billing will be integrated with Razorpay test mode during Phase 6 without any surprise price hikes.",
  },
  {
    q: "Is there a per-patient or per-consultation transaction fee?",
    a: "No. ClinicDesk charges a simple monthly practice subscription. We believe charging per-patient penalizes growing practices and discourages complete digital record keeping.",
  },
  {
    q: "What hardware does the clinic require to run ClinicDesk?",
    a: "Any modern web browser on a laptop, desktop PC, iPad, or tablet. No expensive server installations, local database backups, or dedicated IT hardware are needed.",
  },
  {
    q: "Who owns the clinical and patient data?",
    a: "Your clinic owns 100% of all patient records and consultation notes. You can export your patient registry and financial ledgers at any time in standard CSV format.",
  },
  {
    q: "Can receptionists see private doctor clinical notes?",
    a: "No. ClinicDesk strictly enforces Role-Based Access Control (RBAC). Front desk receptionists can manage tokens, schedule slots, and collect fees, but are forbidden from viewing doctor examination and diagnostic notes.",
  },
  {
    q: "How does the WhatsApp reminder integration work?",
    a: "ClinicDesk integrates with official WhatsApp Business API gateways. Reminders are dispatched automatically 24h and 2h before the slot, allowing patients to confirm or cancel with a single tap.",
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="flex min-h-screen flex-col bg-paper text-midnight">
      <Navbar />

      <main className="flex-1">
        {/* Editorial Header */}
        <section className="pt-16 pb-12 md:pt-20 md:pb-16 border-b border-mist bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-xs text-teal-800">
                <Sparkles className="h-3.5 w-3.5 text-teal" />
                <span>SIMPLE, PREDICTABLE CLINIC PLANS</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-normal text-midnight leading-tight">
                Subscription pricing for independent clinics.
              </h1>
              <p className="text-lg text-ink leading-relaxed">
                Choose the right plan for your doctor count. No hidden fees, no per-patient surcharges, and zero locked-in long-term contracts.
              </p>

              {/* Billing Cycle Selector */}
              <div className="pt-2 flex items-center gap-3 text-xs font-mono">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`rounded-lg px-3.5 py-1.5 transition-colors ${
                    billingCycle === "monthly" 
                      ? "bg-midnight text-paper font-bold" 
                      : "bg-paper text-ink hover:bg-mist"
                  }`}
                >
                  Monthly Billing
                </button>
                <button
                  onClick={() => setBillingCycle("annual")}
                  className={`rounded-lg px-3.5 py-1.5 transition-colors flex items-center gap-1.5 ${
                    billingCycle === "annual" 
                      ? "bg-midnight text-paper font-bold" 
                      : "bg-paper text-ink hover:bg-mist"
                  }`}
                >
                  <span>Annual Billing</span>
                  <span className="rounded bg-teal px-1.5 py-0.2 text-[10px] text-midnight font-bold">Save 15%</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards Grid */}
        <section className="py-16 md:py-20 border-b border-mist bg-paper">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Plan 1: Starter */}
              <div className="rounded-xl border border-mist-border bg-white p-8 shadow-editorial flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs uppercase font-bold text-ink-muted">Single Doctor OPD</span>
                  <h3 className="mt-2 font-serif text-3xl font-bold text-midnight">Starter</h3>
                  <p className="mt-2 text-xs text-ink-muted">
                    Perfect for solo general practitioners and visiting consultants.
                  </p>

                  <div className="mt-6 pb-6 border-b border-mist">
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-4xl font-bold text-midnight">
                        {billingCycle === "monthly" ? "₹1,499" : "₹1,275"}
                      </span>
                      <span className="text-xs text-ink-muted"> / month</span>
                    </div>
                    <p className="text-[11px] text-ink-muted mt-1">Billed {billingCycle}</p>
                  </div>

                  <ul className="mt-6 space-y-3 text-xs text-ink">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>1 Doctor Seat + 1 Front Desk Account</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>Daily OPD Token Queue & Calendar</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>Digital Patient Records (MRN & History)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>Sub-minute Clinical Notes & Vitals</span>
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
                    className="w-full inline-flex items-center justify-center rounded-lg border border-mist-border bg-paper py-3 text-xs font-semibold text-midnight hover:bg-mist transition-colors"
                  >
                    Explore Starter in Demo
                  </Link>
                </div>
              </div>

              {/* Plan 2: Clinic (Featured) */}
              <div className="rounded-xl border-2 border-teal bg-white p-8 shadow-elevated flex flex-col justify-between relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal px-3.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                  Recommended for Outpatient Clinics
                </span>

                <div>
                  <span className="font-mono text-xs uppercase font-bold text-teal">Complete Automation</span>
                  <h3 className="mt-2 font-serif text-3xl font-bold text-midnight">Clinic</h3>
                  <p className="mt-2 text-xs text-ink-muted">
                    For 1–2 doctor practices wanting automated WhatsApp reminders and GST billing.
                  </p>

                  <div className="mt-6 pb-6 border-b border-mist">
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-4xl font-bold text-midnight">
                        {billingCycle === "monthly" ? "₹2,999" : "₹2,549"}
                      </span>
                      <span className="text-xs text-ink-muted"> / month</span>
                    </div>
                    <p className="text-[11px] text-ink-muted mt-1">Billed {billingCycle}</p>
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
                      <span><strong>Interactive WhatsApp Confirmation Pipeline</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>GST Invoicing & Multi-mode Payment Ledger</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span><strong>Signature No-Show Intelligence Report</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>Role-Based Access (Doctor vs Front Desk)</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <Link
                    href="/demo"
                    className="w-full inline-flex items-center justify-center rounded-lg bg-midnight py-3 text-xs font-semibold text-paper hover:bg-midnight-800 transition-colors shadow-sm"
                  >
                    <span>Launch Clinic Plan Preview</span>
                    <ArrowRight className="h-3.5 w-3.5 text-teal ml-1.5" />
                  </Link>
                </div>
              </div>

              {/* Plan 3: Multi-Doctor */}
              <div className="rounded-xl border border-mist-border bg-white p-8 shadow-editorial flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs uppercase font-bold text-ink-muted">Growing Polyclinic</span>
                  <h3 className="mt-2 font-serif text-3xl font-bold text-midnight">Multi-Doctor</h3>
                  <p className="mt-2 text-xs text-ink-muted">
                    For multi-speciality clinics with 3 to 5 doctors and shifting rosters.
                  </p>

                  <div className="mt-6 pb-6 border-b border-mist">
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-4xl font-bold text-midnight">
                        {billingCycle === "monthly" ? "₹4,999" : "₹4,249"}
                      </span>
                      <span className="text-xs text-ink-muted"> / month</span>
                    </div>
                    <p className="text-[11px] text-ink-muted mt-1">Billed {billingCycle}</p>
                  </div>

                  <ul className="mt-6 space-y-3 text-xs text-ink">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>Up to 5 Doctor Seats + Unlimited Front Desk</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>Multi-Doctor Roster & Availability Calendars</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>All Clinic Plan WhatsApp & Billing Features</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>Cross-Doctor Patient Hand-Offs</span>
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
                    className="w-full inline-flex items-center justify-center rounded-lg border border-mist-border bg-paper py-3 text-xs font-semibold text-midnight hover:bg-mist transition-colors"
                  >
                    Inquire for Polyclinic
                  </Link>
                </div>
              </div>
            </div>

            {/* Note regarding Phase 6 checkout integration */}
            <div className="mt-8 rounded-lg border border-mist-border bg-paper p-4 text-center text-xs text-ink-muted">
              <span className="font-mono text-teal font-semibold">Note on Subscription Activation:</span> Live subscription checkout will be integrated with Razorpay test mode during Phase 6. All prices shown are transparent development placeholders.
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-16 md:py-24 border-b border-mist bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl space-y-3 mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal">
                Detailed Matrix
              </span>
              <h2 className="font-serif text-3xl font-normal text-midnight">
                Compare features across all three tiers.
              </h2>
            </div>

            <div className="rounded-xl border border-mist-border overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-mist bg-paper text-xs font-mono text-midnight">
                    <th className="py-4 px-6 font-semibold">Clinical Feature</th>
                    <th className="py-4 px-4 font-semibold text-center">Starter</th>
                    <th className="py-4 px-4 font-semibold text-center bg-teal-50/50 text-teal-900">Clinic</th>
                    <th className="py-4 px-4 font-semibold text-center">Multi-Doctor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-mist text-xs">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.feature} className="hover:bg-paper/50 transition-colors">
                      <td className="py-3.5 px-6 font-medium text-midnight">
                        {row.feature}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {typeof row.starter === "boolean" ? (
                          row.starter ? (
                            <CheckCircle2 className="h-4 w-4 text-teal mx-auto" />
                          ) : (
                            <X className="h-4 w-4 text-mist-border mx-auto" />
                          )
                        ) : (
                          <span className="font-mono font-semibold text-midnight">{row.starter}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center bg-teal-50/30">
                        {typeof row.clinic === "boolean" ? (
                          row.clinic ? (
                            <CheckCircle2 className="h-4 w-4 text-teal mx-auto" />
                          ) : (
                            <X className="h-4 w-4 text-mist-border mx-auto" />
                          )
                        ) : (
                          <span className="font-mono font-semibold text-teal-900">{row.clinic}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {typeof row.multi === "boolean" ? (
                          row.multi ? (
                            <CheckCircle2 className="h-4 w-4 text-teal mx-auto" />
                          ) : (
                            <X className="h-4 w-4 text-mist-border mx-auto" />
                          )
                        ) : (
                          <span className="font-mono font-semibold text-midnight">{row.multi}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 md:py-24 bg-paper border-b border-mist">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center space-y-3 mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal">
                Practice Questions
              </span>
              <h2 className="font-serif text-3xl font-normal text-midnight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div key={faq.q} className="rounded-xl border border-mist-border bg-white p-6 shadow-sm">
                  <h4 className="font-serif text-base font-bold text-midnight">
                    {faq.q}
                  </h4>
                  <p className="mt-2 text-xs text-ink leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
            <h2 className="font-serif text-3xl font-normal text-midnight">
              Need assistance picking the right plan?
            </h2>
            <p className="text-sm text-ink max-w-lg mx-auto">
              Our clinical workflow team is available to review your consulting roster and recommend an optimal setup.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-midnight px-6 py-3 text-sm font-semibold text-paper hover:bg-midnight-800 transition-colors shadow-editorial"
              >
                <span>Speak to Clinic Team</span>
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
