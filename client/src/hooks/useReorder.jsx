import { useState } from "react";
import axios from "axios";
import fieldValidation from "../utils/fieldValidation.mjs";
export default function useReOrder(
  beverageRecords,
  mealRecords,
  teaRecords,
  orderId,
  setBeverageRecords,
  setMealRecords,
  setTeaRecords,
  setRefresh,
  customerName
) {
  const [message, setMessage] = useState();
  const clearMessage = () => {
    setMessage();
  };
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    orderId: "",
    customerName: "",
    orderType: 1,
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
      customerName: form.customerName ? form.customerName : customerName,
      orderType: form.orderType,
    };
    const validatedFields = fieldValidation(inputFields);
    setFieldError(validatedFields);
    if (isRecordsEmpty) {
      setMessage({ status: false, message: "You haven't added any item !!!" });
    }
    if (Object.keys(validatedFields).length == 0 && !isRecordsEmpty) {
      form.customerName = form.customerName ? form.customerName : customerName;
      form.orderId = orderId;
      submitForms();
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((oldForm) => {
      return { ...oldForm, [name]: value, orderId: orderId };
    });
  };
  const submitForms = (e) => {
    setIsLoading(true);
    const isDevelopment = import.meta.env.MODE === "production";
    const url = isDevelopment
      ? import.meta.env.VITE_REACT_APP_REORDER_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_REORDER_API;
    axios
      .post(
        url,
        {
          order_id: form.orderId,
          order_type: form.orderType,
          customer_name: form.customerName,
          beverages: beverageRecords,
          meals: mealRecords,
          teas: teaRecords,
        },
        {
          headers: {
            Authorization:
              "Token " +
              localStorage.getItem(import.meta.env.VITE_REACT_APP_TOKEN),
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setMessage(res.data);

          // clear Form
          setForm({
            orderId: "",
            customerName: "",
            orderType: 1,
          });

          // update bill number
          setMessage(res.data);
          setRefresh((oldState) => !oldState);

          // clear items
          setBeverageRecords([]);
          setMealRecords([]);
          setTeaRecords([]);
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
    setForm,
    handleChange,
    message,
    clearMessage,
    isLoading,
    validateSubmitForm,
  };
}
