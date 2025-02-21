import React from 'react';
import '../assets/styles/Footer.css';
import Homee2 from '../assets/Images/home.jpg'; // Background Image Import

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>Employee Management System</h2>
          <p>
            Simplifying workforce management with intuitive tools and efficient solutions. Manage, track, and optimize employee operations with ease.
          </p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: support@employeemanagement.com</p>
          <p>Phone: +1 (234) 567-890</p>
          <p>Address: 123 Corporate Way, Business City</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Employee Management System. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;