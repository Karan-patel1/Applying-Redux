import React from "react";
import BookForm from "../components/BookForm";
import FilterBar from "../components/FilterBar";
import InventorySummary from "../components/InventorySummary";
import BookTable from "../components/BookTable";


export default function Dashboard(){
return (
<div className="stack">
<InventorySummary />
<BookForm />
<FilterBar />
<BookTable />
</div>
);
}