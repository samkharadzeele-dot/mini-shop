import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  // კალათის state ცხოვრობს აქ, რადგან მას რამდენიმე გვერდი იყენებს
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    // immutable update: ძველი მასივი + ახალი ელემენტი (cart.push არა!)
    setCart([...cart, { ...product, cartId: crypto.randomUUID() }]);
  }

  function removeFromCart(cartId) {
    setCart(cart.filter((item) => item.cartId !== cartId));
  }

  return (
    <>
      <Navbar cartCount={cart.length} />

      <main>
        <Routes>
          <Route path="/" element={<Home onAdd={addToCart} />} />
          <Route path="/products" element={<Products onAdd={addToCart} />} />
          <Route path="/products/:id" element={<ProductDetails onAdd={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} onRemove={removeFromCart} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}