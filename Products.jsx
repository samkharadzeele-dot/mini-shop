import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const STEP = 8;

export default function Products({ onAdd }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [limit, setLimit] = useState(STEP);

  // url იცვლება -> useFetch ავტომატურად ხელახლა იტვირთება
  const url = search
    ? `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${limit}`
    : `https://dummyjson.com/products?limit=${limit}`;

  const { data, loading, error } = useFetch(url);

  // sort ხდება კოპიაზე ([...]), რომ ორიგინალი მასივი არ შეიცვალოს
  let products = data ? [...data.products] : [];
  if (sort === "price-asc") products.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") products.sort((a, b) => b.price - a.price);
  if (sort === "rating") products.sort((a, b) => b.rating - a.rating);

  function handleSearch(e) {
    setSearch(e.target.value);
    setLimit(STEP); // ახალი ძიებისას თავიდან ვიწყებთ
  }

  const hasMore = data && products.length < data.total;

  return (
    <div className="container">
      <h1 className="page-title">All Products</h1>
      <p className="section-subtitle">Discover timeless essentials designed for everyday living.</p>

      <div className="toolbar">
        <input
          className="toolbar__search"
          placeholder="Search products..."
          value={search}
          onChange={handleSearch}
        />
        <div className="toolbar__right">
          <span>{data ? data.total : 0} products</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* 3 მდგომარეობა: loading / error / data (+ empty) */}
      {loading && !data && <Loader />}
      {error && <ErrorMessage message={error} />}
      {data && products.length === 0 && <p className="state-message">No products found.</p>}

      {products.length > 0 && (
        <div className="grid grid--4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="center">
          <button className="btn btn--outline" onClick={() => setLimit(limit + STEP)} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
