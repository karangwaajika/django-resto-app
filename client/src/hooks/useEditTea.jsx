import { useState, useContext } from "react";
import axios from "axios";
import fieldValidation from "../utils/fieldValidation.mjs";
import { updateTeaContext } from "../pages/ViewTeas";
export default function useEditTea(tea) {
  const setUpdateTea = useContext(updateTeaContext);
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
    setIsLoading(true);
    axios
      .post(import.meta.env.VITE_REACT_APP_UPDATE_TEA_API + "/" + tea.id, {
        name: form.name,
        price: form.price,
        tea_type: form.tea_type,
      })
      .then((res) => {
        setMessage(res.data);
        setUpdateTea();
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
