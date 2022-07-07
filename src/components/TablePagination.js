import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPageTotal,
  setPage,
} from "../features/pagination/paginationSlice";
import Pagination from "@mui/material/Pagination";

function TablePagination() {
  const dispatch = useDispatch();
  const pageTotal = useSelector(selectPageTotal);

  const handleChange = (event, value) => {
    dispatch(setPage(value));
  };

  return (
    <div className="table-pagination">
      <Pagination
        count={pageTotal}
        defaultPage={1}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </div>
  );
}

export default TablePagination;
