import React from "react";
import { useSelector } from "react-redux";


export default function InventorySummary() {
const items = useSelector(s => s.books.items);
const total = items.length;
const borrowed = items.filter(b => !b.available).length;
const available = total - borrowed;


return (
<div className="summary">
<div className="pill">Total: {total}</div>
<div className="pill">Borrowed: {borrowed}</div>
<div className="pill">Available: {available}</div>
</div>
);
}