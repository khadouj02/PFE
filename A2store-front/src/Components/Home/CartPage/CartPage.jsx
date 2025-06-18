import { useEffect, useState } from "react";
import "./CartPage.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    try {
      const parsed = JSON.parse(storedCart) || [];
      setCartItems(parsed);
    } catch (e) {
      console.error("Erreur parsing du panier :", e);
    }
  }, []);

  const handleQuantityChange = (id, delta) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="cart-page">
        {cartItems.length === 0 ? (
          <p className="empty">Votre panier est vide.</p>
        ) : (
          <div className="cart-content">
            <div className="cart-list">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <p className="in-stock">🟢 En stock</p>
                    <p className="price">{item.price} MRU</p>
                    <div className="quantity-controls">
                      <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                    </div>
                    <p className="amount">Montant : {item.price * item.quantity} MRU</p>
                  </div>
                  <button className="remove-btn" onClick={() => handleRemove(item.id)}>❌</button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Résumé de la commande</h2>
              <p>Sous-total : {total} MRU</p>
              <hr />
              <p className="total">Total : {total} MRU</p>
              <button className="checkout-btn">✅ Valider la commande</button>
              <button className="clear-btn" onClick={clearCart}>🧹 Vider le panier</button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default CartPage;
