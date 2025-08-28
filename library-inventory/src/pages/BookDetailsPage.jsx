import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchBookById } from "../store/booksSlice";


export default function BookDetailsPage(){
const { id } = useParams();
const dispatch = useDispatch();
const book = useSelector(s => s.books.current);


useEffect(()=>{ dispatch(fetchBookById(id)); }, [dispatch, id]);


if (!book) return <div className="card">Loading...</div>;


return (
<div className="card">
<h2>Book Details</h2>
<p><b>Title:</b> {book.title}</p>
<p><b>Author:</b> {book.author}</p>
<p><b>ISBN:</b> {book.isbn}</p>
<p><b>Genre:</b> {book.genre}</p>
<p><b>Status:</b> {book.available ? "Available" : `Borrowed by ${book.borrower}`}</p>
<Link className="link" to="/">← Back</Link>
</div>
);
}