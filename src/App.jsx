import "./App.css";
import { useEffect } from "react";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
 import { useAuth } from "./Context/AuthContext";
import { useProducts } from "./Context/ProductsContext";



 const App = () => {
   const { user, loading } = useAuth();
   const { fetchUserProducts } = useProducts();

  // Fetch products when the user logs in
  useEffect(() => {
    if (user) {
      fetchUserProducts(user._id); // Fetch products for the logged-in user
    }
  }, [user, fetchUserProducts]);

  // Redirect to login if no user found
  useEffect(() => {
    if (!user && !loading) {
      console.log("No user found, redirecting to login if necessary.");
    }
  }, [user, loading]);
 
  
  // Show loading message until user data is fetched
  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <>
<div>
<Navbar />
<Home />
</div>
</>
  );
};

export default App;

