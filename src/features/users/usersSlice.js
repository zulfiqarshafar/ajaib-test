import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sortArray } from "../../utils/helper";
import {
  selectSearchKeyword,
  selectSortBy,
  selectSortOrder,
} from "../filter/filterSlice";
import {
  selectPageNumber,
  selectPageSize,
} from "../pagination/paginationSlice";

// Thunks
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (searchParams, thunkAPI) => {
    const response = await fetch(`https://randomuser.me/api/${searchParams}`);
    const json = await response.json();
    return json;
  }
);

// Reducer
export const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.list = action.payload.results;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Selectors
export const selectUsers = (state) => state.users.list;

export const selectSortedUsers = (state) => {
  const users = selectUsers(state);
  const sortBy = selectSortBy(state);
  const sortOrder = selectSortOrder(state);

  return sortArray(users, sortBy, sortOrder);
};

export const selectPaginatedUsers = (state) => {
  let users = selectUsers(state);
  const sortBy = selectSortBy(state);
  const pageNumber = selectPageNumber(state);
  const pageSize = selectPageSize(state);

  if (sortBy != null) {
    users = selectSortedUsers(state);
  }

  return users.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

// User list filtered by search keyword
// Bisa digunakan jika data bukan random
export const selectFilteredUsers = (state) => {
  const users = selectUsers(state);
  const searchKeyword = selectSearchKeyword(state);

  return users.filter((user) => {
    return (
      user.name.first.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      user.name.last.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      user.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      user.login.username.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  });
};

export default usersSlice.reducer;
