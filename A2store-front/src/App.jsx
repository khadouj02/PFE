import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import ProductDetail from "./Components/Home/ProductDetail/ProductDetail";
import CartPage from "./Components/Home/CartPage/CartPage";
import AboutPage from "./Components/About/AboutPage"
import Contact from "./Components/Contact/Contact";
import SearchResults from "./Components/Navbar/SearchResults";
import Wishlist from "./Components/Home/ProductCard/Wishlist/Wishlist";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/wishlist" element={<Wishlist />} />

      </Routes>
    </Router>
  );
}
export default App;