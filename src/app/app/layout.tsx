import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import Sidebar from "@/components/app/sidebar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || !session.id) {
    redirect("/login");
  }

  if (!session.clinicId) {
    redirect("/onboarding/clinic");
  }

  return (
    <div className="flex min-h-screen bg-[#F5F7F4]">
      <Sidebar session={session} />
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
}
