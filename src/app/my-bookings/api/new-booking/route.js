import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const newBooking = await req.json();
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  try {
    const res = await bookingsCollection.insertOne(newBooking);
    return NextResponse.json(
      { message: "Book added cart successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 400 });
  }
};
