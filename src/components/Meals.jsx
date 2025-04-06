import { useFetch } from "../hooks/useFetch";
import { fetchMeals } from "../http";
import MealItem from "./MealItem";

export default function Meals() {
  const { isFetching, error, fetchedData: meals } = useFetch(fetchMeals, []);

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
