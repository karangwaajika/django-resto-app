import "../assets/Beverage.css";
import BeverageBrandForm from "../components/BeverageBrandForm";
import { useState } from "react";
import useAddBeverageBrand from "../hooks/useAddBeverageBrand";
import usePurchaseBeverage from "../hooks/usePurchaseBeverage";
import BeveragePurchaseForm from "../components/BeveragePurchaseForm";

export default function AddBeverage() {
  // to trigger fetch data when tea is updated to re-render the component
  const [refreshData, setRefreshData] = useState(false);
  const handleRefreshData = () => {
    setRefreshData((oldstate) => !oldstate);
  };
  // handle add beverage brand
  const {
    brandFieldError,
    brandForm,
    handleBrandChange,
    brandMessage,
    clearBrandMessage,
    isBrandLoading,
    validateSubmitBrandForm,
  } = useAddBeverageBrand(setRefreshData);

  // handle add beverage brand
  const {
    fieldError,
    form,
    handleChange,
    message,
    clearMessage,
    isLoading,
    validateSubmitForm,
  } = usePurchaseBeverage();
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
        <BeveragePurchaseForm
          message={message}
          isLoading={isLoading}
          form={form}
          handleChange={handleChange}
          submitForm={validateSubmitForm}
          clearMessage={clearMessage}
          fieldError={fieldError}
          refreshData={refreshData}
        />
      </div>
    </div>
  );
}
