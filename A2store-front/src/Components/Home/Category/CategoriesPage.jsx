import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import ProductCard from "../ProductCard/ProductCard";
import "./CategoriesPage.css";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/odoo/products/");
        const productsData = response.data;
        setProducts(productsData);

        // Générer les catégories uniques
        const categoryMap = new Map();
        productsData.forEach(p => {
          if (p.categ_id && !categoryMap.has(p.categ_id)) {
            categoryMap.set(p.categ_id, p.categ_id);
          }
        });
        setCategories(Array.from(categoryMap.values()));
        setFilteredProducts(productsData); // Au départ : tous les produits
      } catch (error) {
        console.error("Erreur chargement :", error);
      }
    };

    loadData();
  }, []);

  const handleCategoryClick = (category) => {
  setSelectedCategory(category);
  if (category) {
    // Afficher tous les produits de la catégorie
    setFilteredProducts(products.filter(p => p.categ_id === category));
  } else {
    // Afficher les 12 premiers produits
    setFilteredProducts(products.slice(0, 12));
  }
};


  return (
    <>
      <Navbar />
      <div className="categories-page">
        <div className="categories-menu">
          <div
            className={`category-item ${selectedCategory === null ? "active" : ""}`}
            onClick={() => handleCategoryClick(null)}
          >
            Toutes
          </div>
          {categories.map(cat => (
            <div
              key={cat}
              className={`category-item ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </div>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoriesPage;
