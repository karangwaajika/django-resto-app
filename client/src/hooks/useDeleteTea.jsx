import { useState, useContext } from "react";
import axios from "axios";
import { updateTeaContext } from "../pages/ViewTeas";
export default function useDeleteTea(tea, closeModal) {
  const setUpdateTea = useContext(updateTeaContext);
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
      ? import.meta.env.VITE_REACT_APP_DELETE_TEA_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_DELETE_TEA_API;
    axios
      .delete(url + "/" + tea.id)
      .then((res) => {
        setMessage(res.data);
        setUpdateTea();
        closeModal();
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
