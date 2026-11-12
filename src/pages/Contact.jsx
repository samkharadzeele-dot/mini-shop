import { useState } from "react";
import { motion } from "motion/react";
import { useForm } from "../hooks/useForm.js";
import { FormField } from "../components/FormField.jsx";

const info = [
  { label: "ელ-ფოსტა", value: "info@mini-shop.ge", href: "mailto:info@mini-shop.ge" },
  { label: "ტელეფონი", value: "+995 555 12 34 56", href: "tel:+995555123456" },
  { label: "მისამართი", value: "თბილისი, რუსთაველის გამზ. 1" },
  { label: "სამუშაო საათები", value: "ორშ–პარ, 10:00–19:00" },
];

const subjects = ["ზოგადი კითხვა", "შეკვეთა", "დაბრუნება", "თანამშრომლობა"];

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "შეიყვანეთ სახელი";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "ელ-ფოსტა არასწორია";
  if (!v.subject) e.subject = "აირჩიეთ თემა";
  if (v.message.trim().length < 10) e.message = "შეტყობინება: მინიმუმ 10 სიმბოლო";
  return e;
}

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0 },
};

export default function Contact() {
  const [sentTo, setSentTo] = useState(null);
  const { field, errorFor, handleSubmit } = useForm(
    { name: "", email: "", subject: "", message: "" },
    validate
  );

  return (
    <section>
      <h1>კონტაქტი</h1>
      <p>დაგვიკავშირდით ნებისმიერ დროს — გიპასუხებთ 24 საათში.</p>

      <div className="contact">
        <motion.ul
          className="contact__info"
          variants={listVariants}
          initial="hidden"
          animate="show"
        >
          {info.map(({ label, value, href }) => (
            <motion.li key={label} variants={itemVariants}>
              <span className="contact__label">{label}</span>
              {href ? <a href={href}>{value}</a> : <span>{value}</span>}
            </motion.li>
          ))}
        </motion.ul>

        {sentTo ? (
          <motion.div
            className="contact__done"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2>მადლობა, {sentTo}!</h2>
            <p>შეტყობინება გაიგზავნა.</p>
            <button className="btn" onClick={() => setSentTo(null)}>
              ახალი შეტყობინება
            </button>
          </motion.div>
        ) : (
          <form
            className="form contact__form"
            onSubmit={handleSubmit((v) => setSentTo(v.name))}
            noValidate
          >
            <FormField label="სახელი" autoComplete="name" {...field("name")} error={errorFor("name")} />
            <FormField label="ელ-ფოსტა" type="email" autoComplete="email" {...field("email")} error={errorFor("email")} />
            <FormField label="თემა" as="select" {...field("subject")} error={errorFor("subject")}>
              <option value="">— აირჩიეთ —</option>
              {subjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </FormField>
            <FormField label="შეტყობინება" as="textarea" rows={5} {...field("message")} error={errorFor("message")} />
            <motion.button className="btn" type="submit" whileTap={{ scale: 0.96 }}>
              გაგზავნა
            </motion.button>
          </form>
        )}
      </div>
    </section>
  );
}
