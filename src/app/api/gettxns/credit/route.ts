import { authOptions } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma-config";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    const credit = await prisma.onRampTxn.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      credit,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        msg: "something unexpected happend",
      },
      { status: 500 }
    );
  }
}
