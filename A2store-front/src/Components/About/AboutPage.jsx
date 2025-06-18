import React from "react";
import "./AboutPage.css";
import { FaShoppingCart, FaArrowUp } from "react-icons/fa";

function AboutPage() {
  return (
    <div id="about" className="about-wrapper" >
      <div className="home-landing">
        <div className="left-image" />
        <div className="right-content">
          <p className="section-label">/ À PROPOS DE NOUS</p>
          <h1 className="main-title">A2Store</h1>
          <p className="description">
            A2Store est une boutique en ligne spécialisée dans la vente de matériel
            informatique, électronique et électroménager. Nous fournissons aux
            particuliers et professionnels en Mauritanie des produits de qualité à des prix compétitifs.
          </p>
          <div className="highlight-box">
            <FaShoppingCart className="icon" />
            <p>
              <span className="brand">A2Store</span>, Rendre la technologie accessible à tous, partout en Mauritanie
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
