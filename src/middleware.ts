import { authOptions } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma-config";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function middleware() {
  try {
    const session = await getServerSession(authOptions);
    if(!session){
      return NextResponse.json({
        msg: "you are possibly logged out"
      }, {status: 500})
    }
    if (!session.user) {
      return NextResponse.json(
        {
          msg: "please login first",
        },
        { status: 500 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          msg: "user not found",
        },
        { status: 500 }
      );
    }

    const bank = await prisma.bank.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!bank) {
      return NextResponse.json(
        {
          msg: "bank ac. not found! activate now",
        },
        { status: 500 }
      );
    }

    const wallet = await prisma.wallet.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!wallet) {
      return NextResponse.json(
        {
          msg: "wallet not found",
        },
        { status: 500 }
      );
    }

    return NextResponse.next()
  } catch (error) {
    console.error(error)
    return NextResponse.json({
        msg: "something unexpected happened"
    }, {status: 500})
  }
}

export const config = {
  runtime: 'nodejs',
  matcher: ['/api/banktowallet', '/api/user', '/api/wallettobank', '/api/peertopeer']
}
