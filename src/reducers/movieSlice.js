import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: null,
    filter: "All",
  },
  reducers: {
    add: (state, action) => {
      state.movies = action.payload.data;
    },
    del: (state, action) => {
      console.log(action);
      state.movies = state.movies.filter((item) => {
        return item.id !== action.payload.id;
      });
      if (state.movies.length === 0) {
        state.movies = null;
      }
    },
    like: (state, action) => {
      state.movies = state.movies.map((item) => {
        if (item.id === action.payload.id) {
          if (item.isDisliked === true) {
            item.dislikes--;
            item.isDisliked = false;
            item.likes++;
            item.isLiked = true;
          } else {
            if (item.isLiked === true) {
              item.likes--;
              item.isLiked = false;
            } else {
              item.likes++;
              item.isLiked = true;
            }
          }
        }
        return item;
      });
    },
    dislike: (state, action) => {
      state.movies = state.movies.map((item) => {
        if (item.id === action.payload.id) {
          if (item.isLiked === true) {
            item.likes--;
            item.isLiked = false;
            item.dislikes++;
            item.isDisliked = true;
          } else {
            if (item.isDisliked === true) {
              item.dislikes--;
              item.isDisliked = false;
            } else {
              item.dislikes++;
              item.isDisliked = true;
            }
          }
        }
        return item;
      });
    },
    filter: (state, action) => {
      state.filter = action.payload.filter;
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, del, like, dislike, filter } = movieSlice.actions;

export default movieSlice.reducer;
