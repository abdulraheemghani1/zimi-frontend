import { useState, createContext, useContext, useCallback, useEffect } from "react";
import axios from "axios";

// Create the context
const ProductsContext = createContext();

// Define the provider component
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products function
  const fetchUserProducts = useCallback(async (userId = null) => {
    setLoading(true);
    setError(null);
    try {
      const url = userId
        ? `https://zimi-backend-final-kaks10bas-abdulraheemghanis-projects.vercel.app/api/products/user/${userId}` // Fetch user-specific products
        : `https://zimi-backend-final-kaks10bas-abdulraheemghanis-projects.vercel.app/api/products`; // Fetch all products
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products. Please try again later.");
      setProducts([]); // Clear products in case of error
    } finally {
      setLoading(false);
    }
  }, []);

  // Automatically fetch products when the provider is mounted
  useEffect(() => {
    fetchUserProducts(); // Fetch all products (no userId provided)
  }, [fetchUserProducts]);

  // Provide the context value
  return (
    <ProductsContext.Provider value={{ products, fetchUserProducts, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Custom hook to use the context
export const useProducts = () => useContext(ProductsContext);
