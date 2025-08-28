import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilters, fetchBooks } from "../store/booksSlice"; // adjust path if needed

const FilterBar = () => {
  const dispatch = useDispatch();

  // read values from Redux store
  const { search, genre, sortBy, order, pageSize } = useSelector(
    (s) => s.books
  );

  // helper function to apply filters
  const apply = (patch) => {
    dispatch(setFilters(patch));
    dispatch(fetchBooks({ ...patch }));
  };

  return (
    <div className="filterbar card">
      <input
        placeholder="Search by title/author/isbn"
        value={search}
        onChange={(e) => apply({ search: e.target.value, page: 1 })}
      />

      <select
        value={genre}
        onChange={(e) => apply({ genre: e.target.value || "", page: 1 })}
      >
        <option value="">All Genres</option>
        <option>Fiction</option>
        <option>Non-Fiction</option>
        <option>History</option>
        <option>Tech</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => apply({ sortBy: e.target.value })}
      >
        <option value="createdAt">Newest</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>

      <select
        value={order}
        onChange={(e) => apply({ order: e.target.value })}
      >
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>

      <select
        value={pageSize}
        onChange={(e) => apply({ pageSize: Number(e.target.value), page: 1 })}
      >
        <option value={5}>5 / page</option>
        <option value={10}>10 / page</option>
      </select>
    </div>
  );
};

export default FilterBar;
