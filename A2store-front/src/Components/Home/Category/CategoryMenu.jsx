import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./CategoryMenu.css";

const CategoryMenu = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/odoo/products/");
        const products = response.data;

        const categorySet = new Set();
        products.forEach((p) => {
          if (p.categ_id) categorySet.add(p.categ_id);
        });

        setCategories(Array.from(categorySet));
      } catch (error) {
        console.error("Erreur chargement catégories :", error);
      }
    };
    loadCategories();
  }, []);
  return (
    <div className="category-container">
      <div className="category-wrapper">
        <button className="category-arrow left" onClick={() => scroll("left")}>
          &#8249;
        </button>
        <div className="category-menu" ref={scrollRef}>
          {categories.map((category) => (
           <div
            key={category}
            className={`category-box ${selectedCategory === category ? "active" : ""}`}
            onClick={() => onSelectCategory && onSelectCategory(category)}
          >
            {category}
          </div>

          ))}
        </div>
        <button className="category-arrow right" onClick={() => scroll("right")}>
          &#8250;
        </button>
      </div>
    </div>
  );
};
export default CategoryMenu;