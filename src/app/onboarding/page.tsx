import { redirect } from "next/navigation";
import { getOnboardingState } from "@/actions/onboarding-actions";

export default async function OnboardingEntryPage() {
  const state = await getOnboardingState();

  if (!state.authenticated) {
    redirect("/login");
  }

  if (state.step === "clinic") {
    redirect("/onboarding/clinic");
  } else if (state.step === "doctor") {
    redirect("/onboarding/doctor");
  } else if (state.step === "team") {
    redirect("/onboarding/team");
  }

  redirect("/app/dashboard");
}
