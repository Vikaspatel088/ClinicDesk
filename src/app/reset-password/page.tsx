"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Lock } from "lucide-react";

export default function ResetPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

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
          Create new password
        </h2>
        <p className="mt-2 text-xs text-ink-muted">
          Enter and confirm your new account security credentials
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
                Password Updated
              </h3>
              <p className="text-xs text-ink leading-relaxed">
                Your password has been successfully updated. You may now sign in with your new credentials.
              </p>
              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-midnight px-4 py-2 text-xs font-semibold text-paper"
                >
                  <span>Sign In Now</span>
                </Link>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-midnight">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 8 characters"
                  className="mt-1 w-full rounded-lg border border-mist-border px-3.5 py-2.5 text-sm text-midnight focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-midnight">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter password"
                  className="mt-1 w-full rounded-lg border border-mist-border px-3.5 py-2.5 text-sm text-midnight focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center rounded-lg bg-midnight py-2.5 text-xs font-semibold text-paper hover:bg-midnight-800 transition-colors shadow-sm"
              >
                Update Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
