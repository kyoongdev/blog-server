/*
  Warnings:

  - A unique constraint covering the columns `[socialId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `socialId` VARCHAR(120) NULL,
    MODIFY `userId` VARCHAR(120) NULL,
    MODIFY `password` VARCHAR(250) NULL,
    MODIFY `name` VARCHAR(120) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_socialId_key` ON `User`(`socialId`);
