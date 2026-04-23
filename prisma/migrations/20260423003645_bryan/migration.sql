/*
  Warnings:

  - You are about to drop the column `update_at` on the `contacts` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "countries_phone_code_key";

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "countries_phone_code_idx" ON "countries"("phone_code");
