/*
  Warnings:

  - The `status` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'REVIEWING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "feedback" TEXT NOT NULL DEFAULT 'Currently Reviewing',
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
