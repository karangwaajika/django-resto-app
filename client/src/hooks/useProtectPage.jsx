import axios from "axios";
import { useEffect, useState } from "react";

export default function useProtectPage() {
  const token = localStorage.getItem(import.meta.env.VITE_REACT_APP_TOKEN);
  let [isAuthenticated, setIsAuthenticated] = useState({});
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const isDevelopment = import.meta.env.MODE === "production";
    const url = isDevelopment
      ? import.meta.env.VITE_REACT_APP_PROTECT_PAGE_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_PROTECT_PAGE_API;
    axios
      .get(url, {
        headers: {
          Authorization: "Token " + token,
        },
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        setIsAuthenticated({
          status: true,
        });
        setUserInfo(res.data.user);
      })
      .catch((err) => {
        setIsAuthenticated({ status: false });
      });
    return () => {
      cancelToken.cancel();
    };
  }, []);

  return { isAuthenticated, userInfo };
}
