"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "@/actions/onboarding-actions";
import { OnboardingHeader } from "@/components/onboarding/onboarding-header";

export default function OnboardingCompletePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    // Auto-trigger completion on mount
    startTransition(async () => {
      const result = await completeOnboarding();
      if (result.success && result.redirectUrl) {
        setLaunched(true);
        setTimeout(() => router.push(result.redirectUrl!), 1800);
      } else {
        setError(result.message || "Failed to complete onboarding.");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F7F4] flex flex-col">
      <OnboardingHeader currentStep={5} />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg text-center">
          {/* Animated checkmark */}
          <div className="relative mx-auto mb-8 w-24 h-24">
            <div
              className={`absolute inset-0 rounded-full border-4 transition-all duration-700 ${
                launched
                  ? "border-[#18B7A4] bg-[#18B7A4]/10 scale-100 opacity-100"
                  : "border-[#E6ECE9] scale-90 opacity-60"
              }`}
            />
            {launched && (
              <svg
                className="absolute inset-0 w-24 h-24 p-6 text-[#18B7A4] animate-[checkmark_0.4s_ease-out_forwards]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            {isPending && !launched && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#18B7A4] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {error ? (
            <>
              <h1 className="font-serif text-3xl text-[#102B3B] mb-3">
                Something went wrong
              </h1>
              <p className="text-[#243D48]/70 mb-8 text-base leading-relaxed">{error}</p>
              <button
                onClick={() => router.push("/onboarding/team")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#102B3B] text-white rounded-lg text-sm font-medium hover:bg-[#18B7A4] transition-colors"
              >
                Go Back
              </button>
            </>
          ) : (
            <>
              <h1 className="font-serif text-3xl text-[#102B3B] mb-3">
                {launched ? "Your clinic is ready." : "Setting up your workspace…"}
              </h1>
              <p className="text-[#243D48]/70 mb-8 text-base leading-relaxed">
                {launched
                  ? "Taking you to your dashboard now."
                  : "Finalising your clinic profile and permissions."}
              </p>

              {launched && (
                <div className="space-y-3">
                  {[
                    "Clinic profile created",
                    "Doctor schedule configured",
                    "Role permissions applied",
                    "Secure tenant workspace ready",
                  ].map((item, i) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-[#243D48]/80"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <svg
                        className="w-4 h-4 text-[#18B7A4] flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => router.push("/app/dashboard")}
                className="mt-10 inline-flex items-center gap-2 px-6 py-3 bg-[#102B3B] text-white rounded-lg text-sm font-medium hover:bg-[#18B7A4] transition-colors disabled:opacity-50"
                disabled={isPending}
              >
                {isPending ? "Please wait…" : "Open Dashboard"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
