import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await connectDB();
  const booksCollection = db.collection("books");
  try {
    const books = await booksCollection.find().toArray();
    return NextResponse.json({ books });
  } catch (error) {
    return NextResponse.json({ message: "No data found", error });
  }
};
