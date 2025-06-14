import { useSelector, useDispatch } from "react-redux";
import { deleteBlog } from "../reducers/blogReducer";
import { Link } from "react-router-dom";

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
          return (
            <div className="blogStyle" key={blog.id}>
              <div className="blog">
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Blog;
