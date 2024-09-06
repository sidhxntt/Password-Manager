import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma';

interface User {
  sub: string;
  first_name: string;
  last_name: string;
  full_name: string;
  primary_email: string;
  profile_pic: string;
  createdAt: number;
  updatedAt: number;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const user = (req as NextRequest & { user: User }).user;
    
    const {
      sub,
      first_name,
      last_name,
      full_name,
      primary_email,
      profile_pic,
      createdAt,
      updatedAt,
    } = user;

    const { name, websiteLink, Username, password } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { userID: sub },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          userID: sub,
          first_name,
          last_name,
          full_name,
          primary_email,
          profile_pic,
          createdAt,
          updatedAt,
        },
      });
    }

    const existingAccount = await prisma.account.findFirst({
      where: {
        OR: [{ name }, { website_link: websiteLink }],
      },
    });

    if (!existingAccount) {
      await prisma.account.create({
        data: {
          name,
          website_link: websiteLink,
          username: Username,
          password,
          userId: sub,
        },
      });

      return NextResponse.json({ message: "Account created successfully" }, { status: 201 });
    } else {
      return NextResponse.json({ message: "This account is already saved. Please enter a new one" }, { status: 400 });
    }
  } catch (err) {
    const error = err as Error;
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}