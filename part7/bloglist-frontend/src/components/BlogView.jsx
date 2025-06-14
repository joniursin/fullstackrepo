import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLike } from "../reducers/blogReducer";
import { initializeComments, newComment } from "../reducers/commentReducer";
import { useEffect } from "react";

const BlogView = ({ blog }) => {
  if (!blog) {
    return null;
  }

  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(initializeComments(blog.id));
  }, []);

  const handleComment = () => {
    dispatch(newComment(blog.id, { content: "comment1" }));
  };

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
      <h3>comments</h3>
      <button onClick={handleComment}>Post Comment</button>
      {comments.map((comment) => (
        <div key={comment._id}>
          <li>{comment.content}</li>
        </div>
      ))}
    </div>
  );
};

export default BlogView;
