import { useState } from "react";
import fieldValidation from "../utils/fieldValidation.mjs";
export default function useRecordTea() {
  const [teaRecords, setTeaRecords] = useState([]);
  const [teaForm, setTeaForm] = useState({
    teaName: "",
    teaQty: "",
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
      console.log(teaForm);
    }
  };

  return {
    teaFieldError,
    teaForm,
    teaRecords,
    handleTeaChange,
    addTea,
  };
}
