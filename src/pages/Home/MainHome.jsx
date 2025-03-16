import React from "react";
import { Link } from "react-router-dom";
import CurrencyCalculator from "../../components/CurrencyCalculator";
import Navbar from "../../components/Navbar";
import BankExchangeRates from "../../components/SelectedExchangeRates";
import HeroSection from "./HeroSection";
import "./Home.css";

const MainHome = () => (
  <div>
    <Navbar className="hero-navbar" /> {/* Navbar stays fixed */}
    <HeroSection />
    <div className="main-home-container">
      <div className="left-column">
        <img
          src="https://i.pinimg.com/736x/93/9a/41/939a415185c39dea80c0ee5c9a0c297e.jpg"
          alt="Left Column"
          className="column-image"
        />
        Left Advertisement
      </div>
      <div className="home-content">
        <BankExchangeRates />
        <Link to="/exchange-rates" className="view-rates-link">
          <button
            className="view-rates-button"
            aria-label="View Exchange Rates"
          >
            See All Exchange Rates
          </button>
        </Link>
        <CurrencyCalculator />
      </div>
      <div className="right-column">
        <img
          src="https://i.pinimg.com/736x/0e/78/10/0e7810a7646a3f786e59e2dbe3065726.jpg"
          alt="Right Column"
          className="column-image"
        />
        Right Advertisement
      </div>
    </div>
  </div>
);

export default MainHome;
