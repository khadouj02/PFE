import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { fetchProducts } from "../../api";
import ProductCard from "../Home/ProductCard/ProductCard";
import "./SearchResults.css";

const SearchResults = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q")?.toLowerCase().trim() || "";
  const handleAddToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Produit ajouté au panier !");
};
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const allProducts = await fetchProducts();
        const result = allProducts.filter((product) =>
          product.name?.toLowerCase().includes(query)
        );
        setFilteredProducts(result);
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, [query]);

  return (
    <div>
      <Navbar />
      <div className="search-results-container">
        <h2>
          Résultats pour : <span className="query-highlight">{query}</span>
        </h2>

        {isLoading ? (
          <p className="loading">Chargement des produits...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="no-result">Aucun produit trouvé.</p>
        ) : (
          <div className="search-products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
export default SearchResults;