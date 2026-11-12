import { motion } from "motion/react";
import { useCart } from "../context/CartContext.jsx";

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <motion.article
      className="card"
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <img className="card__img" src={product.thumbnail} alt={product.title} loading="lazy" />
      <h3 className="card__title">{product.title}</h3>
      <p className="card__price">${product.price}</p>
      <motion.button
        className="btn"
        whileTap={{ scale: 0.94 }}
        onClick={() => addToCart(product)}
      >
        კალათაში დამატება
      </motion.button>
    </motion.article>
  );
}
