import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import "./WishlistButton.css";

const WishlistButton = ({ product, onRemove }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  if (!product) return null;

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.some((item) => item.id === product.id);
    setIsWishlisted(exists);
  }, [product.id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (isWishlisted) {
      const updated = wishlist.filter((item) => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setIsWishlisted(false);

      // ✅ Met à jour la liste dans Wishlist.jsx
      if (onRemove) {
        onRemove(product.id);
      }
    } else {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setIsWishlisted(true);
    }
  };

  return (
    <FontAwesomeIcon
  icon={isWishlisted ? faHeartSolid : faHeartRegular}
  className={`wishlist-icon ${isWishlisted ? "active" : ""}`}
  onClick={toggleWishlist}
/>

  );
};

export default WishlistButton;
