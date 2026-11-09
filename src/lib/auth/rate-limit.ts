/**
 * In-memory sliding-window rate limiter for authentication endpoints.
 * Protects against brute-force credential stuffing and registration spam.
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetSeconds: number;
}

/**
 * Checks and increments the rate limit for a given key (e.g. IP address or email).
 *
 * @param key Unique identifier (e.g. "login:192.168.1.1" or "signup:user@example.com")
 * @param maxAttempts Maximum allowed attempts within the window
 * @param windowSeconds Window duration in seconds
 */
export function checkRateLimit(
  key: string,
  maxAttempts: number = 5,
  windowSeconds: number = 60
): RateLimitResult {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  // If no record or expired, reset
  if (!record || now > record.resetAt) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetAt: now + windowSeconds * 1000,
    };
    rateLimitStore.set(key, newRecord);
    return {
      success: true,
      remaining: maxAttempts - 1,
      resetSeconds: windowSeconds,
    };
  }

  // If limit exceeded
  if (record.count >= maxAttempts) {
    const resetSeconds = Math.max(1, Math.ceil((record.resetAt - now) / 1000));
    return {
      success: false,
      remaining: 0,
      resetSeconds,
    };
  }

  // Increment within window
  record.count += 1;
  const resetSeconds = Math.max(1, Math.ceil((record.resetAt - now) / 1000));

  return {
    success: true,
    remaining: maxAttempts - record.count,
    resetSeconds,
  };
}
