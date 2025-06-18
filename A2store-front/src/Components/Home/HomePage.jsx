import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import AboutPage from "../About/AboutPage";
import Contact from "../Contact/Contact";
import CategoryMenu from "./Category/CategoryMenu";
import { fetchProducts } from "../../api";
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import swiper1 from "../../assets/swiper1.png";
import swiper2 from "../../assets/swiper2.png";
import swiper3 from "../../assets/swiper3.png";
import "swiper/css";
import "swiper/css/pagination";
import "./HomePage.css";
import ProductCard from "./ProductCard/ProductCard";
library.add(faHeartRegular);

function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des produits :", err);
      }
    };
    getProducts();
  }, []);

  const categories = ["Tous", ...new Set(products.map((p) => p.categ_id))];
  const filteredProducts = selectedCategory === "Tous"
    ? products
    : products.filter((p) => p.categ_id === selectedCategory);

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
    setTimeout(() => {
      window.location.href = "/cart";
    }, 100);
  };

  return (
    <div>
      <Navbar />
      <CategoryMenu
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Hero Section */}
      <section className="home-section">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            loop={true}
            className="hero-swiper"
          >
            <SwiperSlide className="hero-slide">
              <img src={swiper1} className="hero-img" />
            </SwiperSlide>

            <SwiperSlide className="hero-slide">
                  <img src={swiper2} className="hero-img" />
            </SwiperSlide>

            <SwiperSlide className="hero-slide">
              <img src={swiper3} className="hero-img" />
            </SwiperSlide> 
          </Swiper>
      </section>

      {/* Produits */}
      <section className="section products-section">
        <div className="container">
          <div className="product-list">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      <section id="about"><AboutPage /></section>
      <section id="contact"><Contact /></section>
      <Footer />
    </div>
  );
}
export default HomePage;
