import { useState } from "react";
import axios from "axios";
export default function useEditOrder(setRefresh, orderId) {
  const [message, setMessage] = useState();
  const clearMessage = () => {
    setMessage();
  };
  const [isLoading, setIsLoading] = useState(false);

  const editOrder = (item, itemType, action) => {
    submitForms(item, itemType, action);
  };

  const submitForms = (item, itemType, action) => {
    setIsLoading(true);
    const isDevelopment = import.meta.env.MODE === "production";
    const url = isDevelopment
      ? import.meta.env.VITE_REACT_APP_EDIT_ORDER_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_EDIT_ORDER_API;
    axios
      .post(
        url + "/" + orderId,
        {
          item: item,
          item_type: itemType,
          action: action,
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
        setMessage(res.data);
        if (res.data.success) {
          setRefresh((oldState) => !oldState);
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
    message,
    clearMessage,
    isLoading,
    editOrder,
  };
}
