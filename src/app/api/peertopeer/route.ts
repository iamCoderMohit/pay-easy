import { authOptions } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma-config";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const session = await getServerSession(authOptions);

    if (!body.number || !body.amount || !body.pin) {
      return NextResponse.json(
        {
          msg: "please provide valid details",
        },
        { status: 500 }
      );
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id
        }
    })

    if(user?.pin !== body.pin){
        return NextResponse.json({
            msg: "invalid pin"
        }, {status: 500})
    }

    const wallet = await prisma.wallet.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (wallet!?.balance < body.amount) {
      return NextResponse.json(
        {
          msg: "not enough balance",
        },
        { status: 500 }
      );
    }

    const toUser = await prisma.user.findUnique({
      where: {
        number: body.number,
      },
    });

    if (!toUser) {
      return NextResponse.json(
        {
          msg: "this user doesnt exist",
        },
        { status: 500 }
      );
    }

    const toUserWallet = await prisma.wallet.findUnique({
      where: {
        userId: toUser.id,
      },
    });

    if (!toUserWallet) {
      return NextResponse.json(
        {
          msg: "this user doesnt have a wallet",
        },
        { status: 500 }
      );
    }

      const offRampTxnId = await prisma.offRampTxn.create({
        data: {
          amount: body.amount,
          status: "Pending",
          userId: session.user.id,
          walletId: wallet!.id,
        },
      })

      const onRampTxnId = await prisma.onRampTxn.create({
        data: {
          amount: body.amount,
          status: "Pending",
          userId: toUser.id,
          walletId: toUserWallet.id,
        },
      })

    const result = await prisma.$transaction([
      prisma.wallet.update({
        where: {
          id: wallet?.id,
        },
        data: {
          balance: {
            decrement: body.amount,
          },
        },
      }),

      prisma.wallet.update({
        where: {
          id: toUserWallet.id,
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
          msg: "transaction failed",
        },
        { status: 500 }
      );
    }

    const updatedtxndetails = await prisma.$transaction([
      prisma.offRampTxn.update({
        where: {
          id: offRampTxnId.id,
        },
        data: {
          status: "Success",
        },
      }),

      prisma.onRampTxn.update({
        where: {
          id: onRampTxnId.id,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    if (!updatedtxndetails) {
      return NextResponse.json(
        {
          msg: "transaction done!! but there was error updating the txn records",
        },
        { status: 500 }
      );
    }

    const peertopeer = await prisma.peerToPeer.create({
      data: {
        fromId: session.user.id,
        toId: toUser.id,
        amount: body.amount,
      },
    });

    if (!peertopeer) {
      return NextResponse.json({
        msg: "transaction done!! but there was error updating the records",
      });
    }

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