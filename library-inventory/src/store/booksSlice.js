import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
fetchBooksApi,
addBookApi,
updateBookApi,
deleteBookApi,
getBookApi,
} from "../api/bookApi";


// Thunks
export const fetchBooks = createAsyncThunk(
"books/fetch",
async ({ page = 1, pageSize = 5, search = "", genre = "", sortBy = "createdAt", order = "desc" } = {}) => {
// json-server supports _page, _limit, q, _sort, _order, genre_like
const params = {
_page: page,
_limit: pageSize,
q: search || undefined,
_sort: sortBy,
_order: order,
...(genre ? { genre } : {}),
};
return await fetchBooksApi(params);
}
);


export const fetchBookById = createAsyncThunk("books/getOne", async (id) => await getBookApi(id));
export const createBook = createAsyncThunk("books/create", async (payload) => await addBookApi(payload));
export const saveBook = createAsyncThunk("books/save", async (payload) => await updateBookApi(payload));
export const removeBook = createAsyncThunk("books/remove", async (id) => {
await deleteBookApi(id);
return id;
});
const initialState = {
items: [],
total: 0, // optional if you later read X-Total-Count; for now we infer client-side
loading: false,
error: null,
page: 1,
pageSize: 5,
search: "",
genre: "",
sortBy: "createdAt",
order: "desc",
current: null, // single book for details view
};


const booksSlice = createSlice({
name: "books",
initialState,
reducers: {
setFilters(state, action) {
const { page, pageSize, search, genre, sortBy, order } = action.payload;
if (page !== undefined) state.page = page;
if (pageSize !== undefined) state.pageSize = pageSize;
if (search !== undefined) state.search = search;
if (genre !== undefined) state.genre = genre;
if (sortBy !== undefined) state.sortBy = sortBy;
if (order !== undefined) state.order = order;
},
},
extraReducers: (builder) => {
builder
.addCase(fetchBooks.pending, (s) => {
s.loading = true; s.error = null;
})
.addCase(fetchBooks.fulfilled, (s, a) => {
s.loading = false; s.items = a.payload; s.total = a.payload.length; // approximate when json-server paginates
})
.addCase(fetchBooks.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })


.addCase(fetchBookById.fulfilled, (s, a) => { s.current = a.payload; })


.addCase(createBook.fulfilled, (s, a) => { s.items.unshift(a.payload); })
.addCase(saveBook.fulfilled, (s, a) => {
const idx = s.items.findIndex(b => b.id === a.payload.id);
if (idx !== -1) s.items[idx] = a.payload;
if (s.current && s.current.id === a.payload.id) s.current = a.payload;
})
.addCase(removeBook.fulfilled, (s, a) => { s.items = s.items.filter(b => b.id !== a.payload); });
}
});


export const { setFilters } = booksSlice.actions;
export default booksSlice.reducer;