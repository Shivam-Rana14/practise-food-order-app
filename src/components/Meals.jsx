import { useHttp } from "../hooks/useHttp";
import { fetchMeals } from "../http";
import MealItem from "./MealItem";

export default function Meals() {
  const { isFetching, error, fetchedData: meals } = useHttp(fetchMeals, []);

  if (error) {
    return <p id="meals">{error.message}</p>;
  }

  return (
    <ul id="meals">
      {!isFetching &&
        meals.map((meal) => <MealItem meal={meal} key={meal.id} />)}
    </ul>
  );
}
