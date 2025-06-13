import { useState } from "react";
import blogService from "../services/blogs";
import { useSelector, useDispatch } from "react-redux"
import { setLike, deleteBlog } from "../reducers/blogReducer";

const Blog = (props) => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const removeBlog = (blog) => {
    if (
      window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    ) {
      dispatch(deleteBlog(blog, props.user.token))
    }
  };

  return (
    <div>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => 
          <div className="blogStyle" key={blog.id}>
            <div style={hideWhenVisible} className="blog">
              {blog.title} {blog.author}
              <button onClick={toggleVisibility}>view</button>
            </div>
            <div style={showWhenVisible} className="togglableContent">
              {blog.title} {blog.author}
              <button onClick={toggleVisibility}>hide</button>
              <p>{blog.url}</p>
              <p>
                likes {blog.likes}
                <button onClick={() => dispatch(setLike(blog))}>like</button>
              </p>
              <p>{blog.user.name}</p>
              {blog.user.username === props.user.username && (
                <button onClick={() => removeBlog(blog)}>remove</button>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default Blog;
