-- CreateTable
CREATE TABLE "InstallationCheck" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InstallationCheck_pkey" PRIMARY KEY ("id")
);
