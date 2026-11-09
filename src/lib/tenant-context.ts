import { PrismaClient } from "@prisma/client";

/**
 * Global Prisma Client singleton instance.
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
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.__prismaClient = prisma;
}

/**
 * Executes a database operation within a transaction scoped to a specific Clinic Tenant ID.
 * Sets the transaction-local PostgreSQL session variable:
 *   `SET LOCAL app.current_clinic_id = '<clinicId>';`
 *
 * This ensures that PostgreSQL Row-Level Security (RLS) policies evaluate
 * correctly against `current_clinic_id()`.
 *
 * @param clinicId Valid UUID of the authenticated clinic tenant
 * @param operation Callback receiving transaction client
 */
export async function withTenantContext<T>(
  clinicId: string,
  operation: (tx: PrismaClient) => Promise<T>
): Promise<T> {
  // Basic UUID format validation to prevent SQL injection in session setting
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidRegex.test(clinicId)) {
    throw new Error(`Invalid tenant clinicId format: "${clinicId}"`);
  }

  return prisma.$transaction(async (tx) => {
    // Set transaction-local session variable (cleared automatically at transaction commit/rollback)
    await tx.$executeRawUnsafe(
      `SET LOCAL app.current_clinic_id = '${clinicId}';`
    );

    return operation(tx as unknown as PrismaClient);
  });
}
