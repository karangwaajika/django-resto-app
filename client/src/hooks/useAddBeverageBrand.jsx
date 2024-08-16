import { useState } from "react";
import axios from "axios";
import fieldValidation from "../utils/fieldValidation.mjs";
export default function useAddBeverageBrand(setBeverageRefresher) {
  const [brandMessage, setBrandMessage] = useState();
  const clearBrandMessage = () => {
    setBrandMessage();
  };
  const [isBrandLoading, setIsBrandLoading] = useState(false);
  const [brandForm, setBrandForm] = useState({
    name: "",
    beverage_type: "",
  });

  // handle brand form input error
  const [brandFieldError, setBrandFieldError] = useState({});
  const validateSubmitBrandForm = async (e) => {
    e.preventDefault();

    const inputFields = {
      name: brandForm.name,
      beverage_type: brandForm.beverage_type,
    };
    const validatedFields = fieldValidation(inputFields);
    setBrandFieldError(validatedFields);
    if (Object.keys(validatedFields).length == 0) {
      submitBrandForm();
    }
  };
  const handleBrandChange = (e) => {
    const { name, value } = e.target;
    setBrandForm((oldForm) => {
      return { ...oldForm, [name]: value };
    });
  };
  const submitBrandForm = (e) => {
    setIsBrandLoading(true);
    axios
      .post(import.meta.env.VITE_REACT_APP_ADD_BEVERAGE_API, {
        name: brandForm.name,
        beverage_type: brandForm.beverage_type,
      })
      .then((res) => {
        if (res.data.success) {
          setBrandMessage(res.data);
          setBeverageRefresher();
        } else {
          setBrandMessage(res.data);
        }
      })
      .catch((err) => {
        setBrandMessage({
          success: false,
          message: err.message,
        });
      })
      .finally(() => {
        setIsBrandLoading(false);
      });
  };
  return {
    brandFieldError,
    brandForm,
    handleBrandChange,
    brandMessage,
    clearBrandMessage,
    isBrandLoading,
    validateSubmitBrandForm,
  };
}
