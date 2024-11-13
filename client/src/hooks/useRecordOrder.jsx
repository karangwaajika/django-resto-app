import { useState } from "react";
import axios from "axios";
import fieldValidation from "../utils/fieldValidation.mjs";
export default function useRecordOrder(
  beverageRecords,
  mealRecords,
  teaRecords
) {
  const [message, setMessage] = useState();
  const clearMessage = () => {
    setMessage();
  };
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    orderId: "",
    customerName: "",
    orderType: "",
  });
  // check records details
  let isRecordsEmpty = false;
  if (
    beverageRecords.length == 0 &&
    mealRecords.length == 0 &&
    teaRecords.length == 0
  ) {
    isRecordsEmpty = true;
  }

  // handle  form input error
  const [fieldError, setFieldError] = useState({});
  const validateSubmitForm = async (e) => {
    e.preventDefault();

    const inputFields = {
      orderId: form.orderId,
      customerName: form.customerName,
      orderType: form.orderType,
    };
    const validatedFields = fieldValidation(inputFields);
    setFieldError(validatedFields);

    if (Object.keys(validatedFields).length == 0 && !isRecordsEmpty) {
      // submitForms();
      const x = {
        order_id: form.orderId,
        order_type: form.orderType,
        customer_name: form.customerName,
        beverages: beverageRecords,
        meals: mealRecords,
        teas: teaRecords,
      };
      console.log(x);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((oldForm) => {
      return { ...oldForm, [name]: value };
    });
  };
  const submitForms = (e) => {
    setIsLoading(true);
    const isDevelopment = import.meta.env.MODE === "production";
    const url = isDevelopment
      ? import.meta.env.VITE_REACT_APP_ADD_BEVERAGE_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_ADD_BEVERAGE_API;
    axios
      .post(url, {
        order_id: form.orderId,
        order_type: form.orderType,
        customer_name: form.customerName,
        beverages: beverageRecords,
        meals: mealRecords,
        teas: teaRecords,
      })
      .then((res) => {
        if (res.data.success) {
          setMessage(res.data);
          setBeverageRefresher();
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
