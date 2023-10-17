/*
  Warnings:

  - You are about to drop the column `type` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `RoomAdmin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RoomMembers` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `Room` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "RoomAdmin" DROP CONSTRAINT "RoomAdmin_roomId_fkey";

-- DropForeignKey
ALTER TABLE "RoomAdmin" DROP CONSTRAINT "RoomAdmin_userId_fkey";

-- DropForeignKey
ALTER TABLE "_RoomMembers" DROP CONSTRAINT "_RoomMembers_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoomMembers" DROP CONSTRAINT "_RoomMembers_B_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "RoomAdmin";

-- DropTable
DROP TABLE "_RoomMembers";

-- DropEnum
DROP TYPE "MessageType";

-- CreateTable
CREATE TABLE "RoomMember" (
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RoomMember_pkey" PRIMARY KEY ("userId","roomId")
);

-- AddForeignKey
ALTER TABLE "RoomMember" ADD CONSTRAINT "RoomMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMember" ADD CONSTRAINT "RoomMember_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;
