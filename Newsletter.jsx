import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setDone(true);
    setEmail("");
  }

  return (
    <section className="newsletter">
      <h2>GET EXCLUSIVE OFFERS</h2>
      <p>Get the latest news delivered right to your inbox.</p>
      <form className="newsletter__form" onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" required />
        <button className="btn btn--primary" type="submit">SIGN UP</button>
      </form>
      {done && <p className="form__success">✓ You are subscribed.</p>}
    </section>
  );
}