import React from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

function App() {
  return (
    <div className="App">
      <h1>Library Inventory System</h1>
      <BookForm />
      <BookList />
    </div>
  );
}

export default App;
