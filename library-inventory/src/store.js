import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./store/booksSlice";


export const store = configureStore({
reducer: { books: booksReducer },
});