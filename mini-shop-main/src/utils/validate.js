export function validateEmail(value) {
  if (!value.includes("@")) return "Email must contain the @ symbol";
  if (!/^\S+@\S+\.\S+$/.test(value)) return "Please enter a valid email address";
  return ""; // ცარიელი ტექსტი = შეცდომა არ არის
}

export function validateName(value) {
  if (value.trim().length < 2) return "Name must be at least 2 characters";
  return "";
}