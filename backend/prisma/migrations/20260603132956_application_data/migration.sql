/*
  Warnings:

  - Added the required column `ValidWorkPermit` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryOfResidence` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "EarliestStartDate" TIMESTAMP(3),
ADD COLUMN     "ValidWorkPermit" BOOLEAN NOT NULL,
ADD COLUMN     "countryOfResidence" TEXT NOT NULL;
