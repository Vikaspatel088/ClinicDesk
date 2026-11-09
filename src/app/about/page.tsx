import React from "react";
import Link from "next/link";
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Target, 
  Stethoscope, 
  Compass, 
  Users 
} from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export const metadata = {
  title: "About ClinicDesk — Our Mission for Indian Independent Practices",
  description: "Why we are building ClinicDesk: simplifying outpatient care for independent Indian clinics with 1 to 5 doctors, eliminating software bloat, and respecting clinical time.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-midnight">
      <Navbar />

      <main className="flex-1">
        {/* Editorial Header */}
        <section className="pt-16 pb-12 md:pt-20 md:pb-16 border-b border-mist bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-xs text-teal-800">
                <Compass className="h-3.5 w-3.5 text-teal" />
                <span>OUR PURPOSE & CLINICAL PHILOSOPHY</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-normal text-midnight leading-tight">
                Healthcare software should be powerful, not complicated.
              </h1>
              <p className="text-lg text-ink leading-relaxed">
                Independent doctors in India manage some of the world's most demanding outpatient volumes. They need software that honors their time, not enterprise bloat that slows them down.
              </p>
            </div>
          </div>
        </section>

        {/* Narrative Section: The Origin Story */}
        <section className="py-16 md:py-24 border-b border-mist bg-paper">
          <div className="mx-auto max-w-4xl px-6 space-y-12">
            <div className="space-y-6 text-base text-ink leading-relaxed font-sans">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-midnight">
                The Reality of Indian Outpatient Practice
              </h2>
              <p>
                In Indian cities and towns, the backbone of primary and speciality healthcare is not the corporate hospital chain—it is the neighborhood independent clinic. These practices run with 1 to 5 consulting doctors, a dedicated receptionist, and a waiting lounge packed with patients seeking care.
              </p>
              <p>
                Yet, for decades, independent practitioners have been presented with a terrible choice:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 pb-2">
                <div className="rounded-xl border border-mist-border bg-white p-6 shadow-sm">
                  <h4 className="font-serif font-bold text-midnight text-lg mb-2">
                    Paper Registers & Prescription Slips
                  </h4>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Cheap and fast, but fragile. Empty slots from no-shows go unnoticed, historical records get misplaced by patients, and financial accounting requires hours of manual ledger math at the end of each shift.
                  </p>
                </div>

                <div className="rounded-xl border border-mist-border bg-white p-6 shadow-sm">
                  <h4 className="font-serif font-bold text-midnight text-lg mb-2">
                    Bloated Enterprise Hospital Systems
                  </h4>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Designed for multi-story hospital bureaucracies with 40-step insurance authorizations. Writing a basic two-line cough syrup prescription requires clicking through ten confusing modal windows.
                  </p>
                </div>
              </div>
              <p>
                We built <strong>ClinicDesk</strong> to occupy the thoughtful middle ground: software that is as fast as paper, but equipped with modern automated WhatsApp reminders, PostgreSQL database isolation, and intelligent no-show recovery.
              </p>
            </div>

            {/* Core Values Grid */}
            <div className="pt-8 border-t border-mist space-y-6">
              <h3 className="font-serif text-2xl font-bold text-midnight">
                Our Core Engineering & Design Commitments
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-xl border border-mist-border bg-white p-6 space-y-3">
                  <div className="h-10 w-10 rounded-lg bg-teal-50 border border-teal-200 text-teal flex items-center justify-center">
                    <Target className="h-5 w-5" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-midnight">Sub-Minute Workflows</h4>
                  <p className="text-xs text-ink leading-relaxed">
                    A doctor should never spend more time typing into a screen than looking into the patient's eyes. Every core interaction is optimized for minimum keyboard latency.
                  </p>
                </div>

                <div className="rounded-xl border border-mist-border bg-white p-6 space-y-3">
                  <div className="h-10 w-10 rounded-lg bg-midnight-50 border border-midnight-200 text-midnight flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-midnight">Uncompromising Privacy</h4>
                  <p className="text-xs text-ink leading-relaxed">
                    We never monetize, cross-share, or train public AI models on patient health records. Database-level RLS keeps every clinic tenant strictly sealed.
                  </p>
                </div>

                <div className="rounded-xl border border-mist-border bg-white p-6 space-y-3">
                  <div className="h-10 w-10 rounded-lg bg-coral-50 border border-coral-200 text-coral flex items-center justify-center">
                    <Heart className="h-5 w-5" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-midnight">Mathematical Honesty</h4>
                  <p className="text-xs text-ink leading-relaxed">
                    We don't invent artificial return-on-investment promises or dress up basic correlations as proven causation. Our analytics are rigorous, transparent, and auditable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
            <h2 className="font-serif text-3xl font-normal text-midnight">
              Join us in simplifying Indian outpatient care.
            </h2>
            <p className="text-sm text-ink max-w-lg mx-auto">
              Whether you are opening your first clinic cabin or expanding your polyclinic, we're here to help you run your clinic, not your calendar.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-lg bg-midnight px-6 py-3 text-sm font-semibold text-paper hover:bg-midnight-800 transition-colors shadow-editorial"
              >
                <span>Explore the Product Demo</span>
                <ArrowRight className="h-4 w-4 text-teal" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-mist-border bg-paper px-5 py-3 text-sm font-medium text-midnight hover:bg-mist transition-colors"
              >
                <span>Get in Touch with Us</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
