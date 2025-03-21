import Footer from "./Footer";
import Navbar from "./Navbar";
import "../App.css";
import "../About.css"; // Import a dedicated CSS file for the About page

function About() {
  return (
    <>
      <div><Navbar /></div>
      <div className="about-container">
        <div className="about-content">
          <h1 className="about-title">About Us</h1>
          <p className="about-description">
            Welcome to our eCommerce platform! We are dedicated to providing the best products and services to our customers.
          </p>

          <div className="about-section">
            <h2 className="about-subtitle">Our Mission</h2>
            <p className="about-text">
              To deliver high-quality products at competitive prices while ensuring excellent customer service.
            </p>
          </div>

          <div className="about-section">
            <h2 className="about-subtitle">Meet the Team</h2>
            <p className="about-text">
              Our team consists of experienced professionals who are passionate about eCommerce and customer satisfaction.
            </p>
          </div>

          <div className="about-section">
            <h2 className="about-subtitle">Contact Us</h2>
            <p className="about-text">
              If you have any questions, feel free to reach out to us through our contact page.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;

