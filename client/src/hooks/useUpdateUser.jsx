import { useState } from "react";
import axios from "axios";

export default function useUpdateUser(user) {
  const [message, setMessage] = useState();
  const clearMessage = () => {
    setMessage();
  };
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((oldForm) => {
      return { ...oldForm, [name]: value };
    });
  };

  // handle form input error
  const [fieldError, setFieldError] = useState({});
  const validateSubmitForm = async (e) => {
    e.preventDefault();
    let errors = {};
    if (form.password !== form.confirmPassword) {
      errors = { confirmPassword: "Passwords did not match" };
      setFieldError(errors);
    }

    console.log(Object.keys(errors).length);
    if (Object.keys(errors).length == 0) {
      form.firstName = form.firstName ? form.firstName : user.first_name;
      form.lastName = form.lastName ? form.lastName : user.last_name;
      form.username = form.username ? form.username : user.username;
      submitForm();
    }
  };

  const submitForm = (e) => {
    setIsLoading(true);
    const isDevelopment = import.meta.env.MODE === "production";
    const url = isDevelopment
      ? import.meta.env.VITE_REACT_APP_UPDATE_USER_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_UPDATE_USER_API;
    axios
      .post(
        url,
        {
          first_name: form.firstName,
          last_name: form.lastName,
          username: form.username,
          password: form.password,
          user_id: user.id,
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
    validateSubmitForm,
    clearMessage,
    message,
  };
}
