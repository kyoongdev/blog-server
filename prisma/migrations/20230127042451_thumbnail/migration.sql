/*
  Warnings:

  - Added the required column `thumbnail` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Blog` ADD COLUMN `thumbnail` VARCHAR(120) NOT NULL;
