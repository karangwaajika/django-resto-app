import { useState, useContext } from "react";
import axios from "axios";
import fieldValidation from "../utils/fieldValidation.mjs";
import { updateMealContext } from "../pages/ViewMeals";
export default function useEditMeal(meal, closeModal, mealIndex) {
  const meals = useContext(updateMealContext);

  const [form, setForm] = useState(
    meal
      ? {
          name: meal.name,
          price: meal.price,
          meal_type: meal.meal_type,
        }
      : {
          name: "",
          price: 0,
          meal_type: "",
        }
  );

  // handle form input error
  const [fieldError, setFieldError] = useState({});
  const validateSubmitForm = async (e) => {
    e.preventDefault();
    const inputFields = {
      name: form.name,
      price: form.price,
      meal_type: form.meal_type,
    };
    const validatedFields = fieldValidation(inputFields);
    setFieldError(validatedFields);

    if (Object.keys(validatedFields).length == 0) {
      submitForm();
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((oldForm) => {
      return { ...oldForm, [name]: value };
    });
  };
  const submitForm = (e) => {
    // close the modal when button clicked
    closeModal(mealIndex, "edit");

    // display loading icon
    meals.setIsLoading(true);
    const isDevelopment = import.meta.env.MODE === "production";
    const url = isDevelopment
      ? import.meta.env.VITE_REACT_APP_UPDATE_MEAL_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_UPDATE_MEAL_API;
    axios
      .post(
        url + "/" + meal.id,
        {
          name: form.name,
          price: form.price,
          meal_type: form.meal_type,
        },
        {
          headers: {
            Authorization:
              "Token " +
              localStorage.getItem(import.meta.env.VITE_REACT_APP_TOKEN),
          },
        }
      )
      .then((res) => {
        // display response message
        meals.setMessage(res.data);
        //update meals' List
        meals.setData((oldData) => {
          const newMealsList = oldData.map((item) => {
            if (item.id === meal.id) {
              item.name = form.name;
              item.price = form.price;
              item.meal_type = form.meal_type;
              return item;
            } else {
              return item;
            }
          });
          return newMealsList;
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
    fieldError,
    form,
    handleChange,
    validateSubmitForm,
  };
}
