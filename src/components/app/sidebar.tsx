"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/actions/auth-actions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import type { SessionUser } from "@/lib/auth/session";

interface SidebarProps {
  session: SessionUser;
}

const NAV_ITEMS = [
  {
    href: "/app/dashboard",
    label: "Dashboard",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: "/app/appointments",
    label: "Appointments",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    comingSoon: true,
  },
  {
    href: "/app/patients",
    label: "Patients",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    comingSoon: true,
  },
  {
    href: "/app/reminders",
    label: "Reminders",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    comingSoon: true,
  },
  {
    href: "/app/billing",
    label: "Billing",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    comingSoon: true,
  },
  {
    href: "/app/reports",
    label: "No-Show Report",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    comingSoon: true,
  },
  {
    href: "/app/settings",
    label: "Settings",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    comingSoon: true,
  },
];

const ROLE_LABELS: Record<string, string> = {
  OWNER: "Clinic Owner",
  DOCTOR: "Doctor",
  RECEPTIONIST: "Receptionist",
  PLATFORM_ADMIN: "Admin",
};

export default function Sidebar({ session }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutUser();
      router.push("/login");
      router.refresh();
    });
  };

  const initials = session.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <aside className="w-60 min-h-screen bg-[#102B3B] flex flex-col">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-white/10">
        <Link href="/app/dashboard" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#18B7A4] rounded flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span className="text-white font-semibold text-sm tracking-wide">ClinicDesk</span>
        </Link>

        {/* Clinic name */}
        {session.clinicName && (
          <div className="mt-3 px-0">
            <p className="text-[#18B7A4] text-xs font-medium truncate">{session.clinicName}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/app/dashboard" && pathname.startsWith(item.href));
          const isDisabled = item.comingSoon;

          if (isDisabled) {
            return (
              <div
                key={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/35 cursor-not-allowed select-none group"
                title="Coming in a future phase"
              >
                <span className="text-white/25">{item.icon}</span>
                <span className="text-xs font-medium flex-1">{item.label}</span>
                <span className="text-[9px] font-mono text-white/25 uppercase tracking-wider border border-white/15 rounded px-1 py-0.5">Soon</span>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? "bg-[#18B7A4]/20 text-[#18B7A4]"
                  : "text-white/60 hover:text-white hover:bg-white/8"
              }`}
            >
              <span className={isActive ? "text-[#18B7A4]" : "text-white/50"}>{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User profile footer */}
      <div className="px-3 pb-4 pt-2 border-t border-white/10">
        {/* Role badge */}
        {session.role && (
          <div className="mb-3 px-3">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#18B7A4]/80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18B7A4]" />
              {ROLE_LABELS[session.role] || session.role}
            </span>
          </div>
        )}

        <div className="flex items-center gap-3 px-3 py-2.5">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#18B7A4]/20 border border-[#18B7A4]/30 flex items-center justify-center flex-shrink-0">
            <span className="text-[#18B7A4] text-xs font-semibold font-mono">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">{session.name}</p>
            <p className="text-white/40 text-[10px] truncate">{session.email}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={isPending}
          className="mt-1 w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/50 hover:text-[#ED786B] hover:bg-[#ED786B]/10 transition-colors text-xs font-medium disabled:opacity-40"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          {isPending ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </aside>
  );
}
