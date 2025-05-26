import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./redux/cartSlice";
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const getTotalQty = () =>
    cartItems.reduce((total, item) => total + item.qty, 0);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.cost.replace("$", "")) || 0;
      return total + price * item.qty;
    }, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2>🛒 Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-image" />
              <div className="cart-info">
                <h4>{item.name}</h4>
                <p>Price: {item.cost}</p>
                <p>Quantity: {item.qty}</p>
                <div className="cart-buttons">
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, amount: 1 }))}>
                    +
                  </button>
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, amount: -1 }))}>
                    -
                  </button>
                  <button onClick={() => dispatch(removeItem(item.id))}>Delete</button>
                </div>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total Items: {getTotalQty()}</h3>
            <h3>Total Cost: ${getTotalPrice()}</h3>
          </div>

          <button className="checkout-btn" onClick={() => alert("Coming Soon!")}>Checkout</button>
          <button className="continue-btn" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default CartItem;
