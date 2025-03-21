// import { StrictMode } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";

import About from './Components/About.jsx';

import App from './App.jsx';
import ProductsPage from './Components/ProductsPage.jsx';
import PrivacyPolicy from './Components/PrivacyPolicy.jsx';
import ContactUs from './Components/ContactUs.jsx';
import LoginForm from './Components/Login.jsx';
import SignupForm from './Components/Register.jsx';
import UserProfile from './Components/Profile.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';
import { ProductsProvider } from './Context/ProductsContext.jsx';
import ProductForm from './Components/AddProducts.jsx';

import ProductDetail from './Components/ProductsDetailes.jsx';


createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <AuthProvider>
    <ProductsProvider>
    <Routes>
  <Route index element={<App />} />
  <Route path="/about" element={<About />} />

  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/Products" element={<ProductsPage/>} />
    <Route path="/signup" element={< SignupForm/>} />
    <Route path="/Contactus" element={<ContactUs />} />
    <Route path="/addProduct" element={<ProductForm />} />



    <Route path="/profile" element={<UserProfile />} />
    <Route path="/product/:productId" element={<ProductDetail />} />

</Routes>
</ProductsProvider>
</AuthProvider>
    </BrowserRouter>
    
)
