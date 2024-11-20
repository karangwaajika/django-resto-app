import React from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import loaderPicture from "/images/loading-3.gif";
import { addComma } from "../../utils/addComma.mjs";
import OrderApproveForm from "../../components/waiter/OrderApproveForm";
import OrderApproveBill from "../../components/waiter/OrderApproveBill";
import useRetrieveOrder from "../../hooks/useRetrieveOrder";

function ApproveBill({}) {
  const params = useParams();
  const isDevelopment = import.meta.env.MODE === "production";
  let url = isDevelopment
    ? import.meta.env.VITE_REACT_APP_APPROVE_BILL_API_DEPLOY
    : import.meta.env.VITE_REACT_APP_APPROVE_BILL_API;
  url += "/" + params.orderId;
  const { data, isLoading } = useRetrieveOrder(url);

  return (
    <section className="approve-bill">
      <OrderApproveForm order={data.order} isLoading={isLoading} />
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
