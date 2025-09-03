import { authOptions } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma-config";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  try {
    if (!body.number || !body.pin) {
      return NextResponse.json(
        {
          msg: "please provide valid phone number and PIN",
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

    const updatedUser = await prisma.user.update({
      where: {
        id: user!.id,
      },
      data: {
        number: body.number,
        pin: body.pin,
      },
      select: {
        number: true,
        pin: true
      }
    });

    return NextResponse.json({
        updatedUser
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
        msg: "something unexpected happened"
    })
  }
}
