/*
  Warnings:

  - The primary key for the `RoomMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `roomMemberId` was added to the `RoomMember` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "RoomMember" DROP CONSTRAINT "RoomMember_pkey",
ADD COLUMN     "roomMemberId" TEXT NOT NULL,
ADD CONSTRAINT "RoomMember_pkey" PRIMARY KEY ("roomMemberId");
