import { useState } from "react";
import fieldValidation from "../utils/fieldValidation.mjs";
export default function useRecordTea() {
  const [teaRecords, setTeaRecords] = useState([]);
  const removeTea = (index) => {
    setTeaRecords((oldList) => {
      const newList = oldList.filter((_, i) => i != index);
      return newList;
    });
  };
  const [teaForm, setTeaForm] = useState({
    teaName: "",
    teaQty: 0,
  });

  const handleTeaChange = (e) => {
    const { name, value } = e.target;
    setTeaForm((oldForm) => {
      return { ...oldForm, [name]: value };
    });
  };
  //   validate tea field
  const [teaFieldError, setFieldError] = useState({});

  const addTea = () => {
    const inputFields = {
      teaName: teaForm.teaName,
      teaQty: teaForm.teaQty,
    };
    const validatedFields = fieldValidation(inputFields);
    setFieldError(validatedFields);
    if (Object.keys(validatedFields).length == 0) {
      // add meal records into an array
      teaForm.teaQty = parseInt(teaForm.teaQty);
      if (teaRecords.length == 0) {
        teaRecords.push(teaForm);
      } else {
        let isNewTea = true;
        for (let item of teaRecords) {
          if (item.teaName === teaForm.teaName) {
            isNewTea = false;
            item.teaQty += teaForm.teaQty;
          }
        }
        if (isNewTea) {
          teaRecords.push(teaForm);
        }
      }
      setTeaForm({
        teaName: "",
        teaQty: 0,
      });
    }
  };

  return {
    teaFieldError,
    teaForm,
    teaRecords,
    handleTeaChange,
    setTeaForm,
    addTea,
    setTeaRecords,
    removeTea,
  };
}
