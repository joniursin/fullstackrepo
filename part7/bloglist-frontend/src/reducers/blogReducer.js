import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push({ ...action.payload, visible: false });
    },
    updateLike(state, action) {
      const id = action.payload.id;
      const findBlog = state.find((n) => n.id === id);
      const changedBlog = { ...findBlog, likes: findBlog.likes + 1 };
      return state.map((b) => (b.id !== id ? b : changedBlog));
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id);
    },
    toggleBlogVisibility(state, action) {
      const findBlog = state.find((b) => b.id === action.payload);
      if (findBlog) {
        findBlog.visible = !findBlog.visible;
      }
    },
  },
});

export const {
  setBlogs,
  addBlog,
  updateLike,
  removeBlog,
  toggleBlogVisibility,
} = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const newBlog = (blog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(blog);
    dispatch(addBlog(createdBlog));
  };
};

export const setLike = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });
    dispatch(updateLike(updatedBlog));
  };
};

export const deleteBlog = (blog, token) => {
  return async (dispatch) => {
    await blogService.remove(blog.id, token);
    dispatch(removeBlog(blog));
  };
};

export const toggleVisibility = (id) => {
  return async (dispatch) => {
    dispatch(toggleBlogVisibility(id));
  };
};

export default blogSlice.reducer;
