/*
  Warnings:

  - The values [PRO_HABIT_EXAMPLE] on the enum `HabitName` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "HabitName_new" AS ENUM ('WALK', 'EAT', 'TIDY', 'BRUSH', 'MEDITATE', 'READ', 'WASH', 'WATER');
ALTER TABLE "Habit" ALTER COLUMN "name" TYPE "HabitName_new" USING ("name"::text::"HabitName_new");
ALTER TABLE "Subscriptions" ALTER COLUMN "habitName" TYPE "HabitName_new" USING ("habitName"::text::"HabitName_new");
ALTER TYPE "HabitName" RENAME TO "HabitName_old";
ALTER TYPE "HabitName_new" RENAME TO "HabitName";
DROP TYPE "HabitName_old";
COMMIT;
