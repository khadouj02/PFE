// pages/Wishlist.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../../../Navbar/Navbar";
import Footer from "../../../Footer/Footer";
import ProductCard from "../ProductCard"; // adapte si besoin
import "./Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  // ✅ Fonction appelée lorsqu'on retire un produit du localStorage
  const handleRemoveFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <div>
      <Navbar />
      <div className="products-section">
        <h2>Ma Wishlist</h2>

        {wishlist.length === 0 ? (
          <p style={{ textAlign: "center" }}>Votre wishlist est vide.</p>
        ) : (
          <div className="product-list">
            {wishlist.map((product) =>
              product ? (
                <ProductCard
                  key={product.id}
                  product={product}
                  onRemoveFromWishlist={handleRemoveFromWishlist}
                />
              ) : null
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;