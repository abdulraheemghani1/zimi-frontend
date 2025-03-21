import { useState, useMemo } from "react";
import { Carousel, Card, Button, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../Context/ProductsContext";
import OrderNowModal from "./Modal";
import "../ProductDetails.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useMemo(() => {
    if (products.length > 0) {
      const selectedProduct = products.find((p) => p._id === productId);
      if (selectedProduct) {
        setProduct(selectedProduct);
        const related = products.filter(
          (p) => p.category === selectedProduct.category && p._id !== productId
        );
        setRelatedProducts(related);
      } else {
        navigate("/not-found");
      }
    }
  }, [productId, products, navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="danger">Failed to load product details. Please try again later.</Alert>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  console.log("Product:", product); // Debugging log
  console.log("Show Order Modal:", showOrderModal); // Debugging log

  return (
    <Container className="product-detail-container mt-5">
      {/* Product Images and Details */}
      <Row className="mb-5">
        <Col md={12}>
          <Carousel indicators controls className="product-images-carousel">
            {[product.image].map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  src={image || "https://cdn.pixabay.com/photo/2024/11/29/04/45/saffron-finch-9232101_640.jpg"}
                  alt={`Product Image ${index + 1}`}
                  className="d-block w-100 product-carousel-image"
                  onError={(e) => {
                    e.target.src = "https://cdn.pixabay.com/photo/2024/07/16/12/20/pipe-8899206_640.jpg";
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

      {/* Product Details Section */}
      <Row className="product-detail-row mb-5">
        <Col md={12} className="text-center">
          <h1 className="product-name mb-3">{product.name}</h1>
          <p className="product-category text-muted mb-2">{product.category}</p>
          <p className="product-price lead mb-4">${product.price}</p>
          <div className="product-description-container mb-4">
            <p className="product-description" style={{ wordWrap: "break-word", textAlign: "center" }}>
              {product.description}
            </p>
          </div>
          <div className="product-actions d-flex justify-content-center gap-3">
            <Button variant="outline-secondary" size="md" onClick={() => navigate(-1)}>
              Go Back
            </Button>
            <Button variant="success" size="md" onClick={() => setShowOrderModal(true)}>
              Order Now
            </Button>
          </div>
        </Col>
      </Row>

      {/* Related Products Carousel */}
      <h2 className="related-products-heading mt-5 mb-4 text-center">Related Products</h2>
      {relatedProducts.length > 0 ? (
        <Carousel indicators controls className="related-products-carousel">
          {relatedProducts.map((relatedProduct) => (
            <Carousel.Item key={relatedProduct._id} className="related-product-item">
              <Card className="related-product-card text-center mx-auto">
                <img
                  src={relatedProduct.image || "https://cdn.pixabay.com/photo/2016/08/19/15/11/lost-1605501_640.jpg"}
                  alt={relatedProduct.name}
                  className="related-product-image card-img-top"
                  onError={(e) => {
                    e.target.src = "https://cdn.pixabay.com/photo/2016/08/19/15/11/lost-1605501_640.jpg";
                  }}
                />
                <Card.Body className="related-product-body">
                  <Card.Title className="related-product-title">{relatedProduct.name}</Card.Title>
                  <Card.Text className="related-product-price">${relatedProduct.price}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/product/${relatedProduct._id}`)}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p className="text-center">No related products found.</p>
      )}

      {/* Order Now Modal */}
      <OrderNowModal
        show={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        product={product}
      />
    </Container>
  );
};

export default ProductDetail;

