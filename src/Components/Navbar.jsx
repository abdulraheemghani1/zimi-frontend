import { Link } from "react-router-dom";
import { Navbar as BsNavbar, Nav, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../NavbarCSS.css'; // Custom CSS for additional styling

function Navbar() {
  const token = localStorage.getItem("token"); // Check if user is logged in

  return (
    <BsNavbar expand="lg" className="custom-navbar">
      <Container>
        {/* Logo */}
        <BsNavbar.Brand as={Link} to="/" className="navbar-logo">
          <h1>Zimi</h1>
        </BsNavbar.Brand>

        {/* Toggle Button for Mobile */}
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle" />

        {/* Navbar Links */}
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/Products" className="nav-link">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/About" className="nav-link">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/privacy-policy" className="nav-link">
              Privacy Policy
            </Nav.Link>
            <Nav.Link as={Link} to="/Contactus" className="nav-link">
              Contact Us
            </Nav.Link>
          </Nav>

          {/* Profile/Login Link */}
          <Nav className="ms-3">
            {token ? (
              <Nav.Link as={Link} to="/profile" className="nav-link">
                Profile
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="nav-link">
                Login
              </Nav.Link>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
