import { prisma } from "@/lib/prisma-config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      take: 5,
      select: {
        name: true,
        number: true,
        wallet: {
          select: {
            balance: true,
          },
        },
      },
    });

    return NextResponse.json({
        users
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
        msg: "some error occurd"
    }, {status: 500})
  }
}
