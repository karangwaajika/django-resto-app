import { useState, useContext } from "react";
import axios from "axios";
import fieldValidation from "../utils/fieldValidation.mjs";
import { updateBeverageContext } from "../pages/ViewBeverages";
export default function useEditBeverage(beverage, closeModal, beverageIndex) {
  const beverages = useContext(updateBeverageContext);

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
    // close the modal when button clicked
    closeModal(beverageIndex, "edit");

    // display loading icon
    beverages.setIsLoading(true);
    const isDevelopment = import.meta.env.MODE === "production";
    const url = isDevelopment
      ? import.meta.env.VITE_REACT_APP_UPDATE_BEVERAGE_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_UPDATE_BEVERAGE_API;
    axios
      .post(
        url + "/" + beverage.beverage.id,
        {
          name: form.name,
          price: form.price,
          beverage_type: form.beverage_type,
          qty: form.qty,
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
        // display response message
        beverages.setMessage(res.data);
        //update beverages' List
        beverages.setData((oldData) => {
          const newBeveragesList = oldData.map((item) => {
            if (item.id === beverage.id) {
              item.beverage.name = form.name;
              item.price = form.price;
              item.beverage.beverage_type = form.beverage_type;
              item.qty = form.qty;
              return item;
            } else {
              return item;
            }
          });
          return newBeveragesList;
        });
      })
      .catch((err) => {
        beverages.setMessage({
          success: false,
          message: err.message,
        });
      })
      .finally(() => {
        beverages.setIsLoading(false);
      });
  };
  return {
    fieldError,
    form,
    handleChange,
    validateSubmitForm,
  };
}
