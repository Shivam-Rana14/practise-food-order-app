import Button from "./UI/Button";
import { currencyFormmater } from "../util/numberFormatter";
import CartContext from "../store/cartContext";
import { useContext } from "react";

export default function MealItem({ meal }) {
  const { addItem } = useContext(CartContext);

  function handleAddMeal() {
    addItem(meal);
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.id} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormmater.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
          <Button onClick={handleAddMeal} className="meal-item-actions">
            Add to cart
          </Button>
        </div>
      </article>
    </li>
  );
}
