import { useSelector, useDispatch } from "react-redux";
import { deleteBlog } from "../reducers/blogReducer";
import { Link } from "react-router-dom";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { newBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useRef } from "react";
import { Table } from "react-bootstrap";

const Blog = () => {
  const blogFormRef = useRef();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog, user.token));
    }
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      await dispatch(newBlog(blogObject));
      dispatch(
        setNotification(
          {
            notification: `a new blog ${blogObject.title} by ${blogObject.author} added`,
            type: "notification",
          },
          5000,
        ),
      );
    } catch (exception) {
      dispatch(
        setNotification(
          { notification: "blog creation failed", type: "error" },
          5000,
        ),
      );
    }
  };

  return (
    <div>
      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} user={user} />
      </Togglable>

      <Table striped bordered>
        <tbody>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => {
              return (
                <tr key={blog.id}>
                  <td>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </td>
                  <td>{blog.author}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default Blog;
