import { authOptions } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma-config";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();

    if (!body.amount || !body.pin) {
      return NextResponse.json(
        {
          msg: "please provide details!!",
        },
        { status: 500 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if(user?.pin !== body.pin){
        return NextResponse.json({
            msg: "invalid pin"
        }, {status: 500})
    }

    if (!user?.pin || !user.number) {
      return NextResponse.json(
        {
          msg: "either pin or number is not set!!",
        },
        { status: 500 }
      );
    }

    const wallet = await prisma.wallet.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (wallet!.balance < body.amount) {
      return NextResponse.json(
        {
          msg: "not enough balance in wallet",
        },
        { status: 500 }
      );
    }

    const result = await prisma.$transaction([
      prisma.wallet.update({
        where: {
          id: wallet!.id,
        },
        data: {
          balance: {
            decrement: body.amount,
          },
        },
      }),

      prisma.bank.update({
        where: {
          userId: user.id,
        },
        data: {
          balance: {
            increment: body.amount,
          },
        },
      }),
    ]);

    if (!result) {
      return NextResponse.json(
        {
          msg: "error transferring money",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      msg: "transaction successfull",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        msg: "something unexpected happended",
      },
      { status: 500 }
    );
  }
}
