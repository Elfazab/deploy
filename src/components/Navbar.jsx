import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for the Navbar

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand-container">
        <Link to="/" className="navbar-brand">
          Currency Exchange
        </Link>
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          ☰
        </button>
      </div>
      <ul className={`navbar-links ${isDropdownOpen ? "open" : ""}`}>
        <li>
          <Link to="/exchange-rates">Exchange Rates</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/calculator">Calculator</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
