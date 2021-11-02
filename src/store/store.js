import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../reducers/movieSlice";

export default configureStore({
  reducer: moviesReducer,
});
