import { useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser, setToken } from "./reducers/userReducer.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate,
} from "react-router-dom";
import Users from "./components/Users.jsx";
import User from "./components/User.jsx";
import BlogView from "./components/BlogView.jsx";
import Menu from "./components/Menu.jsx";
import { Button, Form } from "react-bootstrap";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

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

  const matchU = useMatch("/users/:id");
  const userMatch = matchU
    ? users.find((u) => u.id === matchU.params.id)
    : null;

  const matchB = useMatch("/blogs/:id");
  const blogMatch = matchB
    ? blogs.find((u) => u.id === matchB.params.id)
    : null;

  if (user === null) {
    return (
      <div className="container">
        <h2>Log in to blog app</h2>
        <Notification />
        <Form onSubmit={loginHandler}>
          <Form.Group>
            <Form.Label>username</Form.Label>
            <Form.Control type="text" name="Username" />
          </Form.Group>
          <Form.Group>
            <Form.Label>password</Form.Label>
            <Form.Control type="password" name="Password" />
          </Form.Group>
          <Button variant="success" type="submit">
            login
          </Button>
        </Form>
      </div>
    );
  }

  return (
    <div className="container">
      <Menu />
      <Notification />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/users/:id" element={<User user={userMatch} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<BlogView blog={blogMatch} />} />
      </Routes>
    </div>
  );
};

export default App;
