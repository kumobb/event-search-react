import React, { useState } from "react";
import SearchForm from "../searchform/SearchForm";

const Search = () => {
  const [events, setEvents] = useState([]);

  const handleReset = () => {
    setEvents([]);
  };

  return (
    <>
      <SearchForm onReset={handleReset} />
    </>
  );
};

export default Search;
