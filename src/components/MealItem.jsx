export default function MealItem({ meal }) {
  return (
    <li className="meal-item" key={meal.id}>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.id} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-description">{meal.description}</p>
          <p className="meal-item-price">${meal.price}</p>
          <button type="button" className="meal-item-actions">
            Add to cart
          </button>
        </div>
      </article>
    </li>
  );
}
