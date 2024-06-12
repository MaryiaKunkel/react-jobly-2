import React from "react";

import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

function NavBar({ username, isLoggedIn, handleLogOut }) {
  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>

        <Nav className="ml-auto" navbar>
          {isLoggedIn ? (
            <div>
              <NavItem>
                <NavLink to="/companies">Companies</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/jobs">Jobs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/" onClick={handleLogOut}>
                  Log out {username}
                </NavLink>
              </NavItem>
            </div>
          ) : (
            <div>
              <NavItem>
                <NavLink to="/login">Log in</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/signup">Sign up</NavLink>
              </NavItem>
            </div>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
