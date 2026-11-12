import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ProductCard } from "../components/ProductCard.jsx";

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=24")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
        setStatus("ok");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <section>
      <h1>პროდუქტები</h1>
      {status === "loading" && <p>იტვირთება...</p>}
      {status === "error" && <p>პროდუქტები ვერ ჩაიტვირთა.</p>}
      {status === "ok" && (
        <motion.div
          className="grid"
          variants={gridVariants}
          initial="hidden"
          animate="show"
        >
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </motion.div>
      )}
    </section>
  );
}
