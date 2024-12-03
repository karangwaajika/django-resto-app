import React, { useState } from "react";
import { useParams } from "react-router-dom";
import OrderApproveBill from "../../components/waiter/OrderApproveBill";
import useRetrieveOrder from "../../hooks/useRetrieveOrder";
import EditOrderForm from "../../components/waiter/EditOrderForm";

function EditOrder() {
  const params = useParams();
  const isDevelopment = import.meta.env.MODE === "production";
  let url = isDevelopment
    ? import.meta.env.VITE_REACT_APP_APPROVE_BILL_API_DEPLOY
    : import.meta.env.VITE_REACT_APP_APPROVE_BILL_API;
  url += "/" + params.orderId;

  const [isRefresh, setRefresh] = useState(false);

  const { data, isLoading, message, clearMessage, setMessage, setData } =
    useRetrieveOrder(url, isRefresh);
  return (
    <section className="order">
      <div style={{ fontFamily: "cursive" }}>
        Edit Client Order
        <div className="order-section">
          <OrderApproveBill
            beverages={
              Object.values(data).length > 0 ? data.order_beverages_total : []
            }
            teas={Object.values(data).length > 0 ? data.order_teas_total : []}
            meals={Object.values(data).length > 0 ? data.order_meals_total : []}
            overallTotal={data.overall_total}
            isLoading={isLoading}
          />
          <EditOrderForm
            beverages={
              Object.values(data).length > 0 ? data.order_beverages : []
            }
            teas={Object.values(data).length > 0 ? data.order_teas : []}
            meals={Object.values(data).length > 0 ? data.order_meals : []}
            data={data}
            setData={setData}
            setRefresh={setRefresh}
            overallTotal={data.overall_total}
            isLoading={isLoading}
          />
        </div>
      </div>
    </section>
  );
}

export default EditOrder;
