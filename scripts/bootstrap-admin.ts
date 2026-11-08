//npx tsx scripts/bootstrap-admin.ts

import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";
import { hashPassword } from "../src/lib/auth/password";

const adapter = new PrismaNeon({ connectionString: process.env.DIRECT_URL });
const db = new PrismaClient({ adapter });

async function main() {
  // ⚠️ CHANGE THIS TO YOUR TEST EMAIL AND PASSWORD FIRST
  const ADMIN_EMAIL = "p81067045@gmail.com";
  const ADMIN_PASSWORD = "SuperSecretPassphrase2024!";
  const ADMIN_NAME = "Test Admin";

  console.log(`Bootstrapping admin account for ${ADMIN_EMAIL}...`);

  const existing = await db.adminUser.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (existing) {
    console.log("❌ Admin account already exists. Aborting.");
    process.exit(0);
  }

  const passwordHash = await hashPassword(ADMIN_PASSWORD);

  const admin = await db.adminUser.create({
    data: {
      email: ADMIN_EMAIL,
      name: ADMIN_NAME,
      passwordHash: passwordHash,
      role: "OWNER",
      isActive: true,
      emailVerifiedAt: new Date(), // We manually verify because we are seeding it
      mfaEnabled: false, // She will set this up on first login
    },
  });

  console.log("✅ Admin account created successfully!");
  console.log(`Email: ${admin.email}`);
  console.log(`Role: ${admin.role}`);
  console.log("Next step: Log in via the UI to set up MFA.");
}

main()
  .catch((e) => {
    console.error("Bootstrap failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });