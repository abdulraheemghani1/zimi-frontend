import Footer from "./Footer";
import Navbar from "./Navbar";
import "../App.css";
import "../About.css"; // Reuse the same CSS file

function ContactUs() {
  return (
    <>
      <div><Navbar /></div>
      <div className="about-container">
        <div className="about-content">
          <h1 className="about-title">Contact Us</h1>
          <p className="about-description">
            We will love to hear from you! Reach out to us for any questions, feedback, or support.
          </p>

          <div className="about-section">
            <h2 className="about-subtitle">Email Us</h2>
            <p className="about-text">
              For general inquiries, email us at: <a href="mailto:support@example.com">support@example.com</a>.
            </p>
          </div>

          <div className="about-section">
            <h2 className="about-subtitle">Call Us</h2>
            <p className="about-text">
              Call our customer support team at: <a href="tel:+1234567890">+1 (234) 567-890</a>.
            </p>
          </div>

          <div className="about-section">
            <h2 className="about-subtitle">Visit Us</h2>
            <p className="about-text">
              Our office is located at: 123 Main Street, City, Country.
            </p>
          </div>

          <div className="about-section">
            <h2 className="about-subtitle">Follow Us</h2>
            <p className="about-text">
              Stay connected with us on social media:
              <br />
              <a href="https://facebook.com">Facebook</a> | <a href="https://twitter.com">Twitter</a> | <a href="https://instagram.com">Instagram</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
