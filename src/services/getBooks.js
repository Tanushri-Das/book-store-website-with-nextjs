export const getBooks = async () => {
  const res = await fetch("http://localhost:3000/books/api/get-all");
  const books = await res.json();
  return books;
};
