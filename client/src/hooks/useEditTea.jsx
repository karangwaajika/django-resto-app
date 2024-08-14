import { useState } from "react";
import axios from "axios";
import fieldValidation from "../utils/fieldValidation.mjs";
export default function useEditTea(tea) {
  const [message, setMessage] = useState();
  const clearMessage = () => {
    setMessage();
  };
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(
    tea
      ? {
          name: tea.name,
          price: tea.price,
          tea_type: tea.tea_type,
        }
      : {
          name: "",
          price: 0,
          tea_type: "",
        }
  );

  // handle form input error
  const [fieldError, setFieldError] = useState({});
  const validateSubmitForm = async (e) => {
    e.preventDefault();
    const inputFields = {
      name: form.name,
      price: form.price,
      tea_type: form.tea_type,
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
    // todo:: update tea
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
