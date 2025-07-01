import React from "react";
import "./Search.css";
import { SearchIcon } from "../Icons/SearchIcon";
function Search() {
  return (
    <>
      <article className="search">
        <input className="search__input" type="text" placeholder="Buscar" />
        <SearchIcon />
      </article>
    </>
  );
}

export { Search };
