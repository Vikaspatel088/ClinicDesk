"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle,
  Lock,
  Mail,
  ShieldCheck
} from "lucide-react";
import { loginUser } from "@/actions/auth-actions";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const result = await loginUser(formData);

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

  return (
    <div className="flex min-h-screen flex-col justify-center bg-paper py-12 px-6 lg:px-8">
      {/* Brand Header */}
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
          Sign in to your clinic
        </h2>
        <p className="mt-2 text-xs text-ink-muted">
          Access your daily appointment queue, patient records, and consultation notes
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-2xl border border-mist-border bg-white p-8 shadow-elevated">
          {serverError && (
            <div className="mb-6 rounded-lg bg-coral-50 border border-coral-200 p-4 text-xs text-coral-900 flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 text-coral flex-shrink-0 mt-0.5" />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-midnight">
                Professional Email Address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="doctor@aarogyam.in"
                  className="w-full rounded-lg border border-mist-border bg-white px-3.5 py-2.5 text-sm text-midnight focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1 text-[11px] text-coral">{fieldErrors.email[0]}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-semibold text-midnight">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-ink-muted hover:text-teal transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your account password"
                  className="w-full rounded-lg border border-mist-border bg-white px-3.5 py-2.5 pr-10 text-sm text-midnight focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-ink-muted hover:text-midnight"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-[11px] text-coral">{fieldErrors.password[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-midnight py-3 text-sm font-semibold text-paper hover:bg-midnight-800 transition-colors shadow-editorial disabled:opacity-70"
            >
              {isSubmitting ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <span>Sign In to Workspace</span>
                  <ArrowRight className="h-4 w-4 text-teal" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-mist pt-4 text-center">
            <p className="text-xs text-ink-muted">
              Don't have a clinic registered yet?{" "}
              <Link href="/signup" className="font-semibold text-teal hover:underline">
                Create new clinic
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-ink-muted">
          <Link href="/" className="hover:text-midnight transition-colors">
            ← Return to ClinicDesk Homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
