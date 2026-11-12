import { useState } from "react";

export default function ContactForm({ showName = false }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  // ერთი handler ყველა ველისთვის: name ატრიბუტით ვიგებთ, რომელი ველია
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault(); // გვერდი არ გადაიტვირთოს
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {showName && (
        <label>
          Your Name
          <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" required />
        </label>
      )}
      <label>
        Your Email
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email address" required />
      </label>
      <label>
        Your Message
        <textarea name="message" value={form.message} onChange={handleChange} rows="5" placeholder="Write your question, comment, or feedback here..." required />
      </label>
      <button className="btn btn--primary" type="submit">Send Message</button>
      {sent && <p className="form__success">✓ Thanks! Your message was sent.</p>}
    </form>
  );
}