// src/SearchForm.js
import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    // Only perform the search if the search term is not empty
    if (searchTerm.trim()) {
      handleSearch(searchTerm.trim());
    }
  }

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div className="SearchForm">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchTerm"
          placeholder="Enter search term..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SearchForm;