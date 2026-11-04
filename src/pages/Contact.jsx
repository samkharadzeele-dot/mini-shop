import Counter from "../components/counter";
import { useState, useEffect } from "react";

export default function Contact() {
  const [count, setCount] = useState(0);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // console.log("კონტაქტის გვერდი ჩატვირთულია");
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => { 
        setProducts(data.products);
      });
  }, []);

  return (
    <section>
      <h1>კონტაქტი</h1>

      <Counter />
      <p>დაგვიკავშირდით ნებისმიერ დროს.</p>

      <button onClick={() => setCount(count + 1)}>
        დამატება: {count}
      </button>
      <div>
        {products.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

       