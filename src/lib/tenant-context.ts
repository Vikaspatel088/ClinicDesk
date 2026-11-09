import { PrismaClient, MembershipRole } from "@prisma/client";
import { getSession, SessionUser } from "./auth/session";

/**
 * Global Prisma Client singleton instance with connection pooling.
 */
declare global {
  // eslint-disable-next-line no-var
  var __prismaClient: PrismaClient | undefined;
}

export const prisma =
  global.__prismaClient ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["warn", "error"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.__prismaClient = prisma;
}

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Executes a database operation within a transaction scoped to a specific Clinic Tenant ID.
 * Sets the transaction-local PostgreSQL session variable:
 *   `SET LOCAL app.current_clinic_id = '<clinicId>';`
 *
 * This ensures that PostgreSQL Row-Level Security (RLS) policies evaluate
 * correctly against `current_clinic_id()`.
 *
 * Because `SET LOCAL` is scoped strictly to the enclosing database transaction,
 * connection pooling can never leak tenant context to subsequent queries.
 *
 * @param clinicId Valid UUID of the authenticated clinic tenant
 * @param operation Callback receiving transaction client
 */
export async function withTenantContext<T>(
  clinicId: string,
  operation: (tx: PrismaClient) => Promise<T>
): Promise<T> {
  if (!clinicId || !UUID_REGEX.test(clinicId)) {
    throw new Error(`Invalid tenant clinicId format: "${clinicId}"`);
  }

  return prisma.$transaction(async (tx) => {
    // Set transaction-local session variable (cleared automatically at transaction end)
    await tx.$executeRawUnsafe(
      `SET LOCAL app.current_clinic_id = '${clinicId}';`
    );

    return operation(tx as unknown as PrismaClient);
  });
}

/**
 * Role hierarchy checker.
 * Returns true if the user's role meets or exceeds the required threshold.
 */
export function hasRequiredRole(userRole: MembershipRole, requiredRole: MembershipRole): boolean {
  const roleWeights: Record<MembershipRole, number> = {
    RECEPTIONIST: 1,
    DOCTOR: 2,
    OWNER: 3,
    PLATFORM_ADMIN: 4,
  };

  return (roleWeights[userRole] || 0) >= (roleWeights[requiredRole] || 0);
}

/**
 * High-security server boundary helper:
 * 1. Resolves authenticated session
 * 2. Verifies clinic membership and role
 * 3. Enforces PostgreSQL RLS via transaction-scoped context
 */
export async function withAuthenticatedTenant<T>(
  operation: (tx: PrismaClient, session: SessionUser) => Promise<T>,
  requiredRole?: MembershipRole
): Promise<T> {
  const session = await getSession();

  if (!session || !session.id) {
    throw new Error("UNAUTHENTICATED: Active session required.");
  }

  if (!session.clinicId) {
    throw new Error("NO_TENANT_CONTEXT: User has no active clinic selected.");
  }

  // Verify membership directly in database (defense in depth against tampered tokens)
  const membership = await prisma.clinicMembership.findUnique({
    where: {
      userId_clinicId: {
        userId: session.id,
        clinicId: session.clinicId,
      },
    },
    include: { clinic: true },
  });

  if (!membership || !membership.isActive || !membership.clinic) {
    throw new Error("FORBIDDEN: Inactive or unauthorized clinic membership.");
  }

  if (requiredRole && !hasRequiredRole(membership.role, requiredRole)) {
    throw new Error(
      `INSUFFICIENT_PERMISSIONS: Operation requires ${requiredRole} role.`
    );
  }

  // Update session object with fresh database-verified values
  const verifiedSession: SessionUser = {
    ...session,
    role: membership.role,
    clinicName: membership.clinic.name,
    clinicSlug: membership.clinic.slug,
  };

  return withTenantContext(session.clinicId, (tx) => operation(tx, verifiedSession));
}
