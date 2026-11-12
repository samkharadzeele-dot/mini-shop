import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Rating from "../components/Rating";
import Accordion from "../components/Accordion";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const SIZES = ["S", "M", "L", "XL"];
const COLORS = [
  { name: "Brown", hex: "#b08968" },
  { name: "Sage", hex: "#a3b18a" },
  { name: "Navy", hex: "#1b1f5e" },
  { name: "White", hex: "#f1f1f1" },
];

export default function ProductDetails({ onAdd }) {
  const { id } = useParams(); // URL: /products/5 -> id === "5"
  const { data: product, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);

  if (loading) return <div className="container"><Loader /></div>;
  if (error) return <div className="container"><ErrorMessage message={error} /></div>;

  // key={product.id}: სხვა პროდუქტზე გადასვლისას შიდა state თავიდან დაიწყება
  return <ProductView key={product.id} product={product} onAdd={onAdd} />;
}

function ProductView({ product, onAdd }) {
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState("S");
  const [color, setColor] = useState("Brown");
  const [added, setAdded] = useState(false);

  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

  function handleAdd() {
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="container">
      <p className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / {product.title}
      </p>

      <section className="details">
        <div className="gallery">
          <div className="gallery__main">
            <img src={images[activeImage]} alt={product.title} />
          </div>
          <div className="gallery__thumbs">
            {images.slice(0, 3).map((img, index) => (
              <button
                key={img}
                className={index === activeImage ? "thumb thumb--active" : "thumb"}
                onClick={() => setActiveImage(index)}
              >
                <img src={img} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="info">
          <h1>{product.title}</h1>
          <Rating value={product.rating} />
          <p className="info__price">${product.price}</p>
          <p className="info__stock">
            {product.stock > 0 ? `In stock (${product.stock})` : "Sold out"}
          </p>

          <p className="info__label">Select Size and Colour</p>
          <div className="options">
            {SIZES.map((s) => (
              <button key={s} className={s === size ? "chip chip--active" : "chip"} onClick={() => setSize(s)}>
                {s}
              </button>
            ))}
          </div>
          <div className="options">
            {COLORS.map((c) => (
              <button
                key={c.name}
                title={c.name}
                className={c.name === color ? "swatch swatch--active" : "swatch"}
                style={{ backgroundColor: c.hex }}
                onClick={() => setColor(c.name)}
              />
            ))}
          </div>

          <button className="btn btn--primary btn--full" onClick={handleAdd} disabled={product.stock === 0}>
            {added ? "✓ Added" : "Add to Cart"}
          </button>

          <Accordion title="Product Details">
            <p>{product.description}</p>
            <p>Brand: {product.brand || "MINIMA"}</p>
          </Accordion>
          <Accordion title="Delivery & Return Details">
            <p>Deliver to: Home</p>
            <p>Return: 7 Day Return and Exchange</p>
            <p>Cash on Delivery Available</p>
          </Accordion>
        </div>
      </section>

      <RelatedProducts category={product.category} currentId={product.id} onAdd={onAdd} />
    </div>
  );
}

function RelatedProducts({ category, currentId, onAdd }) {
  const { data } = useFetch(`https://dummyjson.com/products/category/${category}?limit=5`);

  if (!data) return null;

  const related = data.products.filter((p) => p.id !== currentId).slice(0, 4);
  if (related.length === 0) return null;

  return (
    <section>
      <h2 className="section-title">You May Also Like</h2>
      <div className="grid grid--4">
        {related.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}
