import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { setSearch } from "../features/filter/filterSlice";

function SearchBox() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.filter.search);

  const searchRef = useRef();

  const handleSearch = () => {
    dispatch(setSearch(searchRef.current.value));
  };

  useEffect(() => {
    searchRef.current.value = search;
  }, [search]);

  return (
    <div className="search-filter">
      <TextField
        inputRef={searchRef}
        id="search-filter__input"
        label="Search"
        size="small"
        onKeyUp={(event) => {
          if (event.key == "Enter") handleSearch();
        }}
      />
      <Button
        variant="contained"
        sx={{ height: "100%" }}
        onClick={handleSearch}
      >
        <SearchIcon />
      </Button>
    </div>
  );
}

export default SearchBox;
