import React from "react";
import "../index.css"; // Reuse the same CSS file for consistency

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-branding">
          <p>Ethiopian Banks Currency Exchange App</p>
        </div>
        <div className="footer-links">
          <a href="/about" className="footer-link">
            About
          </a>
          <a href="/contact" className="footer-link">
            Contact
          </a>
          <a href="/privacy" className="footer-link">
            Privacy Policy
          </a>
        </div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
