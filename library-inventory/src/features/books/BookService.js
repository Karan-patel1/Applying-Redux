import axios from "axios";

const API_URL = "http://localhost:3001/books"; // Mock API

const getAllBooks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

const addBook = async (book) => {
  const res = await axios.post(API_URL, book);
  return res.data;
};

const updateBook = async (book) => {
  const res = await axios.put(`${API_URL}/${book.id}`, book);
  return res.data;
};

const deleteBook = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export default { getAllBooks, addBook, updateBook, deleteBook };
