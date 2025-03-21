import PropTypes from "prop-types"; // Import PropTypes
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Card, Button } from "react-bootstrap"; // Import Bootstrap components
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../ProductCard.css"; // Custom CSS for styling

export default function ProductCard({ _id, name, description, price, image }) {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleViewDetails = () => {
    navigate(`/product/${_id}`); // Navigate to the product detail page
  };

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "..."; // Add ellipsis
    }
    return text;
  };

  return (
    <Card className="product-card shadow-sm h-100">
      <Card.Img
        variant="top"
        src={image || "https://via.placeholder.com/400"} // Fallback image if no image is provided
        alt={name}
        className="product-image"
        style={{ height: "300px", objectFit: "cover" }} // Larger image height
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/400"; // Fallback image
        }}
      />
      <Card.Body className="d-flex flex-column">
        {/* Truncate title */}
        <Card.Title className="product-title">
          {truncateText(name, 30)} {/* Limit title to 30 characters */}
        </Card.Title>

        {/* Truncate description */}
        <Card.Text className="product-description flex-grow-1">
          {truncateText(description, 100)} {/* Limit description to 100 characters */}
        </Card.Text>

        {/* Price */}
        <div className="product-price mb-3">${price.toFixed(2)}</div>

        {/* View Details Button */}
        <Button variant="primary" className="w-100" onClick={handleViewDetails}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

// Add prop validation
ProductCard.propTypes = {
  _id: PropTypes.string.isRequired, // Product ID is required
  name: PropTypes.string.isRequired, // Name is required and must be a string
  description: PropTypes.string.isRequired, // Description is required and must be a string
  price: PropTypes.number.isRequired, // Price is required and must be a number
  image: PropTypes.string, // Image is optional (fallback is provided)
};

// Add default props
ProductCard.defaultProps = {
  image: "https://via.placeholder.com/400", // Default image if none is provided
};









