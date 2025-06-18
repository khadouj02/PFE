import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { fetchProducts } from "../../../api";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WishlistButton from "../ProductCard/Wishlist/WishlistButton";
import "./ProductDetail.css";
library.add(faHeartRegular);

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setAllProducts(data);
      const selected = data.find((item) => item.id === parseInt(id));
      setProduct(selected);
    };
    getProducts();
  }, [id]);

  const addToCart = (productToAdd) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const found = cart.find((item) => item.id === productToAdd.id);
    let updatedCart;

    if (found) {
      updatedCart = cart.map((item) =>
        item.id === productToAdd.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          id: productToAdd.id,
          name: productToAdd.name,
          price: productToAdd.list_price,
          quantity: 1,
          image: `data:image/png;base64,${productToAdd.image_1920}`,
        },
      ];
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };
  if (!product) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Chargement du produit...</p>
      </div>
    );
  }
  const relatedProducts = allProducts.filter(
    (item) => item.categ_id === product.categ_id && item.id !== product.id
  );
  return (
    <div>
      <Navbar />
      <div className="product-detail-container">
        <div className="product-detail">
          <div className="product-image">
            <img
              src={`data:image/png;base64,${product.image_1920}`}
              alt={product.name}
            />
          </div>
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="product-price">{product.list_price} MRU</p>
            <p className="product-description">
              {product.description_sale || "Aucune description disponible."}
            </p>

            <div className="product-buttons">
              <button className="btn add-to-cart" onClick={() => addToCart(product)}>
                <FaShoppingCart /> Ajouter au panier
              </button>
              <button className="btn add-to-wishlist">
                <FaHeart /> Ajouter aux favoris
              </button>
            </div>
          </div>
        </div>

        {/* Produits Similaires */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>Produits similaires</h2>
            <div className="related-list">
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  className="related-item"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <div className="product-top-icons">
                    <WishlistButton product={product} />
                  </div>
                  <img
                    src={`data:image/png;base64,${item.image_1920}`}
                    alt={item.name}
                  />
                  <h4>{item.name}</h4>
                  <p>{item.list_price} MRU</p>
                  <button
                    className="btn add-to-cart"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                  >
                    <FaShoppingCart /> Ajouter au panier
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section Avis / Reviews */}
        <section className="reviews-section">
          <h2>Reviews</h2>
          <textarea placeholder="Laissez un commentaire..." className="review-input"></textarea>
          <div className="reviews-list">
            {[
              {
                name: 'Khadija',
                stars: 4,
                text: 'Produit extraordinaire',
                date: '25 Avril, 2025',
                avatar: '/images/avatar1.png'
              },
              {
                name: 'Zeineb',
                stars: 5,
                text: 'Excellent produit',
                date: '24 Janvier, 2025',
                avatar: '/images/avatar2.png'
              }
            ].map((review, idx) => (
              <div key={idx} className="review-item">
                <img src={review.avatar} alt="avatar" className="avatar" />
                <div>
                  <h4>
                    {review.name} <span className="review-stars">{'★'.repeat(review.stars)}</span>
                  </h4>
                  <p>{review.text}</p>
                  <span className="review-date">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;