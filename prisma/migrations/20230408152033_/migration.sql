/*
  Warnings:

  - The primary key for the `Subscriptions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `habitId` on the `Subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Subscriptions` table. All the data in the column will be lost.
  - You are about to drop the `Habits` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `Subscriptions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `habitName` to the `Subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subscriptions" DROP CONSTRAINT "Subscriptions_habitId_fkey";

-- DropForeignKey
ALTER TABLE "Subscriptions" DROP CONSTRAINT "Subscriptions_userId_fkey";

-- AlterTable
ALTER TABLE "Subscriptions" DROP CONSTRAINT "Subscriptions_pkey",
DROP COLUMN "habitId",
DROP COLUMN "id",
DROP COLUMN "userId",
ADD COLUMN     "habitName" "HabitName" NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL,
ADD CONSTRAINT "Subscriptions_pkey" PRIMARY KEY ("userEmail", "habitName");

-- DropTable
DROP TABLE "Habits";

-- CreateTable
CREATE TABLE "Habit" (
    "name" "HabitName" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isPro" BOOLEAN NOT NULL DEFAULT false,
    "minutes" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_userEmail_key" ON "Subscriptions"("userEmail");

-- AddForeignKey
ALTER TABLE "Subscriptions" ADD CONSTRAINT "Subscriptions_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriptions" ADD CONSTRAINT "Subscriptions_habitName_fkey" FOREIGN KEY ("habitName") REFERENCES "Habit"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
