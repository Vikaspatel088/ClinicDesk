import React from "react";
import Link from "next/link";
import { 
  TrendingDown, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles, 
  Info,
  Calendar,
  MessageSquare,
  IndianRupee,
  Activity,
  FileSpreadsheet
} from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { RevenueCalculator } from "@/components/marketing/revenue-calculator";

export const metadata = {
  title: "No-Show Intelligence Report & Methodology — ClinicDesk",
  description: "The signature practice analytics report: verifiable before/after attendance trends, non-causal attribution transparency, and interactive practice revenue calculator.",
};

export default function NoShowReportPage() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-midnight">
      <Navbar />

      <main className="flex-1">
        {/* Editorial Header */}
        <section className="pt-16 pb-12 md:pt-20 md:pb-16 border-b border-mist bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-xs text-teal-800">
                <TrendingDown className="h-3.5 w-3.5 text-teal" />
                <span>SIGNATURE PRACTICE INTELLIGENCE</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-normal text-midnight leading-tight">
                Honest metrics on missed appointments & recovered practice revenue.
              </h1>
              <p className="text-lg text-ink leading-relaxed">
                Most healthcare software throws vague percentages at doctors without explaining where the numbers came from. ClinicDesk introduces a verifiable attendance reporting framework built on strict mathematical definitions and scientific humility.
              </p>
            </div>
          </div>
        </section>

        {/* Comparative Metric Overview (Before vs After) */}
        <section className="py-16 md:py-20 border-b border-mist bg-paper">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center justify-between pb-6 border-b border-mist-border mb-8">
              <div>
                <span className="font-mono text-xs uppercase text-teal font-bold tracking-wider">
                  Audited Sample Dataset
                </span>
                <h3 className="font-serif text-2xl font-bold text-midnight">
                  Twacha Dermatology & Aesthetics (60-Day Cohort)
                </h3>
              </div>
              <span className="rounded bg-paper border border-mist-border px-3 py-1 font-mono text-xs text-ink-muted">
                Illustrative Benchmark Fixture
              </span>
            </div>

            {/* Before / After Comparative Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1: Baseline (Before Reminders) */}
              <div className="rounded-xl border border-mist-border bg-white p-7 shadow-editorial space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-mist">
                  <span className="font-mono text-xs uppercase font-bold text-ink-muted">
                    Phase A: Baseline Period (No Reminders)
                  </span>
                  <span className="font-mono text-xs text-coral font-bold bg-coral-50 px-2.5 py-0.5 rounded border border-coral-200">
                    High Attrition
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-xs text-ink-muted">Observed No-Show Rate</span>
                  <div className="font-serif text-5xl font-normal text-midnight">
                    28.4%
                  </div>
                  <p className="text-xs text-ink-muted">
                    98 missed appointments out of 345 eligible slots.
                  </p>
                </div>

                <div className="pt-3 border-t border-mist space-y-2 text-xs font-mono text-ink">
                  <div className="flex justify-between">
                    <span>Total Scheduled Slots:</span>
                    <span>360</span>
                  </div>
                  <div className="flex justify-between text-ink-muted">
                    <span>Clinic-Initiated Cancellations:</span>
                    <span>15 (Excluded from denominator)</span>
                  </div>
                  <div className="flex justify-between font-bold text-midnight pt-1 border-t border-mist/60">
                    <span>Evaluated Denominator:</span>
                    <span>345 eligible</span>
                  </div>
                  <div className="flex justify-between text-coral font-bold">
                    <span>Estimated Lost OPD Revenue:</span>
                    <span>₹58,800 (@ ₹600/slot)</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Post-Reminder Activation */}
              <div className="rounded-xl border-2 border-teal bg-white p-7 shadow-elevated space-y-5 relative">
                <span className="absolute -top-3 right-6 rounded-full bg-teal px-3 py-0.5 font-mono text-[10px] font-bold uppercase text-white">
                  After ClinicDesk Activation
                </span>

                <div className="flex items-center justify-between pb-3 border-b border-mist">
                  <span className="font-mono text-xs uppercase font-bold text-teal">
                    Phase B: Active Multi-Touch Reminders
                  </span>
                  <span className="font-mono text-xs text-teal-800 font-bold bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                    Recovered Adherence
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-xs text-ink-muted">Observed No-Show Rate</span>
                  <div className="font-serif text-5xl font-normal text-teal">
                    9.2%
                  </div>
                  <p className="text-xs text-teal-900 font-medium">
                    Relative reduction of 67.6% in missed appointments.
                  </p>
                </div>

                <div className="pt-3 border-t border-mist space-y-2 text-xs font-mono text-ink">
                  <div className="flex justify-between">
                    <span>Total Scheduled Slots:</span>
                    <span>352</span>
                  </div>
                  <div className="flex justify-between text-ink-muted">
                    <span>Reminder Delivery Rate:</span>
                    <span>97.8% (SMS + WhatsApp)</span>
                  </div>
                  <div className="flex justify-between font-bold text-midnight pt-1 border-t border-mist/60">
                    <span>Appointments Recovered:</span>
                    <span>66 slots</span>
                  </div>
                  <div className="flex justify-between text-teal-700 font-bold">
                    <span>Estimated Associated Revenue:</span>
                    <span>₹39,600 (@ ₹600/slot)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Mathematical Formulation & Denominator Definitions */}
        <section className="py-16 md:py-24 border-b border-mist bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl space-y-4 mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal">
                Methodology & Transparency
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-midnight">
                How ClinicDesk calculates metrics without inflating claims.
              </h2>
              <p className="text-sm text-ink leading-relaxed">
                In clinical research, a statistic is only as trustworthy as its denominator. Many software tools produce inflated improvement statistics by treating cancellations as no-shows or burying doctor emergencies into patient attendance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Formula 1 */}
              <div className="rounded-xl border border-mist-border bg-paper p-6 space-y-3">
                <span className="font-mono text-xs text-teal font-bold uppercase">Formula 01</span>
                <h3 className="font-serif text-lg font-bold text-midnight">Evaluated Opportunity</h3>
                <div className="rounded bg-white p-3 border border-mist font-mono text-xs text-midnight">
                  Evaluated = Total Scheduled - Clinic Cancellations
                </div>
                <p className="text-xs text-ink leading-relaxed">
                  <strong>Why this matters:</strong> If the doctor had an emergency or the clinic was closed on a holiday, the patient was never expected to attend. Counting this as a no-show is dishonest.
                </p>
              </div>

              {/* Formula 2 */}
              <div className="rounded-xl border border-mist-border bg-paper p-6 space-y-3">
                <span className="font-mono text-xs text-teal font-bold uppercase">Formula 02</span>
                <h3 className="font-serif text-lg font-bold text-midnight">No-Show Rate (%)</h3>
                <div className="rounded bg-white p-3 border border-mist font-mono text-xs text-midnight">
                  No-Show Rate = (No-Shows / Evaluated) × 100
                </div>
                <p className="text-xs text-ink leading-relaxed">
                  <strong>Why this matters:</strong> Patient-initiated cancellations are logged separately. A patient who phones 4 hours ahead to cancel gives the clinic a chance to backfill, whereas a true no-show leaves the doctor idle.
                </p>
              </div>

              {/* Formula 3 */}
              <div className="rounded-xl border border-mist-border bg-paper p-6 space-y-3">
                <span className="font-mono text-xs text-teal font-bold uppercase">Formula 03</span>
                <h3 className="font-serif text-lg font-bold text-midnight">Relative Reduction (%)</h3>
                <div className="rounded bg-white p-3 border border-mist font-mono text-xs text-midnight">
                  Reduction = ((Before - After) / Before) × 100
                </div>
                <p className="text-xs text-ink leading-relaxed">
                  <strong>Why this matters:</strong> Moving from 20% to 10% is a 50% relative reduction in missed slots. We report both absolute percentage points and relative reductions with complete context.
                </p>
              </div>
            </div>

            {/* Non-Causality Statement */}
            <div className="mt-8 rounded-xl border border-mist-border bg-mist/40 p-5 flex items-start gap-3">
              <Info className="h-5 w-5 text-teal mt-0.5 flex-shrink-0" />
              <div className="space-y-1 text-xs text-ink">
                <strong className="text-midnight block">Scientific Humility: Correlation vs. Causation</strong>
                <p className="leading-relaxed text-ink-muted">
                  ClinicDesk reports observational changes in practice attendance before and after reminder activation. We intentionally do not label this as "guaranteed proven causation," because external variables (such as seasonal monsoon drops, school holidays, or local traffic) can also influence patient attendance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Revenue Calculator */}
        <section className="py-16 md:py-24 border-b border-mist bg-paper">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl space-y-3 mb-10">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal">
                Interactive Practice Model
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-midnight">
                Simulate your clinic's attendance economics.
              </h2>
              <p className="text-sm text-ink leading-relaxed">
                Adjust the sliders below to match your weekly appointment volume, current no-show estimates, and average consultation fees.
              </p>
            </div>

            <RevenueCalculator />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
            <h2 className="font-serif text-3xl font-normal text-midnight">
              Track your clinic's attendance with real data.
            </h2>
            <p className="text-sm text-ink max-w-lg mx-auto">
              Test the No-Show Intelligence Report inside our demo workspace with pre-populated clinic fixtures.
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
                className="inline-flex items-center gap-2 rounded-lg border border-mist-border bg-paper px-5 py-3 text-sm font-medium text-midnight hover:bg-mist transition-colors"
              >
                <span>View Plans with No-Show Reports</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
