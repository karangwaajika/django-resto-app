import { useState, useContext } from "react";
import axios from "axios";
import { employeesDataContext } from "../pages/ViewWaiters";
import fieldValidation from "../utils/fieldValidation.mjs";
export default function useChangeEmployeePassword(
  employee,
  closeModal,
  employeeIndex
) {
  const employees = useContext(employeesDataContext);

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  // handle form input error
  const [fieldError, setFieldError] = useState({});
  const validateSubmitForm = async (e) => {
    e.preventDefault();
    const inputFields = {
      password: form.password,
      confirmPassword: form.confirmPassword,
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
    // close the modal when button clicked
    closeModal(employeeIndex, "password");

    // display loading icon
    employees.setIsLoading(true);

    const isDevelopment = import.meta.env.MODE === "production";
    const url = isDevelopment
      ? import.meta.env.VITE_REACT_APP_CHANGE_PASSWORD_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_CHANGE_PASSWORD_API;
    axios
      .post(
        url,
        { employeeId: employee.id, password: form.password },
        {
          headers: {
            Authorization:
              "Token " +
              localStorage.getItem(import.meta.env.VITE_REACT_APP_TOKEN),
          },
        }
      )
      .then((res) => {
        // display response message
        employees.setMessage(res.data);
      })
      .catch((err) => {
        employees.setMessage({
          success: false,
          message: err.message,
        });
      })
      .finally(() => {
        employees.setIsLoading(false);
      });
  };
  return {
    fieldError,
    form,
    handleChange,
    validateSubmitForm,
  };
}
