import React from "react";
import OrderForm from "../../components/waiter/OrderForm";
import Bill from "../../components/waiter/Bill";
import useRecordOrder from "../../hooks/useRecordOrder";
import useRecordBeverage from "../../hooks/useRecordBeverage";
import useRecordMeal from "../../hooks/useRecordMeal";
import useRecordTea from "../../hooks/useRecordTea";
function Order() {
  const {
    beverageFieldError,
    beverageForm,
    beverageRecords,
    handleBeverageChange,
    addBeverage,
  } = useRecordBeverage();
  const { mealFieldError, mealForm, mealRecords, addMeal, handleMealChange } =
    useRecordMeal();
  const { teaFieldError, teaForm, teaRecords, handleTeaChange, addTea } =
    useRecordTea();
  const {
    fieldError,
    form,
    handleChange,
    message,
    clearMessage,
    isLoading,
    validateSubmitForm,
  } = useRecordOrder(beverageRecords);
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
          mealFieldError={mealFieldError}
          mealForm={mealForm}
          addMeal={addMeal}
          handleMealChange={handleMealChange}
          teaFieldError={teaFieldError}
          teaForm={teaForm}
          addTea={addTea}
          handleTeaChange={handleTeaChange}
        />
        <Bill />
      </div>
    </section>
  );
}

export default Order;
