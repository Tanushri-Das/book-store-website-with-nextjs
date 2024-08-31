import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  try {
    const res = await bookingsCollection.deleteOne({
      _id: new ObjectId(params.id),
    });
    return NextResponse.json({
      message: "Deleted bookings successfully",
      response: res,
    });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" });
  }
};

export const PATCH = async (req, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  const { address, date, phone } = await req.json();
  try {
    const res = await bookingsCollection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { address, date, phone } },
      { upsert: true }
    );
    return NextResponse.json({
      message: "Updated the booking successfully",
      response: res,
    });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" });
  }
};

export const GET = async (req, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  try {
    const res = await bookingsCollection.findOne({
      _id: new ObjectId(params.id),
    });
    return NextResponse.json({
      message: "Booking found successfully",
      response: res,
    });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" });
  }
};
