import "../assets/Meal.css";
import MealForm from "../components/MealForm";
import { useState } from "react";
import axios from "axios";
import fieldValidation from "../utils/fieldValidation.mjs";

export default function AddMeal() {
  const [message, setMessage] = useState();
  const clearMessage = () => {
    setMessage();
  };
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: 0,
    meal_type: "",
  });

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
    console.log(Object.keys(validatedFields).length);
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
  const submitForm = () => {
    setIsLoading(true);
    axios
      .post(import.meta.env.VITE_REACT_APP_ADD_MEAL_API, {
        name: form.name,
        price: form.price,
        meal_type: form.meal_type,
      })
      .then((res) => {
        if (res.data.success) {
          setMessage(res.data);
        } else {
          setMessage(res.data);
        }
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
  return (
    <div className="add-meal-content">
      <div className="meal-header" style={{ textAlign: "center" }}>
        <h2>Add Meal/Dish</h2>
        <p style={{ fontSize: "14px" }}>
          Add Snacks, Salad, Fried, Family Deals, Pizza, etc..
        </p>
      </div>
      <MealForm
        message={message}
        isLoading={isLoading}
        form={form}
        handleChange={handleChange}
        submitForm={validateSubmitForm}
        clearMessage={clearMessage}
        fieldError={fieldError}
      />
    </div>
  );
}
