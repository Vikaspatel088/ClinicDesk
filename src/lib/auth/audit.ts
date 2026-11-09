import { prisma } from "@/lib/tenant-context";
import { Prisma } from "@prisma/client";

export interface AuditEventParams {
  clinicId?: string | null;
  userId?: string | null;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown> | null;
  ipAddress?: string | null;
  userAgent?: string | null;
}

/**
 * Persists an immutable security/clinical audit event to the AuditLog table.
 * Strips any sensitive credentials before storage.
 */
export async function logAuditEvent(params: AuditEventParams): Promise<void> {
  try {
    // Sanitize metadata to never store passwords or secrets
    let safeMetadata = params.metadata;
    if (safeMetadata && typeof safeMetadata === "object") {
      const sanitized = { ...safeMetadata };
      delete (sanitized as Record<string, unknown>).password;
      delete (sanitized as Record<string, unknown>).passwordHash;
      delete (sanitized as Record<string, unknown>).token;
      delete (sanitized as Record<string, unknown>).secret;
      safeMetadata = sanitized;
    }

    await prisma.auditLog.create({
      data: {
        clinicId: params.clinicId || null,
        userId: params.userId || null,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
        metadata: (safeMetadata as Prisma.InputJsonValue) || undefined,
        ipAddress: params.ipAddress || null,
        userAgent: params.userAgent || null,
      },
    });
  } catch (error) {
    // Non-blocking in production but logged to console for observability
    console.error("[AuditLog Error] Failed to write security event:", error);
  }
}
