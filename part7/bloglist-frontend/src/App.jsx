import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { initializeBlogs, newBlog } from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginHandler = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      dispatch(
        setNotification(
          { notification: "logged in", type: "notification" },
          5000,
        ),
      );
    } catch (exception) {
      dispatch(
        setNotification(
          { notification: "wrong username or password", type: "error" },
          5000,
        ),
      );
    }
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      dispatch(newBlog(blogObject));
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

  const logOut = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    dispatch(
      setNotification(
        { notification: "logged out", type: "notification" },
        5000,
      ),
    );
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <form onSubmit={loginHandler}>
          <div>
            username
            <input
              data-testid="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              data-testid="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <Notification />
        {user.name} logged in
        <button onClick={logOut}>logout</button>
      </div>
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} user={user} />
        </Togglable>
      </div>
      <Blog />
    </div>
  );
};

export default App;
