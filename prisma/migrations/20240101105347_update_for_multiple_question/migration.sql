/*
  Warnings:

  - You are about to drop the column `correctOption` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "correctOption",
ADD COLUMN     "correctOptions" TEXT[];
