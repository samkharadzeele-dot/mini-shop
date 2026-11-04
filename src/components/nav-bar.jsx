import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "მთავარი", end: true },
  { to: "/profile", label: "პროფილი" },
  { to: "/contact", label: "კონტაქტი" },
];

export function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__logo">
        mini-shop
      </NavLink>
      <ul className="navbar__links">
        {links.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                isActive ? "navbar__link navbar__link--active" : "navbar__link"
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
