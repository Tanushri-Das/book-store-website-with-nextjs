import React from "react";
import BookCard from "../cards/BookCard";
import { getBooks } from "@/services/getBooks";

const Books = async () => {
  const { books } = await getBooks();
  return (
    <div className="m-4 md:m-12">
      <h3 className="font-bold text-primary text-3xl text-center mb-2">
        Books
      </h3>
      <h5 className="text-[#151515] text-xl font-bold mb-4 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </h5>
      <p className="text-[#737373] text-[16px] font-normal mb-10 w-full max-w-[717px] mx-auto text-center capitalize">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto,
        omnis odit corporis perspiciatis nihil cumque laboriosam quo nemo
        explicabo repellendus delectus praesentium, necessitatibus sit suscipit
        excepturi voluptates quam?
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.length > 0 &&
          books?.map((book) => <BookCard key={book._id} book={book} />)}
      </div>
    </div>
  );
};

export default Books;
