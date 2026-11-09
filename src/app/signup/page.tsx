"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle,
  Lock,
  Mail,
  User,
  Phone
} from "lucide-react";
import { registerUser } from "@/actions/auth-actions";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const [password, setPassword] = useState("");

  // Calculate password strength score (0 to 4)
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = calculateStrength(password);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const result = await registerUser(formData);

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
          Create your clinic account
        </h2>
        <p className="mt-2 text-xs text-ink-muted">
          Step 1 of 5: Primary practitioner identity & security setup
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
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold text-midnight">
                Doctor / Owner Full Name *
              </label>
              <div className="mt-1 relative">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Sharma"
                  className="w-full rounded-lg border border-mist-border bg-white px-3.5 py-2.5 text-sm text-midnight focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                />
              </div>
              {fieldErrors.fullName && (
                <p className="mt-1 text-[11px] text-coral">{fieldErrors.fullName[0]}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-midnight">
                Professional Email Address *
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
              {fieldErrors.email && (
                <p className="mt-1 text-[11px] text-coral">{fieldErrors.email[0]}</p>
              )}
            </div>

            {/* Mobile Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-midnight">
                10-Digit Mobile Number (India) *
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
                  placeholder="98450 12345"
                  className="w-full rounded-r-lg border border-mist-border bg-white px-3.5 py-2.5 text-sm text-midnight focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                />
              </div>
              {fieldErrors.phone && (
                <p className="mt-1 text-[11px] text-coral">{fieldErrors.phone[0]}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-midnight">
                Account Password *
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
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

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1 h-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-full flex-1 rounded-full transition-colors ${
                          strength >= level
                            ? level <= 1
                              ? "bg-coral"
                              : level <= 2
                              ? "bg-amber-400"
                              : "bg-teal"
                            : "bg-mist"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] font-mono text-ink-muted text-right">
                    {strength <= 1 ? "Weak" : strength <= 3 ? "Good" : "Strong (Recommended)"}
                  </p>
                </div>
              )}
              {fieldErrors.password && (
                <p className="mt-1 text-[11px] text-coral">{fieldErrors.password[0]}</p>
              )}
            </div>

            {/* Password Confirm */}
            <div>
              <label htmlFor="passwordConfirm" className="block text-xs font-semibold text-midnight">
                Confirm Password *
              </label>
              <div className="mt-1 relative">
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Re-enter password"
                  className="w-full rounded-lg border border-mist-border bg-white px-3.5 py-2.5 text-sm text-midnight focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                />
              </div>
              {fieldErrors.passwordConfirm && (
                <p className="mt-1 text-[11px] text-coral">{fieldErrors.passwordConfirm[0]}</p>
              )}
            </div>

            {/* Terms Acceptance */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  required
                  className="h-4 w-4 rounded border-mist-border text-teal focus:ring-teal mt-0.5"
                />
                <span className="text-xs text-ink leading-relaxed">
                  I agree to the ClinicDesk Practice Terms and understand that patient health records are protected under PostgreSQL Row-Level Security.
                </span>
              </label>
              {fieldErrors.acceptTerms && (
                <p className="mt-1 text-[11px] text-coral">{fieldErrors.acceptTerms[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-midnight py-3 text-sm font-semibold text-paper hover:bg-midnight-800 transition-colors shadow-editorial disabled:opacity-70"
            >
              {isSubmitting ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Continue to Clinic Setup</span>
                  <ArrowRight className="h-4 w-4 text-teal" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-mist pt-4 text-center">
            <p className="text-xs text-ink-muted">
              Already have a clinic account?{" "}
              <Link href="/login" className="font-semibold text-teal hover:underline">
                Sign in here
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
