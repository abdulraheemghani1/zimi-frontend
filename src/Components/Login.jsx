

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Store error messages
  const navigate = useNavigate(); // Redirect after login

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setError(""); // Reset previous errors

      try {
        const response = await axios.post("https://zimi-backend-final-kaks10bas-abdulraheemghanis-projects.vercel.app/auth/login", values);

        const token = response.data.token;

        // Store token in localStorage and verify
        if (token) {
          localStorage.setItem("token", token);
          console.log("Token stored successfully:", token);

          // Reset form and navigate to homepage
          resetForm();
          navigate("/"); // Redirect to home
          window.location.reload(); // Force reload to refresh state
        } else {
          setError("Token not received from server.");
        }
      } catch (err) {
        console.error("Login Error:", err);
        setError(err.response?.data?.error || "Invalid credentials. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>

        {/* Display Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={formik.handleSubmit}>
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

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Google Login Placeholder
        <button className="btn btn-danger w-100 mt-3" onClick={() => alert("Google Login coming soon!")}>
          Login with Google
        </button> */}

        <p className="text-center mt-4">
          Do Not have an account? <Link to="/signup" className="text-primary">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;



