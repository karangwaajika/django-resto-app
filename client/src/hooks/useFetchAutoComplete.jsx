import { useState, useEffect } from "react";
import axios from "axios";
export default function useFetchAutoComplete(url, search, refreshData) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    setIsLoading(true);
    console.log(search)
    axios
      .post(
        url,
        { search: search },
        {
          cancelToken: cancelToken.token,
        }
      )
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
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
  }, [search, refreshData]);

  return { data, isLoading, message };
}
