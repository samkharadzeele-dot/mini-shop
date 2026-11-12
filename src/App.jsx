import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { NavBar } from "./components/nav-bar.jsx";
import { PageTransition } from "./components/PageTransition.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/products", element: <Products /> },
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/register", element: <Register /> },
  { path: "/profile", element: <Profile /> },
  { path: "/contact", element: <Contact /> },
  { path: "*", element: <NotFound /> },
];

export default function App() {
  const location = useLocation();

  return (
    <>
      <NavBar />
      <main className="page">
        {/* mode="wait": ძველი გვერდი ჯერ გადის, მერე ახალი შემოდის */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={<PageTransition>{element}</PageTransition>} />
            ))}
          </Routes>
        </AnimatePresence>
      </main>
    </>
  );
}
