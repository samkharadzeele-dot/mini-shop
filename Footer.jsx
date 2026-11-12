import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <strong>MINIMA</strong>
        <p>Minimal essentials for modern living.</p>
      </div>

      <div className="footer__col">
        <h4>Shop</h4>
        <Link to="/products">All Products</Link>
        <Link to="/cart">Cart</Link>
      </div>

      <div className="footer__col">
        <h4>Company</h4>
        <Link to="/contact">Contact</Link>
        <Link to="/">Home</Link>
      </div>

      <div className="footer__col">
        <h4>Follow</h4>
        <span>Instagram</span>
        <span>Pinterest</span>
      </div>
    </footer>
  );
}