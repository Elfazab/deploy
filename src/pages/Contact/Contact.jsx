import React from "react";
import Navbar from "../../components/Navbar"; // Use the correct import statement
import "./Contact.css";

const Contact = () => (
  <div className="contact-container">
    <Navbar />
    <h2>Contact Us</h2>

    <form className="contact-form">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Your Name"
        required
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Your Email"
        required
      />

      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        name="message"
        rows="5"
        placeholder="Your Message"
        required
      ></textarea>

      <button type="submit">Send Message</button>
    </form>
    <p>If you have any questions or need assistance, please reach out to us:</p>

    <div className="contact-info">
      <p>
        <strong>Email:</strong> support@currencyexchangeapp.com
      </p>
      <p>
        <strong>Phone:</strong> +251 123 456 789
      </p>
      <p>
        <strong>Address:</strong> 123 Exchange St, Financial District, Addis
        Ababa, Ethiopia
      </p>
    </div>
    <h3>Send Us a Message</h3>
  </div>
);

export default Contact;
