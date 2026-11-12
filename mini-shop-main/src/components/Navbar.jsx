import { Link, NavLink } from "react-router-dom";

export default function Navbar({ cartCount }) {
  return (
    <header className="navbar">
      <Link to="/" className="navbar__logo">MINIMA</Link>

      <nav className="navbar__links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Shop</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <Link to="/cart" className="navbar__cart">Cart ({cartCount})</Link>
    </header>
  );
}