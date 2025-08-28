import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBook } from "../features/books/bookThunks";

export default function EditBookModal({ book, onClose }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(book);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBook(formData));
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h3>Edit Book</h3>
        <input name="title" value={formData.title} onChange={handleChange} />
        <input name="author" value={formData.author} onChange={handleChange} />
        <input name="isbn" value={formData.isbn} onChange={handleChange} />
        <input name="genre" value={formData.genre} onChange={handleChange} />
        <button type="submit">Save</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
