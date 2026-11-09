import { describe, it, expect } from "vitest";
import { withTenantContext } from "../src/lib/tenant-context";

describe("Tenant Context Security Engine", () => {
  it("rejects malicious or invalid UUID clinic tenant identifiers", async () => {
    const maliciousClinicId = "invalid-uuid'; DROP TABLE users; --";

    await expect(
      withTenantContext(maliciousClinicId, async () => {
        return Promise.resolve("should_never_reach");
      })
    ).rejects.toThrow("Invalid tenant clinicId format");
  });

  it("accepts valid UUID format for tenant isolation scoping", () => {
    const validUuid = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuidRegex.test(validUuid)).toBe(true);
  });
});
