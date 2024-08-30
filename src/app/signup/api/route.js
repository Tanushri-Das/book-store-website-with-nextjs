import { connectDB } from "@/lib/connectDB";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  const newUser = await request.json();
  try {
    const db = await connectDB();
    const usersCollection = db.collection("users");
    const existedUser = await usersCollection.findOne({ email: newUser.email });
    if (existedUser) {
      return Response.json({ message: "User exists" }, { status: 304 });
    }
    const hashedPassword = bcrypt.hashSync(newUser.password, 14);
    const res = await usersCollection.insertOne({
      ...newUser,
      password: hashedPassword,
    });
    return Response.json({ message: "User created" }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Something went wrong", error },
      { status: 400 }
    );
  }
};
