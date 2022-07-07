import { createSlice } from "@reduxjs/toolkit";

// Reducer
export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    search: "",
    gender: "all",
    sortBy: null,
    sortOrder: "ascend",
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

// Selectors
export const selectSearchKeyword = (state) => state.filter.search;
export const selectSortBy = (state) => state.filter.sortBy;
export const selectSortOrder = (state) => state.filter.sortOrder;

// Action creators are generated for each case reducer function
export const { setSearch, setGender, setSortBy, setSortOrder } =
  filterSlice.actions;

export default filterSlice.reducer;
