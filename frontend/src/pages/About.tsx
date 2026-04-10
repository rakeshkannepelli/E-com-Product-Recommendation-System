import React from 'react';
import Header from '../components/Header';

const About: React.FC = () => {
  return (
    <div>
      <Header />

      <section className="about-page">
        <div className="container">
          <h1>About ShopZone</h1>

          <div className="about-content">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Welcome dear User, where shopping meets trust, quality, and convenience. What started as a simple idea
                to make online shopping effortless has grown into a platform loved by thousands. We are driven by a
                passion to deliver not just products, but meaningful experiences that make every purchase worthwhile.
              </p>

              <h2>Our Mission</h2>
              <p>
                Our mission is to redefine online shopping by combining quality, affordability, and innovation.
                We strive to empower our customers with choices they can भरोसा (trust), while ensuring every interaction
                is smooth, secure, and satisfying from start to finish.
              </p>

              <h2>What We Offer</h2>
              <ul>
                <li>Handpicked products designed to match modern lifestyles</li>
                <li>Unbeatable prices with exciting deals and exclusive offers</li>
                <li>Safe, fast, and flexible payment methods</li>
                <li>Lightning-fast delivery you can rely on</li>
                <li>Friendly and responsive customer support team</li>
                <li>Hassle-free returns with zero stress</li>
              </ul>

              <h2>Our Values</h2>
              <p>
                At user, our values define who we are and how we serve you:
              </p>
              <ul>
                <li><strong>Excellence:</strong> Delivering only the best, every single time</li>
                <li><strong>Customer Obsession:</strong> Your happiness drives everything we do</li>
                <li><strong>Innovation:</strong> Continuously evolving to serve you better</li>
                <li><strong>Trust:</strong> Building relationships that last beyond a single purchase</li>
                <li><strong>Responsibility:</strong> Caring for our community and environment</li>
              </ul>
            </div>

            <div className="about-stats">
              <div className="stat">
                <h3>10,000+</h3>
                <p>Happy Customers</p>
              </div>
              <div className="stat">
                <h3>500+</h3>
                <p>Quality Products</p>
              </div>
              <div className="stat">
                <h3>24/7</h3>
                <p>Customer Support</p>
              </div>
              <div className="stat">
                <h3>99%</h3>
                <p>Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;