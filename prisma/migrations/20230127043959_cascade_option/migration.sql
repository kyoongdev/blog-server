-- DropForeignKey
ALTER TABLE `BlogTags` DROP FOREIGN KEY `BlogTags_blogId_fkey`;

-- DropForeignKey
ALTER TABLE `BlogTags` DROP FOREIGN KEY `BlogTags_tagId_fkey`;

-- AddForeignKey
ALTER TABLE `BlogTags` ADD CONSTRAINT `BlogTags_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `Blog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BlogTags` ADD CONSTRAINT `BlogTags_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
