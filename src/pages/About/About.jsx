import React from "react";
import Navbar from "../../components/Navbar"; // Use the correct import statement
import "./About.css";

const About = () => (
  <div className="about-container">
    <Navbar />
    <h2>About Us</h2>
    <p>
      Welcome to the Currency Exchange App. Our mission is to provide the most
      accurate and up-to-date exchange rates for all Ethiopian banks. We strive
      to empower users to make informed financial decisions through a
      user-friendly platform for tracking currency values.
    </p>

    <div className="about-section">
      <h3>Our Mission</h3>
      <p>
        To simplify currency exchange tracking and help users make better
        financial choices by offering real-time data and insights.
      </p>
    </div>

    <div className="about-section">
      <h3>Our Values</h3>
      <ul>
        <li>
          <strong>Accuracy:</strong> Providing the most reliable and updated
          information.
        </li>
        <li>
          <strong>Transparency:</strong> Clear, honest, and accessible exchange
          rates.
        </li>
        <li>
          <strong>User-Centric:</strong> Designing with users' needs in mind for
          a seamless experience.
        </li>
      </ul>
    </div>

    <div className="about-section">
      <h3>Why Choose Us?</h3>
      <p>
        Our dedicated team works around the clock to ensure you receive accurate
        data and exceptional support. Thank you for choosing Currency Exchange
        App as your trusted financial tool.
      </p>
    </div>
  </div>
);

export default About;
