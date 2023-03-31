/*
  Warnings:

  - You are about to drop the column `socialId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_socialId_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `socialId`,
    ADD COLUMN `userType` ENUM('ADMIN', 'USER') NULL DEFAULT 'USER';
