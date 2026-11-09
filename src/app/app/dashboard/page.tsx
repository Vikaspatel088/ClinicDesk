import { redirect } from "next/navigation";
import { prisma, withTenantContext } from "@/lib/tenant-context";
import { getSession } from "@/lib/auth/session";

// ─── Types ───────────────────────────────────────────────────────────────────

interface DashboardData {
  clinic: {
    id: string;
    name: string;
    slug: string;
    city: string | null;
    state: string | null;
    phone: string;
    email: string | null;
    createdAt: Date;
  };
  owner: {
    name: string;
    email: string;
    role: string;
  };
  memberCount: number;
  doctorCount: number;
  subscriptionStatus: string | null;
}

// ─── Data Fetching ────────────────────────────────────────────────────────────

async function getDashboardData(): Promise<DashboardData | null> {
  const session = await getSession();

  if (!session?.id || !session?.clinicId) {
    return null;
  }

  // Verify membership and fetch clinic data under RLS tenant context
  const data = await withTenantContext(session.clinicId, async (tx) => {
    const clinic = await tx.clinic.findUnique({
      where: { id: session.clinicId! },
      select: {
        id: true,
        name: true,
        slug: true,
        city: true,
        state: true,
        phone: true,
        email: true,
        createdAt: true,
      },
    });

    if (!clinic) return null;

    const [memberCount, doctorCount, subscription] = await Promise.all([
      tx.clinicMembership.count({
        where: { clinicId: session.clinicId!, isActive: true },
      }),
      tx.doctorProfile.count({
        where: { clinicId: session.clinicId!, isActive: true },
      }),
      tx.subscription.findFirst({
        where: { clinicId: session.clinicId! },
        select: { status: true, plan: true },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return {
      clinic,
      owner: {
        name: session.name,
        email: session.email,
        role: session.role || "OWNER",
      },
      memberCount,
      doctorCount,
      subscriptionStatus: subscription ? `${subscription.plan} — ${subscription.status}` : null,
    };
  });

  return data;
}

// ─── Empty State Card ─────────────────────────────────────────────────────────

function EmptyCard({
  title,
  description,
  badge,
}: {
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <div className="rounded-xl border border-[#E6ECE9] bg-white p-6 relative overflow-hidden">
      {badge && (
        <span className="absolute top-4 right-4 text-[9px] font-mono uppercase tracking-widest border border-[#E6ECE9] text-[#243D48]/40 rounded px-2 py-0.5">
          {badge}
        </span>
      )}
      <div className="w-8 h-8 rounded-lg bg-[#E6ECE9] mb-4 flex items-center justify-center">
        <div className="w-3 h-0.5 bg-[#243D48]/25 rounded" />
      </div>
      <h3 className="text-sm font-semibold text-[#102B3B] mb-1">{title}</h3>
      <p className="text-xs text-[#243D48]/55 leading-relaxed">{description}</p>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-[#E6ECE9] bg-white px-6 py-5">
      <p className="text-xs text-[#243D48]/55 font-medium uppercase tracking-widest mb-2">{label}</p>
      <p className="font-mono text-3xl font-bold text-[#102B3B] tabular-nums">{value}</p>
      {sub && <p className="text-xs text-[#243D48]/45 mt-1">{sub}</p>}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const data = await getDashboardData();

  if (!data) {
    redirect("/login");
  }

  const { clinic, owner, memberCount, doctorCount, subscriptionStatus } = data;
  const joinedDate = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(clinic.createdAt));

  return (
    <main className="flex-1 px-8 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#18B7A4]">
            Dashboard
          </span>
        </div>
        <h1 className="font-serif text-3xl text-[#102B3B] leading-tight">
          {clinic.name}
        </h1>
        {(clinic.city || clinic.state) && (
          <p className="text-[#243D48]/55 text-sm mt-1">
            {[clinic.city, clinic.state].filter(Boolean).join(", ")}
          </p>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Team Members" value={memberCount} sub="Active staff" />
        <StatCard label="Doctors" value={doctorCount} sub="Configured profiles" />
        <StatCard label="Appointments" value={0} sub="No data yet — Phase 3" />
        <StatCard label="Patients" value={0} sub="No data yet — Phase 3" />
      </div>

      {/* Upcoming Sections (Coming Soon) */}
      <div className="mb-6">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[#243D48]/40 mb-4">
          Modules — Available in Phase 3+
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <EmptyCard
            title="Today's Appointments"
            description="Your appointment schedule will appear here once you start booking consultations."
            badge="Phase 3"
          />
          <EmptyCard
            title="Patient Activity"
            description="Recent patient registrations, check-ins, and follow-up reminders."
            badge="Phase 3"
          />
          <EmptyCard
            title="No-Show Intelligence"
            description="Attendance trends and estimated recovery rates from reminder campaigns."
            badge="Phase 4"
          />
          <EmptyCard
            title="Billing Summary"
            description="Outstanding invoices, payment receipts, and revenue overview."
            badge="Phase 5"
          />
          <EmptyCard
            title="SMS / Email Reminders"
            description="Configure automated reminder sequences to reduce no-shows."
            badge="Phase 4"
          />
          <EmptyCard
            title="Clinical Notes"
            description="Structured SOAP notes with templates per specialization."
            badge="Phase 3"
          />
        </div>
      </div>

      {/* Clinic Info Card */}
      <div className="rounded-xl border border-[#E6ECE9] bg-white p-6">
        <h2 className="text-xs font-mono uppercase tracking-widest text-[#243D48]/40 mb-4">
          Clinic Details
        </h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          {[
            { label: "Clinic ID", value: clinic.id, mono: true },
            { label: "Slug", value: clinic.slug, mono: true },
            { label: "Owner", value: owner.name },
            { label: "Owner Email", value: owner.email },
            { label: "Phone", value: clinic.phone },
            { label: "Contact Email", value: clinic.email || "—" },
            {
              label: "Subscription",
              value: subscriptionStatus || "Trial (no plan configured)",
            },
            { label: "Joined", value: joinedDate },
          ].map(({ label, value, mono }) => (
            <div key={label} className="flex flex-col">
              <dt className="text-[10px] font-mono uppercase tracking-widest text-[#243D48]/40 mb-0.5">
                {label}
              </dt>
              <dd
                className={`text-sm text-[#102B3B] ${
                  mono ? "font-mono text-xs" : "font-medium"
                }`}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Security notice */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#18B7A4]/20 bg-[#18B7A4]/5 px-5 py-4">
        <svg
          className="w-4 h-4 text-[#18B7A4] mt-0.5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <div>
          <p className="text-xs font-semibold text-[#102B3B] mb-0.5">
            Tenant isolation active
          </p>
          <p className="text-xs text-[#243D48]/60 leading-relaxed">
            All data queries run within a PostgreSQL Row-Level Security context scoped
            to clinic <span className="font-mono">{clinic.id.slice(0, 8)}…</span>.
            Other clinics cannot access this workspace.
          </p>
        </div>
      </div>
    </main>
  );
}
