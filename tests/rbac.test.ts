import { describe, it, expect } from "vitest";
import { hasRequiredRole } from "../src/lib/tenant-context";

describe("Role-Based Access Control (RBAC) Hierarchy", () => {
  it("OWNER meets or exceeds OWNER, DOCTOR, and RECEPTIONIST roles", () => {
    expect(hasRequiredRole("OWNER", "OWNER")).toBe(true);
    expect(hasRequiredRole("OWNER", "DOCTOR")).toBe(true);
    expect(hasRequiredRole("OWNER", "RECEPTIONIST")).toBe(true);
    expect(hasRequiredRole("OWNER", "PLATFORM_ADMIN")).toBe(false);
  });

  it("DOCTOR meets DOCTOR and RECEPTIONIST, but not OWNER", () => {
    expect(hasRequiredRole("DOCTOR", "DOCTOR")).toBe(true);
    expect(hasRequiredRole("DOCTOR", "RECEPTIONIST")).toBe(true);
    expect(hasRequiredRole("DOCTOR", "OWNER")).toBe(false);
    expect(hasRequiredRole("DOCTOR", "PLATFORM_ADMIN")).toBe(false);
  });

  it("RECEPTIONIST only meets RECEPTIONIST, never DOCTOR or OWNER", () => {
    expect(hasRequiredRole("RECEPTIONIST", "RECEPTIONIST")).toBe(true);
    expect(hasRequiredRole("RECEPTIONIST", "DOCTOR")).toBe(false);
    expect(hasRequiredRole("RECEPTIONIST", "OWNER")).toBe(false);
    expect(hasRequiredRole("RECEPTIONIST", "PLATFORM_ADMIN")).toBe(false);
  });

  it("PLATFORM_ADMIN meets all role requirements", () => {
    expect(hasRequiredRole("PLATFORM_ADMIN", "RECEPTIONIST")).toBe(true);
    expect(hasRequiredRole("PLATFORM_ADMIN", "DOCTOR")).toBe(true);
    expect(hasRequiredRole("PLATFORM_ADMIN", "OWNER")).toBe(true);
    expect(hasRequiredRole("PLATFORM_ADMIN", "PLATFORM_ADMIN")).toBe(true);
  });
});
