// src/pages/Home.js
import React from "react";
import Home from "./Home";
import "./Home.css";

const MainHome = () => (
  <div className="main-home-container">
    <div className="left-column">
      <img
        src="https://i.pinimg.com/736x/93/9a/41/939a415185c39dea80c0ee5c9a0c297e.jpg" // Left Column Image
        alt="Left Column"
        className="column-image"
      />
      Left Column Content
    </div>
    <div className="home-content">
      <Home />
    </div>
    <div className="right-column">
      <img
        src="https://i.pinimg.com/736x/0e/78/10/0e7810a7646a3f786e59e2dbe3065726.jpg" // Right Column Image
        alt="Right Column"
        className="column-image"
      />
      Right Column Content
    </div>
  </div>
);

export default MainHome;
