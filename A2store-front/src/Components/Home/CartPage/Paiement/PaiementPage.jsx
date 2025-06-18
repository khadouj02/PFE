import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PaiementPage.css";

const PaiementPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address) {
      alert("Merci de remplir tous les champs.");
      return;
    }

    // Simuler confirmation
    alert("Commande confirmée !");
    localStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <div className="paiement-container">
      <h1>💳 Paiement sécurisé</h1>

      <form onSubmit={handleSubmit} className="paiement-form">
        <label>
          Nom complet :
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Téléphone :
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Adresse :
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">✅ Confirmer la commande</button>
      </form>

      <div className="commande-resume">
        <h2>🛍️ Votre commande</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="resume-item">
            <span>{item.name} x{item.quantity}</span>
            <span>{item.price * item.quantity} MRU</span>
          </div>
        ))}
        <hr />
        <p className="total">Total : {total + 1000} MRU (avec livraison)</p>
      </div>
    </div>
  );
};

export default PaiementPage;
