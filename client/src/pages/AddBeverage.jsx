import "../assets/Beverage.css";
import BeverageBrandForm from "../components/BeverageBrandForm";
import { useState } from "react";
import useAddBeverageBrand from "../hooks/useAddBeverageBrand";

export default function AddBeverage() {
  // handle add beverage brand
  const {
    brandFieldError,
    brandForm,
    handleBrandChange,
    brandMessage,
    clearBrandMessage,
    isBrandLoading,
    validateSubmitBrandForm,
  } = useAddBeverageBrand();
  return (
    <div className="add-beverage-content">
      <div className="beverage-header" style={{ textAlign: "center" }}>
        <h2>Add Beverage</h2>
        <p style={{ fontSize: "14px" }}>
          Add Box or Case of Beverage Such as water Bottle, Beer, Soda etc ...
        </p>
      </div>
      <div className="beverage-forms">
        <BeverageBrandForm
          message={brandMessage}
          isLoading={isBrandLoading}
          form={brandForm}
          handleChange={handleBrandChange}
          submitForm={validateSubmitBrandForm}
          clearMessage={clearBrandMessage}
          fieldError={brandFieldError}
        />
      </div>
    </div>
  );
}
