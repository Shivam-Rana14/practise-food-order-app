import { useState, useEffect } from "react";

export function useFetch(fetchingFn, initialValue) {
  const [fetchedData, setFetchedData] = useState(initialValue);
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setIsFetching(true);

    async function fetch() {
      try {
        const response = await fetchingFn();
        setFetchedData(response);
      } catch (error) {
        setError({ message: error.message || "Internal Server Error" });
      }
      setIsFetching(false);
    }
    fetch();
  }, []);

  return { fetchedData, isFetching, error };
}
