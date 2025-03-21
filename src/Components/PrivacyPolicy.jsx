import Footer from "./Footer";
import Navbar from "./Navbar";
import "../App.css";
import "../About.css"; // Reuse the same CSS file

function PrivacyPolicy() {
  return (
    <>
      <div><Navbar /></div>
      <div className="about-container">
        <div className="about-content">
          <h1 className="about-title">Privacy Policy</h1>
          <p className="about-description">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>

          <div className="about-section">
            <h2 className="about-subtitle">Information We Collect</h2>
            <p className="about-text">
              We collect information you provide directly to us, such as your name, email address, and payment details when you make a purchase.
            </p>
          </div>

          <div className="about-section">
            <h2 className="about-subtitle">How We Use Your Information</h2>
            <p className="about-text">
              We use your information to process orders, improve our services, and communicate with you about your account and our products.
            </p>
          </div>

          <div className="about-section">
            <h2 className="about-subtitle">Data Security</h2>
            <p className="about-text">
              We implement security measures to protect your data from unauthorized access, alteration, or destruction.
            </p>
          </div>

          <div className="about-section">
            <h2 className="about-subtitle">Changes to This Policy</h2>
            <p className="about-text">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;

