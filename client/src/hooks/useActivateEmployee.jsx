import { useState, useContext } from "react";
import axios from "axios";
import { employeesDataContext } from "../pages/ViewWaiters";
export default function useActivateEmployee(
  employeeId,
  closeModal,
  employeeIndex
) {
  const employees = useContext(employeesDataContext);

  const submitForm = (e) => {
    e.preventDefault();
    // close the modal when button clicked
    closeModal(employeeIndex, "activate");

    // display loading icon
    employees.setIsLoading(true);

    const isDevelopment = import.meta.env.MODE === "production";
    const url = isDevelopment
      ? import.meta.env.VITE_REACT_APP_ACTIVATE_USER_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_ACTIVATE_USER_API;
    axios
      .get(url + "/" + employeeId, {
        headers: {
          Authorization:
            "Token " +
            localStorage.getItem(import.meta.env.VITE_REACT_APP_TOKEN),
        },
      })
      .then((res) => {
        // display response message
        employees.setMessage(res.data);
        //update employee's List
        employees.setData((oldData) => {
          const newEmployeesList = oldData.map((item) => {
            if (item.id === employeeId) {
              item.is_active = !item.is_active;
              return item;
            } else {
              return item;
            }
          });
          return newEmployeesList;
        });
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
    submitForm,
  };
}
