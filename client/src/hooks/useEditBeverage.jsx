import { useState, useContext } from "react";
import axios from "axios";
import fieldValidation from "../utils/fieldValidation.mjs";
import { updateBeverageContext } from "../pages/ViewBeverages";
export default function useEditBeverage(beverage) {
  const setUpdateBeverage = useContext(updateBeverageContext);
  const [message, setMessage] = useState();
  const clearMessage = () => {
    setMessage();
  };
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(
    beverage
      ? {
          name: beverage.beverage.name,
          price: beverage.price,
          beverage_type: beverage.beverage.beverage_type,
          qty: beverage.qty,
        }
      : {
          name: "",
          price: 0,
          beverage_type: "",
          qty: "",
        }
  );

  // handle form input error
  const [fieldError, setFieldError] = useState({});
  const validateSubmitForm = async (e) => {
    e.preventDefault();
    const inputFields = {
      name: form.name,
      price: form.price,
      beverage_type: form.beverage_type,
      qty: form.qty,
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
      .post(
        import.meta.env.VITE_REACT_APP_UPDATE_BEVERAGE_API + "/" + beverage.beverage.id,
        {
          name: form.name,
          price: form.price,
          beverage_type: form.beverage_type,
          qty: form.qty,
        }
      )
      .then((res) => {
        setMessage(res.data);
        setUpdateBeverage();
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
