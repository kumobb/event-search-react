import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Nav className="justify-content-end m-3">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/search">
          Search
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/favorites">
          Favorites
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Navbar;
