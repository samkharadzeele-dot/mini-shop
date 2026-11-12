import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useForm } from "../hooks/useForm.js";
import { FormField } from "../components/FormField.jsx";

function validate(v) {
  const e = {};
  if (v.username.trim().length < 3) e.username = "მინიმუმ 3 სიმბოლო";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "ელ-ფოსტა არასწორია";
  if (v.password.length < 8) e.password = "მინიმუმ 8 სიმბოლო";
  else if (!/\d/.test(v.password) || !/[a-zA-Z]/.test(v.password))
    e.password = "უნდა შეიცავდეს ასოს და ციფრს";
  if (v.confirm !== v.password) e.confirm = "პაროლები არ ემთხვევა";
  if (!v.terms) e.terms = "უნდა დაეთანხმოთ წესებს";
  return e;
}

export default function Register() {
  const [registered, setRegistered] = useState(null);
  const { field, errorFor, handleSubmit, values } = useForm(
    { username: "", email: "", password: "", confirm: "", terms: false },
    validate
  );

  if (registered) {
    return (
      <motion.section initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <h1>მოგესალმებით, {registered}!</h1>
        <p>რეგისტრაცია წარმატებით დასრულდა.</p>
        <Link className="btn" to="/products">პროდუქტების ნახვა</Link>
      </motion.section>
    );
  }

  const { value: _ignored, ...termsField } = field("terms");

  return (
    <section>
      <h1>რეგისტრაცია</h1>
      <form className="form" onSubmit={handleSubmit((v) => setRegistered(v.username))} noValidate>
        <FormField label="მომხმარებლის სახელი" autoComplete="username" {...field("username")} error={errorFor("username")} />
        <FormField label="ელ-ფოსტა" type="email" autoComplete="email" {...field("email")} error={errorFor("email")} />
        <FormField label="პაროლი" type="password" autoComplete="new-password" {...field("password")} error={errorFor("password")} />
        <FormField label="გაიმეორეთ პაროლი" type="password" autoComplete="new-password" {...field("confirm")} error={errorFor("confirm")} />
        <label className="field field--check">
          <input type="checkbox" {...termsField} checked={values.terms} />
          <span>ვეთანხმები წესებს</span>
        </label>
        {errorFor("terms") && <span className="field__error">{errorFor("terms")}</span>}
        <motion.button className="btn" type="submit" whileTap={{ scale: 0.96 }}>
          რეგისტრაცია
        </motion.button>
      </form>
    </section>
  );
}
