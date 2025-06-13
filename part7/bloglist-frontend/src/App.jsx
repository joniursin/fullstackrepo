import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, newBlog } from "./reducers/blogReducer";
import { logoutUser, setUser, setToken } from "./reducers/userReducer.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate,
} from "react-router-dom";
import Users from "./components/Users.jsx";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setToken(user));
    }
  }, []);

  const loginHandler = async (event) => {
    event.preventDefault();
    const username = event.target.elements.Username.value;
    const password = event.target.elements.Password.value;

    try {
      await dispatch(setUser({ username, password }));
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

  const logOut = () => {
    dispatch(logoutUser());
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
            <input data-testid="username" type="text" name="Username" />
          </div>
          <div>
            password
            <input data-testid="password" type="password" name="Password" />
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
      <Routes>
        <Route path="/users" element={<Users />} />
      </Routes>
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
