import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar"; // Use the correct import statement
import "./Home.css"; // Import the CSS file

const Home = () => (
  <div className="home-container">
    <Navbar />
    <h2 className="welcome-title">Welcome to the Currency Exchange App</h2>
    <p>
      Here, you can find the exchange rates of all Ethiopian banks. This
      resource enables you to compare rates among different banks, helping you
      make informed decisions with ease. With access to up-to-date exchange
      rates, you can manage your currency transactions effectively and choose
      the best options that suit your financial needs.
    </p>
    <p className="description">
      Check the latest exchange rates to make smarter choices for travel,
      business, or personal use.
    </p>
    <Link to="/exchange-rates" className="view-rates-link">
      <button className="view-rates-button" aria-label="View Exchange Rates">
        View Exchange Rates
      </button>
    </Link>
  </div>
);

export default Home;
