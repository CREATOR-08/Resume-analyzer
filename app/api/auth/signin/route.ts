import prisma from '@/lib/prisma';
import { verifyPassword } from '@/lib/hash';
import { createSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    if (!user.password) {
      return NextResponse.json(
        {
          error:
            "This account uses OAuth. Please sign in with Google or GitHub.",
        },
        { status: 401 }
      );
    }

    const isPasswordValid = verifyPassword(password, user.password || '')

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    await createSession(user.id);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "Signed in successfully",
        user: userWithoutPassword,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
