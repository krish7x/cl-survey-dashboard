-- CreateTable
CREATE TABLE `cl_survey_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `role` VARCHAR(255) NULL,
    `is_admin` BOOLEAN NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
