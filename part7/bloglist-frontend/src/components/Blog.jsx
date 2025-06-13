import { useState } from "react";
import blogService from "../services/blogs";
import { useSelector } from "react-redux"

const Blog = (props) => {
  const blogs = useSelector((state) => state.blogs);
  const [visible, setVisible] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const addLike = async (event) => {
    event.preventDefault();
    if (props.addLike) {
      props.addLike();
      return;
    }

    const blogObject = {
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.url,
      likes: likes + 1,
      user: props.blog.user.id,
    };
    const response = await blogService.update(props.blog.id, blogObject);
    setLikes(blogObject.likes);
    blogService
      .getAll()
      .then((blogs) => props.setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  };

  const deleteBlog = async (event) => {
    if (
      window.confirm(`Remove blog ${props.blog.title} by ${props.blog.author}`)
    ) {
      event.preventDefault();
      const response = await blogService.remove(
        props.blog.id,
        props.user.token,
      );
      setDeleted(true);
    }
  };

  if (deleted) {
    return;
  }

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
                <button onClick={addLike}>like</button>
              </p>
              <p>{blog.user.name}</p>
              {blog.user.username === blog.user.username && (
                <button onClick={deleteBlog}>remove</button>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default Blog;
