import { useState, useContext } from "react";
import axios, { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import fieldValidation from "../utils/fieldValidation.mjs";
import { orderContext } from "../pages/waiter/ApproveBill";

export default function useApproveOrder(
  orderId,
  customerName,
  overallTotal,
  setMessage,
  setRefresh
) {
  const [isLoading, setIsLoading] = useState(false);
  //   form input
  const [form, setForm] = useState({
    orderId: 0,
    customerName: "",
    comment: "",
    cash: 0,
    momo: 0,
  });

  // handle  form input error
  const [fieldError, setFieldError] = useState({});
  const validateSubmitForm = async (e) => {
    e.preventDefault();

    const inputFields = {
      cash: form.cash,
      momo: form.momo,
    };
    const validatedFields = fieldValidation(inputFields);
    setFieldError(validatedFields);
    let isFormValide = true;
    if (form.cash == 0 && form.momo == 0 && !(form.comment.trim())) {
      isFormValide = false;
      setMessage({ status: false, message: "You didn't set amount!" });
    }
    if (Number(form.cash) + Number(form.momo) > Number(overallTotal)) {
      isFormValide = false;
      setMessage({
        status: false,
        message: "Amount is greater than the expected!!!!",
      });
    }
    if (Object.keys(validatedFields).length == 0 && isFormValide) {
      form.customerName = form.customerName ? form.customerName : customerName;
      submitForm();
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((oldForm) => {
      return { ...oldForm, [name]: value, orderId: orderId };
    });
  };
  const submitForm = (e) => {
    setIsLoading(true);

    const isDevelopment = import.meta.env.MODE === "production";
    const url = isDevelopment
      ? import.meta.env.VITE_REACT_APP_APPROVE_BILL_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_APPROVE_BILL_API;
    axios
      .post(
        url + "/" + form.orderId,
        {
          cash: form.cash ? form.cash: 0 ,
          momo: form.momo ? form.momo : 0,
          customer_name: form.customerName,
          comment: form.comment,
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
        setMessage(res.data);
        setRefresh((oldState) => !oldState);
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
    isLoading,
    handleChange,
    validateSubmitForm,
  };
}
