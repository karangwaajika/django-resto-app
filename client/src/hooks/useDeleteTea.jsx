import { useState, useContext } from "react";
import axios from "axios";
import { updateTeaContext } from "../pages/ViewTeas";
export default function useDeleteTea(tea, closeModal, teaIndex) {
  const teas = useContext(updateTeaContext);

  const submitForm = (e) => {
    e.preventDefault();
    closeModal(teaIndex, "delete");
    teas.setIsLoading(true);
    const isDevelopment = import.meta.env.MODE === "production";
    const url = isDevelopment
      ? import.meta.env.VITE_REACT_APP_DELETE_TEA_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_DELETE_TEA_API;
    axios
      .delete(url + "/" + tea.id, {
        headers: {
          Authorization:
            "Token " +
            localStorage.getItem(import.meta.env.VITE_REACT_APP_TOKEN),
        },
      })
      .then((res) => {
        teas.setMessage(res.data);
        teas.setData((oldData) => {
          const deleteTea = oldData.filter((item, i) => {
            return item.id !== tea.id;
          });

          return deleteTea;
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
    submitForm,
  };
}
