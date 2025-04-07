import { useContext, useActionState } from "react";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Modal from "./UI/Modal";
import CartContext from "../store/cartContext";
import { currencyFormmater } from "../util/numberFormatter";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import ErrorBox from "./ErrorBox";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
};

export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);
  const [formState, formAction, isSending] = useActionState(
    checkoutAction,
    null
  );

  const totalPrice = items.reduce(
    (totalPrice, item) => (totalPrice += item.price * item.quantity),
    0
  );
  function handleHideCheckout() {
    hideCheckout();
  }

  const {
    data: fetchedData,
    // isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  async function checkoutAction(prevFormState, fd) {
    const data = Object.fromEntries(fd.entries());
    // console.log(data);

    await sendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: data,
        },
      })
    );
  }

  function handleFinish() {
    hideCheckout();
    clearCart();
    clearData();
  }

  let actions = (
    <>
      <Button onClick={handleHideCheckout} type="button" textOnly>
        Cancel
      </Button>
      <Button>Submit</Button>
    </>
  );

  if (fetchedData && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleHideCheckout}>
        <h2>Success</h2>
        <p>Delivering Your order as soon as we can</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Close</Button>
        </p>
      </Modal>
    );
  }

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  return (
    <Modal open={progress === "checkout"} onClose={handleHideCheckout}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount : {currencyFormmater.format(totalPrice)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <ErrorBox title="Order Failed" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
