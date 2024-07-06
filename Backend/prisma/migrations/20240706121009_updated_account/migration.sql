/*
  Warnings:

  - You are about to drop the column `primary_phone_number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_primary_phone_number_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "primary_phone_number",
DROP COLUMN "username";
