/*
  Warnings:

  - You are about to drop the column `Question` on the `Space` table. All the data in the column will be lost.
  - Added the required column `question` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Space" DROP COLUMN "Question",
ADD COLUMN     "question" TEXT NOT NULL;
