import { useState } from "react";
import axios from "axios";
import fieldValidation from "../utils/fieldValidation.mjs";
export default function usePurchaseBeverage() {
  const [message, setMessage] = useState();
  const clearMessage = () => {
    setMessage();
  };
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    price: 0,
    beverage: '',
    qty: 0,
    purchase_date: "",
  });

  // handle  form input error
  const [fieldError, setFieldError] = useState({});
  const validateSubmitForm = async (e) => {
    e.preventDefault();

    const inputFields = {
      qty: form.qty,
      beverage: form.beverage,
      price: form.price,
      purchase_date: form.purchase_date,
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
      .post(import.meta.env.VITE_REACT_APP_PURCHASE_BEVERAGE_API, {
        qty: form.qty,
        beverage: form.beverage,
        price: form.price,
        purchase_date: form.purchase_date,
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
