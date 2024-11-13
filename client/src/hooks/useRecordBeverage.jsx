import { useState } from "react";
import fieldValidation from "../utils/fieldValidation.mjs";
export default function useRecordBeverage() {
  const [beverageRecords, setBeverageRecords] = useState([]);
  const [beverageForm, setBeverageForm] = useState({
    beverageName: "",
    beverageQty: "",
  });

  const handleBeverageChange = (e) => {
    const { name, value } = e.target;
    setBeverageForm((oldForm) => {
      return { ...oldForm, [name]: value };
    });
  };
  //   validate beverage field
  const [beverageFieldError, setFieldError] = useState({});

  const addBeverage = () => {
    const inputFields = {
      beverageName: beverageForm.beverageName,
      beverageQty: beverageForm.beverageQty,
    };
    const validatedFields = fieldValidation(inputFields);
    setFieldError(validatedFields);
    console.log(validatedFields)
    if (Object.keys(validatedFields).length == 0) {
    
      console.log(beverageForm);
    }
  };

  return {
    beverageFieldError,
    beverageForm,
    beverageRecords,
    handleBeverageChange,
    addBeverage,
  };
}
