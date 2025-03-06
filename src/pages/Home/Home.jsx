import React from "react";
import { Link } from "react-router-dom";
import CurrencyCalculator from "../../components/CurrencyCalculator";
import Navbar from "../../components/Navbar"; // Use the correct import statement
import "./Home.css"; // Import the CSS file

const Home = () => (
  <div className="home-container">
    <Navbar />
    <h2 className="welcome-title">Welcome to the Currency Exchange App</h2>
    <p className="description">
      Check the latest exchange rates to make smarter choices for travel,
      business, or personal use.
    </p>

    <CurrencyCalculator />
    <Link to="/exchange-rates" className="view-rates-link">
      <button className="view-rates-button" aria-label="View Exchange Rates">
        View Exchange Rates
      </button>
    </Link>
  </div>
);

export default Home;
