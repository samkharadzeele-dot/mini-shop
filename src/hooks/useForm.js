import { useState } from "react";

// მარტივი ფორმის hook: values, errors, touched + ვალიდაცია
export function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
  }

  function handleBlur(e) {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  }

  // submit-ზე ყველა ველს "touched" ვხდით, რომ შეცდომები გამოჩნდეს
  function handleSubmit(onValid) {
    return (e) => {
      e.preventDefault();
      setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])));
      if (isValid) onValid(values);
    };
  }

  // ველის props + შეცდომა (მხოლოდ თუ ველს შეეხო)
  function field(name) {
    return {
      name,
      value: values[name],
      onChange: handleChange,
      onBlur: handleBlur,
      "aria-invalid": touched[name] && errors[name] ? true : undefined,
    };
  }

  const errorFor = (name) => (touched[name] ? errors[name] : undefined);

  return { values, field, errorFor, handleSubmit, isValid };
}
