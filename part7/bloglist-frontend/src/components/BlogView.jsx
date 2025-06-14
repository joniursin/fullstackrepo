import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLike } from "../reducers/blogReducer";

const BlogView = ({ blog }) => {
  const dispatch = useDispatch();
  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <Link to={blog.url}>{blog.url}</Link>
      <p>
        {blog.likes} likes{" "}
        <button onClick={() => dispatch(setLike(blog))}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
    </div>
  );
};

export default BlogView;
