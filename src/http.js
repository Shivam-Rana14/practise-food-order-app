export async function fetchMeals() {
  const response = await fetch("http://localhost:3000/meals");
  if (!response.ok) {
    throw new Error("Failed to fetch meal");
  }
  const fetchedMealsData = await response.json();

  return fetchedMealsData;
}
