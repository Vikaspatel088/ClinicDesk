import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

/**
 * Securely hashes a plaintext password using bcrypt with 12 salt rounds.
 */
export async function hashPassword(plaintext: string): Promise<string> {
  if (!plaintext || plaintext.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }
  return bcrypt.hash(plaintext, SALT_ROUNDS);
}

/**
 * Securely compares a plaintext password with a stored bcrypt hash.
 */
export async function verifyPassword(
  plaintext: string,
  storedHash: string
): Promise<boolean> {
  if (!plaintext || !storedHash) {
    return false;
  }
  try {
    return await bcrypt.compare(plaintext, storedHash);
  } catch {
    return false;
  }
}
