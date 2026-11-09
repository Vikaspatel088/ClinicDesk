"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  AlertCircle,
  Clock,
  Sparkles
} from "lucide-react";
import { OnboardingHeader } from "@/components/onboarding/onboarding-header";
import { registerClinic, getOnboardingState } from "@/actions/onboarding-actions";

export default function OnboardingClinicPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const [formData, setFormData] = useState({
    name: "",
    tagline: "General Outpatient & Family Practice",
    phone: "",
    email: "",
    address: "",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    timeZone: "Asia/Kolkata",
  });

  // Load existing clinic data for resumability
  useEffect(() => {
    async function load() {
      const state = await getOnboardingState();
      if (!state.authenticated) {
        router.push("/login");
        return;
      }
      if (state.clinic) {
        setFormData({
          name: state.clinic.name || "",
          tagline: state.clinic.tagline || "",
          phone: state.clinic.phone || "",
          email: state.clinic.email || "",
          address: state.clinic.address || "",
          city: state.clinic.city || "Mumbai",
          state: state.clinic.state || "Maharashtra",
          pincode: state.clinic.pincode || "400050",
          timeZone: state.clinic.timeZone || "Asia/Kolkata",
        });
      }
      setIsLoadingState(false);
    }
    load();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    const data = new FormData(e.currentTarget);
    const result = await registerClinic(data);

    setIsSubmitting(false);

    if (result.success && result.redirectUrl) {
      router.push(result.redirectUrl);
    } else {
      if (result.errors) {
        setFieldErrors(result.errors);
      }
      if (result.message) {
        setServerError(result.message);
      }
    }
  };

  if (isLoadingState) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper text-ink font-mono text-xs">
        Loading clinic onboarding state...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper text-midnight">
      <OnboardingHeader currentStep={2} />

      <main className="flex-1 py-12 px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 space-y-2">
            <span className="font-mono text-xs uppercase font-bold text-teal">
              Step 2 of 5 • Practice Identity
            </span>
            <h1 className="font-serif text-3xl font-normal text-midnight">
              Tell us about your clinic practice
            </h1>
            <p className="text-xs text-ink-muted">
              This information will be printed on patient consultation notes, receipts, and reminder dispatches.
            </p>
          </div>

          <div className="rounded-2xl border border-mist-border bg-white p-8 shadow-elevated">
            {serverError && (
              <div className="mb-6 rounded-lg bg-coral-50 border border-coral-200 p-4 text-xs text-coral-900 flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 text-coral flex-shrink-0 mt-0.5" />
                <span>{serverError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Clinic Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-midnight">
                  Clinic Legal / Trade Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  defaultValue={formData.name}
                  placeholder="e.g. Aarogyam Family Health Clinic"
                  className="mt-1 w-full rounded-lg border border-mist-border px-3.5 py-2.5 text-sm text-midnight focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-[11px] text-coral">{fieldErrors.name[0]}</p>
                )}
              </div>

              {/* Tagline / Subtitle */}
              <div>
                <label htmlFor="tagline" className="block text-xs font-semibold text-midnight">
                  Clinic Category / Specialty Description
                </label>
                <input
                  id="tagline"
                  name="tagline"
                  type="text"
                  defaultValue={formData.tagline}
                  placeholder="e.g. General Medicine, Pediatrics & Diagnostics"
                  className="mt-1 w-full rounded-lg border border-mist-border px-3.5 py-2.5 text-sm text-midnight focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-midnight">
                    Front Desk Contact Number *
                  </label>
                  <div className="mt-1 flex rounded-lg shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-mist-border bg-paper text-ink-muted text-xs font-mono">
                      +91
                    </span>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      defaultValue={formData.phone}
                      placeholder="98201 44556"
                      className="w-full rounded-r-lg border border-mist-border px-3.5 py-2.5 text-sm text-midnight focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                    />
                  </div>
                  {fieldErrors.phone && (
                    <p className="mt-1 text-[11px] text-coral">{fieldErrors.phone[0]}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-midnight">
                    Clinic Official Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={formData.email}
                    placeholder="contact@aarogyam.in"
                    className="mt-1 w-full rounded-lg border border-mist-border px-3.5 py-2.5 text-sm text-midnight focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                  />
                  {fieldErrors.email && (
                    <p className="mt-1 text-[11px] text-coral">{fieldErrors.email[0]}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-xs font-semibold text-midnight">
                  Clinic Street Address / Room Details *
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  defaultValue={formData.address}
                  placeholder="e.g. Shop 4, Plot 12, Ground Floor, Linking Road"
                  className="mt-1 w-full rounded-lg border border-mist-border px-3.5 py-2.5 text-sm text-midnight focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                />
                {fieldErrors.address && (
                  <p className="mt-1 text-[11px] text-coral">{fieldErrors.address[0]}</p>
                )}
              </div>

              {/* City, State, PIN */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-xs font-semibold text-midnight">
                    City *
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    defaultValue={formData.city}
                    placeholder="e.g. Mumbai"
                    className="mt-1 w-full rounded-lg border border-mist-border px-3.5 py-2.5 text-sm text-midnight focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                  />
                  {fieldErrors.city && (
                    <p className="mt-1 text-[11px] text-coral">{fieldErrors.city[0]}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="state" className="block text-xs font-semibold text-midnight">
                    State *
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    required
                    defaultValue={formData.state}
                    placeholder="e.g. Maharashtra"
                    className="mt-1 w-full rounded-lg border border-mist-border px-3.5 py-2.5 text-sm text-midnight focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                  />
                  {fieldErrors.state && (
                    <p className="mt-1 text-[11px] text-coral">{fieldErrors.state[0]}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="pincode" className="block text-xs font-semibold text-midnight">
                    PIN Code (6 digits) *
                  </label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    required
                    maxLength={6}
                    defaultValue={formData.pincode}
                    placeholder="400050"
                    className="mt-1 w-full rounded-lg border border-mist-border px-3.5 py-2.5 text-sm font-mono text-midnight focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                  />
                  {fieldErrors.pincode && (
                    <p className="mt-1 text-[11px] text-coral">{fieldErrors.pincode[0]}</p>
                  )}
                </div>
              </div>

              {/* Timezone */}
              <div className="pt-2">
                <label htmlFor="timeZone" className="block text-xs font-semibold text-midnight">
                  Timezone
                </label>
                <input
                  id="timeZone"
                  name="timeZone"
                  type="text"
                  readOnly
                  value="Asia/Kolkata (Indian Standard Time, GMT+5:30)"
                  className="mt-1 w-full rounded-lg border border-mist bg-paper px-3.5 py-2 text-xs font-mono text-ink-muted cursor-not-allowed"
                />
              </div>

              <div className="pt-4 border-t border-mist flex justify-between items-center">
                <span className="text-[11px] font-mono text-ink-muted">
                  Auto-saved upon submission
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-midnight px-6 py-2.5 text-xs font-semibold text-paper hover:bg-midnight-800 transition-colors shadow-editorial disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Saving Clinic...</span>
                  ) : (
                    <>
                      <span>Next: Doctor Schedule</span>
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
