import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown, Container, Button } from "react-bootstrap";

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

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Blog App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <NavDropdown title="Session" id="basic-nav-dropdown">
              <NavDropdown.Item>Logged in as "{user.name}"</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Button variant="danger" onClick={logOut}>
                  logout
                </Button>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
