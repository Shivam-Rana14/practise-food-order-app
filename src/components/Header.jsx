import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/cartContext";
import UserProgressContext from "../store/UserProgressContext";
import { useContext } from "react";
export default function Header() {
  const { items } = useContext(CartContext);
  const { showCart, hideCart } = useContext(UserProgressContext);

  const totalItems = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="logo-img" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>
          Cart({totalItems})
        </Button>
      </nav>
    </header>
  );
}
