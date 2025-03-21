import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// Access environment variables
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Store error messages
  const [uploading, setUploading] = useState(false); // For image upload state
  const [imageUrl, setImageUrl] = useState(""); // Store the uploaded image URL
  const navigate = useNavigate(); // Redirect after signup

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePicture: "", // Add profile picture field
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
      email: Yup.string().email("Invalid email format").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError(""); // Reset previous errors

      try {
        await axios.post("https://zimi-backend-final-kaks10bas-abdulraheemghanis-projects.vercel.app/auth/register", {
          name: values.name,
          email: values.email,
          password: values.password,
          profilePicture: imageUrl, // Include the uploaded image URL
        });

        navigate("/login"); // Redirect to login page after success
      } catch (err) {
        setError(err.response?.data?.error || "Signup failed. Try again.");
      }

      setLoading(false);
    },
  });

  // Handle image upload to Cloudinary
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

      setImageUrl(res.data.secure_url); // Set the uploaded image URL
      console.log("Image URL ==> ", res.data.secure_url);
    } catch (error) {
      console.error("Image upload failed:", error);
      setError("❌ Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="bg-white p-4 rounded shadow-sm w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>

        {/* Display Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""}`}
              id="name"
              name="name"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="invalid-feedback">{formik.errors.name}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
              id="email"
              name="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
              id="password"
              name="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "is-invalid" : ""}`}
              id="confirmPassword"
              name="confirmPassword"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
            )}
          </div>

          {/* Profile Picture Upload */}
          <div className="mb-3">
            <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
            <input
              type="file"
              className="form-control"
              id="profilePicture"
              accept="image/*"
              onChange={handleImageChange}
            />
            {uploading && <p className="text-info mt-2">Uploading...</p>}
            {imageUrl && (
              <img src={imageUrl} alt="Preview" className="img-fluid mt-2 rounded shadow" style={{ maxWidth: "100px" }} />
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading || uploading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-primary">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;

