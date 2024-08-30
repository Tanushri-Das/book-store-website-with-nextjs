import { connectDB } from "@/lib/connectDB";

export const POST = async (req) => {
  const newBooking = await req.json();
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  try {
    const res = await bookingsCollection.insertOne(newBooking);
    return Response.json(
      { message: "Book added cart successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "Something went wrong" }, { status: 400 });
  }
};
