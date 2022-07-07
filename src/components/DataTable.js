import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectPaginatedUsers } from "../features/users/usersSlice";
import { setSortBy, setSortOrder } from "../features/filter/filterSlice";
import {
  setPageSize,
  setPageTotal,
} from "../features/pagination/paginationSlice";
import { convertDateTime, generateSearchParams } from "../utils/helper";

import TableCellContent from "./TableCellContent";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#d9d9d9",
    fontWeight: 600,
    ["&:hover"]: {
      backgroundColor: "#c2c2c2",
      cursor: "pointer",
    },
  },
}));

function DataTable() {
  const dispatch = useDispatch();
  const users = useSelector(selectPaginatedUsers);
  const page = useSelector((state) => state.page.number);
  const search = useSelector((state) => state.filter.search);
  const gender = useSelector((state) => state.filter.gender);
  const sortBy = useSelector((state) => state.filter.sortBy);
  const sortOrder = useSelector((state) => state.filter.sortOrder);

  const toggleSort = (toggleSortBy) => {
    let toggleSortOrder = sortOrder;
    if (sortBy != toggleSortBy || sortOrder == "descend") {
      toggleSortOrder = "ascend";
    } else {
      toggleSortOrder = "descend";
    }
    dispatch(setSortOrder(toggleSortOrder));
  };

  const handleSort = (event) => {
    toggleSort(event.target.innerText.toLowerCase());
    dispatch(setSortBy(event.target.innerText.toLowerCase()));
  };

  // Handle search parameters and fetch users
  useEffect(() => {
    const paramsObject = {
      page: page,
      pageSize: 5,
      results: 10,
      keyword: search,
      gender: gender,
      sortBy: sortBy,
      sortOrder: sortOrder,
    };

    dispatch(setPageSize(paramsObject.pageSize));
    dispatch(setPageTotal(paramsObject.results / paramsObject.pageSize));

    const searchParams = generateSearchParams(paramsObject);
    dispatch(fetchUsers(searchParams));
  }, [page, search, gender, sortBy, sortOrder]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: "#d9d9d9",
              }}
            >
              <StyledTableCell onClick={handleSort}>
                <TableCellContent
                  title="Username"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                />
              </StyledTableCell>
              <StyledTableCell onClick={handleSort}>
                <TableCellContent
                  title="Name"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                />
              </StyledTableCell>
              <StyledTableCell onClick={handleSort}>
                <TableCellContent
                  title="Email"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                />
              </StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>Registered Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.login.username}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.login.username}
                </TableCell>
                <TableCell>
                  {user.name.first} {user.name.last}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{convertDateTime(user.registered.date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DataTable;
