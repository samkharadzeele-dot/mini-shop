import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../context/CartContext.jsx";

const links = [
  { to: "/", label: "მთავარი", end: true },
  { to: "/products", label: "პროდუქტები" },
  { to: "/register", label: "რეგისტრაცია" },
  { to: "/profile", label: "პროფილი" },
  { to: "/contact", label: "კონტაქტი" },
];

const linkClass = ({ isActive }) =>
  isActive ? "navbar__link navbar__link--active" : "navbar__link";

export function NavBar() {
  // props-ის გადაცემა არ გვჭირდება — კალათა Context-იდან მოდის
  const { count } = useCart();

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__logo">
        mini-shop
      </NavLink>
      <ul className="navbar__links">
        {links.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink to={to} end={end} className={linkClass}>
              {label}
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink to="/cart" className={linkClass}>
            კალათა
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  className="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {/* key იცვლება → რიცხვი ყოველ დამატებაზე "ხტება" */}
                  <motion.span
                    key={count}
                    style={{ display: "inline-block" }}
                    initial={{ scale: 1.6 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {count}
                  </motion.span>
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
