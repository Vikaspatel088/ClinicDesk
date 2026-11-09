"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { requestPasswordReset } from "@/actions/auth-actions";

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const result = await requestPasswordReset(formData);

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setErrorMessage(result.message || "An error occurred.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-paper py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 focus:outline-none">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-midnight text-teal font-serif text-xl font-bold">
            CD
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-midnight">
            ClinicDesk
          </span>
        </Link>
        <h2 className="mt-6 font-serif text-3xl font-normal text-midnight">
          Reset account password
        </h2>
        <p className="mt-2 text-xs text-ink-muted">
          Enter your registered doctor or receptionist email address
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-2xl border border-mist-border bg-white p-8 shadow-elevated">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-teal-50 border border-teal-200 text-teal flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-midnight">
                Instructions Recorded
              </h3>
              <p className="text-xs text-ink leading-relaxed">
                If an account matches that email address, password reset instructions have been logged in the security audit ledger.
              </p>
              <div className="rounded-lg bg-paper p-3 border border-mist text-left text-[11px] text-ink-muted flex items-start gap-2">
                <Info className="h-4 w-4 text-teal flex-shrink-0 mt-0.5" />
                <span>
                  Transactional email delivery via Resend will be active in Phase 4. For local development, contact your clinic owner or system administrator.
                </span>
              </div>
              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal hover:underline"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Return to Sign In</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="rounded-lg bg-coral-50 border border-coral-200 p-3 text-xs text-coral-900 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-coral flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-midnight">
                  Registered Email Address
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="doctor@aarogyam.in"
                    className="w-full rounded-lg border border-mist-border bg-white px-3.5 py-2.5 text-sm text-midnight focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-midnight py-2.5 text-xs font-semibold text-paper hover:bg-midnight-800 transition-colors shadow-sm disabled:opacity-70"
              >
                {isSubmitting ? "Processing..." : "Send Reset Instructions"}
              </button>

              <div className="border-t border-mist pt-4 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-midnight transition-colors"
                >
                  <ArrowLeft className="h-3 w-3" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
