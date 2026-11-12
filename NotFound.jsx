import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container center-page">
      <h1 className="page-title">404</h1>
      <p className="state-message">This page does not exist.</p>
      <Link to="/" className="btn btn--primary">Back to Home</Link>
    </div>
  );
}