import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
import filterReducer from "../features/filter/filterSlice";
import paginationReducer from "../features/pagination/paginationSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    filter: filterReducer,
    page: paginationReducer,
  },
});
