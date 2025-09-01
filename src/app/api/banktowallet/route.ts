import { authOptions } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma-config";
import axios from "axios";
import { getServers } from "dns";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const session = await getServerSession(authOptions);

    const wallet = await prisma.wallet.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    const onRamp = await prisma.onRampTxn.create({
      data: {
        amount: body.amount,
        status: "Pending",
        userId: session.user.id,
        walletId: wallet!.id,
      },
    });

    const res = await axios.post(
      `http://localhost:3000/api/provider/banktowallet`,
      {
        userId: String(session.user.id),
        amount: Number(body.amount),
      }
    );

    if (res.status !== 200 && res.status !== 500) {
      await prisma.onRampTxn.update({
        where: {
          id: onRamp.id,
        },
        data: {
          status: "Processing",
        },
      });

      return NextResponse.json(
        {
          msg: "we're trying to complete your transaction",
        },
        { status: 500 }
      );
    }

    if (res.status === 500) {
      await prisma.onRampTxn.update({
        where: {
          id: onRamp.id,
        },
        data: {
          status: "Failed",
        },
      });

      return NextResponse.json({
        msg: "transaction not completed",
      });
    }

    await prisma.onRampTxn.update({
      where: {
        id: onRamp.id,
      },
      data: {
        status: "Success",
      },
    });

    //update wallet balance here

    return NextResponse.json({
      msg: "transaction successfull",
    });
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
