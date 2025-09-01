-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('Processing', 'Pending', 'Success', 'Failed');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "password" TEXT,
    "pin" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Wallet" (
    "id" SERIAL NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."onRampTxn" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "walletId" INTEGER NOT NULL,
    "status" "public"."Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "onRampTxn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."offRampTxn" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "walletId" INTEGER NOT NULL,
    "status" "public"."Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "offRampTxn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Bank" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 5000,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PeerToPeer" (
    "id" SERIAL NOT NULL,
    "fromId" INTEGER NOT NULL,
    "toId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PeerToPeer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_key" ON "public"."Wallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Bank_userId_key" ON "public"."Bank"("userId");

-- AddForeignKey
ALTER TABLE "public"."Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."onRampTxn" ADD CONSTRAINT "onRampTxn_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."onRampTxn" ADD CONSTRAINT "onRampTxn_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "public"."Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."offRampTxn" ADD CONSTRAINT "offRampTxn_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."offRampTxn" ADD CONSTRAINT "offRampTxn_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "public"."Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Bank" ADD CONSTRAINT "Bank_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PeerToPeer" ADD CONSTRAINT "PeerToPeer_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PeerToPeer" ADD CONSTRAINT "PeerToPeer_toId_fkey" FOREIGN KEY ("toId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
