import { describe, it, expect } from "vitest";
import { checkRateLimit } from "../src/lib/auth/rate-limit";

describe("Sliding-Window Rate Limiter Engine", () => {
  it("allows requests below the limit", () => {
    const key = `test-ip-${Date.now()}-allow`;
    const res1 = checkRateLimit(key, 3, 60);
    expect(res1.success).toBe(true);
    expect(res1.remaining).toBe(2);

    const res2 = checkRateLimit(key, 3, 60);
    expect(res2.success).toBe(true);
    expect(res2.remaining).toBe(1);
  });

  it("blocks requests exceeding the maximum threshold", () => {
    const key = `test-ip-${Date.now()}-block`;
    checkRateLimit(key, 2, 60); // 1
    checkRateLimit(key, 2, 60); // 2

    const blocked = checkRateLimit(key, 2, 60); // 3 (exceeded)
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.resetSeconds).toBeGreaterThan(0);
  });
});
