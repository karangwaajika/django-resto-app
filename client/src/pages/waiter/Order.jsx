import React from "react";
import OrderForm from "../../components/waiter/OrderForm";
function Order() {
  return (
    <section className="order">
      <div style={{ fontFamily: "cursive" }}>Recoder Client Order</div>
      <div className="order-section">
        <OrderForm />
        <aside className="bill"></aside>
      </div>
    </section>
  );
}

export default Order;
