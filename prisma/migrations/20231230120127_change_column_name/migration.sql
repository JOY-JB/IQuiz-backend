/*
  Warnings:

  - You are about to drop the column `quizId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `quizId` on the `QuizAttempt` table. All the data in the column will be lost.
  - Added the required column `quizCategoryId` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quizCategoryId` to the `QuizAttempt` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizId_fkey";

-- DropForeignKey
ALTER TABLE "QuizAttempt" DROP CONSTRAINT "QuizAttempt_quizId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "quizId",
ADD COLUMN     "quizCategoryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QuizAttempt" DROP COLUMN "quizId",
ADD COLUMN     "quizCategoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizCategoryId_fkey" FOREIGN KEY ("quizCategoryId") REFERENCES "QuizCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_quizCategoryId_fkey" FOREIGN KEY ("quizCategoryId") REFERENCES "QuizCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
