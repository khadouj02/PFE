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
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const categoryMap = new Map();
  products.forEach((p) => {
    const name = p.categ_id;
    if (name && !categoryMap.has(name)) {
      categoryMap.set(name, { id: name, name });
    }
  });
  const categoryList = Array.from(categoryMap.values());

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
            <img src={swiper1} className="hero-img" alt="Slide 1" />
          </SwiperSlide>
          <SwiperSlide className="hero-slide">
            <img src={swiper2} className="hero-img" alt="Slide 2" />
          </SwiperSlide>
          <SwiperSlide className="hero-slide">
            <img src={swiper3} className="hero-img" alt="Slide 3" />
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Produits par catégorie */}
      <section className="section products-section">
        <div className="container">
          {selectedCategory
            ? (() => {
                const filtered = products.filter(
                  (p) => p.categ_id === selectedCategory
                );
                return (
                  <div className="category-block">
                    <h2 className="category-title">{selectedCategory}</h2>
                    <div className="product-list">
                      {filtered.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                );
              })()
            : categoryList.map((category) => {
                const filtered = products.filter(
                  (p) => p.categ_id === category.id
                );
                return (
                  <div key={category.id} className="category-block">
                   <h2 className="category-title">{category.name.split('/').pop().trim()}</h2>
                    <div className="product-list">
                      {filtered.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                );
              })}
        </div>
      </section>

      <section id="about"><AboutPage /></section>
      <section id="contact"><Contact /></section>
      <Footer />
    </div>
  );
}
export default HomePage;