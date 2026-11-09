import { describe, it, expect } from "vitest";
import { signSession, verifySessionToken, SessionUser } from "../src/lib/auth/session";

describe("Session Management & JWT Engine", () => {
  const mockUser: SessionUser = {
    id: "user-uuid-12345",
    email: "doctor@aarogyam.in",
    name: "Dr. Vikram Sharma",
    phone: "9876543210",
    clinicId: "clinic-uuid-67890",
    clinicName: "Aarogyam Care Clinic",
    clinicSlug: "aarogyam-care",
    role: "OWNER",
  };

  it("signs and verifies a valid user session", async () => {
    const token = await signSession(mockUser);
    expect(typeof token).toBe("string");
    expect(token.split(".").length).toBe(3); // Standard 3-part JWT

    const verified = await verifySessionToken(token);
    expect(verified).not.toBeNull();
    expect(verified?.id).toBe(mockUser.id);
    expect(verified?.email).toBe(mockUser.email);
    expect(verified?.name).toBe(mockUser.name);
    expect(verified?.clinicId).toBe(mockUser.clinicId);
    expect(verified?.clinicName).toBe(mockUser.clinicName);
    expect(verified?.role).toBe("OWNER");
  });

  it("rejects tampered or forged JWT tokens", async () => {
    const token = await signSession(mockUser);
    const tamperedToken = token.slice(0, -6) + "tamper";

    const verified = await verifySessionToken(tamperedToken);
    expect(verified).toBeNull();
  });

  it("returns null for malformed or non-JWT strings", async () => {
    expect(await verifySessionToken("invalid.token.structure")).toBeNull();
    expect(await verifySessionToken("")).toBeNull();
  });
});
