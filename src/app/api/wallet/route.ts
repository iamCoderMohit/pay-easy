import { authOptions } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma-config";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await getServerSession(authOptions);
  try {
    if (!session.user) {
      return NextResponse.json({
        msg: "login to proceed further",
      }, {status: 500});
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json({
        msg: "no user found",
      }, {status: 500});
    }

    const walletExist = await prisma.wallet.findUnique({
      where: {
        userId: user.id
      }, select: {balance: true}
    })

    if(walletExist){
      return NextResponse.json({
        wallet: walletExist
      })
    }

    const wallet = await prisma.wallet.create({
      data: {
        userId: session.user.id,
      }, select: {balance: true}
    });

    return NextResponse.json({
      wallet,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "something bad happened",
    }, {status: 500});
  }
}