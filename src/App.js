import React from "react";
import { useDispatch } from "react-redux";
import { setPage } from "./features/pagination/paginationSlice";
import {
  setGender,
  setSearch,
  setSortBy,
  setSortOrder,
} from "./features/filter/filterSlice";
import DataTable from "./components/DataTable";
import GenderSelection from "./components/GenderSelection";
import SearchBox from "./components/SearchBox";
import TablePagination from "./components/TablePagination";
import Button from "@mui/material/Button";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(setPage(1));
    dispatch(setSearch(""));
    dispatch(setGender("all"));
    dispatch(setSortBy(null));
    dispatch(setSortOrder("ascend"));
  };

  return (
    <div className="app">
      <h1 className="app__title">User Data</h1>
      <div className="app__filter">
        <SearchBox />
        <GenderSelection />
        <Button
          variant="contained"
          sx={{ height: "100%", textTransform: "none" }}
          onClick={handleReset}
        >
          Reset Filter
        </Button>
      </div>
      <DataTable />
      <TablePagination />
    </div>
  );
}

export default App;
