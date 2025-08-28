import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // ✅ added
import { Link } from "react-router-dom";
import { fetchBooks, removeBook, saveBook } from "../store/booksSlice";
import Pagination from "./Pagination";

export default function BookTable() {
  const dispatch = useDispatch();
  const { items, loading, page, pageSize, search, genre, sortBy, order } =
    useSelector((s) => s.books);
  const [editRow, setEditRow] = useState(null); // inline modal-like editor

  useEffect(() => {
    dispatch(fetchBooks({ page, pageSize, search, genre, sortBy, order }));
  }, [dispatch, page, pageSize, search, genre, sortBy, order]);

  if (loading) return <div className="card">Loading...</div>;

  const onBorrowToggle = (b) => {
    const updated = {
      ...b,
      available: !b.available,
      borrower: b.available ? b.borrower : "",
    };
    dispatch(saveBook(updated)); // ✅ actually save toggle
  };

  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Genre</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.isbn}</td>
              <td>{b.genre}</td>
              <td>
                {b.available ? (
                  <span className="tag success">Available</span>
                ) : (
                  <span className="tag warn">Borrowed by {b.borrower}</span>
                )}
              </td>
              <td className="row-actions">
                <button onClick={() => setEditRow(b)}>Edit</button>
                <button
                  className="danger"
                  onClick={() => {
                    if (window.confirm("Delete this book?"))
                      dispatch(removeBook(b.id));
                  }}
                >
                  Delete
                </button>
                <button onClick={() => onBorrowToggle(b)}>
                  {b.available ? "Borrow" : "Return"}
                </button>
                <Link className="link" to={`/books/${b.id}`}>
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination (json-server paginates server-side when _page/_limit used; here we estimate) */}
      <Pagination />

      {editRow && <EditModal book={editRow} onClose={() => setEditRow(null)} />}
    </div>
  );
}

/* inline modal component inside same file for brevity */
function EditModal({ book, onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(book);

  const submit = (e) => {
    e.preventDefault();
    dispatch(saveBook(form));
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Edit Registration</h3>
        <form onSubmit={submit} className="grid">
          <label>
            Title
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </label>
          <label>
            Author
            <input
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
          </label>
          <label>
            ISBN
            <input
              value={form.isbn}
              onChange={(e) => setForm({ ...form, isbn: e.target.value })}
            />
          </label>
          <label>
            Genre
            <select
              value={form.genre}
              onChange={(e) => setForm({ ...form, genre: e.target.value })}
            >
              <option>Fiction</option>
              <option>Non-Fiction</option>
              <option>History</option>
              <option>Tech</option>
            </select>
          </label>
          <label className="switch">
            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) =>
                setForm({
                  ...form,
                  available: e.target.checked,
                  borrower: e.target.checked ? "" : form.borrower,
                })
              }
            />
            <span>Available</span>
          </label>
          {!form.available && (
            <input
              placeholder="Borrower name"
              value={form.borrower}
              onChange={(e) =>
                setForm({ ...form, borrower: e.target.value })
              }
            />
          )}
          <div className="row end">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
