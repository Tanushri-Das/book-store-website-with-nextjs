import { books } from "@/lib/books";
import { connectDB } from "@/lib/connectDB";

export const GET = async () => {
  const db = await connectDB();
  const booksCollection = db.collection("books");
  try {
    await booksCollection.deleteMany();
    const res = await booksCollection.insertMany(books);
    return Response.json({ message: "Seeded Successfully" });
  } catch (error) {
    console.log(error);
  }
};
