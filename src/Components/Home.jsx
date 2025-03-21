import { Row, Col, Container } from "react-bootstrap";
import { useProducts } from "../Context/ProductsContext"; // Import the ProductsContext
import ProductCard from "./ProductCard";
import Footer from "./Footer";
import { FaFire } from "react-icons/fa"; // Import icons
import "../App.css"; // Custom CSS for animations and styling

function Home() {
  const { products = [] } = useProducts(); // Fetch products from context

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section text-center py-5">
        <Container>
          <h1 className="hero-heading">
            Find Out Best Trending Products In The Market <FaFire className="icon" />
          </h1>
          <p className="hero-subheading">
            Here are some of the best products in the world you must buy. Explore our collection
            of high-quality products.
          </p>
        </Container>
      </div>

      {/* Products Grid Section */}
      <Container className="products-grid py-5">
        {products.length === 0 ? (
          <p className="text-center">No products found.</p>
        ) : (
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {products.map((product) => (
              <Col key={product._id}>
                <ProductCard
                  _id={product._id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
