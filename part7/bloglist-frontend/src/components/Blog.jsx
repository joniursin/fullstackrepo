import { useSelector, useDispatch } from "react-redux";
import { setLike, deleteBlog, toggleVisibility } from "../reducers/blogReducer";

const Blog = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog, user.token));
    }
  };

  return (
    <div>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => {
          const hideWhenVisible = { display: blog.visible ? "none" : "" };
          const showWhenVisible = { display: blog.visible ? "" : "none" };
          return (
            <div className="blogStyle" key={blog.id}>
              <div style={hideWhenVisible} className="blog">
                {blog.title} {blog.author}
                <button onClick={() => dispatch(toggleVisibility(blog.id))}>
                  view
                </button>
              </div>
              <div style={showWhenVisible} className="togglableContent">
                {blog.title} {blog.author}
                <button onClick={() => dispatch(toggleVisibility(blog.id))}>
                  hide
                </button>
                <p>{blog.url}</p>
                <p>
                  likes {blog.likes}
                  <button onClick={() => dispatch(setLike(blog))}>like</button>
                </p>
                <p>{blog.user.name}</p>
                {blog.user.username === user.username && (
                  <button onClick={() => removeBlog(blog)}>remove</button>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Blog;
