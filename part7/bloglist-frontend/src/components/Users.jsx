import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "../reducers/usersReducer";
import { Link } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [users]);

  return (
    <div>
      <h2>Users</h2>
      <h4 style={{ paddingLeft: "80px" }}>blogs created</h4>
      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link> {user.blogs.length}
        </div>
      ))}
    </div>
  );
};

export default Users;
