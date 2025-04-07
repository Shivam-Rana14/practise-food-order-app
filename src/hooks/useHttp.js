import { useCallback, useEffect, useState } from "react";

export async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong");
  }

  return resData;
}

export default function useHttp(url, config) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const sendRequest = useCallback(
    async function sendRequest() {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, config);
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  return {
    data: data,
    isLoading: isLoading,
    error: error,
    sendRequest,
  };
}
