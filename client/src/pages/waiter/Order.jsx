import React from "react";
import OrderForm from "../../components/waiter/OrderForm";
import Bill from "../../components/waiter/Bill";
import useRecordOrder from "../../hooks/useRecordOrder";
function Order() {
  const {
    fieldError,
    form,
    handleChange,
    message,
    clearMessage,
    isLoading,
    validateSubmitForm,
  } = useRecordOrder();
  return (
    <section className="order">
      <div style={{ fontFamily: "cursive" }}>Recoder Client Order</div>
      <div className="order-section">
        <OrderForm
          message={message}
          isLoading={isLoading}
          form={form}
          handleChange={handleChange}
          submitForm={validateSubmitForm}
          clearMessage={clearMessage}
          fieldError={fieldError}
        />
        <Bill />
      </div>
    </section>
  );
}

export default Order;
