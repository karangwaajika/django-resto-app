import { useState, useContext } from "react";
import axios from "axios";
import { updateMealContext } from "../pages/ViewMeals";
export default function useDeleteMeal(meal, closeModal) {
  const meals = useContext(updateMealContext);

  const submitForm = (e) => {
    e.preventDefault();
    closeModal();
    meals.setIsLoading(true);
    const isDevelopment = import.meta.env.MODE === "production";
    const url = isDevelopment
      ? import.meta.env.VITE_REACT_APP_DELETE_MEAL_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_DELETE_MEAL_API;
    axios
      .delete(url + "/" + meal.id)
      .then((res) => {
        meals.setMessage(res.data);
        // delete meal and update the list
        meals.setData((oldData) => {
          const deleteMeal = oldData.filter((item, i) => {
            return item.id !== meal.id;
          });
          return deleteMeal;
        });
      })
      .catch((err) => {
        meals.setMessage({
          success: false,
          message: err.message,
        });
      })
      .finally(() => {
        meals.setIsLoading(false);
      });
  };
  return {
    submitForm,
  };
}
