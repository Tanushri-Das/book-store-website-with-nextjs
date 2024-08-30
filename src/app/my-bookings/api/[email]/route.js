import { connectDB } from "@/lib/connectDB";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  try {
    const mybookings = await bookingsCollection
      .find({ email: params.email })
      .toArray();
    return Response.json({ mybookings });
  } catch (error) {
    console.log(error);
  }
};
