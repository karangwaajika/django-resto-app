import { useState, useContext } from "react";
import axios from "axios";
import { employeesDataContext } from "../pages/ViewWaiters";
export default function useUpdateEmployeeRole(employeeId) {
  const employees = useContext(employeesDataContext);

  const [message, setMessage] = useState();
  const clearMessage = () => {
    setMessage();
  };
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isDevelopment = import.meta.env.MODE === "production";
    const url = isDevelopment
      ? import.meta.env.VITE_REACT_APP_UPDATE_ROLE_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_UPDATE_ROLE_API;
    axios
      .get(url + "/" + employeeId)
      .then((res) => {
        // update employeeList
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
    message,
    clearMessage,
    isLoading,
    submitForm,
  };
}
