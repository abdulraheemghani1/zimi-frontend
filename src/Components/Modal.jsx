import { useState } from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const OrderNowModal = ({ show, onClose, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("https://zimi-backend-final-kaks10bas-abdulraheemghanis-projects.vercel.app/submit-order", {
        productId: product._id,
        productName: product.name,
        quantity,
        email,
        address,
        number,
      });

      setMessage(response.data.message);
      setTimeout(() => {
        onClose(); // Close the modal after successful submission
        setMessage(""); // Reset the message
      }, 2000);
    } catch (error) {
      
      console.error("Error submitting order:", error);
      setMessage("Failed to submit order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Order Now: {product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="success" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner size="sm" /> : "Submit Order"}
          </Button>
        </Form>
        {message && (
          <Alert variant={message.includes("successfully") ? "success" : "danger"} className="mt-3">
            {message}
          </Alert>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default OrderNowModal;