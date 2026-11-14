import "server-only";
import crypto from "crypto";
import { db } from "@/lib/db";
import { Resend } from "resend";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

/** Generate a random 32-byte hex token */
export function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

/** Hash a token before storing it in the database */
export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/** Create and send a Password Reset Email */
export async function sendPasswordResetEmail(email: string) {
  const user = await db.adminUser.findUnique({ where: { email } });
  
  // Security: Do not reveal if the email exists or not
  if (!user || !user.isActive) return;

  const rawToken = generateToken();
  const tokenHash = hashToken(rawToken);

  // Store in DB with 15-minute expiry
  await db.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 mins
    },
  });

  const resetUrl = `${process.env.APP_URL}/admin/reset-password?token=${rawToken}`;

  // If no API key is set, print to console for local testing
  if (!process.env.RESEND_API_KEY) {
    console.log("\n--- 🚨 PASSWORD RESET LINK (Local Dev) 🚨 ---");
    console.log(resetUrl);
    console.log("-------------------------------------------\n");
    return;
  }

  // Send the actual email
  await resend.emails.send({
    from: `Denise Sparkle Security <${process.env.RESEND_FROM_EMAIL}>`,
    to: email,
    subject: "Reset your Admin Password",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Reset your Password</h2>
        <p>You requested a password reset for your Denise Sparkle admin account.</p>
        <p>Click the button below to set a new password. This link expires in 15 minutes.</p>
        <a href="${resetUrl}" style="display: inline-block; background-color: #d95f86; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 16px;">Reset Password</a>
        <p style="margin-top: 24px; font-size: 12px; color: #888;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });
  
  console.log(`✅ Password reset email successfully sent to ${email} via Resend.`);
}