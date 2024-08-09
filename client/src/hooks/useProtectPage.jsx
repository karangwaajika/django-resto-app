import axios from "axios";
import { useEffect, useState } from "react";

export default function useProtectPage() {
  const token = localStorage.getItem("token");
  let [isAuthenticated, setIsAuthenticated] = useState({});
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    axios
      .get(import.meta.env.VITE_REACT_APP_PROTECT_PAGE_API, {
        headers: {
          Authorization: "Token " + token,
        },
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        setIsAuthenticated({
            status:true
        });
      })
      .catch((err) => {
        setIsAuthenticated({status:false});
      });
    return () => {
      cancelToken.cancel();
    };
  }, []);

  return { isAuthenticated };
}
