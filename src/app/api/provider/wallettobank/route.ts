import { prisma } from "@/lib/prisma-config";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.userId || !body.amount) {
      return NextResponse.json(
        {
          msg: "please provide valid details!!",
        },
        { status: 500 }
      );
    }


    const user = await prisma.user.findUnique({
      where: {
        id: body.userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          msg: "user not found",
        },
        { status: 404 }
      );
    }

    const bank = await prisma.bank.findUnique({
      where: {
        userId: body.userId,
      },
    });

    if (!bank) {
      return NextResponse.json(
        {
          msg: "bank ac. not found",
        },
        { status: 404 }
      );
    }

    const result = await prisma.bank.update({
      where: {
        userId: bank.userId,
      },
      data: {
        balance: {
          increment: body.amount,
        },
      },
    });

    if (!result) {
      return NextResponse.json(
        {
          msg: "transaction failed",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        msg: "transaction successfull",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        msg: "something unexpected happened",
      },
      { status: 500 }
    );
  }
}
