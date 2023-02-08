import React from "react";
import { Link } from "react-router-dom";
import './navbar.css'

export const NavBar = () => {
  return (
    <div className="nav-bar-container">
      <p>PlotCollection</p>
      <div className="nav-bar-path">
        <Link to="/">
          <p>User</p>
        </Link>
        <Link to="/Admin">
          <p>Admin</p>
        </Link>
      </div>
    </div>
  );
};
