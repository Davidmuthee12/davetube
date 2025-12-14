import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb/mongo";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password required" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const users = db.collection("users");

    const user = await users.findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 401 },
      );
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid Credetials" },
        { status: 401 },
      );
    }

    // create session cookie
    const response = NextResponse.json({ success: true });

    response.cookies.set("session", user._id.toString(), {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
