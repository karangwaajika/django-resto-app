import { useState, useContext } from "react";
import axios from "axios";
import { updateMealContext } from "../pages/ViewMeals";
export default function useDeleteMeal(meal, closeModal) {
  const setUpdateMeal = useContext(updateMealContext);
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
      ? import.meta.env.VITE_REACT_APP_DELETE_MEAL_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_DELETE_MEAL_API;
    axios
      .delete(url + "/" + meal.id)
      .then((res) => {
        setMessage(res.data);
        setUpdateMeal();
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
