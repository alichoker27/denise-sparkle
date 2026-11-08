import "server-only";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

/**
 * Hashes a plaintext password using bcrypt.
 * Never store or log the plaintext password.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verifies a plaintext password against a stored hash.
 * Returns true if they match, false otherwise.
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Validates password strength.
 * Requires at least 12 characters, max 64.
 */
export function validatePasswordStrength(password: string): string | null {
  if (password.length < 12) {
    return "Password must be at least 12 characters long.";
  }
  if (password.length > 64) {
    return "Password must be no more than 64 characters long.";
  }
  // Optional: Add checks for numbers/symbols if desired
  // if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter.";
  // if (!/[0-9]/.test(password)) return "Password must contain a number.";
  
  return null; // Null means it passed
}