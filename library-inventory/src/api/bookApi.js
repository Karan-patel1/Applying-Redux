import axios from "axios";


const api = axios.create({ baseURL: "http://localhost:3001" });


export const fetchBooksApi = async (params) => {
const res = await api.get("/books", { params });
// json-server returns array; to emulate total count for pagination, we'd normally read headers['x-total-count'] when using _page/_limit
return res.data;
};


export const getBookApi = async (id) => (await api.get(`/books/${id}`)).data;
export const addBookApi = async (payload) => (await api.post("/books", payload)).data;
export const updateBookApi = async (payload) => (await api.put(`/books/${payload.id}`, payload)).data;
export const deleteBookApi = async (id) => (await api.delete(`/books/${id}`)).data;