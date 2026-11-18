import { useState } from "react";
import { validateEmail } from "../utils/validate";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [done, setDone] = useState(false);

  const error = validateEmail(email);
  const showError = touched && error;

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (error) return;
    setDone(true);
    setEmail("");
    setTouched(false);
  }

  return (
    <section className="newsletter">
      <h2>GET EXCLUSIVE OFFERS</h2>
      <p>Get the latest news delivered right to your inbox.</p>
      <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setDone(false); }}
          onBlur={() => setTouched(true)}
          className={showError ? "input--error" : ""}
          placeholder="Enter your email address"
        />
        <button className="btn btn--primary" type="submit">SIGN UP</button>
      </form>
      {showError && <p className="form__error">{error}</p>}
      {done && <p className="form__success">✓ You are subscribed.</p>}
    </section>
  );
}