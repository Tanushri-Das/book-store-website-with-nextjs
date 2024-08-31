import { connectDB } from "@/lib/connectDB";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const newUser = await req.json();
  try {
    const db = await connectDB();
    const usersCollection = db.collection("users");
    const existedUser = await usersCollection.findOne({ email: newUser.email });
    if (existedUser) {
      return NextResponse.json({ message: "User exists" }, { status: 304 });
    }
    const hashedPassword = bcrypt.hashSync(newUser.password, 14);
    const res = await usersCollection.insertOne({
      ...newUser,
      password: hashedPassword,
    });
    return NextResponse.json({ message: "User created" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 400 }
    );
  }
};
