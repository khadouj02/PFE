import { useNavigate } from "react-router-dom"; // ✅ à importer
import WishlistButton from "./Wishlist/WishlistButton";
import { FaShoppingCart } from "react-icons/fa";
import "./ProductCard.css";

const ProductCard = ({ product, onRemoveFromWishlist }) => {
  const navigate = useNavigate(); // ✅ hook pour la navigation

  if (!product) return null;

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.list_price,
        quantity: 1,
        image: `data:image/png;base64,${product.image_1920}`,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div
      id="productList"
      className="product-item"
      onClick={() => navigate(`/product/${product.id}`)} // ✅ navigation au clic
      style={{ cursor: "pointer" }} // 💡 optionnel : indique que c'est cliquable
    >
      <div className="product-top-icons" onClick={(e) => e.stopPropagation()}>
        <WishlistButton product={product} />
      </div>

      {product.image_1920 && (
        <img
          src={`data:image/png;base64,${product.image_1920}`}
          alt={product.name}
        />
      )}

      <h3>{product.name}</h3>
      <p className="price">{product.list_price} MRU</p>

      <button
        className="btn add-to-cart"
        onClick={(e) => {
          e.stopPropagation(); // ⛔ empêche la redirection lors de l'ajout au panier
          addToCart(product);
        }}
      >
        <FaShoppingCart /> Ajouter au panier
      </button>
    </div>
  );
};

export default ProductCard;