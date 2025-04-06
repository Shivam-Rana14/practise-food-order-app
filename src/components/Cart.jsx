import { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import CartContext from "../store/cartContext";
import { currencyFormmater } from "../util/numberFormatter";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const { items } = useContext(CartContext);
  const { progress, hideCart } = useContext(UserProgressContext);
  const totalPrice = items.reduce(
    (price, item) => (price += item.quantity * item.price),
    0
  );
  const price = currencyFormmater.format(totalPrice);

  function handleHideCart() {
    hideCart();
  }

  return (
    <Modal className="cart" open={progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <p className="cart-total">{price}</p>
      <p className="modal-actions">
        <Button onClick={handleHideCart} textOnly>
          Close
        </Button>
        <Button>Checkout</Button>
      </p>
    </Modal>
  );
}
