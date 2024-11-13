import { useState } from "react";
import fieldValidation from "../utils/fieldValidation.mjs";
export default function useRecordMeal() {
  const [mealRecords, setMealRecords] = useState([]);
  const [mealForm, setMealForm] = useState({
    mealName: "",
    mealQty: "",
  });

  const handleMealChange = (e) => {
    const { name, value } = e.target;
    setMealForm((oldForm) => {
      return { ...oldForm, [name]: value };
    });
  };
  //   validate meal field
  const [mealFieldError, setFieldError] = useState({});

  const addMeal = () => {
    const inputFields = {
      mealName: mealForm.mealName,
      mealQty: mealForm.mealQty,
    };
    const validatedFields = fieldValidation(inputFields);
    setFieldError(validatedFields);
    if (Object.keys(validatedFields).length == 0) {
      console.log(mealForm);
    }
  };

  return {
    mealFieldError,
    mealForm,
    mealRecords,
    handleMealChange,
    addMeal,
  };
}
