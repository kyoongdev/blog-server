-- CreateTable
CREATE TABLE `PostKeywords` (
    `postId` VARCHAR(191) NOT NULL,
    `keywordId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`postId`, `keywordId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KeyWord` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PostKeywords` ADD CONSTRAINT `PostKeywords_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostKeywords` ADD CONSTRAINT `PostKeywords_keywordId_fkey` FOREIGN KEY (`keywordId`) REFERENCES `KeyWord`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
