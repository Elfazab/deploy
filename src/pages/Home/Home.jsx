// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import CurrencyCalculator from "../../components/CurrencyCalculator";
import Navbar from "../../components/Navbar";
import BankExchangeRates from "../../components/SelectedExchangeRates"; // Import the new component
import "./Home.css";

const Home = () => (
  <div>
    <Navbar />
    <h2 className="welcome-title">
      Welcome to the All Ethiopian Banks Currency Exchange App
    </h2>
    <p className="description">
      Check the latest exchange rates to make smarter choices for travel,
      business, or personal use.
    </p>
    <BankExchangeRates /> {/* Add the bank exchange rates component */}
    <Link to="/exchange-rates" className="view-rates-link">
      <button className="view-rates-button" aria-label="View Exchange Rates">
        See All Exchange Rates
      </button>
    </Link>
    <CurrencyCalculator />
  </div>
);

export default Home;
