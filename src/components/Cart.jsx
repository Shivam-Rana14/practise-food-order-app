import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/cartContext";
import { currencyFormmater } from "../util/numberFormatter";

export default function Cart() {
  const { items } = useContext(CartContext);
  const totalPrice = items.reduce(
    (price, item) => (price += item.quantity * item.price),
    0
  );
  const price = currencyFormmater.format(totalPrice);
  return (
    <Modal className="cart">
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
      <p className="cart-total">{price}</p>
      <p className="modal-actions">
        <Button textOnly>Close</Button>
        <Button>Checkout</Button>
      </p>
    </Modal>
  );
}
