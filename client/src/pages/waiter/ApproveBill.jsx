import React, { createContext, useState } from "react";
import { useParams } from "react-router-dom";
import OrderApproveForm from "../../components/waiter/OrderApproveForm";
import OrderApproveBill from "../../components/waiter/OrderApproveBill";
import useRetrieveOrder from "../../hooks/useRetrieveOrder";
import useApproveOrder from "../../hooks/useApproveOrder";

export const orderContext = createContext();

function ApproveBill({}) {
  const params = useParams();
  const isDevelopment = import.meta.env.MODE === "production";
  let url = isDevelopment
    ? import.meta.env.VITE_REACT_APP_APPROVE_BILL_API_DEPLOY
    : import.meta.env.VITE_REACT_APP_APPROVE_BILL_API;
  url += "/" + params.orderId;

  const [isRefresh, setRefresh] = useState(false);
  
  const { data, isLoading, message, clearMessage, setMessage } =
    useRetrieveOrder(url, isRefresh);
  const {
    form,
    fieldError,
    handleChange,
    validateSubmitForm,
    isLoading: isLoadingForm,
  } = useApproveOrder(
    data.order.id,
    data.order.customer_name,
    data.order.amount_to_pay,
    setMessage,
    setRefresh
  );

  return (
    <section className="approve-bill">
      <OrderApproveForm
        order={data.order}
        isLoading={isLoading}
        isLoadingForm={isLoadingForm}
        form={form}
        message={message}
        clearMessage={clearMessage}
        fieldError={fieldError}
        handleChange={handleChange}
        submitForm={validateSubmitForm}
      />

      <OrderApproveBill
        beverages={data.beverages}
        teas={data.teas}
        meals={data.meals}
        overallTotal={data.order.overall_total}
        isLoading={isLoading}
      />
    </section>
  );
}

export default ApproveBill;
