import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword } from "../src/lib/auth/password";

describe("Password Security & Hashing Engine", () => {
  it("generates valid bcrypt hashes with salt rounds", async () => {
    const password = "StrongPassword@123";
    const hash = await hashPassword(password);

    expect(hash).toBeDefined();
    expect(hash).toMatch(/^\$2[aby]\$12\$/); // bcrypt cost factor 12
    expect(hash).not.toEqual(password);
  });

  it("verifies correct password against generated hash", async () => {
    const password = "DoctorSecure#2026";
    const hash = await hashPassword(password);

    const isMatch = await verifyPassword(password, hash);
    expect(isMatch).toBe(true);
  });

  it("rejects incorrect password against hash", async () => {
    const password = "DoctorSecure#2026";
    const hash = await hashPassword(password);

    const isMatch = await verifyPassword("WrongPassword123!", hash);
    expect(isMatch).toBe(false);
  });

  it("enforces minimum 8 character password length", async () => {
    await expect(hashPassword("short")).rejects.toThrow(
      "Password must be at least 8 characters long."
    );
  });

  it("safely handles empty or null input values", async () => {
    expect(await verifyPassword("", "")).toBe(false);
    expect(await verifyPassword("test", "")).toBe(false);
    expect(await verifyPassword("", "hash")).toBe(false);
  });
});
