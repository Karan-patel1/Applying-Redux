import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import BookDetailsPage from "./pages/BookDetailsPage";


export default function AppShell() {
return (
<div className="container">
<header className="app-header">
<h1>📚 Library Inventory</h1>
<nav>
<NavLink to="/" end>Home</NavLink>
</nav>
</header>
<main>
<Routes>
<Route path="/" element={<Dashboard />} />
<Route path="/books/:id" element={<BookDetailsPage />} />
</Routes>
</main>
</div>
);
}