import Button from "./ui/Button";
import InputField from "./ui/InputField";
import ButtonLoading from "./ui/ButtonLoading";
import FlashMessage from "./ui/FlashMessage";
import loadingImg from "/images/n-loading.gif";
import useFetchData from "../hooks/useFetchData";

export default function BeveragePurchaseForm({
  message,
  isLoading,
  form,
  handleChange,
  submitForm,
  clearMessage,
  fieldError,
  refreshData,
}) {
  const { data } = useFetchData(
    import.meta.env.VITE_REACT_APP_PURCHASE_BEVERAGE_API,
    refreshData
  );
  return (
    <div className="beverage-purchase-form">
      <div className="card" style={{ border: "1px solid black" }}>
        <div className="card-header">Purchase Beverage Form</div>
        {message && (
          <FlashMessage
            message={message.message}
            isSuccess={message.success}
            clearMessage={clearMessage}
          />
        )}
        <div className="card-body">
          <form onSubmit={submitForm}>
            {fieldError.beverage && (
              <i className="error-text">{fieldError.beverage}</i>
            )}
            <div
              className={`input-group ${fieldError.beverage && "error-field"}`}
            >
              <span className="input-icon">
                <i className="fa-solid fa-list"></i>
              </span>
              <select
                name="beverage"
                value={form.beverage}
                onChange={handleChange}
                errorfield={fieldError.beverage && "error-field"}
                id="beverage"
                className="input-field"
              >
                <option value="">Select Brand............</option>
                {data.map((beverage, index) => {
                  return <option value={beverage.id}>{beverage.name}</option>;
                })}
              </select>
              <span className="input-text">Beverage</span>
            </div>
            {fieldError.price && (
              <i className="error-text">{fieldError.price}</i>
            )}
            <InputField
              type="number"
              name="price"
              id="price"
              errorfield={fieldError.price && "error-field"}
              label="Price"
              icon="fa-solid fa-euro"
              placeholder="Price"
              handleChange={handleChange}
              value={form.price}
            />
            {fieldError.qty && <i className="error-text">{fieldError.qty}</i>}
            <InputField
              type="number"
              name="qty"
              id="qty"
              errorfield={fieldError.qty && "error-field"}
              label="Qty"
              icon="fa-solid fa-weight-scale"
              placeholder="Qty"
              handleChange={handleChange}
              value={form.qty}
            />
            {fieldError.purchase_date && (
              <i className="error-text">{fieldError.purchase_date}</i>
            )}
            <InputField
              type="date"
              name="purchase_date"
              id="purchase_date"
              errorfield={fieldError.purchase_date && "error-field"}
              label="Date"
              icon="fa-solid fa-calendar-days"
              placeholder="Purchase Date"
              handleChange={handleChange}
              value={form.purchase_date}
            />

            {isLoading ? (
              <ButtonLoading
                text="Submit"
                className="btn-dark"
                img={loadingImg}
              />
            ) : (
              <Button text="Submit" className="btn-dark" />
            )}
          </form>
        </div>
        <div className="card-footer"></div>
      </div>
    </div>
  );
}
