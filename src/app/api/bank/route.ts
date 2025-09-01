import { authOptions } from "@/lib/next-auth-config"
import { prisma } from "@/lib/prisma-config"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(req: Request){
    const session = await getServerSession(authOptions)
    try {
        if(!session?.user?.email){
            return NextResponse.json({
                "error": "sign in to process further!!"
            }, {status: 500})
        }
        const user = await prisma.user.findUnique({
            where: {
                email: session.user?.email
            }
        })
        if(!user){
            return NextResponse.json({
                error: "user not found"
            }, {status: 500})
        }
        const bankAc = await prisma.bank.create({
            data: {
                userId: user.id,
            }
        })

        return NextResponse.json({
            bankAc
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            error: "something bad happened"
        }, {status: 500})
    }
}
