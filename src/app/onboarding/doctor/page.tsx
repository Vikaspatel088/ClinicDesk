"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Stethoscope, 
  Clock, 
  IndianRupee, 
  Calendar, 
  ArrowRight, 
  AlertCircle,
  FileBadge
} from "lucide-react";
import { OnboardingHeader } from "@/components/onboarding/onboarding-header";
import { setupDoctorProfile, getOnboardingState } from "@/actions/onboarding-actions";

const DAYS_OF_WEEK = [
  { id: 1, label: "Mon" },
  { id: 2, label: "Tue" },
  { id: 3, label: "Wed" },
  { id: 4, label: "Thu" },
  { id: 5, label: "Fri" },
  { id: 6, label: "Sat" },
  { id: 0, label: "Sun" },
];

export default function OnboardingDoctorPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    specialization: "General Medicine & Diabetology",
    qualification: "MBBS, MD (Internal Medicine)",
    registrationNumber: "MMC-2015-08421",
    consultationFee: 600,
    slotDurationMinutes: 15,
    daysOfWeek: [1, 2, 3, 4, 5, 6], // Mon - Sat default
    startTime: "09:30",
    endTime: "13:30",
  });

  useEffect(() => {
    async function load() {
      const state = await getOnboardingState();
      if (!state.authenticated) {
        router.push("/login");
        return;
      }
      if (!state.clinic) {
        router.push("/onboarding/clinic");
        return;
      }
      if (state.doctor) {
        setFormData((prev) => ({
          ...prev,
          specialization: state.doctor.specialization || prev.specialization,
          qualification: state.doctor.qualification || prev.qualification,
          registrationNumber: state.doctor.registrationNumber || prev.registrationNumber,
          consultationFee: state.doctor.consultationFee || prev.consultationFee,
          slotDurationMinutes: state.doctor.slotDurationMinutes || prev.slotDurationMinutes,
        }));
      }
      setIsLoading(false);
    }
    load();
  }, [router]);

  const toggleDay = (dayId: number) => {
    setFormData((prev) => {
      const exists = prev.daysOfWeek.includes(dayId);
      const updated = exists
        ? prev.daysOfWeek.filter((d) => d !== dayId)
        : [...prev.daysOfWeek, dayId];
      return { ...prev, daysOfWeek: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setIsSubmitting(true);

    const result = await setupDoctorProfile(formData);
    setIsSubmitting(false);

    if (result.success && result.redirectUrl) {
      router.push(result.redirectUrl);
    } else {
      setServerError(result.message || "Failed to save schedule.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper text-ink font-mono text-xs">
        Loading schedule profile...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper text-midnight">
      <OnboardingHeader currentStep={3} />

      <main className="flex-1 py-12 px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 space-y-2">
            <span className="font-mono text-xs uppercase font-bold text-teal">
              Step 3 of 5 • Consulting Schedule
            </span>
            <h1 className="font-serif text-3xl font-normal text-midnight">
              Configure doctor consulting availability
            </h1>
            <p className="text-xs text-ink-muted">
              Configure slot duration, consultation fees, and weekly OPD hours for token generation.
            </p>
          </div>

          <div className="rounded-2xl border border-mist-border bg-white p-8 shadow-elevated">
            {serverError && (
              <div className="mb-6 rounded-lg bg-coral-50 border border-coral-200 p-4 text-xs text-coral-900 flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 text-coral flex-shrink-0 mt-0.5" />
                <span>{serverError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Specialization & Qualification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-midnight">
                    Primary Clinical Specialization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    placeholder="e.g. General Medicine, Cardiology"
                    className="mt-1 w-full rounded-lg border border-mist-border px-3.5 py-2.5 text-sm text-midnight focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-midnight">
                    Degrees & Qualifications
                  </label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    placeholder="e.g. MBBS, MD, DNB"
                    className="mt-1 w-full rounded-lg border border-mist-border px-3.5 py-2.5 text-sm text-midnight focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                  />
                </div>
              </div>

              {/* Registration Number */}
              <div>
                <label className="block text-xs font-semibold text-midnight">
                  Medical Council Registration Number (MCI / State SMC) *
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    required
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    placeholder="e.g. MMC-2015-08421"
                    className="w-full rounded-lg border border-mist-border px-3.5 py-2.5 font-mono text-sm text-midnight focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                  />
                </div>
                <p className="mt-1 text-[11px] text-ink-muted">
                  Printed on digital prescriptions for statutory compliance.
                </p>
              </div>

              {/* Consultation Fee & Slot Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-mist">
                <div>
                  <label className="block text-xs font-semibold text-midnight">
                    Default Consultation Fee (INR) *
                  </label>
                  <div className="mt-1 flex rounded-lg shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-mist-border bg-paper text-ink font-mono text-xs">
                      ₹
                    </span>
                    <input
                      type="number"
                      required
                      min={0}
                      step={50}
                      value={formData.consultationFee}
                      onChange={(e) => setFormData({ ...formData, consultationFee: Number(e.target.value) })}
                      className="w-full rounded-r-lg border border-mist-border px-3.5 py-2.5 font-mono text-sm text-midnight focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-midnight">
                    Appointment Slot Duration *
                  </label>
                  <select
                    value={formData.slotDurationMinutes}
                    onChange={(e) => setFormData({ ...formData, slotDurationMinutes: Number(e.target.value) })}
                    className="mt-1 w-full rounded-lg border border-mist-border bg-white px-3.5 py-2.5 text-sm text-midnight focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                  >
                    <option value={10}>10 Minutes (High-volume OPD)</option>
                    <option value={15}>15 Minutes (Standard practice)</option>
                    <option value={20}>20 Minutes (Detailed follow-up)</option>
                    <option value={30}>30 Minutes (Speciality consult)</option>
                  </select>
                </div>
              </div>

              {/* Working Days */}
              <div className="pt-2 border-t border-mist space-y-2">
                <label className="block text-xs font-semibold text-midnight">
                  Weekly Consulting Days
                </label>
                <div className="flex flex-wrap gap-2">
                  {DAYS_OF_WEEK.map((day) => {
                    const isSelected = formData.daysOfWeek.includes(day.id);
                    return (
                      <button
                        key={day.id}
                        type="button"
                        onClick={() => toggleDay(day.id)}
                        className={`h-9 w-12 rounded-lg font-mono text-xs font-bold transition-all ${
                          isSelected
                            ? "bg-midnight text-teal border border-midnight shadow-sm"
                            : "bg-paper text-ink-muted border border-mist-border hover:bg-mist"
                        }`}
                      >
                        {day.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Shift Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-midnight">
                    Shift Start Time
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-mist-border px-3.5 py-2 text-sm font-mono text-midnight focus:border-teal focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-midnight">
                    Shift End Time
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-mist-border px-3.5 py-2 text-sm font-mono text-midnight focus:border-teal focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-mist flex justify-between items-center">
                <span className="text-[11px] font-mono text-ink-muted">
                  Slots automatically generated
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-midnight px-6 py-2.5 text-xs font-semibold text-paper hover:bg-midnight-800 transition-colors shadow-editorial disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Saving Schedule...</span>
                  ) : (
                    <>
                      <span>Next: Team & Front Desk</span>
                      <ArrowRight className="h-4 w-4 text-teal" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
