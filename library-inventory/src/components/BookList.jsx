import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, removeBook, setFilters } from "../store/booksSlice";
import EditBookModal from "./EditBookModal";
import Pagination from "./Pagination";
import FilterBar from "./FilterBar";

export default function BookList() {
  const dispatch = useDispatch();
  const { items, loading, error, page, pageSize, search, genre } = useSelector((state) => state.books);

  // Edit Modal
  const [selectedBook, setSelectedBook] = useState(null);

  // Fetch books when filters change
  useEffect(() => {
    dispatch(fetchBooks({ page, pageSize, search, genre }));
  }, [dispatch, page, pageSize, search, genre]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Book List</h2>

      {/* Filter/Search Bar */}
      <FilterBar />

      <table border="1" width="100%" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>ISBN</th>
            <th>Genre</th><th>Available</th><th>Borrower</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.genre}</td>
              <td>{book.available ? "Yes" : "No"}</td>
              <td>{book.borrower || "-"}</td>
              <td>
                <button onClick={() => setSelectedBook(book)}>Edit</button>
                <button
                  onClick={() =>
                    window.confirm("Are you sure?") &&
                    dispatch(removeBook(book.id))
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination />

      {/* Edit Modal */}
      {selectedBook && (
        <EditBookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}