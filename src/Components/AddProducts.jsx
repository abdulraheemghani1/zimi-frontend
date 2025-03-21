



import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../Context/AuthContext"; // Import the useAuth hook
import { useNavigate } from "react-router-dom"; // Corrected import

// Access environment variables
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function ProductForm() {
  const { user } = useAuth(); // Get the authenticated user from the context
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "", // Stores image URL
    country: "", // New country field
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const categories = ["Electronics", "Clothing", "Books", "Home Appliances", "Beauty"];
  const countries = ["United States", "Canada", "United Kingdom", "Australia", "India", "Germany", "France"]; // Add more countries as needed

  // Handle text input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // 📷 Handle instant image upload to Cloudinary
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset); // Use environment variable

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`, // Use environment variable
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setProduct((prev) => ({ ...prev, image: res.data.secure_url }));
      
      setMessage("✅ Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed:", error);
      setMessage("❌ Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  // 🛒 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.image) {
      setMessage("⚠️ Please upload an image before submitting.");
      return;
    }

    try {
      // Use user._id from the authenticated user
      await axios.post("https://zimi-backend-final-kaks10bas-abdulraheemghanis-projects.vercel.app/api/products/upload", {
        ...product,
        userId: user._id, // Use user._id from the context
      });
      setMessage("🎉 Product added successfully!");
      setProduct({ name: "", description: "", price: "", category: "", image: "", country: "" }); // Reset form
      navigate("/profile"); // Navigate to the profile page after successful submission
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add product.");
      console.log("Form Data:", {
        ...product,
        userId: user._id, // Log the userId from the authenticated user
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Add New Product</h2>

        {message && (
          <div className={`alert ${message.includes("✅") ? "alert-success" : "alert-danger"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* 📝 Product Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Product Title</label>
            <input type="text" className="form-control" id="name" name="name" placeholder="Enter product name" value={product.name} onChange={handleChange} required />
          </div>

          {/* 📄 Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name="description" placeholder="Product description" value={product.description} onChange={handleChange} required />
          </div>

          {/* 💲 Price */}
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price ($)</label>
            <input type="number" className="form-control" id="price" name="price" placeholder="Enter price" value={product.price} onChange={handleChange} required />
          </div>

          {/* 🏷️ Category */}
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select className="form-select" id="category" name="category" value={product.category} onChange={handleChange} required>
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* 🌍 Country */}
          <div className="mb-3">
            <label htmlFor="country" className="form-label">Country</label>
            <select className="form-select" id="country" name="country" value={product.country} onChange={handleChange} required>
              <option value="" disabled>Select a country</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          {/* 🖼️ Image Upload */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Upload Image</label>
            <input type="file" className="form-control" id="image" accept="image/*" onChange={handleImageChange} required />
            {uploading && <p className="text-info mt-2">Uploading...</p>}
            {product.image && (
              <img src={product.image} alt="Preview" className="img-fluid mt-2 rounded shadow" style={{ maxWidth: "100px" }} />
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">Add Product</button>
        </form>
      </div>
    </div>
  );
}

