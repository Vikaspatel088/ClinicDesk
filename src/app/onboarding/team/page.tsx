"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Users, 
  UserPlus, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle,
  Mail,
  Shield,
  Info
} from "lucide-react";
import { OnboardingHeader } from "@/components/onboarding/onboarding-header";
import { inviteTeamMember } from "@/actions/onboarding-actions";

interface InvitedMember {
  fullName: string;
  email: string;
  role: "DOCTOR" | "RECEPTIONIST";
}

export default function OnboardingTeamPage() {
  const router = useRouter();
  const [invitedList, setInvitedList] = useState<InvitedMember[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "RECEPTIONIST" as "DOCTOR" | "RECEPTIONIST",
  });

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setServerMessage(null);

    if (!form.fullName || !form.email) {
      setErrorMessage("Please enter both staff name and email address.");
      return;
    }

    setIsSubmitting(true);
    const result = await inviteTeamMember(form);
    setIsSubmitting(false);

    if (result.success) {
      setInvitedList((prev) => [...prev, { fullName: form.fullName, email: form.email, role: form.role }]);
      setServerMessage(result.message || "Invitation recorded.");
      setForm({ fullName: "", email: "", phone: "", role: "RECEPTIONIST" });
    } else {
      setErrorMessage(result.message || "Failed to invite staff member.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-paper text-midnight">
      <OnboardingHeader currentStep={4} />

      <main className="flex-1 py-12 px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 space-y-2">
            <span className="font-mono text-xs uppercase font-bold text-teal">
              Step 4 of 5 • Staff & Permissions
            </span>
            <h1 className="font-serif text-3xl font-normal text-midnight">
              Invite your clinic reception or partner doctor
            </h1>
            <p className="text-xs text-ink-muted">
              Add front desk staff to manage walk-ins and billing. You can also skip this and add team members later.
            </p>
          </div>

          <div className="rounded-2xl border border-mist-border bg-white p-8 shadow-elevated space-y-6">
            {/* Honest Disclosure regarding Phase 2 invitations */}
            <div className="rounded-lg bg-paper p-3.5 border border-mist text-xs text-ink space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-midnight font-mono text-[11px]">
                <Info className="h-3.5 w-3.5 text-teal" />
                <span>MEMBERSHIP INVITATION LIFECYCLE</span>
              </div>
              <p className="text-[11px] text-ink-muted leading-relaxed">
                Invitations create pre-activated `ClinicMembership` rows under your clinic tenant. In Phase 4, transactional email invites will dispatch through Resend.
              </p>
            </div>

            {serverMessage && (
              <div className="rounded-lg bg-teal-50 border border-teal-200 p-3 text-xs text-teal-900 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                <span>{serverMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="rounded-lg bg-coral-50 border border-coral-200 p-3 text-xs text-coral-900 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-coral flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Invite Form */}
            <form onSubmit={handleInvite} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-midnight">
                    Staff Full Name
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="e.g. Pooja Sharma"
                    className="mt-1 w-full rounded-lg border border-mist-border px-3.5 py-2 text-sm text-midnight focus:border-teal focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-midnight">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="pooja@aarogyam.in"
                    className="mt-1 w-full rounded-lg border border-mist-border px-3.5 py-2 text-sm text-midnight focus:border-teal focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-midnight">
                  Assigned Practice Role
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as "DOCTOR" | "RECEPTIONIST" })}
                  className="mt-1 w-full rounded-lg border border-mist-border bg-white px-3.5 py-2 text-sm text-midnight focus:border-teal focus:outline-none"
                >
                  <option value="RECEPTIONIST">Receptionist (Appointments, Check-In, Invoicing — No Medical Notes)</option>
                  <option value="DOCTOR">Consulting Doctor (Assigned Patient History & Notes)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-lg border border-mist-border bg-paper px-4 py-2 text-xs font-semibold text-midnight hover:bg-mist transition-colors"
              >
                <UserPlus className="h-3.5 w-3.5 text-teal" />
                <span>{isSubmitting ? "Inviting..." : "Add Staff Member"}</span>
              </button>
            </form>

            {/* Invited Staff List */}
            {invitedList.length > 0 && (
              <div className="pt-4 border-t border-mist space-y-2">
                <h4 className="font-mono text-xs font-bold text-ink-muted uppercase">
                  Registered Team Invitations ({invitedList.length})
                </h4>
                <div className="space-y-2">
                  {invitedList.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-paper border border-mist text-xs">
                      <div>
                        <span className="font-semibold text-midnight">{m.fullName}</span>
                        <span className="text-ink-muted ml-2 font-mono text-[11px]">({m.email})</span>
                      </div>
                      <span className="font-mono text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-mist-border text-teal-800">
                        {m.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="pt-6 border-t border-mist flex justify-between items-center">
              <Link
                href="/onboarding/complete"
                className="text-xs text-ink-muted hover:text-midnight transition-colors"
              >
                Skip for now
              </Link>

              <button
                type="button"
                onClick={() => router.push("/onboarding/complete")}
                className="inline-flex items-center gap-2 rounded-lg bg-midnight px-6 py-2.5 text-xs font-semibold text-paper hover:bg-midnight-800 transition-colors shadow-editorial"
              >
                <span>Complete Setup</span>
                <ArrowRight className="h-4 w-4 text-teal" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
