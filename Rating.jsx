export default function Rating({ value }) {
  const stars = Math.round(value); // 4.94 -> 5
  return (
    <div className="rating">
      <span className="rating__stars">{"★".repeat(stars)}</span>
      <span className="rating__number">{value.toFixed(1)}</span>
    </div>
  );
}