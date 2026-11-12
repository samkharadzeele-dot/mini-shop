import ContactForm from "../components/ContactForm";
import Newsletter from "../components/Newsletter";

export default function Contact() {
  return (
    <div className="container">
      <section className="contact-head">
        <h1 className="page-title">Get in Touch</h1>
        <p>Have a question or feedback? We'd love to hear from you. Reach out and our team will get back to you shortly.</p>
      </section>

      <section className="contact-grid">
        <div>
          <h3>Send us a message</h3>
          <ContactForm showName />
        </div>

        <div>
          <h3>Contact Information</h3>
          <ul className="contact-info">
            <li><strong>Visit us</strong><span>123 Essentials Avenue, Tbilisi, Georgia</span></li>
            <li><strong>Email us</strong><span>hello@minima.store</span></li>
            <li><strong>Call us</strong><span>+995 555 123 456</span></li>
            <li><strong>Working hours</strong><span>Mon–Fri: 9–18, Sat: 10–16</span></li>
          </ul>
          <div className="contact-image" />
        </div>
      </section>

      <Newsletter />
    </div>
  );
}