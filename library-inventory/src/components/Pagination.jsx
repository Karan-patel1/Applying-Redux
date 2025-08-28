import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, setFilters } from "../store/booksSlice";


export default function Pagination({ totalEstimate }) {
const dispatch = useDispatch();
const { page, pageSize, items } = useSelector(s => s.books);


const total = totalEstimate ?? items.length; // fallback
const maxPage = Math.max(1, Math.ceil(total / pageSize));


const go = (p) => {
dispatch(setFilters({ page: p }));
dispatch(fetchBooks({ page: p }));
};


return (
<div className="pagination">
<button disabled={page <= 1} onClick={() => go(page - 1)}>Prev</button>
<span>Page {page} / {maxPage}</span>
<button disabled={page >= maxPage} onClick={() => go(page + 1)}>Next</button>
</div>
);
}