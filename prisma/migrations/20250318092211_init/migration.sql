/*
  Warnings:

  - Added the required column `iteration` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `iteration` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `salt` VARCHAR(100) NOT NULL,
    MODIFY `role` INTEGER NOT NULL DEFAULT 1,
    MODIFY `state` INTEGER NOT NULL DEFAULT 1;
