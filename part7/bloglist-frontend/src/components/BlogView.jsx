import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLike } from "../reducers/blogReducer";
import { initializeComments, newComment } from "../reducers/commentReducer";
import { useEffect, useState } from "react";

const BlogView = ({ blog }) => {
  const [comment, setComment] = useState("");
  if (!blog) {
    return null;
  }

  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(initializeComments(blog.id));
  }, []);

  const handleComment = (event) => {
    event.preventDefault();
    dispatch(newComment(blog.id, { content: comment }));
    setComment("");
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
      <form onSubmit={handleComment}>
        <input onChange={(event) => setComment(event.target.value)} />
        <button type="submit">add comment</button>
      </form>
      {comments.map((comment) => (
        <div key={comment._id}>
          <li>{comment.content}</li>
        </div>
      ))}
    </div>
  );
};

export default BlogView;
