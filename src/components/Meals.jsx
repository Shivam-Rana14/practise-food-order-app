import useHttp from "../hooks/useHttp";
import ErrorBox from "./ErrorBox";
import MealItem from "./MealItem";

const requestConfig = {};

export default function Meals() {
  // const { isFetching, error } = useFetch(fetchMeals, []);

  const {
    data: meals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <ErrorBox title="Fetching" message="Meals on the way" />;
  }

  if (error) {
    return <ErrorBox title="Something went wrong!" message={error} />;
  }

  return (
    <ul id="meals">
      {!isLoading &&
        meals.map((meal) => <MealItem meal={meal} key={meal.id} />)}
    </ul>
  );
}
