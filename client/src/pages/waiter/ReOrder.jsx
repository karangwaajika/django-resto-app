import React, { useState } from "react";
import OrderForm from "../../components/waiter/OrderForm";
import Bill from "../../components/waiter/Bill";
import useRecordOrder from "../../hooks/useRecordOrder";
import useRecordBeverage from "../../hooks/useRecordBeverage";
import useRecordMeal from "../../hooks/useRecordMeal";
import useRecordTea from "../../hooks/useRecordTea";
import useRetrieveOrder from "../../hooks/useRetrieveOrder";
import { useParams } from "react-router-dom";
import OrderApproveBill from "../../components/waiter/OrderApproveBill";
import useReOrder from "../../hooks/useReorder";

function ReOrder() {
  // beverage inputs
  const {
    beverageFieldError,
    beverageForm,
    beverageRecords,
    handleBeverageChange,
    addBeverage,
    setBeverageForm,
    setBeverageRecords,
  } = useRecordBeverage();
  // meal inputs
  const {
    mealFieldError,
    mealForm,
    mealRecords,
    addMeal,
    handleMealChange,
    setMealForm,
    setMealRecords,
  } = useRecordMeal();
  // smoothy input
  const {
    teaFieldError,
    teaForm,
    teaRecords,
    handleTeaChange,
    addTea,
    setTeaForm,
    setTeaRecords,
  } = useRecordTea();

  //  retrieve earlier orders
  const params = useParams();
  const isDevelopment = import.meta.env.MODE === "production";
  let url = isDevelopment
    ? import.meta.env.VITE_REACT_APP_APPROVE_BILL_API_DEPLOY
    : import.meta.env.VITE_REACT_APP_APPROVE_BILL_API;
  url += "/" + params.orderId;

  const [isRefresh, setRefresh] = useState(false);
  const { data, isLoading: orderIsLoading } = useRetrieveOrder(url, isRefresh);

  // reorder inputs
  const {
    fieldError,
    form,
    handleChange,
    message,
    clearMessage,
    isLoading,
    validateSubmitForm,
  } = useReOrder(
    beverageRecords,
    mealRecords,
    teaRecords,
    data.id,
    setBeverageRecords,
    setMealRecords,
    setTeaRecords,
    setRefresh,
    data.customer_name
  );

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
          addBeverage={addBeverage}
          beverageFieldError={beverageFieldError}
          beverageForm={beverageForm}
          handleBeverageChange={handleBeverageChange}
          setBeverageForm={setBeverageForm}
          mealFieldError={mealFieldError}
          mealForm={mealForm}
          addMeal={addMeal}
          handleMealChange={handleMealChange}
          setMealForm={setMealForm}
          teaFieldError={teaFieldError}
          teaForm={teaForm}
          addTea={addTea}
          handleTeaChange={handleTeaChange}
          setTeaForm={setTeaForm}
          orderId={data.id}
          customerName={data.customer_name}
          componentUsedIn="reorder"
        />
        {/* output of input in form of bill */}
        <Bill
          beverages={beverageRecords}
          meals={mealRecords}
          teas={teaRecords}
          componentUsedIn="reorder"
        />
        {/* the actuall bill */}

        <OrderApproveBill
          beverages={Object.values(data).length > 0 ? data.order_beverages_total : []}
          teas={Object.values(data).length > 0 ? data.order_teas_total : []}
          meals={Object.values(data).length > 0 ? data.order_meals_total : []}
          overallTotal={data.overall_total}
          isLoading={orderIsLoading}
          componentUsedIn="reorder"
        />
      </div>
    </section>
  );
}

export default ReOrder;
