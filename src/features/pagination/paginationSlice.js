import { createSlice } from "@reduxjs/toolkit";

// Reducer
export const paginationSlice = createSlice({
  name: "page",
  initialState: {
    number: 1,
    size: 10,
    total: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.number = action.payload;
    },
    setPageSize: (state, action) => {
      state.size = action.payload;
    },
    setPageTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

// Selectors
export const selectPageNumber = (state) => state.page.number;
export const selectPageSize = (state) => state.page.size;
export const selectPageTotal = (state) => state.page.total;

// Action creators are generated for each case reducer function
export const { setPage, setPageSize, setPageTotal } = paginationSlice.actions;

export default paginationSlice.reducer;
