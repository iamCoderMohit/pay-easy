import { authOptions } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma-config";
import axios from "axios";
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

    const offRamp = await prisma.offRampTxn.create({
      data: {
        amount: body.amount,
        status: "Pending",
        userId: user.id,
        walletId: wallet!.id
      }
    })

    const res = await axios.post(`http://localhost:3000/api/provider/wallettobank`, {
      userId: String(user.id),
      amount: Number(body.amount)
    })

    if(res.status === 404 || res.status === 500){
      await prisma.offRampTxn.update({
        where: {
          id: offRamp.id
        }, data: {
          status: "Failed"
        }
      })

      return NextResponse.json({
        msg: "transaction failed please try again"
      }, {status: 500})
    }

    if(res.status !== 200 && res.status !== 500 && res.status !== 404){
      await prisma.offRampTxn.update({
        where: {
          id: offRamp.id
        }, data: {
          status: "Processing"
        }
      })

      return NextResponse.json({
        msg: "we are trying to complete your transaction"
      })
    }

    await prisma.wallet.update({
      where: {
        id: wallet?.id
      }, data : {
        balance: {
          decrement: body.amount
        }
      }
    })

    const result = await prisma.offRampTxn.update({
      where: {
        id: offRamp.id
      }, data: {
        status: "Success"
      }
    })

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
