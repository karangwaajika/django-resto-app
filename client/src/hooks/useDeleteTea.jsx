import { useState, useContext } from "react";
import axios from "axios";
import { updateTeaContext } from "../pages/ViewTeas";
export default function useDeleteTea(tea) {
  const setUpdateTea = useContext(updateTeaContext);
  const [message, setMessage] = useState();
  const clearMessage = () => {
    setMessage();
  };
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .delete(import.meta.env.VITE_REACT_APP_DELETE_TEA_API + "/" + tea.id)
      .then((res) => {
        setMessage(res.data);
        setUpdateTea();
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
