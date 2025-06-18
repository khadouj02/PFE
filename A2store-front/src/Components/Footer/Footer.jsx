import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} A2store . Tous droits réservés.</p>
      </div>
    </footer>
  );
}
export default Footer;
