import { useState, useContext } from "react";
import axios from "axios";
import { updateBeverageContext } from "../pages/ViewBeverages";
export default function useDeleteMeal(beverage, closeModal) {
  const setUpdateBeverage = useContext(updateBeverageContext);
  const [message, setMessage] = useState();
  const clearMessage = () => {
    setMessage();
  };
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .delete(
        import.meta.env.VITE_REACT_APP_DELETE_BEVERAGE_API + "/" + beverage.beverage.id
      )
      .then((res) => {
        setMessage(res.data);
        setUpdateBeverage();
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
