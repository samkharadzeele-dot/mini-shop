import { Link } from "react-router-dom";

export default function Cart({ cart, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0) {
    return (
      <div className="container">
        <h1 className="page-title">Your Cart</h1>
        <p className="state-message">Your cart is empty.</p>
        <div className="center">
          <Link to="/products" className="btn btn--primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Your Cart ({cart.length})</h1>

      <div className="cart">
        {cart.map((item) => (
          <div key={item.cartId} className="cart__row">
            <img src={item.thumbnail} alt={item.title} />
            <div className="cart__info">
              <Link to={`/products/${item.id}`}>{item.title}</Link>
              <span>{item.category}</span>
            </div>
            <strong>${item.price}</strong>
            <button className="cart__remove" onClick={() => onRemove(item.cartId)}>Remove</button>
          </div>
        ))}

        <div className="cart__total">
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
}