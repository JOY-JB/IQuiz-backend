/*
  Warnings:

  - You are about to drop the column `category` on the `QuizCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `QuizCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "QuizCategory" DROP COLUMN "category";

-- CreateIndex
CREATE UNIQUE INDEX "QuizCategory_title_key" ON "QuizCategory"("title");
