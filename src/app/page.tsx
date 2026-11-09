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
  ChevronRight
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7F4] text-[#102B3B]">
      {/* Top Banner: Verification & System Status */}
      <div className="border-b border-[#D3DCD8] bg-[#102B3B] px-4 py-2 text-center text-xs text-[#E6ECE9]">
        <span className="inline-flex items-center gap-1.5 font-mono">
          <span className="h-2 w-2 rounded-full bg-[#18B7A4] animate-pulse" />
          CLINICDESK PRODUCTION DIRECTIVE — PHASE 0 FOUNDATION ACTIVE
        </span>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-[#D3DCD8] bg-[#F5F7F4]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#102B3B] text-[#18B7A4] font-serif text-xl font-bold">
              CD
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#102B3B]">
                ClinicDesk
              </span>
              <span className="ml-2 rounded bg-[#E6ECE9] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#243D48]">
                India Edition
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#243D48]">
            <Link href="/features" className="hover:text-[#18B7A4] transition-colors">
              Features
            </Link>
            <Link href="/how-it-works" className="hover:text-[#18B7A4] transition-colors">
              How It Works
            </Link>
            <Link href="/no-show-report" className="hover:text-[#18B7A4] transition-colors flex items-center gap-1">
              <span>No-Show Intelligence</span>
              <span className="rounded-full bg-[#18B7A4]/15 px-2 py-0.5 text-[11px] font-semibold text-[#11776D]">
                Signature
              </span>
            </Link>
            <Link href="/pricing" className="hover:text-[#18B7A4] transition-colors">
              Pricing
            </Link>
            <Link href="/security" className="hover:text-[#18B7A4] transition-colors">
              Security
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-[#102B3B] hover:text-[#18B7A4] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#102B3B] px-4 py-2 text-sm font-medium text-[#F5F7F4] hover:bg-[#1E4154] transition-all shadow-sm"
            >
              <span>Explore Demo</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Editorial Value Proposition */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D3DCD8] bg-white px-3 py-1 text-xs text-[#243D48] shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-[#18B7A4]" />
                  <span className="font-medium">Purpose-built for independent Indian practices (1–5 doctors)</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.12] tracking-tight text-[#102B3B]">
                  Run your clinic, <br />
                  <span className="italic text-[#18B7A4]">not your calendar.</span>
                </h1>

                <p className="max-w-xl text-lg text-[#243D48] leading-relaxed">
                  The clinical practice engine that eliminates appointment chaos. Automated WhatsApp & SMS reminders, sub-minute consultation charting, GST invoicing, and mathematically proven no-show recovery.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/onboarding"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#102B3B] px-6 py-3.5 text-base font-semibold text-[#F5F7F4] hover:bg-[#1E4154] transition-all shadow-editorial"
                  >
                    <span>Start Free Clinic Trial</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/no-show-report"
                    className="inline-flex items-center gap-2 rounded-lg border border-[#D3DCD8] bg-white px-5 py-3.5 text-base font-medium text-[#102B3B] hover:bg-[#E6ECE9] transition-all"
                  >
                    <TrendingDown className="h-4 w-4 text-[#ED786B]" />
                    <span>View Sample Intelligence Report</span>
                  </Link>
                </div>

                {/* Key Assurance Badges */}
                <div className="pt-6 border-t border-[#D3DCD8]/60 grid grid-cols-3 gap-4 text-xs text-[#5B7584]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#18B7A4]" />
                    <span>PostgreSQL RLS Tenant Isolation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#18B7A4]" />
                    <span>&lt; 60s Doctor Consultation Note</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#18B7A4]" />
                    <span>Razorpay & GST Ready</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Mock Schedule & No-Show Metric Card */}
              <div className="lg:col-span-5">
                <div className="rounded-xl border border-[#D3DCD8] bg-white p-6 shadow-elevated relative">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#E6ECE9]">
                    <div>
                      <p className="font-mono text-xs uppercase text-[#5B7584]">Live Clinic Queue</p>
                      <h3 className="font-serif text-lg font-bold text-[#102B3B]">Dr. Rajesh Sharma, MD</h3>
                      <p className="text-xs text-[#5B7584]">Cardiology & Internal Medicine</p>
                    </div>
                    <span className="rounded-full bg-teal-50 border border-teal-200 px-2.5 py-1 text-xs font-mono font-medium text-[#11776D]">
                      Token #04 Active
                    </span>
                  </div>

                  {/* Appointments Timeline */}
                  <div className="mt-4 space-y-3 font-sans">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F5F7F4] border border-[#E6ECE9]">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-[#102B3B] bg-white px-2 py-1 rounded border border-[#D3DCD8]">
                          10:15 AM
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-[#102B3B]">Sunita Verma (42 F)</p>
                          <p className="text-xs text-[#5B7584]">Follow-up Hypertension</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                        In Consultation
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E6ECE9]">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-[#5B7584] bg-[#F5F7F4] px-2 py-1 rounded border border-[#D3DCD8]">
                          10:30 AM
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-[#102B3B]">Amitabh Sengupta (58 M)</p>
                          <p className="text-xs text-[#5B7584]">WhatsApp Confirmed (9:15 AM)</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                        Checked In
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E6ECE9]">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-[#5B7584] bg-[#F5F7F4] px-2 py-1 rounded border border-[#D3DCD8]">
                          10:45 AM
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-[#102B3B]">Meera Kulkarni (29 F)</p>
                          <p className="text-xs text-[#5B7584]">SMS Reminder Sent</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-700">
                        Confirmed
                      </span>
                    </div>
                  </div>

                  {/* Highlight Box: No-Show Intelligence Metric */}
                  <div className="mt-5 rounded-lg bg-[#102B3B] p-4 text-[#F5F7F4]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[#18B7A4] uppercase tracking-wider">
                        Practice Metric This Month
                      </span>
                      <span className="text-[#B8D2DE]">38 days evaluated</span>
                    </div>
                    <div className="mt-2 flex items-baseline justify-between">
                      <div>
                        <div className="font-serif text-3xl font-bold text-white">28.4% → 9.2%</div>
                        <p className="text-xs text-[#B8D2DE]">No-Show Rate Post-Reminders</p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-lg font-bold text-[#18B7A4]">₹48,500</span>
                        <p className="text-[11px] text-[#B8D2DE]">Est. Recovered Revenue</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid: 4 Core Pillars */}
        <section className="border-t border-[#D3DCD8] bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[#18B7A4] font-semibold">
                Designed for Daily Outpatient Speed
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#102B3B]">
                Everything a clinical practice requires. None of the enterprise bloat.
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-xl border border-[#D3DCD8] p-6 bg-[#F5F7F4] hover:border-[#18B7A4] transition-all">
                <div className="h-10 w-10 rounded-lg bg-[#102B3B] text-[#18B7A4] flex items-center justify-center mb-4">
                  <Calendar className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#102B3B] mb-2">Smart Queue & Walk-Ins</h3>
                <p className="text-sm text-[#243D48] leading-relaxed">
                  Doctor availability slotting with token numbers and zero-conflict double booking locks.
                </p>
              </div>

              <div className="rounded-xl border border-[#D3DCD8] p-6 bg-[#F5F7F4] hover:border-[#18B7A4] transition-all">
                <div className="h-10 w-10 rounded-lg bg-[#102B3B] text-[#18B7A4] flex items-center justify-center mb-4">
                  <TrendingDown className="h-5 w-5 text-[#ED786B]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#102B3B] mb-2">No-Show Intelligence</h3>
                <p className="text-sm text-[#243D48] leading-relaxed">
                  Compare attendance trends before and after automated reminders with transparent revenue estimation.
                </p>
              </div>

              <div className="rounded-xl border border-[#D3DCD8] p-6 bg-[#F5F7F4] hover:border-[#18B7A4] transition-all">
                <div className="h-10 w-10 rounded-lg bg-[#102B3B] text-[#18B7A4] flex items-center justify-center mb-4">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#102B3B] mb-2">60s Digital Notes</h3>
                <p className="text-sm text-[#243D48] leading-relaxed">
                  Structured consultation notes, vitals, prescriptions, and tamper-evident medical amendments.
                </p>
              </div>

              <div className="rounded-xl border border-[#D3DCD8] p-6 bg-[#F5F7F4] hover:border-[#18B7A4] transition-all">
                <div className="h-10 w-10 rounded-lg bg-[#102B3B] text-[#18B7A4] flex items-center justify-center mb-4">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#102B3B] mb-2">Strict Tenant Isolation</h3>
                <p className="text-sm text-[#243D48] leading-relaxed">
                  PostgreSQL Row-Level Security ensures no clinic or patient record ever leaks across tenant boundaries.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Editorial Footer */}
      <footer className="border-t border-[#D3DCD8] bg-[#102B3B] text-[#E6ECE9] py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold text-white">ClinicDesk</span>
              <span className="text-xs text-[#18B7A4] font-mono">v1.0-alpha</span>
            </div>
            <p className="text-xs text-[#B8D2DE] mt-1">
              Run your clinic, not your calendar. Built for Indian outpatient practices.
            </p>
          </div>
          <div className="flex items-center gap-6 text-xs text-[#B8D2DE]">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy & Data Residency</Link>
            <Link href="/security" className="hover:text-white transition-colors">Security Architecture</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
