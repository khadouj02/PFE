import React from "react";
import "./Contact.css";
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import logo from "../../assets/Logo PNG A2_STORE.png";
const ContactPage = () => {
  return (
    <div id="contact-page" className="contact-page">
      <div className="contact-columns">
        {/* COLONNE 1 - À propos */}
        <div className="contact-description">
            <div className="logo">
                <img src={logo} alt="Logo A2Store" />
            </div>
            <p>
              A2Store propose les meilleurs produits<br></br> électroniques pour tous vos besoins en technologie.
            </p>

          <div className="social-icons">
            <a href="https://www.facebook.com/a2ict28/"><FaFacebookF /></a>
            <a href="https://www.instagram.com/a2ict.28/"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
            <a href="https://www.linkedin.com/showcase/a2ict/"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* COLONNE 2 - Support */}
        <div className="contact-link">
            <h3>CONTACT</h3>
            <ul>
              <li><FaAngleDoubleRight /> Accueil</li>
              <li><FaAngleDoubleRight /> Catégories</li>
              <li><FaAngleDoubleRight /> Produits</li>
              <li><FaAngleDoubleRight /> À propos</li>
              <li><FaAngleDoubleRight /> Contact</li>
            </ul>
          </div>

        {/* COLONNE 3 - Entreprise */}
        <div className="contact-links">
          <h3>CONTACT</h3>
          <ul>
            <li><FaWhatsapp /> +222 34610101</li>
            <li><FaEnvelope /> contact@a2store.mr</li>
            <li><FaPhone /> +222 34610101</li>
            <li><FaMapMarkerAlt />Nouakchott, Mauritanie</li>
          </ul>
        </div>

        {/* COLONNE 4 - Politiques */}
        {/* <div className="contact-links">
          <h3>rtyuio</h3>
          <ul>
            <li>A2Connect</li>
            <li>A2ICT</li>
            <li>Titre 3</li>
            <li>Titre 4</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default ContactPage;
