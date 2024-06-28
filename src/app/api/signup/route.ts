import { signUpSchema } from "@/schemaValidations";
import prisma from "@/server";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { SignUpBody } from "@//types";



export async function POST(request: Request) {
  try {
    const body: SignUpBody = await request.json();

    // Step 1: Validate the incoming request body against the schema.
    const validation = signUpSchema.safeParse(body);

    if (!validation.success) {
      console.log(validation.error.format());
      return NextResponse.json(
        { error: "Validation Error", details: validation.error.format() },
        { status: 200 }
      );
    }

    // Step 2: Check if a user with the provided email already exists.
    const existingUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      console.log("User with email already exists");
      return NextResponse.json(
        { error: "User with email already exists" },
        { status: 200 }
      );
    }

    // Step 3: Hash the password using bcrypt.
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Step 4: Create the user in the database with the hashed password.
    await prisma.user.create({
      data: {
        name: body.fullName,
        email: body.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User created successfully, now login" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
