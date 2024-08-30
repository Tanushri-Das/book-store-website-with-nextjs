import { connectDB } from "@/lib/connectDB";

export const GET = async () => {
  const db = await connectDB();
  const booksCollection = db.collection("books");
  try {
    const books = await booksCollection.find().toArray();
    return Response.json({ books });
  } catch (error) {
    console.log(error);
  }
};
