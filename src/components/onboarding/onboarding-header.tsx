import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

interface Step {
  id: number;
  name: string;
  href: string;
  status: "complete" | "current" | "upcoming";
}

export function OnboardingHeader({ currentStep }: { currentStep: number }) {
  const steps: Step[] = [
    { id: 1, name: "Account", href: "/signup", status: currentStep > 1 ? "complete" : "current" },
    { id: 2, name: "Clinic Profile", href: "/onboarding/clinic", status: currentStep > 2 ? "complete" : currentStep === 2 ? "current" : "upcoming" },
    { id: 3, name: "Doctor Schedule", href: "/onboarding/doctor", status: currentStep > 3 ? "complete" : currentStep === 3 ? "current" : "upcoming" },
    { id: 4, name: "Team Setup", href: "/onboarding/team", status: currentStep > 4 ? "complete" : currentStep === 4 ? "current" : "upcoming" },
    { id: 5, name: "Workspace Ready", href: "/onboarding/complete", status: currentStep === 5 ? "current" : "upcoming" },
  ];

  return (
    <header className="border-b border-mist bg-white py-4 px-6 sticky top-0 z-20">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-midnight text-teal font-serif text-base font-bold">
            CD
          </div>
          <div>
            <span className="font-serif text-lg font-bold text-midnight">ClinicDesk</span>
            <span className="ml-2 font-mono text-[10px] uppercase text-ink-muted bg-paper px-1.5 py-0.5 rounded border border-mist-border">
              Onboarding Wizard
            </span>
          </div>
        </Link>

        {/* Step Progress Pills */}
        <nav aria-label="Progress">
          <ol className="flex items-center gap-2 sm:gap-4 text-xs font-mono">
            {steps.map((step) => (
              <li key={step.name} className="flex items-center gap-1.5">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                    step.status === "complete"
                      ? "bg-teal text-white"
                      : step.status === "current"
                      ? "bg-midnight text-paper ring-2 ring-teal ring-offset-1"
                      : "bg-mist text-ink-muted"
                  }`}
                >
                  {step.status === "complete" ? <Check className="h-3.5 w-3.5" /> : step.id}
                </span>
                <span
                  className={`hidden sm:inline ${
                    step.status === "current"
                      ? "font-bold text-midnight"
                      : step.status === "complete"
                      ? "text-teal"
                      : "text-ink-muted"
                  }`}
                >
                  {step.name}
                </span>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </header>
  );
}
