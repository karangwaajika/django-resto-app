import { useState, useEffect } from "react";
import axios from "axios";
export default function useFetchItem(url, search) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const clearMessage = () => {
    setMessage();
  };
  const [openDropdown, setOpenDropdown] = useState(false);
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    if (search.length !== 0) {
      setIsLoading(true);

      axios
        .post(
          url,
          { search: search },
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
    }
    return () => {
      cancelToken.cancel();
    };
  }, [search]);

  return {
    data,
    isLoading,
    message,
    setData,
    clearMessage,
    openDropdown,
    setOpenDropdown,
  };
}
