import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const commentSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload;
    },
    addComment(state, action) {
      return action.payload;
    },
  },
});

export const { setComments, addComment } = commentSlice.actions;

export const initializeComments = (id) => {
  return async (dispatch) => {
    const comments = await blogService.getComments(id);
    dispatch(setComments(comments));
  };
};

export const newComment = (id, comment) => {
  return async (dispatch) => {
    const createdComment = await blogService.comment(id, comment);
    dispatch(addComment(createdComment.comments));
  };
};

export default commentSlice.reducer;
