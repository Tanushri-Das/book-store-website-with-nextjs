import { books } from "@/lib/books";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await connectDB();
  const booksCollection = db.collection("books");
  try {
    await booksCollection.deleteMany();
    const res = await booksCollection.insertMany(books);
    return NextResponse.json({ message: "Seeded Successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error });
  }
};
