import { validator } from "@/lib/auth-utils";
import { authOptions } from "@/lib/next-auth-config";
import { prisma } from "@/lib/prisma-config";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await validator()
        const session = await getServerSession(authOptions)

        const walletBal = await prisma.wallet.findUnique({
            where: {
                userId: session.user.id
            }, 
            select: {
                balance: true
            }
        })

        return NextResponse.json({
            walletBal
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            msg: "some error occured"
        })
    }
}