import { Link } from "react-router-dom";
import Badge from "./Badge";
import Rating from "./Rating";

export default function ProductCard({ product, onAdd }) {
  const { id, title, category, price, rating, thumbnail, discountPercentage } = product;

  return (
    <div className="card">
      <Link to={`/products/${id}`} className="card__image">
        {/* && რენდერი: SALE მხოლოდ მაშინ, თუ ფასდაკლება 10%-ზე მეტია */}
        {discountPercentage > 10 && <Badge text="SALE" color="#e5484d" />}
        <img src={thumbnail} alt={title} />
      </Link>

      <p className="card__category">{category}</p>
      <h3 className="card__name">{title}</h3>
      <Rating value={rating} />

      <div className="card__bottom">
        <strong className="card__price">${price}</strong>
        <button className="card__button" onClick={() => onAdd(product)}>
          Add +
        </button>
      </div>
    </div>
  );
}