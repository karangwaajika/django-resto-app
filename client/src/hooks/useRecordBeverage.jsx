import { useState } from "react";
import fieldValidation from "../utils/fieldValidation.mjs";
export default function useRecordBeverage() {
  const [beverageRecords, setBeverageRecords] = useState([]);
  const [beverageForm, setBeverageForm] = useState({
    beverageName: "",
    beverageQty: 0,
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
    console.log(validatedFields);
    if (Object.keys(validatedFields).length == 0) {
      // add beverage records into an array
      beverageForm.beverageQty = parseInt(beverageForm.beverageQty)
      if (beverageRecords.length == 0) {
        beverageRecords.push(beverageForm);
      } else {
        let isNewBeverage = true;
        for (let item of beverageRecords) {
          if (item.beverageName === beverageForm.beverageName) {
            isNewBeverage = false;
            item.beverageQty += beverageForm.beverageQty;
          }
        }
        if (isNewBeverage) {
          beverageRecords.push(beverageForm);
        }
      }
      console.log(beverageRecords);
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
