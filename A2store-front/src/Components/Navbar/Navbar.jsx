import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/Logo PNG A2_STORE.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { FaSearch } from "react-icons/fa";

function Navbar() {
  const cartCount = JSON.parse(localStorage.getItem("cart"))?.length || 0;
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };
  const handleFooter = () =>{
    
  }
  return (
    <>
     
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo">
            <img src={logo} alt="Logo A2Store" />
          </div>

          {/* Champ de recherche */}
          <form onSubmit={handleSearch} className="search-wrapper">
            <input
              type="text"
              placeholder="Rechercher des produits"
              className="search-bar"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="search-btn" type="submit">
              <FaSearch />
            </button>
          </form>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Accueil</Link></li>
          <li><a href="#productList">Produits</a></li>
          {/* <li ><a href="#categories">Catégories</a></li> */}
          <li><Link to="/categories">Catégories</Link></li>
          <li> <a href="#about">À propos</a></li>
          <li ><a href="#contact-page">Contact</a></li>
          
        </ul>

        <div className="navbar-right">
          <Link to="/wishlist">
            <FontAwesomeIcon icon={faHeartRegular} className="icon" />
          </Link>
          <Link to="/cart" className="cart-icon-container">
            <FontAwesomeIcon icon={faShoppingCart} className="icon" />
            {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
