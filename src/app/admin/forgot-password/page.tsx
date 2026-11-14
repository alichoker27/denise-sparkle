"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "./actions";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    const email = formData.get("email") as string;
    await sendPasswordResetEmail(email);
    setStatus("success");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-soft p-4">
      <div className="bg-white p-8 rounded-3xl shadow-card w-full max-w-md border border-border">
        <h1 className="text-2xl font-display text-ink mb-6 text-center">Reset Password</h1>
        
        {status === "success" ? (
          <div className="text-center space-y-4">
            <p className="text-ink-soft">If an account exists for that email, a reset link has been sent.</p>
            <Button href="/admin/login" variant="outline">Back to Login</Button>
          </div>
        ) : (
          <form action={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input name="email" type="email" required className="w-full px-4 py-3 rounded-xl border border-border focus:ring-rose-500 focus:border-rose-500" />
            </div>
            <Button type="submit" disabled={status === "loading"} className="w-full">
              {status === "loading" ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}