/*
  Warnings:

  - The primary key for the `Bank` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PeerToPeer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Wallet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `offRampTxn` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `onRampTxn` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Bank" DROP CONSTRAINT "Bank_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PeerToPeer" DROP CONSTRAINT "PeerToPeer_fromId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PeerToPeer" DROP CONSTRAINT "PeerToPeer_toId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Wallet" DROP CONSTRAINT "Wallet_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."offRampTxn" DROP CONSTRAINT "offRampTxn_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."offRampTxn" DROP CONSTRAINT "offRampTxn_walletId_fkey";

-- DropForeignKey
ALTER TABLE "public"."onRampTxn" DROP CONSTRAINT "onRampTxn_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."onRampTxn" DROP CONSTRAINT "onRampTxn_walletId_fkey";

-- AlterTable
ALTER TABLE "public"."Account" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."Bank" DROP CONSTRAINT "Bank_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Bank_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Bank_id_seq";

-- AlterTable
ALTER TABLE "public"."PeerToPeer" DROP CONSTRAINT "PeerToPeer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "fromId" SET DATA TYPE TEXT,
ALTER COLUMN "toId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PeerToPeer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PeerToPeer_id_seq";

-- AlterTable
ALTER TABLE "public"."Session" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "public"."Wallet" DROP CONSTRAINT "Wallet_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Wallet_id_seq";

-- AlterTable
ALTER TABLE "public"."offRampTxn" DROP CONSTRAINT "offRampTxn_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "walletId" SET DATA TYPE TEXT,
ADD CONSTRAINT "offRampTxn_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "offRampTxn_id_seq";

-- AlterTable
ALTER TABLE "public"."onRampTxn" DROP CONSTRAINT "onRampTxn_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "walletId" SET DATA TYPE TEXT,
ADD CONSTRAINT "onRampTxn_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "onRampTxn_id_seq";

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
