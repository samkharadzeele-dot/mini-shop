import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section>
      <h1>404</h1>
      <p>გვერდი ვერ მოიძებნა.</p>
      <Link to="/">მთავარზე დაბრუნება</Link>
    </section>
  );
}
