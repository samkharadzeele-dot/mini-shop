import { createContext, useContext, useEffect, useReducer } from "react";

const STORAGE_KEY = "mini-shop:cart";

const CartContext = createContext(null);

// localStorage-დან წაკითხვა (refresh-ის შემდეგ კალათა რჩება)
function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function cartReducer(items, action) {
  switch (action.type) {
    case "add": {
      const existing = items.find((i) => i.id === action.product.id);
      if (existing) {
        return items.map((i) =>
          i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      const { id, title, price, thumbnail } = action.product;
      return [...items, { id, title, price, thumbnail, qty: 1 }];
    }
    case "setQty":
      return items
        .map((i) => (i.id === action.id ? { ...i, qty: action.qty } : i))
        .filter((i) => i.qty > 0);
    case "remove":
      return items.filter((i) => i.id !== action.id);
    case "clear":
      return [];
    default:
      return items;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadCart);

  // ყოველ ცვლილებაზე localStorage-ში შენახვა
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage შეიძლება იყოს დაბლოკილი (private mode) — უბრალოდ ვაგრძელებთ
    }
  }, [items]);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  const value = {
    items,
    count,
    total,
    addToCart: (product) => dispatch({ type: "add", product }),
    setQty: (id, qty) => dispatch({ type: "setQty", id, qty }),
    removeFromCart: (id) => dispatch({ type: "remove", id }),
    clearCart: () => dispatch({ type: "clear" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
