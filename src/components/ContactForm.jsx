import { useState } from "react";
import { validateEmail, validateName } from "../utils/validate";

const EMPTY = { name: "", email: "", message: "" };

export default function ContactForm({ showName = false }) {
  const [form, setForm] = useState(EMPTY);
  const [touched, setTouched] = useState({}); // რომელ ველს შეეხო მომხმარებელი
  const [sent, setSent] = useState(false);

  // შეცდომები ყოველ რენდერზე თავიდან ითვლება form-იდან
  const errors = {
    name: showName ? validateName(form.name) : "",
    email: validateEmail(form.email),
    message: form.message.trim() === "" ? "Message cannot be empty" : "",
  };

  const hasErrors = Object.values(errors).some((msg) => msg !== "");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(false);
  }

  function handleBlur(e) {
    // ველიდან გასვლისას ვნიშნავთ, რომ ის "შეხებულია"
    setTouched({ ...touched, [e.target.name]: true });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true }); // ყველა შეცდომა გამოჩნდეს
    if (hasErrors) return;

    setSent(true);
    setForm(EMPTY);
    setTouched({});
  }

  // დამხმარე: ველის შეცდომა ჩანს მხოლოდ თუ ველს შეეხო
  const showError = (field) => touched[field] && errors[field];

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {showName && (
        <label>
          Your Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={showError("name") ? "input--error" : ""}
            placeholder="Enter your name"
          />
          {showError("name") && <span className="form__error">{errors.name}</span>}
        </label>
      )}

      <label>
        Your Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={showError("email") ? "input--error" : ""}
          placeholder="Enter your email address"
        />
        {showError("email") && <span className="form__error">{errors.email}</span>}
      </label>

      <label>
        Your Message
        <textarea
          name="message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={showError("message") ? "input--error" : ""}
          placeholder="Write your question, comment, or feedback here..."
        />
        {showError("message") && <span className="form__error">{errors.message}</span>}
      </label>

      <button className="btn btn--primary" type="submit">Send Message</button>
      {sent && <p className="form__success">✓ Thanks! Your message was sent.</p>}
    </form>
  );
}