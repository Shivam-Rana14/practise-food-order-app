import { useContext } from "react";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Modal from "./UI/Modal";
import CartContext from "../store/cartContext";
import { currencyFormmater } from "../util/numberFormatter";
import UserProgressContext from "../store/UserProgressContext";

export default function Checkout() {
  const { items } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const totalPrice = items.reduce(
    (totalPrice, item) => (totalPrice += item.price * item.quantity),
    0
  );
  function handleHideCheckout() {
    hideCheckout();
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    console.log(data);

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: items,
          customer: data,
        },
      }),
    });
    hideCheckout();
  }
  return (
    <Modal open={progress === "checkout"} onClose={handleHideCheckout}>
      <form onSubmit={handleFormSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount : {currencyFormmater.format(totalPrice)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
          <Button onClick={handleHideCheckout} type="button" textOnly>
            Cancel
          </Button>
          <Button>Submit</Button>
        </p>
      </form>
    </Modal>
  );
}
