import { useState, useContext } from "react";
import axios from "axios";
import { updateBeverageContext } from "../pages/ViewBeverages";
export default function useDeleteMeal(beverage, closeModal, beverageIndex) {
  const beverages = useContext(updateBeverageContext);

  const submitForm = (e) => {
    e.preventDefault();
    closeModal(beverageIndex, "delete");
    beverages.setIsLoading(true);
    const isDevelopment = import.meta.env.MODE === "production";
    const url = isDevelopment
      ? import.meta.env.VITE_REACT_APP_DELETE_BEVERAGE_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_DELETE_BEVERAGE_API;
    axios
      .delete(url + "/" + beverage.beverage.id, {
        headers: {
          Authorization:
            "Token " +
            localStorage.getItem(import.meta.env.VITE_REACT_APP_TOKEN),
        },
      })
      .then((res) => {
        beverages.setMessage(res.data);
        // remove beverage from the list and update it.
        beverages.setData((oldData) => {
          const deleteBeverage = oldData.filter((item, i) => {
            return item.id !== beverage.id;
          });
          return deleteBeverage;
        });
      })
      .catch((err) => {
        beverages.setMessage({
          success: false,
          message: err.message,
        });
      })
      .finally(() => {
        beverages.setIsLoading(false);
      });
  };
  return {
    submitForm,
  };
}
