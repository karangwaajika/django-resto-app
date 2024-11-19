import React from "react";
import OrderForm from "../../components/waiter/OrderForm";
import Bill from "../../components/waiter/Bill";
import useRecordOrder from "../../hooks/useRecordOrder";
import useRecordBeverage from "../../hooks/useRecordBeverage";
import useRecordMeal from "../../hooks/useRecordMeal";
import useRecordTea from "../../hooks/useRecordTea";
import useFetchData from "../../hooks/useFetchData";
function Order() {
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

  // get last order ID
  const isDevelopment = import.meta.env.MODE === "production";
  const url = isDevelopment
    ? import.meta.env.VITE_REACT_APP_ORDER_ID_API_DEPLOY
    : import.meta.env.VITE_REACT_APP_ORDER_ID_API;
  const { setData, data } = useFetchData(url);

  // order inputs
  const {
    fieldError,
    form,
    handleChange,
    message,
    clearMessage,
    isLoading,
    validateSubmitForm,
  } = useRecordOrder(
    beverageRecords,
    mealRecords,
    teaRecords,
    data.order_id,
    setData,
    setBeverageRecords,
    setMealRecords,
    setTeaRecords
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
          orderId={data.order_id}
        />
        <Bill
          beverages={beverageRecords}
          meals={mealRecords}
          teas={teaRecords}
        />
      </div>
    </section>
  );
}

export default Order;
