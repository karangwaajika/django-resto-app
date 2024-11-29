import { useState, useEffect } from "react";
import axios from "axios";
export default function useFetchReports(
  url,
  search,
  startDate,
  endDate,
  isSubmit,
  setIsSubmit
) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const clearMessage = () => {
    setMessage();
  };
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    setIsLoading(true);
    axios
      .post(
        url,
        { search: search, start_date: startDate, end_date: endDate },
        {
          cancelToken: cancelToken.token,
          headers: {
            Authorization:
              "Token " +
              localStorage.getItem(import.meta.env.VITE_REACT_APP_TOKEN),
          },
        }
      )
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        if (err.message !== "canceled") {
          setMessage({
            success: false,
            message: err.message,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
    return () => {
      cancelToken.cancel();
    };
  }, [isSubmit]);

  return {
    data,
    isLoading,
    message,
    setData,
    setIsLoading,
    setMessage,
    clearMessage,
  };
}
