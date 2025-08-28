import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/books';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
});

export const addBook = createAsyncThunk('books/addBook', async (book) => {
  const res = await axios.post(BASE_URL, book);
  return res.data;
});

export const updateBook = createAsyncThunk('books/updateBook', async (book) => {
  const res = await axios.put(`${BASE_URL}/${book.id}`, book);
  return res.data;
});

export const deleteBook = createAsyncThunk('books/deleteBook', async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
});
