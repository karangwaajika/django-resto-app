import { useState, useContext } from "react";
import axios from "axios";
import { updateWaiterContext } from "../pages/ViewWaiters";
export default function useUpdateEmployeeRole(employeeId) {
  const setUpdateWaiter = useContext(updateWaiterContext);
  const [message, setMessage] = useState();
  const clearMessage = () => {
    setMessage();
  };
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isDevelopment = import.meta.env.MODE === "production";
    const url = isDevelopment
      ? import.meta.env.VITE_REACT_APP_UPDATE_ROLE_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_UPDATE_ROLE_API;
    axios
      .get(url + "/" + employeeId)
      .then((res) => {
        setMessage(res.data);
        setUpdateWaiter();
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
  };
  return {
    message,
    clearMessage,
    isLoading,
    submitForm,
  };
}
