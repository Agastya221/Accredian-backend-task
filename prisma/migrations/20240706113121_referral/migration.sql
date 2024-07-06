-- CreateTable
CREATE TABLE `Referral` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(191) NOT NULL,
    `userEmail` VARCHAR(191) NOT NULL,
    `referralName` VARCHAR(191) NOT NULL,
    `referralEmail` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
