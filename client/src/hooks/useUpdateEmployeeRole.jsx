import { useState, useContext } from "react";
import axios from "axios";
import { employeesDataContext } from "../pages/ViewWaiters";
export default function useUpdateEmployeeRole(
  employeeId,
  closeModal,
  employeeIndex
) {
  const employees = useContext(employeesDataContext);

  const submitForm = (e) => {
    e.preventDefault();
    // close the modal when button clicked
    closeModal(employeeIndex, "role");

    // display loading icon
    employees.setIsLoading(true);

    const isDevelopment = import.meta.env.MODE === "production";
    const url = isDevelopment
      ? import.meta.env.VITE_REACT_APP_UPDATE_ROLE_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_UPDATE_ROLE_API;
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
              item.is_staff = !item.is_staff;
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
