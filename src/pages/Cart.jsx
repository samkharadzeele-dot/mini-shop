import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { items, total, setQty, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <section>
        <h1>კალათა</h1>
        <p>კალათა ცარიელია.</p>
        <Link className="btn" to="/products">პროდუქტების ნახვა</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>კალათა</h1>
      <ul className="cart">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.li
              key={item.id}
              className="cart__row"
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
            >
              <img src={item.thumbnail} alt="" className="cart__img" />
              <span className="cart__title">{item.title}</span>
              <div className="qty">
                <button onClick={() => setQty(item.id, item.qty - 1)} aria-label="შემცირება">−</button>
                <span>{item.qty}</span>
                <button onClick={() => setQty(item.id, item.qty + 1)} aria-label="გაზრდა">+</button>
              </div>
              <span className="cart__sum">${(item.price * item.qty).toFixed(2)}</span>
              <button className="link-btn" onClick={() => removeFromCart(item.id)}>წაშლა</button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <div className="cart__footer">
        <button className="link-btn" onClick={clearCart}>კალათის გასუფთავება</button>
        <strong>ჯამი: ${total.toFixed(2)}</strong>
        <Link className="btn" to="/checkout">შეკვეთის გაფორმება</Link>
      </div>
    </section>
  );
}
