import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./slices/mainSlice";
import blogSlice from "./slices/blogSlice";
import searchSlice from "./slices/searchSlice";
import categorySlice from "./slices/categorySlice";
import adminSlice from "./slices/adminSlice";

export default configureStore({
  reducer: {
    mainReducer: mainSlice,
    blogReducer: blogSlice,
    searchReducer: searchSlice,
    categoryReducer: categorySlice,
    adminReducer: adminSlice,
  },
});
