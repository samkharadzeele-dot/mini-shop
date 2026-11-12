import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useCart } from "../context/CartContext.jsx";
import { useForm } from "../hooks/useForm.js";
import { FormField } from "../components/FormField.jsx";

function validate(v) {
  const e = {};
  if (v.fullName.trim().length < 2) e.fullName = "შეიყვანეთ სახელი და გვარი";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "ელ-ფოსტა არასწორია";
  if (!/^\+?\d{9,12}$/.test(v.phone.replace(/\s/g, ""))) e.phone = "ტელეფონი: 9–12 ციფრი";
  if (v.address.trim().length < 5) e.address = "მისამართი ძალიან მოკლეა";
  if (!/^\d{16}$/.test(v.card.replace(/\s/g, ""))) e.card = "ბარათის ნომერი: 16 ციფრი";
  return e;
}

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [done, setDone] = useState(null);
  const { field, errorFor, handleSubmit } = useForm(
    { fullName: "", email: "", phone: "", address: "", card: "" },
    validate
  );

  if (done) {
    return (
      <motion.section initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <h1>მადლობა, {done}!</h1>
        <p>შეკვეთა მიღებულია.</p>
        <Link className="btn" to="/products">შოპინგის გაგრძელება</Link>
      </motion.section>
    );
  }

  if (items.length === 0) {
    return (
      <section>
        <h1>შეკვეთა</h1>
        <p>კალათა ცარიელია.</p>
        <Link className="btn" to="/products">პროდუქტების ნახვა</Link>
      </section>
    );
  }

  const onValid = (values) => {
    // აქ რეალურ API-ს გავუგზავნიდით შეკვეთას
    clearCart();
    setDone(values.fullName);
  };

  return (
    <section>
      <h1>შეკვეთა</h1>
      <p>გადასახდელი: <strong>${total.toFixed(2)}</strong></p>
      <form className="form" onSubmit={handleSubmit(onValid)} noValidate>
        <FormField label="სახელი და გვარი" {...field("fullName")} error={errorFor("fullName")} />
        <FormField label="ელ-ფოსტა" type="email" {...field("email")} error={errorFor("email")} />
        <FormField label="ტელეფონი" type="tel" {...field("phone")} error={errorFor("phone")} />
        <FormField label="მისამართი" as="textarea" rows={2} {...field("address")} error={errorFor("address")} />
        <FormField label="ბარათის ნომერი" inputMode="numeric" {...field("card")} error={errorFor("card")} />
        <motion.button className="btn" type="submit" whileTap={{ scale: 0.96 }}>
          გადახდა
        </motion.button>
      </form>
    </section>
  );
}
