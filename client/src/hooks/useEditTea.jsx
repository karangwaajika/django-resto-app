import { useState, useContext } from "react";
import axios from "axios";
import fieldValidation from "../utils/fieldValidation.mjs";
import { updateTeaContext } from "../pages/ViewTeas";
export default function useEditTea(tea, closeModal, teaIndex) {
  const teas = useContext(updateTeaContext);

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

  // handle input value when changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((oldForm) => {
      return { ...oldForm, [name]: value };
    });
  };

  const submitForm = (e) => {
    // close the modal when button clicked
    closeModal(teaIndex, "edit");

    // display loading icon
    teas.setIsLoading(true);
    const isDevelopment = import.meta.env.MODE === "production";
    const url = isDevelopment
      ? import.meta.env.VITE_REACT_APP_UPDATE_TEA_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_UPDATE_TEA_API;
    axios
      .post(
        url + "/" + tea.id,
        {
          name: form.name,
          price: form.price,
          tea_type: form.tea_type,
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
        teas.setMessage(res.data);
        //update teas' List
        teas.setData((oldData) => {
          const newTeasList = oldData.map((item) => {
            if (item.id === tea.id) {
              item.name = form.name;
              item.price = form.price;
              item.tea_type = form.tea_type;
              return item;
            } else {
              return item;
            }
          });
          return newTeasList;
        });
      })
      .catch((err) => {
        teas.setMessage({
          success: false,
          message: err.message,
        });
      })
      .finally(() => {
        teas.setIsLoading(false);
      });
  };
  return {
    fieldError,
    form,
    handleChange,
    validateSubmitForm,
  };
}
