import { prisma } from "@/lib/prisma-config";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.userId || !body.amount) {
      return NextResponse.json(
        {
          msg: "not enough details",
        },
        { status: 500 }
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
          msg: "this user doesn't have a bank ac.",
        },
        { status: 500 }
      );
    }

    if (bank.balance < body.balance) {
      return NextResponse.json(
        {
          msg: "not enough balance",
        },
        { status: 500 }
      );
    }

    const result = await prisma.bank.update({
      where: {
        userId: body.userId,
      },
      data: {
        balance: {
          decrement: body.amount,
        },
      },
    });

    if (!result) {
      return NextResponse.json(
        {
          msg: "eror deducting money",
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
    return NextResponse.json({
      msg: "something unexpected happened",
    });
  }
}
