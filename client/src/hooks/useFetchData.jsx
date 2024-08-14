import { useState, useEffect } from "react";
import axios from "axios";
export default function useFetchData(url, refreshData) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    setIsLoading(true);
    axios
      .get(url, {
        cancelToken: cancelToken.token,
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
  }, [refreshData]);

  return { data, isLoading, message };
}
