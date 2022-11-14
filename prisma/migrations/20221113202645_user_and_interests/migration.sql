-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "stytchId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnInterests" (
    "userId" INTEGER NOT NULL,
    "interestId" INTEGER NOT NULL,

    CONSTRAINT "UsersOnInterests_pkey" PRIMARY KEY ("userId","interestId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_stytchId_key" ON "users"("stytchId");

-- CreateIndex
CREATE UNIQUE INDEX "Interest_name_key" ON "Interest"("name");

-- AddForeignKey
ALTER TABLE "UsersOnInterests" ADD CONSTRAINT "UsersOnInterests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnInterests" ADD CONSTRAINT "UsersOnInterests_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "Interest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
