import { useState, useEffect } from "react";

// custom hook: fetch + loading + error ერთ ადგილას (DRY)
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false; // თუ url სწრაფად შეიცვალა, ძველი პასუხი უგულებელვყოთ
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("მოთხოვნა ვერ შესრულდა: " + res.status);
        return res.json();
      })
      .then((json) => {
        if (!ignore) setData(json);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [url]); // url-ის ცვლილებისას ხელახლა გაეშვება

  return { data, loading, error };
}