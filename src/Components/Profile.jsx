import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useProducts } from "../Context/ProductsContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import "../Profile.css";
import axios from "axios";

const UserProfile = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const { products = [], fetchUserProducts, loading: productsLoading , deleteProduct } = useProducts();
  const navigate = useNavigate();

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [authLoading, user, navigate]);

  // ✅ Fetch user products after user is loaded
  useEffect(() => {
    if (user?._id) {
      fetchUserProducts(user._id).catch((error) => {
        console.error("Error fetching user products:", error);
      });
    }
  }, [user, fetchUserProducts]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const handleDeleteProduct = async (productId) => {
    try {
      // Send a DELETE request to the backend
      await axios.delete(`https://zimi-backend-final-kaks10bas-abdulraheemghanis-projects.vercel.app/api/products/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the user's token for authentication
        },
      });
  
      // Refresh the products list after deletion
      fetchUserProducts(user._id);
      console.log( " product id ===> " ,productId)
    } catch (error) {
      console.error("Error deleting product:", error);
      console.log( " product id ===> " ,productId)

    }
  };

  // ✅ Show loading state while user data or products are being fetched
  if (authLoading || productsLoading) {
    return <p className="text-center mt-5">Loading user data...</p>;
  }

  // ✅ Ensure user is defined before rendering the profile
  if (!user) {
    return <p className="text-center mt-5">No user data found. Please log in.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        {/* Profile Section */}
        <div className="row">
          {/* Left Section - Profile Picture */}
          <div className="col-md-3">
            <div className="card shadow-sm p-4 text-center">
              <img
                src={user.profilePicture || "/default-avatar.png"} // Use the profile picture uploaded by the user
                alt="Profile"
                className="rounded-circle mb-3 border"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  border: "3px solid #007bff",
                }}
                onError={(e) => {
                  e.target.src = "/default-avatar.png"; // Fallback image
                }}
              />
              <h4 className="mb-1">{user.name || "User"}</h4>
              <p className="text-muted">{user.email}</p>
            </div>
          </div>

          {/* Right Section - Buttons */}
          <div className="col-md-9 d-flex flex-column align-items-end gap-2">
            <button className="btn btn-primary w-50">Notifications</button>
            <button
              className="btn btn-primary w-50"
              onClick={() => navigate("/addProduct")}
            >
              Add Product
            </button>
            <button className="btn btn-danger w-50" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* My Products Section */}
        <div className="mt-5">
          <h3 className="text-center mb-4">My Products</h3>
          <div className="d-flex flex-wrap gap-4 justify-content-center">
            {products.length === 0 ? (
              <p className="text-center">No products found</p>
            ) : (
              products.map((product) => (
                <div
                  className="card shadow-sm"
                  key={product._id}
                  style={{ width: "18rem" }}
                >
                  <img
                    src={product.image || "/default-product.png"} // Use a local fallback image
                    alt="Product"
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = "/default-product.png"; // Fallback image
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>

                    {/* Product Price Section */}
                    <div className="product-price mb-3">
                      <div className="text-muted">Price</div>
                      <div className="fw-bold">${product.price}</div> {/* Display the price */}
                    </div>

                    {/* Buttons */}
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => navigate(`/product/${product._id}`)} // Navigate to product details
                      >
                        View Details
                      </button>
                      <button
                        className="btn btn-danger w-100"
                        onClick={() => handleDeleteProduct(product._id)} // Delete product
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;