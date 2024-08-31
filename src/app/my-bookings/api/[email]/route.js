import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  try {
    const mybookings = await bookingsCollection
      .find({ email: params.email })
      .toArray();
    return NextResponse.json({ mybookings });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error });
  }
};
