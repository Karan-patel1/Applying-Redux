import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBook } from "../store/booksSlice";
const BookForm = () => {
  const dispatch = useDispatch();
  const empty = {
    title: "",
    author: "",
    isbn: "",
    genre: "Fiction",
    available: true,
    borrower: "",
  };

  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();

    // simple validation
    let errs = {};
    if (!form.title) errs.title = "Title is required";
    if (!form.author) errs.author = "Author is required";
    if (!form.isbn) errs.isbn = "ISBN is required";

    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      console.log("Book Registered:", form);
      dispatch(createBook(form))
      setForm(empty); // reset form
      setErrors({});
    }
}

  const bind = (k) => ({
    name: k,
    value: form[k],
    onChange: (e) =>
      setForm((s) => ({
        ...s,
        [k]: e.target.value,
      })),
  });

  return (
    <form className="card" onSubmit={onSubmit} noValidate>
      <h2>Register Book</h2>
      <div className="grid">
        <label>
          Title
          <input {...bind("title")} placeholder="Book Title" required />
        </label>
        {errors.title && <small className="error">{errors.title}</small>}

        <label>
          Author
          <input {...bind("author")} placeholder="Author" required />
        </label>
        {errors.author && <small className="error">{errors.author}</small>}

        <label>
          ISBN
          <input {...bind("isbn")} placeholder="10 or 13 digits" required />
        </label>
        {errors.isbn && <small className="error">{errors.isbn}</small>}

        <label>
          Genre
          <select {...bind("genre")}>
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>History</option>
            <option>Tech</option>
          </select>
        </label>
      </div>

      <div className="row">
        <label className="switch">
          <input
            type="checkbox"
            checked={form.available}
            onChange={(e) =>
              setForm((s) => ({
                ...s,
                available: e.target.checked,
                borrower: e.target.checked ? "" : s.borrower,
              }))
            }
          />
          <span>Available</span>
        </label>

        {!form.available && (
          <input {...bind("borrower")} placeholder="Borrower name" />
        )}
      </div>

      <button type="submit" className="primary">
        Submit
      </button>
    </form>
  );
};

export default BookForm;
