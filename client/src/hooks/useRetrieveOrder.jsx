import { useState, useEffect } from "react";
import axios from "axios";
export default function useRetrieveOrder(url, isRefresh) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const clearMessage = () => {
    setMessage();
  };
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    setIsLoading(true);
    axios
      .get(url, {
        cancelToken: cancelToken.token,

        headers: {
          Authorization:
            "Token " +
            localStorage.getItem(import.meta.env.VITE_REACT_APP_TOKEN),
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        setMessage({
          success: false,
          message: err.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
    return () => {
      cancelToken.cancel();
    };
  }, [isRefresh]);

  return { setData, data, isLoading, message, clearMessage, setMessage };
}
