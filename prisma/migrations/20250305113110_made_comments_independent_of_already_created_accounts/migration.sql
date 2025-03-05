/*
  Warnings:

  - You are about to drop the column `author_id` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `author_email` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_name` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_author_id_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "author_id",
ADD COLUMN     "author_email" TEXT NOT NULL,
ADD COLUMN     "author_name" TEXT NOT NULL;
