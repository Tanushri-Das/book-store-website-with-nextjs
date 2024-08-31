import axios from "axios";

export const getBooks = async () => {
  try {
    const res = await axios.get(
      `http://localhost:3000/books/api/get-all`
    );
    return res.data;
  } catch (error) {
    // console.log(error);
    return [];
  }
};
