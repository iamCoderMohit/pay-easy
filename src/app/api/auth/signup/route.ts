import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma-config";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      return NextResponse.json(
        {
          error: "user already exists!!",
        },
        { status: 500 }
      );
    }

    const passHash = await bcrypt.hash(body.password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: passHash,
      },
    });

    return NextResponse.json({
      newUser,
    });
  } catch (error) {
    console.error(error)
    return NextResponse.json({
        error: "some error occured"
    })
  }
}

//was trying to access using postman