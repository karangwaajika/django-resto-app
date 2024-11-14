import { useState } from "react";
import fieldValidation from "../utils/fieldValidation.mjs";
export default function useRecordMeal() {
  const [mealRecords, setMealRecords] = useState([]);
  const [mealForm, setMealForm] = useState({
    mealName: "",
    mealQty: 0,
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
      // add meal records into an array
      mealForm.mealQty = parseInt(mealForm.mealQty);
      if (mealRecords.length == 0) {
        mealRecords.push(mealForm);
      } else {
        let isNewMeal = true;
        for (let item of mealRecords) {
          if (item.mealName === mealForm.mealName) {
            isNewMeal = false;
            item.mealQty += mealForm.mealQty;
          }
        }
        if (isNewMeal) {
          mealRecords.push(mealForm);
        }
      }
    }
  };

  return {
    mealFieldError,
    mealForm,
    mealRecords,
    handleMealChange,
    addMeal,
    setMealForm,
  };
}
