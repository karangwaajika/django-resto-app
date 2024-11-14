import React from "react";
import OrderForm from "../../components/waiter/OrderForm";
import Bill from "../../components/waiter/Bill";
import useRecordOrder from "../../hooks/useRecordOrder";
import useRecordBeverage from "../../hooks/useRecordBeverage";
import useRecordMeal from "../../hooks/useRecordMeal";
import useRecordTea from "../../hooks/useRecordTea";
function Order() {
  // beverage inputs
  const {
    beverageFieldError,
    beverageForm,
    beverageRecords,
    handleBeverageChange,
    addBeverage,
    setBeverageForm,
  } = useRecordBeverage();
  // meal inputs
  const {
    mealFieldError,
    mealForm,
    mealRecords,
    addMeal,
    handleMealChange,
    setMealForm,
  } = useRecordMeal();
  // smoothy input
  const {
    teaFieldError,
    teaForm,
    teaRecords,
    handleTeaChange,
    addTea,
    setTeaForm,
  } = useRecordTea();
  // order inputs
  const {
    fieldError,
    form,
    handleChange,
    message,
    clearMessage,
    isLoading,
    validateSubmitForm,
  } = useRecordOrder(beverageRecords, mealRecords, teaRecords);

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
        />
        <Bill />
      </div>
    </section>
  );
}

export default Order;
