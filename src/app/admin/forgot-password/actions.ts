"use server";

import { sendPasswordResetEmail as sendEmail } from "@/lib/auth/tokens";

export async function sendPasswordResetEmail(email: string) {
  // In a real app, you should add rate limiting here.
  await sendEmail(email);
}