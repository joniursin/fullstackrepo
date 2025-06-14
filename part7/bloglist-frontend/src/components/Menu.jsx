import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Link } from "react-router-dom";

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const logOut = () => {
    dispatch(logoutUser());
    dispatch(
      setNotification(
        { notification: "logged out", type: "notification" },
        5000,
      ),
    );
  };

  const padding = {
    paddingRight: 5,
  };

  return (
    <div>
      <div className="menuStyle">
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user.name} logged in <button onClick={logOut}>logout</button>
      </div>
      <h2>blog app</h2>
    </div>
  );
};

export default Menu;
