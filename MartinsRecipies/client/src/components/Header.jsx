import { useContext } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import AuthContext from "../contexts/authContext";

function Header() {
  const { isAuthenticated, username } = useContext(AuthContext);

  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              alt="logo"
              src="/icon.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Martins recipes
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/recipe/all">
                Catalogue
              </Nav.Link>
              {!isAuthenticated && (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                </>
              )}
              <NavDropdown title={username} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/user">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/recipe/add">
                  Add recipe
                </NavDropdown.Item>
                {isAuthenticated && (
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="logout">
                      Logout
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
