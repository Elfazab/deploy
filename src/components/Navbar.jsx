import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for the Navbar
const Navbar = () => (
  <nav className="navbar">
    <Link to="/" className="navbar-brand">
      Currency Exchange
    </Link>
    <ul className="navbar-links">
      <li>
        <Link to="/exchange-rates">Exchange Rates</Link>
      </li>
      <li>
        <Link to="/about">About Us</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
