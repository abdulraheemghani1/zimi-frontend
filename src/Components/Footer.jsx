
import '../Footer.css'; // Import the CSS file for styling

function Footer() {
  return (
    <div className="Footer-div">
      <div className="footer-main-column">
        <div className="footer-col">
          <h4>Info</h4>
          <ul className="links">
            <li><a href="/about">About Us</a></li>
            <li><a href="/privacy-policy">Service</a></li>
            <li><a href="/Products">Collection</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-main-column">
        <div className="footer-col">
          <h4>Explore</h4>
          <ul className="links">
            <li><a href="/Products">Latest Products</a></li>
            <li><a href="/Products">Popular Products</a></li>
            <li><a href="/Products">New Uploads</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-main-column">
        <div className="footer-col">
          <h4>Legal</h4>
          <ul className="links">
            <li><a href="/Products">Services</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-main-column">
        <div className="footer-col">
          <h4>Newsletter</h4>
          <p>
            Subscribe to our newsletter for a weekly dose of news, updates, helpful
            tips, and exclusive offers.
          </p>
          <form action="#">
            <input type="text" placeholder="Your email" required />
            <button type="submit">SUBSCRIBE</button>
          </form>
          <div className="icons">
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-github"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;





