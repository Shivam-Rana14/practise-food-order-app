import { useContext } from "react";
import CartContext from "../store/cartContext";
import { currencyFormmater } from "../util/numberFormatter";

export default function CartItem({ item }) {
  const { addItem, removeItem } = useContext(CartContext);

  function handleAdd(item) {
    addItem(item);
  }
  function handleDeduct(id) {
    removeItem(id);
  }
  return (
    <li className="cart-item">
      <p>
        {item.name} - {currencyFormmater.format(item.quantity * item.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => handleDeduct(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => handleAdd(item)}>+</button>
      </p>
    </li>
  );
}
