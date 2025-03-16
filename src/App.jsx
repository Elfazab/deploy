import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CurrencyCalculator from "./components/CurrencyCalculator";
import ExchangeRates from "./components/ExchangeRates";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import About from "./pages/About/About";
import MainHome from "./pages/Home/MainHome";
const App = () => {
  return (
    <Router>
      <Navbar className="hero-navbar" />
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/about" element={<About />} />

        <Route path="/calculator" element={<CurrencyCalculator />} />
        <Route path="/exchange-rates" element={<ExchangeRates />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
