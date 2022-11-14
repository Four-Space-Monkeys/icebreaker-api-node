/*
  Warnings:

  - You are about to drop the `Interest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersOnInterests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsersOnInterests" DROP CONSTRAINT "UsersOnInterests_interestId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnInterests" DROP CONSTRAINT "UsersOnInterests_userId_fkey";

-- DropTable
DROP TABLE "Interest";

-- DropTable
DROP TABLE "UsersOnInterests";

-- CreateTable
CREATE TABLE "interests" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "interests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_on_interests" (
    "userId" INTEGER NOT NULL,
    "interestId" INTEGER NOT NULL,

    CONSTRAINT "users_on_interests_pkey" PRIMARY KEY ("userId","interestId")
);

-- CreateIndex
CREATE UNIQUE INDEX "interests_name_key" ON "interests"("name");

-- AddForeignKey
ALTER TABLE "users_on_interests" ADD CONSTRAINT "users_on_interests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_on_interests" ADD CONSTRAINT "users_on_interests_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "interests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
