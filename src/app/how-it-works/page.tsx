import React from "react";
import Link from "next/link";
import { 
  Calendar, 
  MessageSquare, 
  CheckCircle2, 
  Users, 
  FileText, 
  FileCheck2, 
  Receipt, 
  TrendingDown, 
  ArrowRight,
  Clock,
  Sparkles,
  PhoneCall,
  UserCheck
} from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export const metadata = {
  title: "How It Works: A Day in the Clinic — ClinicDesk",
  description: "Follow an 8-step daily outpatient journey: booking, automated reminders, confirmation, check-in, clinical notes, invoice, and practice analytics.",
};

const WORKFLOW_STEPS = [
  {
    step: "01",
    time: "08:30 AM",
    title: "Receptionist Books the Appointment",
    role: "Front Desk Receptionist",
    icon: Calendar,
    description: "A patient calls the clinic or walks up to the counter. The receptionist enters the patient's phone number, auto-populating their name if previously registered. A 15-minute slot is booked under Dr. Rajesh Sharma with token #06.",
    highlight: "Double-booking prevention: Concurrency locks guarantee no overlapping appointments.",
  },
  {
    step: "02",
    time: "08:31 AM",
    title: "Automated Multi-Touch Reminder Dispatched",
    role: "Automated Background Service",
    icon: MessageSquare,
    description: "ClinicDesk automatically schedules and dispatches an instant WhatsApp message and SMS reminder with the clinic address, doctor's name, token number, and consultation guidelines.",
    highlight: "Zero receptionist overhead: No manual typing or daily reminder phone calls required.",
  },
  {
    step: "03",
    time: "09:15 AM",
    title: "Patient Confirms Attendance",
    role: "Patient via WhatsApp",
    icon: CheckCircle2,
    description: "The patient replies '1' to the interactive WhatsApp prompt. ClinicDesk marks the appointment status as 'Confirmed' on the receptionist's live dashboard. If the patient had replied '9' to cancel, the slot would immediately reopen for waitlisted patients.",
    highlight: "Interactive reply webhooks: Live status updates directly in the clinic schedule.",
  },
  {
    step: "04",
    time: "10:15 AM",
    title: "Patient Arrives & Check-In",
    role: "Front Desk Receptionist",
    icon: UserCheck,
    description: "The patient walks in 15 minutes before the slot. With a single tap, the receptionist marks them 'Checked In'. The doctor's cabin screen immediately updates to show who is sitting in the lounge.",
    highlight: "Lounge transparency: Doctor and staff see exactly who has arrived.",
  },
  {
    step: "05",
    time: "10:30 AM",
    title: "Doctor Reviews Longitudinal History",
    role: "Consulting Physician",
    icon: FileText,
    description: "As token #06 enters the cabin, Dr. Sharma opens the patient record. Previous blood pressure logs, chronic diabetes history, past prescriptions, and drug allergies (Penicillin alert) are visible on a single glance.",
    highlight: "Contextual safety: Critical drug alerts prevent dangerous repeat prescriptions.",
  },
  {
    step: "06",
    time: "10:35 AM",
    title: "Doctor Records Sub-Minute Clinical Notes",
    role: "Consulting Physician",
    icon: FileCheck2,
    description: "Dr. Sharma records vitals (BP 128/82, Pulse 76), types the chief complaint, selects the ICD-10 diagnosis, and enters the prescription. The note is finalized, locked, and digitally time-stamped for medico-legal integrity.",
    highlight: "Designed for speed: No complex dropdown mazes or tedious data entry.",
  },
  {
    step: "07",
    time: "10:45 AM",
    title: "Invoice & UPI Payment Receipt",
    role: "Front Desk Receptionist",
    icon: Receipt,
    description: "As the patient exits to the desk, the consultation invoice (₹600) is ready. The patient scans the dynamic clinic UPI QR code on their PhonePe app. The receptionist marks payment received and hands over a printed thermal receipt.",
    highlight: "Instant reconciliation: UPI transaction IDs linked directly to medical visits.",
  },
  {
    step: "08",
    time: "01:30 PM",
    title: "Practice Performance Ledgers Updated",
    role: "Clinic Owner & Analytics",
    icon: TrendingDown,
    description: "At the end of the morning OPD shift, ClinicDesk automatically computes the day's attendance metrics, reminder delivery success, and no-show reductions, feeding directly into the practice's No-Show Intelligence Report.",
    highlight: "Auditable revenue: Real figures derived from completed database entries.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-midnight">
      <Navbar />

      <main className="flex-1">
        {/* Editorial Header */}
        <section className="pt-16 pb-12 md:pt-20 md:pb-16 border-b border-mist bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-xs text-teal-800">
                <Clock className="h-3.5 w-3.5 text-teal" />
                <span>DAILY OUTPATIENT CHRONOLOGY</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-normal text-midnight leading-tight">
                A day in your clinic with ClinicDesk.
              </h1>
              <p className="text-lg text-ink leading-relaxed">
                Step-by-step through a morning outpatient shift. See how ClinicDesk synchronizes reception, doctor cabin, and patient communication into one calm workflow.
              </p>
            </div>
          </div>
        </section>

        {/* Chronological Step-by-Step Timeline */}
        <section className="py-16 md:py-24 border-b border-mist">
          <div className="mx-auto max-w-5xl px-6">
            <div className="relative border-l-2 border-mist-border ml-4 md:ml-32 pl-6 md:pl-12 space-y-12">
              {WORKFLOW_STEPS.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div key={step.step} className="relative group">
                    {/* Timestamp for desktop */}
                    <div className="hidden md:block absolute -left-44 top-1 font-mono text-xs font-bold text-ink-muted text-right w-28">
                      {step.time}
                    </div>

                    {/* Step Marker Dot */}
                    <div className="absolute -left-[35px] md:-left-[59px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-midnight text-teal text-[11px] font-mono font-bold shadow-sm">
                      {step.step}
                    </div>

                    {/* Step Card */}
                    <div className="rounded-xl border border-mist-border bg-white p-6 shadow-editorial transition-all hover:border-teal">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-mist">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-teal-50 text-teal">
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <span className="font-mono text-xs font-semibold text-teal-800 uppercase tracking-wide">
                            {step.role}
                          </span>
                        </div>
                        <span className="md:hidden font-mono text-xs text-ink-muted">
                          {step.time}
                        </span>
                      </div>

                      <h3 className="mt-3 font-serif text-xl font-bold text-midnight">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-sm text-ink leading-relaxed">
                        {step.description}
                      </p>

                      <div className="mt-4 rounded-lg bg-paper p-3 border border-mist text-xs text-midnight font-medium flex items-start gap-2">
                        <Sparkles className="h-4 w-4 text-teal mt-0.5 flex-shrink-0" />
                        <span>{step.highlight}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
            <h2 className="font-serif text-3xl font-normal text-midnight">
              Transform your clinic's daily workflow.
            </h2>
            <p className="text-sm text-ink max-w-lg mx-auto">
              No complicated multi-month software rollouts. Set up your clinic and doctors in less than 15 minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-lg bg-midnight px-6 py-3 text-sm font-semibold text-paper hover:bg-midnight-800 transition-colors shadow-editorial"
              >
                <span>Experience the Live Demo</span>
                <ArrowRight className="h-4 w-4 text-teal" />
              </Link>
              <Link
                href="/no-show-report"
                className="inline-flex items-center gap-2 rounded-lg border border-mist-border bg-paper px-5 py-3 text-sm font-medium text-midnight hover:bg-mist transition-colors"
              >
                <span>Explore the No-Show Report</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
