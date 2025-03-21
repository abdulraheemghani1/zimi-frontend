import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data on initial load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        // If no token is found, skip the request
        if (!token) {
          setLoading(false);
          return;
        }

        // Fetch user data from the server
        const response = await axios.get("https://zimi-backend-final-kaks10bas-abdulraheemghanis-projects.vercel.app/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Ensure the response contains a valid user object
        if (response.data && response.data.user) {
          setUser(response.data.user);
        } else {
          setUser(null); // Set user to null if the response is invalid
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null); // Set user to null on error
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    };

    fetchUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post("https://zimi-backend-final-kaks10bas-abdulraheemghanis-projects.vercel.app/auth/login", {
        email,
        password,
      });

      // Ensure the response contains a valid token and user object
      if (response.data.accessToken && response.data.user) {
        localStorage.setItem("token", response.data.accessToken); // Store token in localStorage
        setUser(response.data.user); // Set user in state
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Re-throw the error for the caller to handle
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post("https://zimi-backend-final-kaks10bas-abdulraheemghanis-projects.vercel.app/auth/logout");
      localStorage.removeItem("token"); // Remove token from localStorage
      setUser(null); // Clear user from state
    } catch (error) {
      console.error("Logout failed:", error);
      throw error; // Re-throw the error for the caller to handle
    }
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children} {/* Render children only when loading is false */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


