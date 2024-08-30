import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export const DELETE = async (req, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  try {
    const res = await bookingsCollection.deleteOne({
      _id: new ObjectId(params.id),
    });
    return Response.json({
      message: "Deleted bookings successfully",
      response: res,
    });
  } catch (error) {
    return Response.json({ message: "Something went wrong" });
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
    return Response.json({
      message: "Updated the booking successfully",
      response: res,
    });
  } catch (error) {
    return Response.json({ message: "Something went wrong" });
  }
};

export const GET = async (req, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  try {
    const res = await bookingsCollection.findOne({
      _id: new ObjectId(params.id),
    });
    return Response.json({
      message: "Booking found successfully",
      response: res,
    });
  } catch (error) {
    return Response.json({ message: "Something went wrong" });
  }
};
