import { useState, useContext } from "react";
import axios from "axios";
import fieldValidation from "../utils/fieldValidation.mjs";
import { updateMealContext } from "../pages/ViewMeals";
export default function useEditMeal(meal) {
  const setUpdateMeal = useContext(updateMealContext);
  const [message, setMessage] = useState();
  const clearMessage = () => {
    setMessage();
  };
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    axios
      .post(import.meta.env.VITE_REACT_APP_UPDATE_MEAL_API + "/" + meal.id, {
        name: form.name,
        price: form.price,
        meal_type: form.meal_type,
      })
      .then((res) => {
        setMessage(res.data);
        setUpdateMeal();
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
    fieldError,
    form,
    handleChange,
    message,
    clearMessage,
    isLoading,
    validateSubmitForm,
  };
}
