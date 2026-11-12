import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";
import ContactForm from "../components/ContactForm";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Home({ onAdd }) {
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=4");

  return (
    <div className="container">
      <section className="hero">
        <div>
          <h1>New Season.<br />Timeless Style.</h1>
          <p>Discover our curated collection of minimal essentials.</p>
          <div className="hero__buttons">
            <Link to="/products" className="btn btn--primary">Shop Now</Link>
            <Link to="/products" className="btn btn--outline">Explore</Link>
          </div>
        </div>
        <div className="hero__image" />
      </section>

      <section>
        <h2 className="section-title">Featured Products</h2>
        <p className="section-subtitle">Hand-picked pieces for the season</p>

        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {data && (
          <div className="grid grid--4">
            {data.products.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={onAdd} />
            ))}
          </div>
        )}

        <div className="center">
          <Link to="/products" className="btn btn--primary">Shop Now</Link>
        </div>
      </section>

      <section className="split">
        <div>
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}