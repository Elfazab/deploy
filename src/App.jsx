import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ExchangeRates from "./components/ExchangeRates";

import NotFound from "./components/NotFound";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/exchange-rates" element={<ExchangeRates />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
